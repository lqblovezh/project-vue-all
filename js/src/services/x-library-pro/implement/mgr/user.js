import User from '../../mgr/User'
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
  return User.getList(data).then(res => {
    const info = res.data.map(el => {
      return {
        id: el.id,
        nick_name: el.nick_name,
        phone: el.phone,
        user_type: el.grade,
        status_type: el.lock ? '禁用' : '正常',
        //member: '是或否',
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
export async function detail(data) {
  return User.detail({
    user_id: data.id,
  }).then(res => {
    return {
      data: {
        id: res.data.info.id,
        nick_name: res.data.info.nick_name,
        phone: res.data.info.phone,
        sex: res.data.info.sex,
        user_type: res.data.info.lock,
        abs: res.data.info.summary,
        birth: res.data.info.date_of_birth,
        grade: res.data.info.grade_id || res.data.info.grade,
      },
    }
  })
}

/**
 * 新增,修改用户详情
 * @param {String} data.data - 必有 用户id
 * @param {Number} data.reset_pass 1 为重置密码
 */
export async function save(data = {}) {
  data.lock_time = data.user_type ? '9999-12-31 59:59:59' : ''
  if (data.pass != data.passes) {
    return new Error('两次密码不相同')
  }
  let { data: userInfo } = await (!data.id ? User.add : User.update)({
    id: data.id,
    nick_name: data.nick_name,
    phone: data.phone,
    sex: data.sex,
    name: data.name,
    user_type: data.user_type,
    summary: data.abs,
    date_of_birth: data.birth,
    reset_pass: data.reset_pass,
    lock_time: data.lock_time,
  })
  await User.user_grade({
    user_id: userInfo.id,
    rule_id: data.grade,
  })
  return { data, status: true }
}

/**
 * 导出数据
 * @param {String} data.id - 选填 搜索项
 */
export async function derivedData(data) {
  return User.derivedData()
}

/**
 * 获取用户详情
 * @param {String} data.id - 必有 用户id
 */
export async function detailInfo(data) {
  return User.detail({
    user_id: data.id,
  }).then(res => {
    const el = res.data.statistics
    const statistics = {
      id: '',
      order_quantity: el.order_count,
      order_money: el.order_pricet,
      book_quantity: el.study_count,
      comment: el.comment_count,
      login: el.login_count,
    }

    return {
      data: {
        id: res.data.info.id,
        img_src: res.data.info.picture,
        img: res.data.info.picture,
        name: res.data.info.name,
        nick_name: res.data.info.nick_name,
        phone: res.data.info.phone,
        sex: res.data.info.sex,
        user_type: res.data.info.user_type,
        abs: res.data.info.summary,
        birthday: res.data.info.date_of_birth,
        grade: res.data.info.grade,
        grade_create_time: res.data.info.vip_start_time,
        grade_end_time: res.data.info.vip_end_time,
        statistics: [statistics],
      },
    }
  })
}

/**
 * 获取用户订单详情
 * @param {String} data.id - 必有 用户id
 */
export async function getOrderList(data) {
  return Order.getList(data).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        order: el.order_number,
        phone: el.phone,
        pay_type: el.pay_type,
        money: el.pay_price,
        from: '',
        nick_name: el.nick_name,
        order_type: el.is_pay,
        price: el.pay_price,
        create_time: el.create_time,
        pay_time: el.pay_time,
        close_time: '',
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 同步vip
 * @param {String} data.id - 必有 用户id
 */
export async function synchroVip(data) {
  return request_post('/api/sync_vip', data)
}
