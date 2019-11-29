import { request_get, request_post } from '../../../common/request'
import { mock } from 'mockjs'
import { mockSuccess } from '../utils'

/**
 * 会员访问
 */
export async function memberVisit() {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
 * 特权对比
 */
export async function privCompare() {
  return request_get('/api/setting', {
    key: ['vip1_icon', 'vip2_icon', 'vip3_icon', 'privilege'],
  }).then(res => ({
    img_src: res.data.find(e => e.key == 'privilege').value_src,
    privilegeIntro: res.data.filter(item => item.abs).map(e => e.abs),
  }))
}
