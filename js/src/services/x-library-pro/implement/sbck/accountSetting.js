import { mock } from 'mockjs'
import {mockSuccess} from '../utils'
import { getTask } from 'services/common'
import { UserInfo } from '../../sbck'


/**
  * 账户设置访问
*/

export async function accountSettingVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
  * 账户设置信息
  * @param {String} nickName --昵称
  * @param {String} birth --生日
  * @param {String} abs --简介
  * @param {String} picture --头像
*/

export async function save ({
  nick_name,
  birth,
  summary,
  picture,
  sex,
}) {
  const {id} = await UserInfo.getUserData()
  const data = {
    nick_name,
    data_of_birth: birth,
    summary: summary,
    sex: sex,
    id,
  }
  if (picture) {
    const { data: { path } } = await getTask(picture)
    data.picture = path
  }
  const value = await UserInfo.save(data)
  UserInfo._user = null
  return value
}
