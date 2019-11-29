import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import Joi from 'joi'

import * as reader from '../common/reader'
import userInfo from './UserInfo'

async function set_progress(
  { bookId, chapterRid, progressJSON },
  { extraParams }
) {
  const user = await userInfo.getUserData()
  return request_post('/api/user_read_record', {
    user_id: user.id,
    book_id: extraParams.id,
    data: progressJSON,
    chapter: chapterRid,
  })
}

async function get_progress({ bookId }, { extraParams }) {
  const user = await userInfo.getUserData()
  const { data } = await request_get('/api/user_read_record', {
    book_id: extraParams.id,
    user_id: user.id,
  })
  return data.length > 0 ? data[0].data : null
}

/**
 * 阅读器-获取笔记
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function get_labels({ bookId }, { extraParams }) {
  return request_get('/api/home/mark', {
    type: 'mark',
    book_id: extraParams.id,
    user_id: extraParams.user_id,
  }).then(({ data }) => {
    return data.map(item => {
      return {
        id: item.id,
        update_time: item.update_time,
        book_id: item.book_id, //书籍ID
        chapter_id: item.chapter_id, //章节ID
        chapter_name: item.chapter_name, //章节名
        chapter_value: item.content, //预览文本
        comm_text: item.mark, //用户文本
        range: item.range, // 标引位置
      }
    })
  })
}

/**
 * 阅读器-添加笔记
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {String} chapterRid - 章节id
 * @param {String} chapterName - 章节名称
 * @param {String} userText - 标注内容
 * @param {String} rangeJSON - range
 * @param {String} selectedText - 选择内容
 * @param {String} status - 是否公开(这个项目可以不传)
 */
export function add_label(
  {
    bookId,
    chapterRid,
    chapterName,
    userText,
    rangeJSON,
    selectedText,
    status,
  },
  { extraParams }
) {
  return request_post('/api/home/mark', {
    type: 'mark',
    book_id: extraParams.id,
    chapter_id: chapterRid,
    chapter_name: chapterName,
    content: selectedText,
    mark: userText,
    range: rangeJSON,
    protected: status,
    ...extraParams,
  }).then(({ data: item }) => ({
    id: item.id,
    update_time: item.update_time,
    book_id: item.book_id, //书籍ID
    chapter_id: item.chapter_id, //章节ID
    chapter_name: item.chapter_name, //章节名
    chapter_value: item.content, //预览文本
    comm_text: item.mark, //用户文本
    range: item.range, // 标引位置
  }))
}

/**
 * 阅读器-删除笔记
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function remove_labels(params, app) {
  remove_bl(params, app)
}
function remove_bl({ ids }, { extraParams }) {
  return request_post('/api/home/quote/delete', {
    ids,
    ...extraParams,
  }).then(({ data }) => data)
}

/**
 * 阅读器-修改笔记
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function modify_label(
  {
    bookId,
    chapterRid,
    chapterName,
    userText,
    rangeJSON,
    selectedText,
    status,
    id,
  },
  { extraParams }
) {
  return request_post('/api/home/mark', {
    ...extraParams,
    book_id: extraParams.id,
    chapter_id: chapterRid,
    chapter_name: chapterName,
    content: selectedText,
    mark: userText,
    range: rangeJSON,
    protected: status,
    id,
  }).then(({ data: item }) => ({
    id: item.id,
    update_time: item.update_time,
    book_id: item.book_id, //书籍ID
    chapter_id: item.chapter_id, //章节ID
    chapter_name: item.chapter_name, //章节名
    chapter_value: item.content, //预览文本
    comm_text: item.mark, //用户文本
    range: item.range, // 标引位置
  }))
}

/**
 * 阅读器-获取书签
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function get_bookmarks(
  { bookId, chapterRid, chapterName, rangeJSON, text, id },
  { extraParams }
) {
  return request_get('/api/home/mark', {
    type: 'book_mark',
    book_id: extraParams.id,
  }).then(({ data }) => {
    return data.map(item => ({
      id: item.id,
      chapterId: item.chapter_id,
      range: item.range,
      chapterName: item.chapter_name,
      chapterValue: item.chapter_value,
      createTime: item.create_time,
    }))
  })
}

/**
 * 阅读器-添加书签
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {String} chapterRid - 章节id
 * @param {String} chapterName - 章节名称
 * @param {String} rangeJSON - range
 * @param {String} text - 添加书签的文字
 */
export function add_bookmark(
  { bookId, chapterRid, chapterName, rangeJSON, text, id },
  { extraParams }
) {
  return request_post('/api/home/mark', {
    ...extraParams,
    type: 'book_mark',
    book_id: extraParams.id,
    chapter_id: chapterRid,
    chapter_name: chapterName,
    chapter_value: text,
    range: rangeJSON,
  }).then(({ data: item }) => ({
    id,
    chapterId: chapterRid,
    range: rangeJSON,
    chapterName,
    chapterValue: item.chapter_value,
    createTime: item.create_time,
  }))
}
/**
 * 阅读器-笔记和书签删除(映射remove_bookmarks和remove_labels)
 * @return {Promise}
 * @param {Array} ids - 书id
 */
export function remove_bookmarks(params, app) {
  remove_bl(params, app)
}

export default {
  ...reader,
  set_progress,
  get_progress,
  get_labels,
  add_label,
  modify_label,
  remove_labels,
  get_bookmarks,
  add_bookmark,
  remove_bookmarks,
}
