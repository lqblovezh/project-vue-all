import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'

class BookComment{
  async getMyComments () {
    return request_get('/api/book_comment/user_self')
  }

  async getBookComments (bookId) {
    const { data } = await request_get('/api/book_comment/list', {
      book_id: bookId,
    })
    return data.map(convertComment)
  }

  async addComment ({
    bookId,
    content,
  }) {
    return request_post('/api/book_comment/add', {
      book_id: bookId,
      content,
    })
  }
}

export default new BookComment()

function convertComment ({
  id,
  content,
  picture,
  user_name,
  user_id,
  create_time,
  update_time,
}) {
  return {
    id,
    nick_name: user_name,
    text: content,
    image: picture,
    create_time,
  }
}
