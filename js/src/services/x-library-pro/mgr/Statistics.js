import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
export class Statistics {
  bookList(data) {
    return request_get('/api/books/statistics', data)
  }
  orderList(data) {
    return request_get('/api/order/statistics', data)
  }
  userList(data) {
    return request_get('/api/user_increase', data)
  }
  readList(data) {
    return request_get('/api/read_record/statistics', data)
  }
  searchList(data) {
    return request_get('/api/books/hot_words/statistics', data)
  }
  /**
   * 综合统计
   */
  getAllDate(data) {
    if (!data.end_date || !data.start_date) {
      data = {}
    }
    return request_get('/api/order/summary_statistics', data)
  }
}

export default new Statistics()
