import localforage from 'localforage'
import { convertNumber, caculateRouteBaseUrl } from './base'
export function go(path, query = {}) {
	this.$router.push({ path, query})
}

export function push(path, { ...args }) {
	this.$router.push({ path: caculateRouteBaseUrl(path), ...args})
}

export function back() {
	this.$libhistory.get().then(res => {
		typeof res === 'undefined' ? this.$router.go(-1) : this.$router.push({ path: res })
	}).catch(err => {
		console.log(err.toString())
		this.$router.go(-1)
	})
}

export function replaceWithPath(path, {...arg}) {
	this.$router.replace({ path: caculateRouteBaseUrl(path), ...arg })
}

export function replaceWithName(name, {...arg}) {
	this.$router.replace({ name, ...arg })
}

export function getWhichChapter(level, index) {
	const c = {
		0: '篇',
		1: '章',
		2: '节'
	}
	return `第${convertNumber(index)}${c[level]}`
}

/**
 * 获取书籍的access_code
 * 并进入阅读器
 * @param {String} id 默认id
 */
export async function read({ id, chapter_root, chapter_id } = {}) {
	try {
		const { data: { access_code, book_id, product_id }} = await this.$services.book.getAccessCode({ id })
		localforage.setItem('access_code', access_code).then(() => {
			this.$push('/reader', { query: { product_id, book_id, id, chapter_id, chapter_root }})
		})
	} catch (e) {
		this.$Toast({
			message: e.toString(),
			iconClass: 'icon-failed'
		})
	}
}

/**
 * 接收Error对象，并弹出错误
 * @param {Error} e
 */
export function catchError(e) {
	this.$Toast(e.payload && e.payload.message || e.message)
}
/**
 * 获取html字符串，提取文字内容
 * @param {String} text
 */
export function convertHtmlToStr(text) {
	if (text && !this.$isServer) {
		let ele = document.createElement('div'), res
		ele.innerHTML = text
		res = ele.innerText
		return res
	}
}
/**
 * 传入字符串和单词
 * 将给该文字设置一个包裹层
 * @param {String} str 需要添加高亮文字样式的字符串
 * @param {String} word 需要高亮的文字
 */
export function highlightWord(str, word) {
	if (typeof word === 'string') {
		let reg = new RegExp(word, 'g')
		str = str.replace(reg, `<span>${word}</span>`)
	}
	return str
}
