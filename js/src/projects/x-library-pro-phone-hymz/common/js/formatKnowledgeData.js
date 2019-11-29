import {
  type
} from './base'
/**
 * 根据depth层级将数据分层多个数组
 */
function classifyByDepth(list) {
  // 数据是数组类型，且长度大于0
  if (type(list) === 'array' && list.length) {
    const tempObj = {}
    for (let {
        from,
        to,
        depth
      } of list) {
      if (!tempObj[depth]) {
        tempObj[depth] = []
      }
      tempObj[depth].push({
        from,
        to
      })
    }
    return tempObj
  }
}

function getClassifyOfData(list, item) {
  return list.find(i => i.name === item.name)
}

function iteratorToData(obj) {
  if (obj) {
    const data = [],
      links = []
    for (const key in obj) {
      // 初始化第一层节点数据的颜色
      if (parseInt(key) === 0) {
        let color = 0
        for (const {
            from
          } of obj[key]) {
          data.push({
            ...from,
            x: null,
            y: null,
            category: color++,
            draggable: true,
          })
        }
      }
      for (const {
          from,
          to
        } of obj[key]) {
        let clone_from = getClassifyOfData(data, from)
        for (const item of to) {
          // 在暂存数组中未找到当前数据的情况
          if (!getClassifyOfData(data, item)) {
            data.push({
              ...item,
              draggable: true,
              x: null,
              y: null,
              category: clone_from.category
            })
          }
          links.push({
            source: from.name,
            target: item.name
          })
        }
      }
    }
    return {
      data,
      links
    }
  }
}

export default function (knowledge) {
  if (knowledge) {
    const {
      graph,
      keywords: categories
    } = knowledge
    const {
      data,
      links
    } = iteratorToData(classifyByDepth(graph))
    return {
      categories,
      data,
      links
    }
  }
}
