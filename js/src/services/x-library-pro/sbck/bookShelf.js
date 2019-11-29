import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import { parsePageFromPHP, toPhpPage } from './pageUtil'
import { convertBookDetail } from './bookClassify'

class BookShelf{
  async getList (page) {
    let resData= await request_get('/api/bookshelf/books', toPhpPage(page))
    let  data = resData.data.map(parseList)
    page = parsePageFromPHP(resData.page)
    return {
      ...resData,
      data,
      page
    }
  }

  async add ({bookId}) {
    return request_post('/api/bookshelf/books', {
      book_id: bookId,
      type: 3
    })
  }

  async del (ids) {
    return request_post('/api/bookshelf/delete', {
      book_id: ids[0],
    })
  }
}

export default new BookShelf()

function parseList({
  author,
  create_time,
  name,
  read_record_data,
  book_id
}) {
  let parse_read_record_data = read_record_data && JSON.parse(read_record_data) 
  return {
    bookName:name,
    author: author,
    create_time,
    progress: parse_read_record_data && parse_read_record_data._latest && parse_read_record_data._latest.chapterId || null,     //待定
    book_id,
  }
}