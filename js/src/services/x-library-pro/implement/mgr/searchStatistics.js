import { mock } from 'mockjs'
import { Book } from '../../sbck'
import Statistics from '../../mgr/Statistics'
/**
 * 获取搜索统计
 * @param {Object} data
 * @param {String} data.order - "ascending/descending"
 * @param {String} data.prop - 'search_all/search_month/search_week/search_today'
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Statistics.searchList(data).then(res => {
    const data = res.data.map((el,i) => {
      return {
        id:el.id,
        sort:i+1,
        book_name:el.keyword,
        from:'',
        search_all: el.total,
        search_month:el.month,
        search_week:el.week,
        search_today:el.day,
      }
    })
    return {
      data,
      page:res.page,
    }
  })
}

/**
 * 删除搜索统计
 * @param {Array} data.id - 必有 id
 */
export async function del(id) {
  // XXX: 业务变化
  return {}
}
