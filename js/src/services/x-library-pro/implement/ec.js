import getDeviceId from 'services/x-library-pro/getDeviceId'
import { request_post } from 'services/common/request'

/**
 * 获取跳转列表
 */
export async function jumpInfo(data = {}) {
  data.device_id = getDeviceId()
  return request_post('/common/api/ec_user/users/jump_to', data)
}
