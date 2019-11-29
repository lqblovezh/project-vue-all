import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import { parsePageFromPHP, toPhpPage } from './pageUtil'
import { convertBookDetail } from './bookClassify'

class Evaluation{
  async getList (page) {
    let resData= await request_get('/api/book_comment/user_self', page)
    let data = resData.data.map(({
      id,
      book_name,
      state,
      content,
      create_time
    }) => ({
        id,
        book_name,
        evaluTime: create_time,
        evaluContent: content,
        status: parseStatus(state)
    }))
    return {
      ...resData,
      data
    }
  }

  async del (ids) {
    return request_post('/api/book_comment/delete', {
      _ids: ids,
    })
  }
}

export default new Evaluation()

function parseStatus(status){
   switch(status){
     case "success":
       return "审核通过";
      case "fail":
        return "审核失败";
      default:
        return "正在审核";
   }
}