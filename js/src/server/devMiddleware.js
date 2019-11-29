const path = require('path')
const fs = require('fs')
const MemoryFS = require('memory-fs')
const chokidar = require('chokidar')
const express = require('express')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackDev = require('webpack-dev-middleware')
const webpackHot = require('webpack-hot-middleware')
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const { createBundleRenderer } = require('vue-server-renderer')
const urlJoin = require('url-join')

const webpackConfig = require('../webpack.base')
const configDev = require('../config.dev')
const configPath = ''

module.exports = function({ suffix = '', title, routePath, projectPath, ssr }) {
  const __SUFFIX__ = JSON.stringify(suffix)
  const router = express.Router()
  if (!ssr) {
    router.use((req, res, next) => {
      if (req.url == '/') {
        res.redirect(302, urlJoin(req.originalUrl, 'index.html'))
      } else {
        next()
      }
    })
  }

  let extensions = ['.js', '.vue', '.json']
  if (suffix) {
    extensions = extensions.map(ext => '.' + suffix + ext).concat(extensions)
  }

  const alias = {
    '@': projectPath,
    common: path.join(projectPath, 'common'),
  }

  const inAdmin = routePath.indexOf('/admin/') == 0

  const clientConfig = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-eval-source-map',
    entry: [
      `webpack-hot-middleware/client?path=${routePath}/__webpack_hmr&timeout=20000&quiet=true`,
      path.join(projectPath, ssr ? 'entry-client.js' : 'main.js'),
    ],
    resolve: {
      extensions,
      alias,
    },
    output: {
      publicPath: routePath + '/',
    },
    plugins: [
      new VueSSRClientPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': 'development',
        baseUrl: JSON.stringify(routePath),
        routerMode: JSON.stringify('history'),
        __TOKEN__: JSON.stringify(inAdmin ? configDev.token : ''),
        __SUFFIX__,
      }),
    ],
  })

  if (!ssr) {
    clientConfig.plugins.push(
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(projectPath, 'index.html'),
        inject: true,
        templateParameters: {
          title,
          configPath,
        },
      })
    )
    router.use('/static', express.static(path.join(projectPath, 'static')))
  }

  const clientCompiler = webpack(clientConfig)
  const devFn = webpackDev(clientCompiler)
  const hotFn = webpackHot(clientCompiler)
  router.use(devFn)
  router.use(hotFn)

  if (ssr) {
    let renderer, clientManifest, template

    // html模版
    const templateFilePath = path.join(projectPath, 'index.templet.html')
    const updateTemplate = () => {
      template = fs.readFileSync(templateFilePath, 'utf8')
    }
    chokidar
      .watch(templateFilePath)
      .on('ready', updateTemplate)
      .on('change', updateTemplate)

    const serverConfig = merge(webpackConfig, {
      mode: 'development',
      entry: path.join(projectPath, 'entry-server.js'),
      target: 'node',
      // devtool: 'source-map',
      resolve: {
        extensions,
        alias,
      },
      output: {
        libraryTarget: 'commonjs2',
      },
      plugins: [
        new VueSSRServerPlugin(),
        new webpack.DefinePlugin({
          baseUrl: JSON.stringify('/'),
          routerMode: JSON.stringify('history'),
          __TOKEN__: JSON.stringify(''),
          __SUFFIX__,
        }),
      ],
    })

    const serverCompiler = webpack([serverConfig, clientConfig])
    const mfs = new MemoryFS()
    serverCompiler.outputFileSystem = mfs
    const readJsonFromMFS = filePath => {
      const json = mfs.readFileSync(path.resolve(filePath), 'utf8')
      return JSON.parse(json)
    }

    serverCompiler.watch(
      {
        aggregateTimeout: 300,
      },
      (err, stats) => {
        // 创建
        renderer = createBundleRenderer(readJsonFromMFS('./dist/vue-ssr-server-bundle.json'), {
          template,
          clientManifest: readJsonFromMFS('./dist/vue-ssr-client-manifest.json'),
          runInNewContext: false,
        })
      }
    )

    router.get('*', (req, res, next) => {
      if (!renderer) {
        // res.status(503).end()
        setTimeout(() => {
          res.redirect(302, req.originalUrl)
        }, 5000)
        return
      }
      // 不会包含use的匹配路径
      console.log('req.url', req.url)
      // 渲染最终结果
      renderer
        .renderToString({
          title,
          routePath,
          configPath,
          url: req.url,
        })
        .then(html => {
          res.type('html').end(html)
        })
        .catch(err => {
          res.status(err.code || 500).end(err.message)
          console.error(err)
        })
    })
  }

  return router
}
