import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Sort from './Sort'

class Book_hymz {
  /**
   * 导读列表
   * @param {Object} data
   * @param {String} data.name 导读名 和 作者名
   * @param {String} data.status
   */
  getList(data) {
    if (data.book_name) {
      data.name = data.book_name
    }
    return request_get('/api/guided_audio', data).then(res => {
      const data = res.data.map(el => {
        return {
          ...el,
          id: el.id,
          img_src: el.books_info.img_src,
          book_name: el.books_info.name,
          status_type: el.status_name,
          status: el.status,
          author: el.books_info.author,
          create_time: el.books_info.create_time,
        }
      })
      return {
        data,
        page: res.page,
      }
    })
  }

  /**
   * 导读上下架
   * @param {Object} data
   * @param {Array} data._ids
   * @param {String} data.status  'true', 'false'
   */
  online(data) {
    if (!Array.isArray(data.id)) {
      data.id = [data.id]
    }
    if (data.type == 'up') {
      return request_put('/api/guided_audio/put', {
        id: data.id,
      })
    }
    return request_put('/api/guided_audio/pull', {
      id: data.id,
    })
  }
  /**
   * 导读详情  后台
   * @param {Object} data
   * @param {String} data._id
   */
  async detail({ id }) {
    return request_get(`/api/guided_audio/${id}`).then(({ data }) => {
      const constitute = data.constitutes
      return {
        data: {
          constitute,
          player: data.player,
          name: data.name,
          abs: data.abs,
          img_src: data.img_src,
        },
      }
    })
  }

  /**
   * 导读设置详情
   * @param {Object} data
   * @param {String} data._id
   */
  async putInfo({ id }) {
    let { data: classify } = await Sort.getList()
    return request_get(`/api/guided_audio/set/${id}`).then(({ data }) => {
      return {
        ...data,
        classify,
      }
    })
  }
  /**
   * 导读设置保存
   * @param {Object} data
   * @param {String} data._id
   */
  async putSave({ id, ...data }) {
    return request_put(`/api/guided_audio/update_set/${id}`, data)
  }

  /**
   * 导读删除
   * @param {Object} data
   * @param {Array} data.id
   */
  async del(data) {
    return request_post('/api/guided_audio/delete', data)
  }
}

export default new Book_hymz()
