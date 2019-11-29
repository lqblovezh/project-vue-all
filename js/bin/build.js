#!/usr/bin/env node
process.env.NODE_ENV = 'production'

const path = require('path')
const yargs = require('yargs')
const inquirer = require('inquirer')
const mkdirp = require('mkdirp')
const prettyHrtime = require('pretty-hrtime')
const {getBuildInfo} = require('build-helper')

const projectConfigs = require('../src/projects/configs')
const main = require('../src/build')
const spa = require('../src/build/spa')
const copyCDN = require('../src/build/copyCDN')
const compileConfig = require('../src/build/compileConfig')

const start = process.hrtime();

const {
	suffix,
	dist,
	loadDbi,
	dbiHost,
  subApp,
  project,
} = yargs.options({
	'dist': {
		alias: 'o',
		describe: '编译文件的输出目录',
		normalize: true,
		default: '../public'
	},
	'sub-app': {
		describe: '子应用的编译文件的输出目录，缺省时使用 suffix 作为应用目录',
		normalize: true,
	},
	'suffix': {
		alias: 'e',
		describe: '需要优先编译的文件后缀名称（如：jyz）',
		default: 'base'
	},
	'load-dbi': {
		describe: '在页面引入埋点 SDK 脚本文件',
		default: false,
		type: 'boolean',
	},
	'dbi-host': {
		describe: '设置埋点脚本文件所在的服务器地址',
		default: 'hub.cp.cn',
		type: 'string',
  },
  'project': {
    describe: '打包指定项目，用于 Cordova',
    type: 'string'
  },
})
.version(false)
.strict(true)
.help('help', '显示帮助')
.argv

const distPath = path.resolve(process.cwd(), dist)
console.log(`输出目录：${distPath}`);
mkdirp.sync(distPath)

if (project) {
  Promise.all([
    getBuildInfo(),
  ]).then(([
    buildInfo,
  ]) => {
    return spa({
      projectConfig: projectConfigs.find(v => v.projectId == project),
      suffix,
      distPath,
      banner: JSON.stringify(buildInfo, null, 2),
    }).then(() => {
      copyCDN(distPath)
    })
  })
} else {
  inquirer.prompt(projectConfigs.map(({title}, i) => ({
    type: 'confirm',
    name: ''+i,
    message: `是否打包 “${title}”`,
    default: true,
  }))).then(result => {
    console.log('请稍等，正在打包...');
    return Promise.all([
    getBuildInfo(),
  ]).then(([
    buildInfo,
  ]) => {
    return main({
      projectConfigs: projectConfigs.filter((v, i) => result[i]),
      suffix,
      dbiHost: loadDbi ? dbiHost : '',
      distPath,
      subApp,
      banner: JSON.stringify(buildInfo, null, 2),
    })
  })
  }).then(() => {
    compileConfig({
      filePath: path.join(distPath, '_static', subApp || suffix, 'config_js.blade.php'),
    })
    compileConfig({
      filePath: path.join(distPath, '_system', 'system_config_js.blade.php'),
      inSystem: true,
    })
    console.log('完成！耗时 '+ prettyHrtime(process.hrtime(start)));
  }, console.error)
}
