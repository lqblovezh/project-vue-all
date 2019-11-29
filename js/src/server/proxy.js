const path = require('path')
const ip = require('ip')
const server = require('express')()
const proxy = require('http-proxy-middleware')
const pug = require('pug')

const urlJoin = require('url-join')

const middleware = require('./devMiddleware')
const projectConfigs = require('../projects/configs')

const siteConfig = require('./siteConfig')
const configDev = require('../config.dev')
const cache = require('./cache')

module.exports = function({ siteName, suffix, port }) {
  const sites = siteConfig[siteName]
  const renderConfig = pug.compileFile(path.resolve(__dirname, '../config.pug'))
  const globalConifg = {
    baseUrl: configDev.baseUrl,
    appSite: sites[1],
    requestSite: sites[0],
  }
  // 浏览器全局config
  const configJS = renderConfig(globalConifg)
  // node全局config
  global.config = globalConifg
  cache.set('globalConifg', globalConifg)

  console.log('cachecachecachecache', cache)

  server.get('/config.js', (req, res) => {
    res.type('javascript').end(configJS)
  })

  server.get('/', (req, res) => {
    res.redirect('/admin/index.html')
  })

  for (const projectConfig of projectConfigs) {
    let router = null
    // 每一个项目,设置独立的config文件
    cache.set(projectConfig.routePath, {})

    server.use(projectConfig.routePath, (req, res, next) => {
      console.log('projectConfig.routePath', projectConfig.routePath)
      // 一次请求, 这里存, request里面取routePath, 中间是同步的, 不会受到并发请求污染
      cache.set('routePath', projectConfig.routePath)
      if (!router) {
        router = middleware({
          ...projectConfig,
          suffix,
        })
      }
      router(req, res, next)
    })
  }

  server.use(
    '/dev',
    proxy({
      target: sites[0],
      pathRewrite: {
        '^/dev': '',
      },
      changeOrigin: true,
      secure: false,
    })
  )

  server.listen(port, () => {
    console.log(`http://${ip.address()}:${port}`)
  })
}
