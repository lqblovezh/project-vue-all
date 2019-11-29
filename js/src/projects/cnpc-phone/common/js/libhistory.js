import locaforage from 'localforage'

class LibHistory {
	constructor(lib = 'lib_path', maxLen = 20) {
		this.lib = lib
		this.maxLen = maxLen
		this.existPath().then(r => {
			let temps = typeof r === 'undefined' ? [] : r
			this.paths = [...temps]
		})
	}

	add(path, type = 'default') {
		if (path) {
			if (type === 'replace') {
				this.paths.pop()
			}
			this.paths.push(path)
		}
		return locaforage.setItem(this.lib, this.paths)
	}

	async existPath() {
		const res = await locaforage.getItem(this.lib)
		if (res && res.length) {
			return res
		}
		return
	}

	get() {
		return locaforage.getItem(this.lib).then(res => {
			this.paths = res
			let path = this.paths.pop()
			this.add()
			return path
		})
	}
	clearAllPath() {
		this.paths = []
		return locaforage.setItem(this.lib, this.paths)
	}
}

export default new LibHistory()