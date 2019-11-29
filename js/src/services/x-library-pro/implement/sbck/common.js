import { bookShelf, extra } from '../../sbck'
import {mockSuccess} from '../utils'
import {mock} from 'mockjs'
import { request_get } from 'services/common/request'
/**
 * 加入书房
 */

export async function addMyBook(params){
  return bookShelf.add({
    bookId: params
  })
}

/**
 * 移出书房
 */

export async function removeFromBookShelf(...ids){
  console.log(ids)
  return bookShelf.del(ids)
}

/**
 * 分享 （有用）
 */

export async function share(bookId){
  return extra.bookShare(bookId)
}


/**
 * 用户协议
 */

export async function getUserProtocol() {
  return request_get('/api/setting', {
    key: 'agreement',
  }).then(res => res)
}