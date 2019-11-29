import Vue from 'vue'
const isServer = Vue.prototype.$isServer
class Storage {
	/**
	 * 
	 * @param {String} storage_name 存储对象的键名
	 * @param {Number} len 存储数组的最大长度
	 */
	constructor(storage_name, len = 20) {
		this.storage_name = storage_name
		this.len = len
		this.data = []
		!isServer && this.init()
	}
	init() {
		let storage = localStorage.getItem(this.storage_name)
		if (!storage) {
			localStorage.setItem(this.storage_name, JSON.stringify(this.data))
		} else {
			this.data = JSON.parse(storage)
		}
	}
	add(k) {
		if (isServer) {
			return
		}
		this.data = JSON.parse(localStorage.getItem(this.storage_name)) || []
		const index = this.exist(k)
		typeof index === 'number' && this.data.splice(index, 1)
		this.data.unshift(k)
		if (this.data.length > this.len) {
			this.data.length = 10
		} 
		localStorage.setItem(this.storage_name, JSON.stringify(this.data))
	}
	exist(key) {
		if (this.data.length) {
			let idx = this.data.indexOf(key)
			return idx !== -1 ? idx : false
		}
		return false
	}
	remove() { }
	removeAll() {
		this.data = []
		localStorage.setItem(this.storage_name, JSON.stringify([]))
	}
}

export default new Storage('history_list', 10)