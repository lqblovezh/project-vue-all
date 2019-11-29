import { mock, Random } from 'mockjs'
import { mockSuccess, mockFailure} from '../utils'
import { dict, extra, bookClassify, bookInfo } from '../../sbck'
import { request_get, request_post } from '../../../common/request'

/**
 * 首页访问
 *
 */
export async function homeVisit() {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
 * 热门资源访问
 *
 */
export async function hotResVisit() {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
 * 获取书籍类别/编印次维度
 *
 */
export async function getTypeList() {
  const {data} = await bookInfo.getTopBooks()
  return dict.versions.map(title => {
    const item = data[title] || {}
    return {
      title,
      values: dict.resTypes.map(key => item[key] || '零種')
    }
  })
}
/**
 * 获取热门资源
 * @param {Array} types - 筛选类型
 */
export async function getHotResource(types = []) {
  if (types == false) {
    return await extra.getTopHot()
  } else {
    const { data } = await extra.getHotResources(types)
    if (process.env.NODE_ENV == 'development' && data.length < 20) {
      const item = data[0]
      for (let i=data.length; i<20; i++) {
        data.push(item)
      }
    }
    return data
  }
}
export async function getWatermark () {
  return request_get('/api/copyright').then(res => res.data)
}
