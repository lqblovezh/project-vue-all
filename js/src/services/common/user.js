//用户列表
import { request_post, request_get, request_put, request_delete } from 'services/common/request'
import pathToRegexp from 'path-to-regexp'

let path = pathToRegexp.compile('/system/api/app_manager/managers/:id');
/**
 * 用户列表
 * @param {Object} data
 * @param {String} data.name 搜索 用户名
 * @param {String} data.nick_name 搜索 名称（昵称）
 * @param {String} data.phone 搜索 电话
 * @param {String} data.email 搜索 邮箱
 * @param {String} data.time_start 搜索 开始时间（日期格式   如： 2018-03-11）
 * @param {String} data.time_end 搜索 结束时间（日期格式   如： 2018-03-11）
 */

 export function getList(data={}){
   return request_get("/system/app_manager/managers",data)
 }

 /**
  * 删除用户
  * @param {Object} data
  * @param {Array} data.id [id1,id2]
  */
export function del(data={}){
  return request_post("/system/app_manager/managers/delete",data)
}

/**
 * 用户详情
 * @param {Object} data
 * @param {String} data.id
 */
export function detail(data={}){
  return request_get(path(data),data)
}

/**
 * 用户新增
 * @param {Object} data
 * @param {String} data.name 用户名
 * @param {String} data.nick_name 名称(昵称)
 * @param {String} data.phone 电话
 * @param {String} data.email 邮箱
 * @param {String} data.reset_pass
 */

export function save({id,...data}){
  //log(data,id);
  if(id){
    return request_put(path({id}),data)
  }
  return request_post("/system/app_manager/managers",data).then(res=>{
       data.apps.forEach(e=>{   
          authorize({manager_id:res.data.id,app_id:e.id})
       })
  });
}

/**
 * 出版社列表
 * @param {Object} data
 * @param {String} data.name 出版社名称
 */

 export function getApps(data={}){
   return request_get("/system/app/apps",data);
 }

/**
 * 用户授权APP
 * @param {Object} data
 * @param {String} data.manager_id 用户id
 * @param {String} data.app_id 应用ID
 */

export function authorize(data={}){
  return request_post("/system/app_manager/managers/app_authorize",data)
}

/**
 * 取消用户授权APP
 * @param {Object} data
 * @param {String} data.manager_id 用户id
 * @param {String} data.app_id 应用ID
 */

export function revoke(data={}){
  return request_post("/system/app_manager/managers/app_revoke",data)
}

/**
 * 验证码-图片
 * @param {Object} data
 */
export function codeImage(data = {}) {
  let code = Math.random().toFixed(3)
  return request_get(`/common/api/captcha/image?code=${code}`)
}

/**
 * 验证码-手机
 * @param {Object} data
 * @param {String} data.phone - 必选 手机号
 * @param {String} data.code_id_img - 图片id
 * @param {String} data.code_val_img - 图片值
 * @param {String} data.not_check_user_exist - 必选 是否不需要检查手机是否存在（注册时传1）
 */
export function codePhone(data = {}) {
  return request_post('/common/api/captcha/mobile', data)
}

/**
 * 用户账号登录
 * @param  {Object} data
 * @param  {Object} data.user_name
 * @param  {Object} data.user_pass
 * @return {[Promise]}           [description]
 */
export function userLogin(data = {}) {
  return request_post('/common/api/auth/login/user', data).then(res => {
    window.sessionStorage.setItem('token', res.data.token)
    window.localStorage.setItem('token', res.data.token)

    config.token = res.data.token
    return res
  })
}

/**
 * 用户账号注册
 * @param  {Object} [data={}] [description]
 * @param  {Object} [data.phone] [手机号]
 * @param  {Object} [data.code_id] [验证码ID]
 * @param  {Object} [data.code_val] [验证码]
 * @param  {Object} [data.name] [用户名 ,不传则以手机号作为用户名]
 * @param  {Object} [data.nick_name] [昵称（姓名），不传则以用户名作为昵称]
 * @param  {Object} [data.pass] [密码 不传则随机生成]
 * @return {[Promise]}           [description]
 */
export function userReg(data = {}) {
  return request_post('/common/api/user/register', data)
}

/**
 * 找回密码（发送验证码）
 * @param  {Object} data [description]
 * @param  {String} data.phone 手机号码
 * @param  {String} data.code_id 图片验证码id
 * @param  {String} data.code_val 图片验证码值
 */
export function backPwdCode(data = {}) {
  return request_post('/common/api/user/pass_reset/send', data)
}

/**
 * 找回密码（重新设置密码）
 * @param {Object} data [description]
 * @param  {String} data.user_id 获取到的用户id
 * @param  {String} data.code_val 验证码
 * @param  {String} data.pass 新密码
 * @param  {String} data.pass_confirm 新密码
 */
export function setPwd(data = {}) {
  return request_post('/common/api/user/pass_reset/set', data)
}

/**
 * 手机号码登录
 * @param  {Object} data
 * @param {String} data.phone 手机号码
 * @param {String} data.code_id
 * @param {String} data.code_val
 */
export function phoneLogin(data = {}) {
  return request_post('/common/api/auth/login_by_phone/user', data).then(
    res => {
      window.sessionStorage.setItem('token', res.data.token)
      window.localStorage.setItem('token', res.data.token)

      //window.sessionStorage.setItem("userInfo",qs.stringify(res.data.user))
      config.token = res.data.token
      return res
    }
  )
}