const path = require('path')
const fs = require('fs')
const pug = require('pug')
const mkdirp = require('mkdirp')

module.exports = function ({
	filePath,
	inSystem = false,
}) {
	mkdirp.sync(path.dirname(filePath))
  fs.writeFileSync(filePath, pug.compileFile(path.join(__dirname, '../common/config_js.pug'))({
		dev: false,
		inSystem,
  }))
}
