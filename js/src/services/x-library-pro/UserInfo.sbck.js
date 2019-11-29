import {
  request_get,
} from 'services/common/request'

import { UserInfo }  from './UserInfo.js'

class SbckUserInfo extends UserInfo {
  async login (...args) {
    const result = await super.login(...args)
    return result
  }


  async loginByPhone(...args){
    const result = await super.loginByPhone(...args)
    return result
  }
}

export default new SbckUserInfo()




export async function getVipFromServices(){
  const {data: { isvip, vip_end_time, read_chapter_count } } = await request_get('/api/user_vip')
  // console.log('isvip')
  return isvip
}
export async function getReadChapter(){
  const {data: {  read_chapter_count } } = await request_get('/api/user_vip')
  // console.log('isvip')
  return read_chapter_count
}