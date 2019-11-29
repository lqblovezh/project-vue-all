import { mock, Random } from 'mockjs'
import { request_get } from '../../../common/request'
import Sort from 'services/x-library-pro/hymz/Sort'

/**
 * 获取国家列表
 * @return {[type]} [description]
 */
export async function queryCountries() {
  return Sort.queryCountries().then(res => {
    const data = res.data.map(el => {
      return {
        id:el.id,
        label:el.name,
      }
    })
    return {
      data,
      page:res.page,
    }
  })
}

/**
 * 获取分类列表
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export async function queryCategoryList(data = {}) {
  return Sort.getList(data)
}

/**
 * 获取分类列表
 * @param  {Object} data [description]
 * @return {[type]}      [description]
 */
export async function getIndexTableList(data = {}) {
  return request_get('/api/home/indexes', data)
}

