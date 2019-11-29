//首页配置
import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import {platInfo} from 'services/x-publish/common'
/**
 * 首页信息保存
 * @param {Object} data
 *
 * @param {Object} data.extend_info
 *
 * @param {Object} data.extend_info.read
 * @param {Stirng} data.extend_info.read.title //系统名称
 * @param {Stirng} data.extend_info.read.logo  //logo
 * @param {String} data.extend_info.icon  // 网页标题 ico
 * @param {Stirng} data.extend_info.read.introduction //欢迎词
 *
 * @param {Object} data.extend_info.publish
 * @param {Stirng} data.extend_info.publish.title //系统名称
 * @param {Stirng} data.extend_info.publish.logo  //logo
 * @param {String} data.extend_info.icon  // 网页标题 ico
 * @param {Stirng} data.extend_info.publish.introduction //欢迎词
 */

let path = pathToRegexp.compile('/common/api/publisher/setting/app/:id');

export function  getInfo(){
  return platInfo({ id: 'current' })
}

/** 
 * 应用设置
*/
export function setting(data){
  return request_put(path(data),data);
}

/** 
 * 出版社设置
*/
export function publisherSetting(data) {
  return request_put('/common/api/publisher/setting',data);
}