import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'
import { dateRules } from '../extend/schemas'

class Banner {
  getList() {
    return request_get('/api/banners').then(res => {
      const data = res.data.map(el => {
        return {
          ...el,
          id: el.id,
          img_src: el.img_src,
          relation: el.book_name,
          create_time: el.create_time,
        }
      })
      return {
        data,
      }
    })
  }

  /**
   * 新增
   * @param {Object} data
   * @param {String} data.banner
   * @param {String} data.src
   * @param {String} data.book_id
   */

  save(data) {
    // 只能关联一本书籍
    const obj = {
      ...data,
      banner: data.img_src,
      src: data.img,
      book_id: data.relation[0] && data.relation[0].id,
      name: data.name,
    }
    if (data.id) {
      return request_put(`/api/banners/${data.id}`, obj)
    }
    return request_post('/api/banners', obj)
  }
  /**
   * 详情
   * @param { Object } data
   * @param { String } data.id
   */
  detail(data) {
    return request_get(`/api/banners/${data.id}`).then(res => {
      res.data.relation = res.data.book_info ? [res.data.book_info] : []
      return res
    })
  }
  del(data) {
    return request_post('/api/banners/delete', data)
  }
  dels(data) {
    const id = data[0].id
    return request_post(`/api/banner/book/${id}`)
  }
  /**
   * 排序
   * @param { Object } data
   * @param { String } data.status  up或者down
   */
  sort(data) {
    return request_put(`/api/banners/sort/${data.id}`, {
      status: data.sort,
    })
  }
}

export default new Banner()
