const path = require('path')
const cpx = require('cpx')

module.exports = function (distPath) {
  const source = path.join(__dirname, '../../../public/cdn/**')
	const dist = path.join(distPath, 'cdn')
	cpx.copySync(source, dist, {
		clean: true,
	})
}
