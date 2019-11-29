import { extra, bookInfo, bookComment } from '../../sbck'
import { mockSuccess } from '../utils'
import { mock } from 'mockjs'

/**
 * 书籍详情访问
 *
 */
export async function bDetailVisit() {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
 * 获取书籍详情页
 */
export async function getBookDetails(bookId) {
  return bookInfo.getDetail(bookId)
}

/**
 * 获取相关书籍列表
 */
export async function getRelatBook(bookId) {
  return bookInfo.getRelativeBooks(bookId)
}

/**
 * 获取评论列表
 */
export async function getCommentList(bookId) {
  return bookComment.getBookComments(bookId)
}

/**
 * 添加评论
 */
export async function addComment (bookId,content){
   return  bookComment.addComment({
     bookId,
     content,
  })
}
