#!/usr/bin/env node
process.env.NODE_ENV = 'development'

const yargs = require('yargs')
const opn = require('opn')
const main = require('../src/server/proxy')

const {
	site,
	open,
	loadDbi,
	dbiHost,
	_,
	...opts
} = yargs.options({
	'suffix': {
		alias: 'e',
		describe: '需要优先编译的文件后缀名称（如：jyz）',
	},
	'site': {
		alias: 's',
		describe: '代理站点名称（参考：src/server/siteConfig.js）',
		default: 'gli',
	},
	'port': {
		alias: 'p',
		describe: '服务器端口',
		default: 7100,
		type: 'number',
	},
	'open': {
		describe: '启动时用浏览器打开默认地址',
		default: false,
		type: 'boolean',
	},
	'load-dbi': {
		describe: '在页面引入埋点 SDK 脚本文件',
		default: false,
		type: 'boolean',
	},
	'dbi-host': {
		describe: '设置埋点脚本文件所在的服务器地址',
		default: 'hub.h5angel.cn',
		type: 'string',
	}
})
.version(false)
.strict(true)
.help('help', '显示帮助')
.argv

main({
	...opts,
	siteName: site,
	dbiHost: loadDbi ? dbiHost : '',
}).then(address => {
	open && opn(address, {app: ['google chrome', '--incognito']})
})
