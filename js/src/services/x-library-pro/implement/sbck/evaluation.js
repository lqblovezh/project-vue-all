import { evaluation, extra } from '../../sbck'


/**
  * 我的评价访问
*/

export async function evaluVisit () {
   extra.evaluVisit()
}

/**
  * 获取我的评价信息
*/

export async function getList (param) {
  return evaluation.getList(param)
}

/**
  * 删除
*/

export async function del (...ids) {
   return evaluation.del(ids);
}
