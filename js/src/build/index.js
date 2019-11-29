const path = require('path')
const del = require('del')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const pathToRegexp = require('path-to-regexp')

const webpackConfig = require('../webpack.base')
const compileConfig = require('./compileConfig')

module.exports = function({
  projectConfigs,
  distPath,
  suffix,
  dbiHost,
  subApp,
  banner,
}) {
  const __SUFFIX__ = JSON.stringify(suffix)

  const clientConfigs = []
  let extensions = ['.js', '.vue', '.json']
  if (suffix != 'base') {
    extensions = extensions.map(ext => '.' + suffix + ext).concat(extensions)
  }

  for (let {
    title,
    projectPath,
    outPath,
    ssr,
    type,
    admin,
    design,
  } of projectConfigs) {
    const __PROJECT_INFO__ = JSON.stringify({
      type,
      admin,
      design,
    })

    const publicPath =
      '/' +
      pathToRegexp.compile(outPath)({
        subApp: subApp || suffix,
        suffix,
      }) +
      '/'
    const projectDistPath = path.join(distPath, publicPath)

    del.sync(
      ['index.html', 'static'].map(filename =>
        path.join(projectDistPath, filename)
      ),
      {
        force: true,
      }
    )

    const alias = {
      '@': projectPath,
      common: path.join(projectPath, 'common'),
    }
    const clientConfig = merge(webpackConfig, {
      mode: 'production',
      devtool: false,
      entry: path.join(projectPath, ssr ? 'entry-client.js' : 'main.js'),
      resolve: {
        extensions,
        alias,
      },
      output: {
        publicPath,
        path: projectDistPath,
        filename: 'static/js/[name].[chunkhash].js',
        chunkFilename: 'static/js/[id].[chunkhash].js',
      },
      plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[hash].css',
          chunkFilename: 'static/css/[id].[hash].css',
        }),
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.join(projectPath, 'index.html'),
          inject: true,
          templateParameters: {
            title: '',
            dbiHost,
            publicPath,
          },
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeAttributeQuotes: false,
          },
        }),
        new CopyWebpackPlugin([
          {
            from: path.join(projectPath, 'static'),
            to: path.join(projectDistPath, 'static'),
            ignore: ['.*'],
          },
        ]),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production'),
          baseUrl: JSON.stringify('/'),
          routerMode: JSON.stringify('hash'),
          __SUFFIX__,
          __PROJECT_INFO__,
        }),
        new webpack.BannerPlugin(banner),
      ],
      performance: {
        hints: false,
      },
      optimization: {
        minimizer: [
          new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                pure_funcs: ['console.log', 'console.info'],
                warnings: false,
              },
            },
            parallel: true,
          }),
          new OptimizeCSSPlugin({
            cssProcessorOptions: {
              safe: true,
            },
          }),
        ],
      },
    })

    clientConfigs.push(clientConfig)
  }

  return new Promise((resolve, reject) => {
    webpack(clientConfigs, (err, stats) => {
      if (err) {
        reject(err.details || err.stack || err)
        return
      }

      console.log(
        stats.toString({
          chunks: false,
          colors: true,
        })
      )

      const info = stats.toJson()
      if (stats.hasWarnings()) {
        console.log(`警告 ${info.warnings.length} 个`)
      }
      if (stats.hasErrors()) {
        console.log(`错误 ${info.errors.length} 个`)
        console.error(info.errors)
      }
      resolve()
    })
  })
}
