import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'
import { Book} from './Book.js'

class Book_sbck extends Book {
  /**
   * 书籍列表
   * @param {Object} data
   * @param {String} data.name 书籍名 和 作者名
   * @param {String} data.status
   */
  getList(data) {
    if (data.book_name) {
      data.name = data.book_name
    }
    if (data.status == '0') {
      data.status = false
    } else if (data.status == '1') {
      data.status = true
    }
    return request_get('/api/book/list', data).then(res => {
      const data = res.data.map(el => {
        return {
          id: el.id,
          img_src: el.img_src,
          book_name: el.book_name,
          status_type: el.status == 'true' ? '已上架' : '未上架',
          status: el.status == 'true' ? true : false,
          author: el.author_name,
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
   * 书籍上下架
   * @param {Object} data
   * @param {Array} data._ids
   * @param {String} data.status  'true', 'false'
   */
  online(data) {
    const obj = {}
    if (data.type == 'up') {
      obj.status = 'true'
    } else if (data.type == 'down') {
      obj.status = 'false'
    }
    obj._ids = data.id
    return request_post('/api/book/online', obj)
  }
  /**
   * 书籍详情  后台
   * @param {Object} data
   * @param {String} data._id
   */
  async detail({ id }) {
    let tag = null
    await this.book_tag({ book_id: id }).then(res => {
      tag = res.data.map(item => {
        return {
          tag: item,
        }
      })
    })
    return request_get('/api/book/info', { _id: id }).then(res => {
      const constitute = res.data.info.components.books
      return {
        data: {
          attributes: res.data.info.attributes,
          author: res.data.info.author,
          constitute,
          name: res.data.book_name,
          tag,
          abs: res.data.info.abs,
          img_src: res.data.img_src,
        },
      }
    })
  }
}

export default new Book_sbck()
