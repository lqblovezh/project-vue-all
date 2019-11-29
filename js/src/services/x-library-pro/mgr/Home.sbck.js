import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {payRules,createOrderRules,dateRules} from '../extend/schemas'

class Home { //后台主页相关数据
  /**
   * 后台首页搜索图
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  async search_statistics(data={}){

    await Joi.validate({start_date:data.start_date},dateRules)
    if(!data.end_date){
      delete data.end_date
    }
    return request_get('/api/home_page/search_statistics',data).then(res => {
			console.log(res,'xxx')
			return {
        'data':{
          'data_X':Object.keys(res.data.data),
					'data_Y':Object.values(res.data.data),
					'data_A':res.data.count, //全部搜索
        },
      }
    })
  }
  /**
   * 后台首页统计数据
   */
  home_data(data){
    return request_get('/api/home_page',data).then(res => {
      return {
        data:{
          statistics: [
            { type: 'book', name: '书籍总数', num: res.data.book_count },
            { type: 'user', name: '用户总数', num: res.data.user_count },
            { type: 'traffic', name: '今日访问量', num: res.data.visit_count },
          ],
          books: [
            { type: 'book', name: '已下架', num: res.data.book.down },
            { type: 'book', name: '已上架', num: res.data.book.up },
            { type: 'book', name: '全部书籍', num: res.data.book.all },
          ],
          overviews: [
            { type: 'user', name: '今日新增', num: res.data.user.day_rise},
            { type: 'user', name: '本月新增', num: res.data.user.mooth_rise },
            { type: 'user', name: '用户总数', num: res.data.user.all },
          ],
          entry: [
            { type: 'book', name: '书籍管理'},
            { type: 'user', name: '用户管理'},
            { type: 'statistics', name: '数据统计'},
            { type: 'comment', name: '评论审核'},
          ],
          seriverTime:res.data.date,
        },
      }
    })
  }

}

export default new Home
