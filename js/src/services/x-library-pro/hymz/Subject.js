import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import { dateRules } from '../extend/schemas'

class Subject {
  /**
   * 专题列表
   * @param {Object} data
   * @param {String} data.name
   * @param {String} data.color
   */
  getList(data) {
    return request_get('/api/home/theme', data).then(res => {
      const data = res.data.map(el => {
        return {
          id: el.id,
          picture: el.img_src,
          name: el.name,
          content: el.preview,
          abs: el.abs,
        }
      })
      return {
        data,
        page: res.page,
      }
    })
  }
  /**
   * 专题详情
   */
  detail(data) {
    return request_get(`/api/home/theme/${data.id}`, data).then(res => {
      const list = res.data.info.constitute.map(el => {
        return {
          id: el.book_id,
          picture: el.img_src,
          bookname: el.book_name,
          author: el.author,
          abs: el.abs,
        }
      })
      const other = res.data.other_list.map(el => {
        return {
          id: el.id,
          picture: el.img_src,
          bookname: el.name,
          author: el.author,
          abs: el.abs,
        }
      })
      return {
        data: {
          id: res.data.id,
          title: res.data.info.name,
          create_time: res.data.info.create_time,
          content: res.data.info.preview,
          list,
          other,
        },
      }
    })
  }
}

export default new Subject()
