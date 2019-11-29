import qs from 'qs'
import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import config from '../config';
import { loginListener } from 'services/x-publish/dbi'

let toPath = pathToRegexp.compile('/common/api/user/users/detail/:id');
let toPathRole = pathToRegexp.compile('/common/api/user/roles/:id');

/**
 * 管理员角色列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.app_type_all  是否返回所有平台的角色(1为是 其他为否)
 */
export function listRole(data = {}) {
    return request_get('/common/api/user/roles',data)
}

/**
 * 管理员列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 用户名（选填）
 * @param {String} data.nick_name - 昵称（选填）
 * @param {String} data.phone - 电话（选填）
 * @param {String} data.mail - 邮箱（选填）
 * @param {String} data.time_start - 开始时间（选填）
 * @param {String} data.time_end - 结束时间（选填）
 * @param {String} data.role - 角色ID（选填）
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * */
export function listManager(data = {}) {
    return request_get('/common/api/user/users/manager',data)
}

/**
 * 管理员添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 用户名
 * @param {String} data.nick_name - 昵称
 * @param {String} data.phone - 电话
 * @param {String} data.mail - 邮箱
 * @param {String} data.reset_pass - 是否重置密码（1为是，0 为否）
 * @param {Array} data.roles - 属于的角色
 * */
export function addManager(data = {}) {
    return request_post('/common/api/user/users/detail/manager',data);
}

/**
 * 管理员修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name - 用户名
 * @param {String} data.nick_name - 昵称
 * @param {String} data.phone - 电话
 * @param {String} data.mail - 邮箱
 * @param {String} data.reset_pass - 是否重置密码（1为是，0 为否）
 * @param {Array} data.roles - 属于的角色
 * */
export function modifyManager({id,...data} = {}) {
    return request_put(toPath({id}),data);
}

/**
 * 管理员详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 用户ID
 * */
export function detailManager({id,...data} = {}) {
    return request_get(toPath({id}),data);
}

/**
 * 角色详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id - 角色ID
 * */
export async function detailRole({id,...data} = {}) {
    let info = {accesses:{}};
    let pointer = {};
    let auth = {};
    await request_get('/common/api/current').then(res=>{
      pointer.common = {name:'common',type:'common'}
      info.pointer = pointer
      res.data.publisher.apps.forEach(e=>{
         pointer[e.id] = {name:e.name,type:e.type};
      })  
   })
    if (id) {
        await request_get(toPathRole({id}),data).then(res => {
            if(res && res.status){
               info.name = res.data.name
               info.exp = res.data.exp
               info.id = res.data.id
               auth= res.data.accesses
            }
        });
        await request_get('/common/api/user/accesses').then(res=>{
          //数据重组
          let arr = ['checkedList','allow_create','allow_view_all',
                      'allow_view_own','allow_edit_all','allow_edit_own',
                      'allow_delete_all','allow_delete_own']
           for(let key in pointer){
              if(auth[key]){
                info.accesses[key] = res.data[pointer[key]['type']].map(el=>{
                  let dataList = {};
                   if(auth[key][el.identifier]){
                    let obj=null;
                     obj=auth[key][el.identifier];
                     if(obj.allow_create && 
                        obj.allow_view_own && 
                        obj.allow_view_own && 
                        obj.allow_edit_all &&　
                        obj.allow_edit_own &&
                        obj.allow_delete_all &&
                        obj.allow_delete_own){
                          obj.checkedList = 1
                        }else{
                          obj.checkedList = 0
                        }
                     arr.forEach(e=>{
                      dataList[e] = obj[e];
                     })
                     dataList.name = obj.name
                     dataList.identifier = obj.access_identifier
                     return dataList
                   }
                   arr.forEach(e=>{
                     dataList[e] = 0;
                   })
                   dataList.name = el.name
                   dataList.identifier = el.identifier
                   return dataList;
                })
              }else{
                info.accesses[key] = res.data[pointer[key]['type']].map(el=>{
                  let dataList = {};
                  arr.forEach(e=>{
                    dataList[e] = 0;
                  })
                  dataList.name = el.name
                  dataList.identifier = el.identifier
                  return dataList;
                })
              }
           }
        })
        return info;
    } else {
      await request_get('/common/api/user/accesses').then(res=>{
        //数据重组
        let arr = ['checkedList','allow_create','allow_view_all',
                    'allow_view_own','allow_edit_all','allow_edit_own',
                    'allow_delete_all','allow_delete_own']
         for(let key in pointer){
              info.accesses[key] = res.data[pointer[key]['type']].map(el=>{
                let dataList = {};
                arr.forEach(e=>{
                  dataList[e] = 0;
                })
                dataList.name = el.name
                dataList.identifier = el.identifier
                return dataList;
              })
         }
      })
      return info;
    }
}

/**
 * 所有权限列表
 * @return {Promise}
 * */
export function allJurisdiction() {
    return request_get('/common/api/user/accesses')
}


/**
 * 所有权限列表--组装
 * @return {Promise}
 * */
