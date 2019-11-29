import {mock} from 'mockjs'
import { mockSuccess } from '../utils'
import { readRecord } from '../../sbck'

/**
  * 个人中心访问
*/

export async function userInfoVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
  * 阅读历史访问
*/

export async function readHistoryVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
  * 获取阅读历史信息
*/

export async function getList (page) {
  return readRecord.query(page)
}


/**
  * 删除
*/
export async function del (...ids) {
  console.log(ids)
  return readRecord.remove(ids)
}
