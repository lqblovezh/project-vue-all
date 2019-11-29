import urlJoin from 'url-join'
import libhistory from './libhistory'
/**
 * 用于将数字转变成汉字
 * @TDOO 只支持100000以下的数字，需要拓展
 * @param {Number} num
 */
export function convertNumber(num) {
	if (typeof num !== 'number' || num !== num) {
    throw new Error('please enter a number type')
  }
  const a = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'], b = ['十', '百', '千', '万']
  let str = '', is_jump = -1
  while (num) {
    let num_len = (num + '').length, temp = parseInt(num / Math.pow(10, num_len - 1))
    if (is_jump !== -1 && is_jump !== (num_len + 1)) {
      str += a[0]
      is_jump = -1
    }
    is_jump = is_jump === -1 ? num_len : is_jump
    str += num_len > 1 ? `${a[temp]}${b[num_len-2]}` : a[num]
    num = num % Math.pow(10, num_len - 1)
  }
  return str
}

export function getRect(el) {
  if (el instanceof window.SVGElement) {
    let rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}


export function isEmptyObject(o) {
  for (let i in o) {
    return false
  }
  return true
}

export function isNumber(n) {
  if (typeof n === 'number' && n === n) {
    return true
  }
  return false
}
/**
 * 计算当前页面的基础路由路径
 */
export function caculateRouteBaseUrl(path) {
  return urlJoin(baseUrl, path)
}

export function pickDataRelationShip(obj) {
  let initData = { name: obj.name, category: 0, _id: obj.id },
    categories = [{ name: obj.name }],
    data = [initData],
    links = [],
    list = obj.children
  if (list && list.length) {
    for (let i = 0; i < list.length; i++) {
      categories.push({ name: list[i].name })
      let { def_data, def_links } = getDataRelationShip(list[i].children, list[i].name, i + 1)
      const { id, name } = list[i]
      data = [...data, { name, _id: id, category: i + 1 }, ...def_data]
      links = [...links, { source: initData.name, target: name }, ...def_links]
    }
    let obj = {}
    data = data.reduce((item, next) => {
      obj[next.name] ? '' : obj[next.name] = true && item.push(next)
      return item
    }, [])
  }
  return { categories, data, links}
}
/**
 *
 * @param {Array} list
 * @param {String} superName 上级名称
 * @param {Numer} flagType 分类类别
 */
function getDataRelationShip(list, superName, flagType) {
  let result = {
    def_data: [],
    def_links: []
  }
  if (list && list.length) {
    for (let item of list) {
      const { id, name } = item
      result.def_data.push({ name, _id: id, category: flagType })
      result.def_links.push({ source: superName, target: name })

      if (item.children) {
        const { data = [], links: [] } = pickDataRelationShip(item.children, item.name, flagType)
        result.def_data = [...result.def_data, ...data]
        result.def_links = [...result.def_links, ...links]
        item.children = []
      }
    }
  }
  return result
}

function formatDataOfKnowledge(list, subName, type) {
  let know_data = [], know_links = []
  if (list) {
    for (let {name, id} of list) {
      know_data.push({
        name, _id: id,
        category: type,
        symbolSize: 50,
        itemStyle: {
          color: 'lightblue'
        }
      })
      know_links.push({ source: subName, target: name })
    }
  }
  return {
    know_data,
    know_links
  }
}

export function formatDate(date) {
  date = new Date(date)
  let y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate()
  return `${y}-${m.toString().length == 2 ? m : '0' + m}-${d.toString().length == 2 ? d : '0' + d}`
}

export function recordRoutePath(to, from) {
  if (from.path !== '/'&& isNumber(to.meta.level) && isNumber(from.meta.level)) {
    if (to.meta.level > from.meta.level) {
      libhistory.add(from.fullPath)
    }
    if (to.meta.level === 1) {
      libhistory.clearAllPath()
    }
  }
}

/**
 * 获取数据的类型
 * @param {Any} data
 */
export function type(data) {
  return Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
}

export function isIos() {
  return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) && typeof cordova === 'function'
}

export function throttle(fn, wait) {
  let timer
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        timer = null
        fn.apply(this, arguments)
      }, wait)
    }
  }
}
