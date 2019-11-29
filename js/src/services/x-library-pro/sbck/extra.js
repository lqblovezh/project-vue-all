import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'

import { resTypes } from './dict'
import { convertBookInfo } from './bookInfo'

class Extra {
  async getTopHot() {
    const {data} = await request_get('/api/hot_resources', {
      top: 2,
    })
    const group1 = resTypes.map(type => data[type][0])
    const group2 = resTypes.map(type => data[type][1])
      .sort((a, b) => a.total > b.total ? -1 : 1)
    return group1.concat(group2).filter(i => !!i).slice(0, 6).map(convertBookInfo)
  }

  async getHotResources (types) {
    return request_get('/api/hot_resources/more', {
      type: types,
    })
  }

  async getHelpInfo () {
    return request_get('/api/help')
  }
  /**
	 * content
	 */
  async setHelpInfo(data){
    return request_post('/api/help',data)
  }
  /**
   * 书籍分享
   */
  async bookShare(bookId) {
    return request_put('/api/home/book_info_share',{
      book_id: bookId
    })
  }

  async evaluVisit(){
    request_post("/api/visit")
  }

}

export default new Extra()
