import { mockSuccess, mockFailure } from '../utils'
import { mock, Random } from 'mockjs'
import { extra,  bookShelf } from '../../sbck'
import { isFor } from 'babel-types';

/**
  * 我的书房访问
*/

export async function studyVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}


/**
  * 获取我的书房信息
*/

export async function getList (params) {
   return bookShelf.getList(params)
}

/**
  * 删除
*/

export async function del (...ids) {
  console.log(ids)
  return bookShelf.del(ids)
}
