import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
import { getList as seriesList } from './series'
import { getList as articleList } from './article'

/**
 * 获取已上架产品列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.type (article->文章 article->套系 )
 */
export function getMainList({ type, ...data }) {
  switch (type) {
    case 'series':
      return seriesList(data)
      break
    case 'article':
      return articleList(data)
			break
		default:
			return articleList(data)
			break
  }
}

/**
 * 获取服务器时间
 */
export function getServiceTime(data) {
  return request_get('/api/statistics/admin_home', data)
}
