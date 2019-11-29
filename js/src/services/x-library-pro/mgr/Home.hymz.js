import { decorate } from 'core-decorators'
import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import { delRules, dateRules } from '../extend/schemas'
import Joi from 'joi'

class Home {
  //中户中心相关数据

  /**
   * 高级搜索
   * @param {Object} data
   * @param {String} data.x
   *
   */
  async search_advanced(data) {
    return request_post('/api/data_articles/search_advanced', data)
  }

  async search_statistics(data = {}) {
    await Joi.validate({ start_date: data.start_date }, dateRules)
    if (!data.end_date) {
      delete data.end_date
    }
    return request_get('/api/admin/hot_words/statistics', data).then(res => {
      return {
        data: {
          data_X: Object.keys(res.data.data),
          data_Y: Object.values(res.data.data),
          data_A: res.data.count, //全部搜索
        },
      }
    })
  }
  /**
   * 后台首页统计数据
   */
  home_data(data) {
    return request_get('/api/admin/statistics', data).then(res => {
      const { count, books, user, now_time } = res.data
      return {
        data: {
          statistics: [
            { type: 'book', name: '书籍总数', num: count.books.count },
            { type: 'user', name: '用户总数', num: count.user_count.count },
            {
              type: 'money',
              name: '今日销售额',
              num: count.today_sale.count,
            },
            {
              type: 'traffic',
              name: '今日访问量',
              num: count.visit_count.count,
            },
          ],
          books: [
            { type: 'book', name: '无版权', num: books.copy_right.count },
            { type: 'book', name: '未上架', num: books.pull.count },
            { type: 'book', name: '已上架', num: books.put.count },
            { type: 'book', name: '全部书籍', num: books.all.count },
          ],
          overviews: [
            { type: 'user', name: '今日新增', num: user.today_count.count },
            { type: 'user', name: '本月新增', num: user.month_count.count },
            { type: 'user', name: '昨日新增', num: user.yesterday_count.count },
            // { type: 'user', name: '用户总数', num: user.all.count },
          ],
          entry: [
            { type: 'book', name: '书籍管理' },
            { type: 'user', name: '用户管理' },
            { type: 'statistics', name: '数据统计' },
            { type: 'special', name: '专题管理' },
            { type: 'comment', name: '评论审核' },
          ],
          seriverTime: now_time,
        },
      }
    })
  }
}

export default new Home()
