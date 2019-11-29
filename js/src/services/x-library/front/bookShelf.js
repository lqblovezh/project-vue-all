import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let bookInfo = pathToRegexp.compile('/api/books/:id/XSearch')
let infoUrl = pathToRegexp.compile('/api/books/:id/home_info')
let category = pathToRegexp.compile('/api/home/category_book/:id')

/**
 * 获取书房信息
 * @param {Object} data
 * @param {String} data.type - 选填 类型(1 听读   2 视读  3电子书　6主题)  
 * @param {String} data.is_pay - 选填 是否购买(0,1)
 */
export function getList(data={}){
  return request_get('/api/bookshelf/books',data)
}

/**
 * 加入书房
 * @param {Object} data
 * @param {String} data.book_id - 必选 书籍id
 * @param {String} data.type - 类型(1 听读   2 视读  3电子书　6主题)  
 */
export function add(data={}){
  return request_post('/api/bookshelf/books',data)
}

/**
 * 删除[批量]书房书籍
 * @param {Object} data
 * @param {String} data.id - 必选 书籍id
 */
export function del(data={}){
  return request_post('/api/bookshelf/delete',data)
}
