import { request_get, request_post } from '../../common/request'

class UserCenter {
  /**
   * 查看引用记录
   */
  recordList(data = {}) {
    return request_get('/api/home/user_center/quote', data)
  }
  /**
   * 我的批注
   */
  annotList(data = {}) {
    return request_get('/api/home/mark', data)
  }
  /**
   * 新增引用
   */
  add(data) {
    return request_post('/api/home/quote', data)
  }
  /**
   * 添加批注
   */
  addMark(data) {
    return request_get('/api/home/mark', data)
  }

  /**
   * 批量删除批注或者引用
   * @param {Object} data
   * @param {Array} data.ids id数组
   * @param {String} data.type quote 引用 mark 批注
   */
  delMark(data) {
    return request_post('/api/home/quote/delete', data)
  }
  /**
   * 我的评论
   */
  assessList(data = {}) {
    return request_get('/api/book_comment/user_self', data)
  }

  /**
   * 批量删除评论【已使用】
   * @param {Object} data
   * @param {Array} data._ids 需要删除的id数组
   */
  commentDel(data = {}) {
    return request_post('/api/book_comment/delete', data)
  }

  /**
   * 用户中心所有详情
   */
  detail() {}
  /**
   * 用户中心所有删除
   */
  del(data) {
    console.log(data)
    switch (data.type) {
      case 'read':
        return request_post('/api/user_read_record/delete', { _ids: [data.id] })
      case 'bookRoom':
        return request_post('/api/bookshelf/delete', { id: [data.id] })
      case 'record':
        return request_post('/api/home/quote/delete', {
          ids: [data.id],
          type: 'quote',
        })
      case 'annot':
        return request_post('/api/home/quote/delete', {
          ids: [data.id],
          type: 'mark',
        })
      case 'assess':
        return request_post('/api/book_comment/delete', { _ids: [data.id] })
    }
  }
  /**
   * 用户订单
   */
  order(data) {
    return request_get('/api/order/front', data)
  }
  /**
   * 前台获取用户等级
   */
  home_list() {
    return request_get('/api/rule/home_list')
  }

  /**
   * 前台获取用户等级
   */
  copy_record(data) {
    return request_post('/api/home/copy_record', data)
  }

  /**
   * 复制统计-用户阅读
   */
  copyStatistics() {
    return request_get('/api/home/copy_record_count')
  }

  /**
   * 引用统计-用户阅读
   */
  quoteStatistics() {
    return request_get('/api/home/quote_count')
  }
}

export default new UserCenter()
