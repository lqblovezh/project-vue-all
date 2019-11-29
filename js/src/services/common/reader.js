import lang from 'lodash/lang'
import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

const { admin, type } = __PROJECT_INFO__
const suffix = type == 'publish' ? '/api' : '/common/api'

/**
 * 阅读器获取书籍信息
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function get_book({ bookId }, { extraParams }) {
  return request_post(suffix + '/reader/books', {
    book_id: bookId,
    ...extraParams,
  }).then(({ data }) => data)
}

/**
 * 阅读器-下级目录列表
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {String} chapterId - 章节id
 */
export function get_catalogs({ bookId, chapterId }, { extraParams }) {
  return request_post(suffix + '/reader/catalogs', {
    book_id: bookId,
    catalog_pid: chapterId,
    ...extraParams,
  }).then(({ data }) => data)
}
/**
 * 阅读器获取章节信息
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {Array} chapterIds - 章节ID
 */
export function get_chapters({ bookId, chapterIds }, { extraParams }) {
  return request_post(suffix + '/reader/chapters', {
    chapter_id: chapterIds,
    book_id: bookId,
    ...extraParams,
  }).then(({ data }) => data)
}

/**
 * 阅读器-搜索
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {String} keyword - 关键字
 * @param {String} page - 分页信息
 * @param {String} chapterRid - 章节ID 不空则搜索某章节中的
 * @param {String} pageStart
 * @param {String} pageOffset
 * @param {String} pageNum
 */
export function search({ keyword, bookId, page, chapterRid }, { extraParams }) {
  return request_post(suffix + '/reader/search', {
    keyword,
    book_id: bookId,
    chapter_id: chapterRid,
    pageStart: page.start,
    pageOffset: page.offset,
    ...extraParams,
  }).then(({ data, page }) => ({
    list: data,
    page,
  }))
}

/**
 * 阅读器-获取笔记
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function get_labels({ bookId }, { extraParams }) {
  return request_get('/api/book_notes', {
    book_id: bookId,
    user_id: extraParams.user_id,
  }).then(({ data }) => data)
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
  return request_post('/api/book_notes', {
    book_id: bookId,
    chapter_id: chapterRid,
    chapter_name: chapterName,
    chapter_value: selectedText,
    comm_text: userText,
    range: rangeJSON,
    protected: status,
    ...extraParams,
  }).then(({ data }) => data)
}
/**
 * 阅读器-获取书签
 * @return {Promise}
 * @param {String} bookId - 书id
 */
export function get_bookmarks({ bookId }, { extraParams }) {
  return request_get('/api/book_marks', {
    book_id: bookId,
    user_id: extraParams.user_id,
  }).then(({ data }) => data)
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
  { bookId, chapterRid, chapterName, rangeJSON, text },
  { extraParams }
) {
  return request_post('/api/book_marks', {
    book_id: bookId,
    chapter_id: chapterRid,
    chapter_name: chapterName,
    chapter_value: text,
    range: rangeJSON,
    ...extraParams,
  }).then(({ data }) => data)
}
/**
 * 阅读器-笔记和书签删除(映射remove_bookmarks和remove_labels)
 * @return {Promise}
 * @param {Array} ids - 书id
 */
export function remove_bookmarks(params, app) {
  remove_bl(params, app)
}
export function remove_labels(params, app) {
  remove_bl(params, app)
}
function remove_bl({ ids }, { extraParams }) {
  return request_post('/api/book_exegesis/delete', {
    id: ids,
    ...extraParams,
  }).then(({ data }) => data)
}

export function modify_label(data) {
  data.range = JSON.stringify(data.range)
  data.comm_text = data.userText
  delete data.userText
  return request_put('/api/book_notes', {
    ...data,
  }).then(({ data }) => data)
}

/**
 * 设置用户偏好设置
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {String} chapterRid - 章节id
 * @param {String} progressJSON
 */
export function backup_setting(data) {
  return request_post('/api/user_read_setting', {
    data: JSON.stringify(data),
  })
}

/**
 * 查询用户偏好设置
 * @return {Promise}
 */

export function restore_setting(data = {}) {
  return request_get('/api/user_read_setting').then(({ data }) =>{
    const json = lang.isArray(data) && data[0] || data
    return json ? JSON.parse(json) : {}
  })
}

/**
 * 新增用户阅读记录
 * @return {Promise}
 * @param {String} bookId - 书id
 * @param {String} chapterRid - 章节id
 * @param {String} progressJSON
 */
export function set_progress(
  { bookId, chapterRid, progressJSON, percentJSON },
  { extraParams }
) {
  return request_post('/api/read_record', {
    data: progressJSON,
    proportion: percentJSON,
    // data: '',
    release_id: extraParams.release_id,
    book_id: bookId,
  })
}

/**
 *查询阅读记录
 * @return {Promise}
 * @param {String} bookId -书id
 */
export function get_progress({ bookId }, { extraParams }) {
  return request_get('/api/read_record', {
    book_id: bookId,
    release_id: extraParams.release_id,
  }).then(({ data: [json] }) => json)
}