export function _allJurisdiction() {
    return request_get('/common/api/user/accesses').then(res => {
         res.data.publish=res.data.publish.map(e=>{
            return {...e,allow_create:0,allow_delete_all:0,allow_edit_all:0,allow_view_all:0}
        })
         res.data.read = res.data.read.map(e=>{
            return {...e,allow_create:0,allow_delete_all:0,allow_edit_all:0,allow_view_all:0}
         })
        return res
    });
}
/**
 * 角色修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.exp
 * @param {Object} data.accesses
 * @example
 * data.accesses = {
 *      "dfa71d58-7c57-4cc5-8508-5458cf5c2e8f": {                //类型：Object  必有字段  备注：权限
 *          "allow_create":1,                //类型：Number  必有字段  备注：允许新建
 *         "allow_view_all":1,                //类型：Number  必有字段  备注：允许查看所有
 *           "allow_view_group":1,                //类型：Number  必有字段  备注：允许查看同组的
 *          "allow_view_own":1,                //类型：Number  必有字段  备注：允许查看自己的
 *           "allow_edit_all":1,                //类型：Number  必有字段  备注：允许编辑所有的
 *          "allow_edit_group":1,                //类型：Number  必有字段  备注：允许同组的
 *          "allow_edit_own":1,                //类型：Number  必有字段  备注：允许编辑自己的
 *        "allow_delete_all":1,                //类型：Number  必有字段  备注：允许删除所有的
 *       "allow_delete_group":1,                //类型：Number  必有字段  备注：允许删除同组的
 *      "allow_delete_own":1                //类型：Number  必有字段  备注：允许自己的
 *      }...
 * }
 * */
export function role({id,...data} = {}) {


    if(id){
        return request_put(toPathRole({id}),data)
    }
    return request_post('/common/api/user/roles',data)
}
// export function modifyRole({id,...data} = {}) {
//     return request_put(toPathRole({id}),data);
// }

/**
 * 角色添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 * @param {String} data.exp
 * @param {Object} data.accesses
 * @example
 * data.accesses = {
 *      "dfa71d58-7c57-4cc5-8508-5458cf5c2e8f": {                //类型：Object  必有字段  备注：权限
 *          "allow_create":1,                //类型：Number  必有字段  备注：允许新建
 *         "allow_view_all":1,                //类型：Number  必有字段  备注：允许查看所有
 *           "allow_view_group":1,                //类型：Number  必有字段  备注：允许查看同组的
 *          "allow_view_own":1,                //类型：Number  必有字段  备注：允许查看自己的
 *           "allow_edit_all":1,                //类型：Number  必有字段  备注：允许编辑所有的
 *          "allow_edit_group":1,                //类型：Number  必有字段  备注：允许同组的
 *          "allow_edit_own":1,                //类型：Number  必有字段  备注：允许编辑自己的
 *        "allow_delete_all":1,                //类型：Number  必有字段  备注：允许删除所有的
 *       "allow_delete_group":1,                //类型：Number  必有字段  备注：允许删除同组的
 *      "allow_delete_own":1                //类型：Number  必有字段  备注：允许自己的
 *      }...
 * }
 * */
export function addRole(data = {}) {
    return request_post('/common/api/user/roles',data);
}

/**
 * 管理员删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * */
export function deleteManager(data = {}) {
    console.log(data)
    return request_post('/common/api/user/users/delete',data);
}

/**
 * 角色删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 * */
export function deleteRole(data = {}) {
    return request_post('/common/api/user/roles/delete',data);
}

/**
 * 管理员日志
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 用户名（选填）
 * @param {String} data.nick_name - 昵称（选填）
 * @param {String} data.client_ip - IP
 * @param {String} data.time_start - 开始时间（选填）
 * @param {String} data.time_end - 结束时间（选填）
 * @param {String} data.role - 角色ID（选填）
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * */
export function logManager(data = {}) {
    return request_get('/common/api/user/logs',data);
}

/**
 * 用户登录
 */
export function login(data={}){
   return request_post('/common/api/manager/login',data)
}
/**
 * 检查管理是否已登录
 * @return {Promise}
 * @param {Object} data - 传入对象
 */
export function isLogin() {
  return request_get('/api/auth/is_login/manager')
}
/**
 * 管理员登陆
 * @return {Promise}
 * @param {Object} data - 传入对象
 * @param {Object} data.app_id - 登陆ID（必传）
 * @param {Object} data.user_name - 用户名（必传）
 * @param {Object} data.user_pass - 密码（必传）
 * @param {Object} data.platform - 客户端：默认web
 */
export function adminLogin(data = {}) {
  return request_post('/common/api/auth/login/manager', data).then(res => {
    loginListener({
      user_id:res.data.id,
      user_name:res.data.user.name,
      user_nick_name:res.data.user.nick_name,
      user_phone:res.data.user.phone,	
      user_picture:res.data.user.user_picture,
      user_picture_absolute:res.data.user.user_picture_absolute,
      user_email:res.data.user.email,
      user_sex:res.data.user.sex,
      user_date_of_birth:res.data.user.date_of_birth,
      user_address:res.data.user.address,
      user_city:'',
    })
    window.sessionStorage.setItem('token', res.data.token)
    window.sessionStorage.setItem('userInfo', qs.stringify(res.data.user))
    config.token = res.data.token
    return res
  })
}

/**
 * 获取登陆下拉列表
 * @param {} data
 */
export function getSelectOptions(data = {}) {
  return request_post('/common/api/auth/login/manager_check', data)
}
