import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'

/**
 * 修改当前用户资料 修改某个字段传谁就行
 * @param  {Object} [data={}] [description]
 * @return {[Promise]}        [description]
 * @param  {Object} [data.nick_name] [昵称]
 * @param  {Object} [data.phone] [手机号]
 * @param  {Object} [data.email] [邮箱]
 * @param  {Object} [data.picture] [头像（文件上传后得到的path）]
 * @param  {Object} [data.sex] [性别   男|女|保密]
 * @param  {Object} [data.address] [地址]
 * @param  {Object} [data.date_of_birth] [出版日期   2018-11-11]
 * @param  {Object} [data.education] [学历]
 * @param  {Object} [data.company] [单位]
 * @param  {Object} [data.duties] [职务]
 * @param  {Object} [data.summary] [简介]
 * @param  {Object} [data.roles] [管理角色]
 * @param  {Object} [data.positions] [会员角色]
 * @param  {Object} [data.pass] [密码]
 */
export function changeUserInfo(data = {}) {
  return request_put('/common/api/user/users/detail', data)
}