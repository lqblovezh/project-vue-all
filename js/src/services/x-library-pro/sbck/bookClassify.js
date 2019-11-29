import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import { parsePageFromPHP, toPhpPage } from './pageUtil'

class BookClassify {
  async getTree (version = []) {
    const { data } = await request_get('/api/classify_home', {
      version,
    })
    const json = JSON.stringify(data || [])
    return JSON.parse(json, (key, value) => {
      if (value && value.book_name) {
        value.name = value.book_name
      }
      return value
    })
  }

  /*
   * async findChildren (pid) {
   *   return request_get('/api//classify/find_children', {
   *     pid,
   *   })
   * }
   */

  async findBooks (bookId, page = {}) {
    const result = await request_get('/api/home_book_relation', {
      ...toPhpPage(page),
      book_id: bookId,
    })
    result.data = result.data.map(({
      annotation,
      author_name,
      'can_yu_zhe_（_zhao_dai_）': author_1,
      can_yu_fang_shi: author_2,
      ...data
    }) => ({
          ...data,
          author_name: author_name  || author_1 || author_2
    }))
    return {
      data: result.data,
      page: parsePageFromPHP(result.page),
    }
  }

  async findClassifyBooks (bookId,version, page = {}) {
    let sendData 
    if(version == "'综合'" || version == "綜合"){
      sendData = {  
        ...toPhpPage(page),
        classify_id: bookId,
      }
    }else {
      sendData = {
        ...toPhpPage(page),
        classify_id: bookId,
        version
      }
    }

    const result = await request_get('/api/book_classify/children', sendData)
    result.data = result.data.map(({
      annotation,
      author_name,
      'can_yu_zhe_（_zhao_dai_）': author_1,
      author_name: author_2,
      ...data
    }) => ({
          ...data,
          author_name: author_name  || author_1 || author_2
    }))
    return {
      data: result.data,
      page: parsePageFromPHP(result.page),
    }
  }  
}

export default new BookClassify()

export function convertBookDetail ({
  id,
  abs,
  book_name,
  name,
  author_name,
  author,
  belong_to,
  edition,
  place,
  publisher,
  source,
  subject,
  version,
  years,
  root_classify,
  product_id,
  img_src,
  tag,
  annotation,
  is_join,
  is_read,
}) {
  return {
    img: img_src,
    name: book_name || name,
    author: author_name || author,
    version: edition,
    printOrder: version,
    owner: belong_to,
    inscribe: subject,
    collection: place,
    skoliast: annotation,
    printPeople: publisher,
    publishTime: years,
    source,
    abs,
    tags: tag,
    bookId: id,
    isRead: is_read,
    isJoin: is_join,
    product_id,
  }
}
