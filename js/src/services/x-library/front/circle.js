import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let circleUrl = pathToRegexp.compile('/api/home/book_circles_comments/:id')
let commentUrl = pathToRegexp.compile(
  '/api/home/book_circles_info_comments/:id'
)
let detailUrl = pathToRegexp.compile('/api/home/book_circles/:id')

const { admin, type } = __PROJECT_INFO__
const suffix = admin ? '/api' : '/api/home'

/**
 * 书圈列表
 * @param {Object} data
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.start_time - 开始时间 选填
 * @param {String} data.end_time - 结束时间 选填
 * @param {String} data.status - 状态(1未使用 2本周 3往期) 选填
 * @param {String} data.name - 名称
 * @param {String} data.book_name - 书名
 * @param {String} data.author - 作者
 */
export function getList(data = {}) {
  console.log(data)
  return request_get(suffix + '/book_circles', data)
}

/**
 * 获取主题列表
 * @param {Object} data
 * @param {String} data.id - 书圈id
 * @param {String} data.essence_type - false  是否精华   true
 * @param {String} data.theme - true只看主题  专家。作者等
 */
export function comments(data = {}) {
  return request_get(circleUrl(data), {
    // essence_type: false,
    // theme: true,
    type: 1, // data有的话, 会覆盖
    ...data,
  })
}
/**
 * 书圈详情
 * @param {Object} data
 * @param {String} data.id - 书圈id
 * @param {String} data.essence_type - false  是否精华   true
 * @param {String} data.theme - true只看主题  专家。作者等
 */
export function detail(data = {}) {
  return request_get(detailUrl(data), data)
}

/**
 * 书圈立即加入
 * @param {Object} data
 * @param {String} data.id - 必有字段 书圈id
 */
export function join(data = {}) {
  return request_post('/api/home/book_circles', data)
}
/**
 * 书圈立即退出
 * @param {Object} data
 * @param {Array} data.id - 必有字段 书圈id
 */
export function circleOut(data = {}) {
  return request_post('/api/home/book_circles_comments_user/delete', data)
}

/**
 * 书圈添加主题/评论
 * @param {Object} data
 * @param {String} data.book_circle_id - 必有字段 书圈的id  评论。主题id
 * @param {Array} data.img - 必有字段 图片数组
 * @param {String} data.value - 必有字段 文字信息
 * @param {String} data.type - 必有字段 主题1，评论2
 */
export function add(data = {}) {
  return request_post('/api/home/book_circles_comments', data)
}

/**
 * 书圈中主题下评论详情, 评论的列表
 * @param {Object} data
 * @param {String} data.id - 必有字段 主题id
 */
export function commentDetail(data = {}) {
  return request_get(commentUrl(data), data)
}

/**
 * 书圈中筛选分组列表
 * @param {Object} data
 */
export function screen(data = {}) {
  return request_get('/api/home/book_circles_Grouping_comments', data)
}

/**
 * 书圈中详情主题或者评论点赞
 * @param {Object} data
 * @param {String} data.id - 必有字段 主题id或者评论id
 */
export function assist(data = {}) {
  return request_post('/api/home/book_circles_user_goods', data)
}

/**
 * 获取筛选列表
 */
export function getScreenList(data = {}) {
  return request_get('/api/home/book_circles_grouping_comments', data)
}

/**
 * 书圈开启锁定
 * @param {Object} data
 * @param {Array} data.id - 必有字段 书圈id
 * @param {String} data.status - 必有字段 (1未开启 2开启 3锁定)
 */
export function modify(data = {}) {
  return request_put('/api/book_circles', data)
}

/**
 * 书圈删除
 * @param {Object} data
 * @param {Array} data.id - 必有字段 书圈id
 */
export function del(data = {}) {
  return request_post('/api/book_circles/delete', data)
}

/**
 * 书圈评分
 * @param {Object} data
 * @param {Array} data.book_id - 必有字段 书圈id
 * @param {Array} data.score - 必有字段 分数（1-10）
 */
export function score (data = {}) {
  return request_post('/api/score', data)
}

/**
 * 获取书圈评分
 * @param {Object} data
 * @param {Array} data.book_id - 必有字段 书圈id
 */
export function getScore (data = {}) {
  return request_get('/api/score', data)
}

/**
 * 获取加入某一书圈的用户列表
 * @param  {Object} data [description]
 * @param  {String} data.id 书圈id
 */
export function getCirclePerson (data = {}) {
  return request_get('/api/home/book_circles_users', data)
}