import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Ji from 'joi'

import { parsePageFromPHP, toPhpPage } from './pageUtil'
import { convertBookDetail } from './bookClassify'

class Search {
  async normalSearch({
    type,
    keyword,
  }, page) {
    // request_get('/api/search_record', {
      // keyword,
    // })
    const result = await request_get('/api/book/search', {
      ...toPhpPage(page),
      keys: keyword,
      version: type,
    })
    return {
      data: (result.data || []).map(convertBookDetail),
      page: parsePageFromPHP(result.page),
    }
  }
  async advancedSearch ({
    bookName,
    author,
    version,
    collection,
    inscribe,
    owner,
    printOrder,
    publishTime,
    chapter,
    title,
    types,
  }, page) {
    const result = await request_get('/api/book/senior_search', {
      ...toPhpPage(page),
      name: bookName,
      author,
      edition: version,
      place: collection,
      subject: inscribe,
      belong_to: owner,
      version: printOrder,
      years: publishTime,
      root_classify: types,
    })
    return {
      data: (result.data || []).map(convertBookDetail),
      page: parsePageFromPHP(result.page),
    }
  }
  getRecords (){
    return request_get('/api/search_record')
  }
  delRecord (keywords) {
    let promise = Promise.resolve()
    keywords.forEach(keyword => {
      promise = promise.then(() => request_post('/api/search_record/delete', {
        keyword,
      }))
    })
    return promise
  }
  async getHotWords (params) {
    const {data, page} = await request_get('/api/hot_word', {
        ...toPhpPage(params)
      })
    return {
      data,
      page: parsePageFromPHP(page)
    }
  }
}

export default new Search()
