import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import { dateRules } from '../extend/schemas'

class Sort {
  /**
   * 分类树获取
   */
  getList() {
    return request_get('/api/category').then(res => {
      const info = res.data.map(el => {
        return {
          id: el.id,
          pid: 'root',
          children: el.children,
          name: el.name,
          create_time: el.create_time,
          level: '一级',
          state: el.state,
        }
      })
      return {
        data: info,
      }
    })
  }
  /**
   * 查找子分类(不包含孙级)
   * @param {Object} data
   * @param {String} data.pid
   */
  findChild(data) {
    return request_get('/api/classify/find_children', data)
  }
  /**
   * 添加书籍到分类下面
   * @param {Object} data
   * @param {String} data.classify_id 分类id
   * @param {String} data.book_ids 书籍id
   */
  book_classify_add(data) {
    const obj = {
      category_id: data.classify_id,
      rel_id: data.book_ids,
    }
    return request_post('/api/category/book', obj)
  }
  /**
   * 添加分类
   * @param {Object} data
   * @param {String} data.pid
   * @param {String} data.name
   * @param {String} data.mark  //备注
   * @param {string} data.state  'true','false'
   */
  add(data) {
    data.status = data.state
    return request_post('/api/category', data)
  }

  /**
   * 编辑分类
   * @param {Object} data
   * @param {String} data._id
   * @param {String} data.pid
   * @param {String} data.name
   * @param {String} data.mark
   * @param {String} data.state
   */
  edit(data) {
    data.status = data.state
    return request_put(`/api/category/${data._id}`, data)
  }
  /**
   * 获取分类下面的书籍
   * @param {Object} data
   * @param {String} data.classify_id
   */
  book_classify_list(data) {
    return request_get(`/api/category/${data.classify_id}`, data)
  }
  /**
   * 递归删除
   */
  del(data) {
    if (data.id) {
      data._id = data.id
    }
    return request_post('/api/category/delete', data)
  }
  /**
   * 删除分类和书籍的关联
   * @param {Object} data
   * @param {Array} data._ids
   * @param {String} data.id
   */
  book_classify_del(data) {
    return request_delete(`/api/category/rel/${data._ids[0]}`, data)
  }
  /**
   * 分类书籍上下移动
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.type Up Down 默认Up
   */
  updown(data) {
    data.book_id = data.rbook_id
    return request_put('/api/category/sort', data)
  }

  /**
   * 分类上传
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.type Up Down 默认Up
   */
  book_classify_upload(data) {
    data.temp = data.file
    return request_put('/api/category/import', data)
  }

  /**
   * 分类下载
   * @param {Object} data
   * @param {String} data.book_id
   * @param {String} data.type Up Down 默认Up
   */
  book_classify_download(data) {
    return request_get('/api/category/mould', data)
  }
}

export default new Sort()
