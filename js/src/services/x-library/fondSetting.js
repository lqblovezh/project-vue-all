import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

let detail = pathToRegexp.compile('/api/data_discover/:id')

/**
 * 获取发现列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.author - 选填 作者
 * @param {String} data.tag - 选填 标签
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.group_id - 选填 分组id
 * @param {String} data.status - 选填 上架状态(0未上架,1已上架)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}){
  return request_get('/api/data_discover',data)
}

/**
 * 发现详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 发现id
 */
export function detail(data = {}){
  return request_get(detail(data))
}

/**
 * 删除发现
 * @param {Object} data
 * @param {Array} data.id - 必有字段 发现id
 */
export function del(data = {}){
  return request_post('/api/data_discover/delete',data)
}

/**
 * 发现新增或修改
 * @param {Object} data
 * @param {Array} data.id - 必有字段 发现id
 */
export function save({id,...data} = {}){
  if(id) {
    return request_put(detail({id}),data)
  }
  return request_post('/api/data_discover',data)
}

