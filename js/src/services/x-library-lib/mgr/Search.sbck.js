import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'

class Search {
  /**
   * 获取浏览IP数量
   * @param {Object} data
   * @param {String} data.end_date
   * @param {String} data.start_date
   */
  async getScanInfo(data){
    data = await Joi.validate(data,dateRules)
    return request_get('/api/visit',data)
  }
  /**
   * 设置访问记录
   * @param {Object} data
   */
  async visitAdit(data){
    return request_get('/api/visit',data)
  }
  /**
   * 获取搜索设置
   * @param {Object} data
   * @param {String} data.type basics,senior,all  默认basics
   */
  async get_search_setting(data={}){
    if(data.type == 'all'){
      let basics,senior
      await request_get('/api/search_setting',{type:'basics'}).then(res => {
        basics = res.data
      })
      await request_get('/api/search_setting',{type:'senior'}).then(res => {
        senior = res.data
      })
      const arr1 = [],arr2 = []
      basics.forEach(el => {
        if(el.state=='true'){
          arr1.push(el.id)
        }
      })
      senior.forEach(el => {
        if(el.state=='true'){
          arr2.push(el.id)
        }
      })
      console.log({
        data:{
          searchList:basics,
          seniorList:senior,
          checkedSearch:arr1,
          checkedSenior:arr2,
        },
      })
      return {
        data:{
          searchList:basics,
          seniorList:senior,
          checkedSearch:arr1,
          checkedSenior:arr2,
        },
      }
    }
    return request_get('/api/search_setting',data)
  }
  /**
   * 编辑
   * @param {Object} data
   * @param {String} data._ids 数组
   * @param {String} data.state true  false  默认true
   */
  async edit_search_setting(data){
		data=[...data.checkedSearch,...data.checkedSenior ]
		return request_post('/api/search_setting', {
       _ids: data
    })
  }
  /**
   * 搜索记录-添加搜索记录
   * @param {Object} data
   * @param {String} data.keyword
   */
  add_search_record(data){
    return request_post('/api/search_record',data)
  }
  /**
   * 搜索统计
   * @param {Object} data
   * @param {String} data.order 'all', 'month', 'week', 'day'  默认all
   */
  statistics_search_record(data){
    return request_get('/api/search_record',data)
  }
  /**
   * 前台搜索提示接口
   * @param {Object} data
   * @param {String} data.keyword
   */
  search_tips(data){
    return request_get('/api/search_tips',data)
  }
  /**
   * 删除搜索关键字记录 （根据关键字删除）
   * @param {Object} data
   * @param {String} data.keyword
   */
  del_search_record(data){
    return request_post('/api/search_record/delete',data)
  }
}

export default new Search
