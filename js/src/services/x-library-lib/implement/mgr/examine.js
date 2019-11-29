import Examine from '../../mgr/Examine'
import Order from '../../mgr/Order'
import { request_post } from 'services/common/request'

/**
 * 获取用户列表
 * @param {Object} data
 * @param {String} data.id - 选填字段 用户id
 * @param {String} data.phone - 选填字段 手机号
 * @param {String} data.role - 选填字段 角色
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Examine.getList(data).then(res => {
    const info = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        nick_name: el.user_name,
        phone: el.telephone,
        user_type: el.grade,
        status_type: el.status_name,
        create_time: el.create_time,
      }
    })
    return {
      data: info,
      page: res.page,
    }
  })
}

/**
 * 删除用户
 * @param {Array} data.id - 必有 用户id
 */
export async function del(id) {
  // 暂无删除功能
}

/**
 * 获取用户详情
 * @param {String} data.id - 必有 用户id
 */
export async function detail(arg) {
  return Examine.detail(arg).then(({ data }) => {
    return {
      data: {
        ...data,
        id: data.id,
        nick_name: data.nick_name,
        phone: data.phone,
        sex: data.sex,
        user_type: data.lock,
        abs: data.summary,
        birth: data.date_of_birth,
        grade: data.grade_id || data.grade,
      },
    }
  })
}

/**
 * 审核
 * @param {String} data.id - 必有 用户id
 * @param {String} data.type - 必有 true(通过) false(驳回)
 */
export async function check(data) {
  return Examine.check(data)
}
