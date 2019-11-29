
export const len = {
	bind(el, binding, vnode) {
		let str = el.innerText,
				len = binding.value
		if (len && typeof len === 'number') {
			el.innerText = str.length > len ? `${str.slice(0, len)}...` : str
		}
	},
	inserted: function (el) {}
}

export const longtap = {
	bind(el, binding, vNode) {
		if (typeof binding.value.handler !== 'function') {
			const compName = vNode.context.name
			let warn = `[longtap:] provided expression '${binding.expression}' is not a function`
			if (compName) {
				warn += `Found in component '${compName}'`
			}
			console.warn(warn)
		}
		let pressTimer = null, flag = false, pos = null

		let start = (e) => {
			if (e.type === 'click' && e.button !== 0) {
				return;
			}
			flag = false
			pos = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			}
			if (pressTimer === null) {
				pressTimer = setTimeout(() => {
					flag = true
					handler()
				}, 1000)
			}
		}
		let cancel = (e) => {
			if (e.touches[0]) {
				let x = e.touches[0].clientX,
					y = e.touches[0].clientY
				if (Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2) < 15) {
					return
				}
			}
			if (pressTimer !== null) {
				clearTimeout(pressTimer)
				pressTimer = null
			}
		}
		const handler = (e) => {
			binding.value.handler(e)
		}
		const clickHandler = (e) => {
			if (flag) {
				return
			}
			binding.value.click(e)
		}
		el.addEventListener('touchstart', start)
		el.addEventListener('touchmove', cancel)
		el.addEventListener('click', clickHandler)
		el.addEventListener('touchend', cancel)
	}
}