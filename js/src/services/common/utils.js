import qs from 'qs'

export const isBrowser = global.sessionStorage ? true : false

//缓存数据
export function cache (run){
	let propName 
	return (...args) => {
		propName = '_' + run.name+ qs.stringify(args) // 保存不同变量的数据
		if (!this[propName]) {
			this[propName] = run.apply(this,args)
		}
		return this[propName]
	}
}