import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'

import { parsePageFromPHP, toPhpPage } from './pageUtil'
import userInfo from '../UserInfo'

class ReadRecord {
  async query(page) {
    const {id} = await userInfo.getUserData()
    const result = await request_get('/api/user_read_record', {
      ...toPhpPage(page),
      user_id: id,
    })
    console.log('result')
    console.log(result)
    return {
      data: (result.data || []).map(({
        book_id,
        book_name,
        author_name,
        data,
      }) => ({
        book_id,
        bookName: book_name,
        author: author_name,
        progress: JSON.parse(data)._latest,
      })),
      page: parsePageFromPHP(result.page),
    }
  }


  remove (ids) {
    return request_post('/api/user_read_record/delete', {
      _ids: ids
    })
  }
}

export default new ReadRecord()
