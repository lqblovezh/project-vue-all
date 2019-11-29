export function isEmptyObject(o) {
  for (let i in o) {
    return false
  }
  return true
}

/**
 * 获取一个随机数字
 * @param {Number} max 最大数
 * @param {Number} min 最小数
 * @param {Number} decimal 小数位数
 */
function random(max, min = 0, decimal = 2) {
  return Number((Math.random()*max + min).toFixed(decimal))
}

/**
 * 处理PC首页散点图的数据
 * @param {Array} list
 */
export function formatScatterData(list) {
  let result = []
  for (let item of list) {
    const {
      id,
      name
    } = item
    let random_opacity = random(1, 0, 1)
    result.push({
      id,
      name,
      value: [random(900), random(300)],
      itemStyle: {
        opacity: random_opacity > 0.5 ? random_opacity : 0.5
      }
    })
  }
  return result
}

export function pickDataRelationShip(obj) {
  if(obj) {
    let initData = { name: obj.name, category: 0, _id: obj.id },
      categories = [{ name: obj.name }],
      data = [initData],
      links = [],
      list = obj.children
    if (list && list.length) {
      for (let i = 0; i < list.length; i++) {
        categories.push({ name: list[i].name })
        let { def_data, def_links } = getDataRelationShip(list[i].children, list[i].name, i + 1)
        let { know_data = [], know_links = [] } = formatDataOfKnowledge(list[i].knowledge, list[i].name, i + 1)
        const { id, name } = list[i]
        data = [...data, { name, _id: id, category: i + 1 }, ...def_data, ...know_data]
        links = [...links, { source: initData.name, target: name }, ...def_links, ...know_links]
      }
      let obj = {}
      data = data.reduce((item, next) => {
        obj[next.name] ? '' : obj[next.name] = true && item.push(next)
        return item
      }, [])
    }
    return { categories, data, links}
  }
  return {categories:[], data:[], links:[]}
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
  if (list) {
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

      if (item.knowledge && item.knowledge.length) {
        const {
          know_data = [],
          know_links = []
        } = formatDataOfKnowledge(item.knowledge)
        result.def_data = [...result.def_data, ...know_data]
        result.def_links = [...result.def_links, ...know_links]
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

/**
 * 将对象转为路由查询的字符串
 * @param {Object} queries
 * @return {String} str
 * -------------
 * @example
 * queries { id: 123, num: 123}
 * str "?id=123&num=123"
 */
export function convertQueriesToStr(queries) {
  let str = '?'
  for (let key in queries) {
    if (queries[key]) {
      str += `&${key}=${queries[key]}`
    }
  }
  return str.replace('&', '?')
}

/**
 * 获取数据的类型
 * @param {Any} data
 */
export function type(data) {
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase()
}
