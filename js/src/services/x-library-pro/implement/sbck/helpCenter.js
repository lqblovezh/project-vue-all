import { extra } from '../../sbck'
import { mock } from 'mockjs'
import { mockSuccess } from '../utils'
/**
  * 帮助中心访问
*/
export async function helpVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
  * 获取帮助信息
*/
export async function getHelpInfo(){
  const {data: {content}} = await extra.getHelpInfo()
  return content
}
