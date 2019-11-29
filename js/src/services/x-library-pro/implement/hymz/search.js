import { mock, Random } from 'mockjs'
import Search from 'services/x-library-pro/hymz/Search'
import { request_get, request_post } from '../../../common/request'
/**
 * 一般搜索
 * @param  {Object} data [description]
 * @param  {String} data.keyword 搜索的关键字
 * @param  {String} data.type
 */
export async function querySearchResultList(data = {}) {
  return Search.get_info(data).then(res => {
    const data = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        type: el.type,
        content: el.text || el.abs,
        name: el.name,
        picture: el.img_src,
        product_id: el.product_id,
        index: el.index,
        chapter_id: el.chapter_id,
        book_id: el.book_id,
        chapter_name: el.chapter_name,
        knowledge_name: el.knowledge_name,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
/**
 * 一般搜索返回页码总量
 * @param  {Object} data [description]
 * @param  {String} data.keyword 搜索的关键字
 * @param  {String} data.type
 */
export async function querySearchResultPage(data = {}) {
  return request_get('/api/home/search_count', data)
}
/**
 * 高级搜索返回页码总量
 * @param  {Object} data [description]
 * @param  {String} data.keyword 搜索的关键字
 * @param  {String} data.type
 */
export async function querySearchAdvResultPage(data = {}) {
  return request_get('/api/home/advanced_search_count', data)
}
/**
 * 查询搜索的类型
 * @param {Object} data
 */
export async function querySearchType(data = {}) {
  let qrcodeUrl = ''
  await request_get('/api/setting', {
    key: 'code_src',
  }).then(res => {
    qrcodeUrl = res.data.value_src
  })
  return Search.getKeyWord(data).then(res => {
    const data = res.data.map(el => {
      return {
        type: el.keyword_name,
        value: el.keyword,
      }
    })
    return {
      data,
      qrcodeUrl: qrcodeUrl || `${staticUrl}images/qrcodeUrl.png`,
    }
  })
}
/**
 * 高级搜索
 * @param  {Object} data [description]
 * @return {[type]}     [description]
 */
export async function querySearchAdvResultList(data = {}) {
  return Search.advanced_search(data).then(res => {
    const data = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        type: el.type,
        content: el.text || el.abs,
        name: el.name,
        picture: el.img_src,
        source: el.source,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
