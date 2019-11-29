import {request_post,request_get,request_put,request_delete} from 'services/common/request'

import { Statistics } from './Statistics.js'

class Statistics_sbck  extends  Statistics {
    constructor() {
      super()
    }
    searchList(data){
      return request_get('/api/search_record',data)
    }
    bookList(data) {
      return request_get('/api/book/statistics_list',data)
    }
}


export default new Statistics_sbck
