import { request_get, request_post } from '../../common/request'

class Book {
  /**
   * 书房书籍列表
   * @param {Object} data
   */
  getList(data) {
    //window.localStorage.setItem('token','8ddd004e77b149e19266bf4fccb84854')
    return request_get('/api/bookshelf/books', data)
  }
  /**
   * 获取图书详情
   */
  detail(data) {
    return request_get(`/api/books/${data.id}/home_info`, data)
  }
  /**
   * 获取相关数据
   * @param {Object} data
   * @param {String} data.book_id
   */
  aboutBook(data) {
    return request_get('/api/home/recommends', data)
  }
  /**
   * 获取图书章节
   * id
   */
  getCatalog(data = {}) {
    data.type = '电子书'
    return request_get('/api/books/get_content', data).then(res => {
      this.access_code = res.data.books.access_code
      return res
    })
  }
  /**
   * 获取access_code
   */
  getAccessCode(data = {}) {
    data.type = '电子书'
    return request_get('/api/books/get_content', data).then(res => {
      return {
        data: {
          access_code: res.data.books.access_code,
          product_id: res.data.books.product_id,
          book_id: res.data.books.book_id,
          copyright: res.data.books.copyright,
        },
      }
    })
  }
  /**
   * 获取阅读记录
   * @param {} data
   */
  read_history(data) {
    return request_get('/api/user_read_record', data)
  }
  /**
   * 删除阅读历史
   * @param {Object} data
   * @param {Array} data.id
   */
  read_list_del(data) {
    return request_post('/api/user_read_record/delete', data)
  }
  /**
   * 加入书房
   * @param {Object} data
   * @param {String} data.book_id - 必选 书籍id
   * @param {String} data.type - 类型(1 听读   2 视读  3电子书　6主题)
   */
  bookShelfAdd(data = {}) {
    return request_post('/api/bookshelf/books', data)
  }

  /**
   * 删除[批量]书房书籍
   * @param {Object} data
   * @param {Array} data.id - 必选 书籍id
   */
  bookShelfDel(data = {}) {
    if (!Array.isArray(data.id)) {
      data.id = [data.id]
    }
    if (!data.book_shelf_id) {
      delete data.book_shelf_id
    }
    if (data.book_shelf_id && !Array.isArray(data.book_shelf_id)) {
      data.book_shelf_id = [data.book_shelf_id]
    }
    return request_post('/api/bookshelf/delete', data)
  }
  /**
   * 获取阅读记录
   */
  read_list() {
    return request_get('/api/read_list')
  }
}

export default new Book()
