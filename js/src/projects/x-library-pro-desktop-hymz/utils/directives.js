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