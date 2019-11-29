import { mock } from 'mockjs'
import Strategy from '../../mgr/Strategy'
/**
 * 获取等级价格列表
 * @param {Object} data
 * @param {String} data.name - 选填字段 等级价格名称
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Strategy.getList({
    rule_id: data.pid,
  }).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        time: el.day,
        price: el.price,
        name: el.name,
        abs: el.remarks,
        create_time: el.create_time,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 删除等级价格
 * @param {Array} data.id - 必有 等级价格id
 */
export async function del(data) {
  return Strategy.del({ id: data.id[0] })
}

/**
 * 获取等级价格详情
 * @param {String} data.id - 必有 等级价格id
 */
export async function detail(data) {
  return Strategy.detail(data).then(res => {
    const obj = res.data
    return {
      data: {
        id: obj.id,
        time: obj.day,
        name: obj.name,
        price: obj.price,
        abs: obj.remarks,
      },
    }
  })
}
/**
 * 等级价格保存
 * @param {String} data.id - 必有 等级价格id
 */
export async function save(data) {
  const obj = {
    name: data.name,
    day: data.time,
    price: data.price,
    remarks: data.abs,
    rule_id: data.pid,
    id: data.id,
  }
  return Strategy.save(obj)
}
