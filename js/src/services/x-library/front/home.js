import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let columns = pathToRegexp.compile('/api/home/columns/:id')
let bookCity = pathToRegexp.compile('/api/home/book_city/:id')
let category = pathToRegexp.compile('/api/home/category_book/:id')
let themeUrl = pathToRegexp.compile('/api/theme/:id/theme_info')
let tempUrl = pathToRegexp.compile('/api/columns/detail/:id')

/**
 * 前台banner
 * @param {Object} data
 */
export function bannerList(data = {}) {
  return request_get('/api/home/banners', data)
}

/**
 * 前台按钮
 * @param {Object} data
 */
export function buttonList(data = {}) {
  return request_get('/api/home/buttons', data)
}

/**
 * 前台套系列表
 * @param {Object} data
 */
export function homeSubjectList(data = {}) {
  return request_get('/api/data_subjects/home', data)
}

/**
 * 前台推荐
 * @param {Object} data
 */
export function recomList(data = {}) {
  return request_get('/api/home/recommends', data)
}

/**
 * 前台栏目
 * @param {Object} data
 */
export function getColumn(data = {}) {
  return request_get('/api/home/columns', data)
}

/**
 * 前台栏目更多
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.id - 必选
 */
export function columnList(data = {}) {
  // debugger
  if (data.type == 6 || data.type == 7) {
    return request_get(tempUrl(data)).then(res => {
      const { children } = res.data
      res.data = children
      return res
    })
  }
  return request_get(columns(data), data)
}

/**
 * 按钮听读列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.mediaType - 类别
 */
export function getUserDefinedPageData(data = {}) {
  // return request_get('/api/books/video_list',data)
  switch (data.type) {
    case 'audio':
      return request_get('/api/books/audio_list', data)
    case 'video':
      return request_get('/api/books/video_list', data)
    case 'kejian':
      return request_get('/api/course_ware/list', data)
  }
  // return request_get(columns(data),data)
}

/**
 * 前台书城列表（差包含数量）
 * @param {Object} data
 */
export function cityList(data = {}) {
  return request_get('/api/home/book_city', data)
}

/**
 * 首页书城子集分类
 * @param {Object} data
 * @param {String} data.id - 必选
 */
export function citycolumn(data = {}) {
  return request_get(bookCity(data), data)
}

/**
 * 首页书城分类下书列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.id - 必选
 */
export function categoryList(data = {}) {
  return request_get(category(data), data)
}

/**
 * 主题列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function themeList(data = {}) {
  return request_get('/api/theme_list', data)
}

/**
 * 主题详情
 * @param {Object} data
 * @param {String} data.id - 必选 主题id
 */
export function themeDetail(data = {}) {
  return request_get(themeUrl(data), data)
}

/**
 * 听读列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function audioList(data = {}) {
  return request_get('/api/books/audio_list', data)
}

/**
 * 听读列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function videoList(data = {}) {
  return request_get('/api/books/video_list', data)
}

/**
 *搜索
 */
export function search(data = {}) {
  if (__SUFFIX__ === 'jyz') {
    return request_get('/api/books/searchV2', data)
  } else {
    return request_get('/api/books/search', data)
  }
}
