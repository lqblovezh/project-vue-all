
//缓存数据
export function cache (run){
  const propName = `_${run.name}`
  return (...args) => {
    if (!this[propName]) {
			this[propName] = run.apply(this,args)
    }
    return this[propName]
  }
}


