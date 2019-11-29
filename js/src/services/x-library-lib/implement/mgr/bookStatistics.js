import { mock } from 'mockjs'
import Statistics from '../../mgr/Statistics'
/**
 * 获取书籍统计
 * @param {Object} data
 * @param {String} data.order - "ascending/descending"
 * @param {String} data.prop - 'views_num/share_num/collect_num/read_num/cite_num/com_num'
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Statistics.bookList(data).then(res => {
    const data = res.data.map((el,i) => {
      return {
        id:el.id,
        sort: i+1,
        book_name:el.book_name,
        views_num:el.browse,
        share_num:el.share,
        collect_num:el.collection,
        read_num:el.read,
        cite_num:el.quote_count,
        com_num:el.comment,
      }
    })
    return {
      data,
      page:res.page,
    }
  })
}

/**
 * 用户增长统计
 * @param {Object} data
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 */
export async function readList(data = {}) {
  console.log(data,'147852369')
  return Statistics.readList(data).then(res => {
    const data_X = [] , data_Y = []
    res.data.forEach(el => {
      data_X.push(el.category_name)
      data_Y.push(el.count)
    })
    return {
      data:{
        data_X,
        data_Y,
      },
    }
  })
}
/**
 * 获取订单统计
 * @param {Object} data
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 */
export async function userList(data = {}) {
  return Statistics.userList(data).then(res => {
    return {
      data:{
        data_X: Object.keys(res.data),
        data_Y: Object.values(res.data),
      },
    }
  })
}
/**
 * 获取订单统计
 * @param {Object} data
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 */
export async function orderList(data = {}) {
  data.type = 'count'
  return Statistics.orderList(data).then(res => {
    return {
      data:{
        data_X: Object.keys(res.data),
        data_Y: Object.values(res.data),
      },
    }
  })
}

/**
 * 获取订单统计
 * @param {Object} data
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 */
export async function saleList(data = {}) {
  data.type = 'total'
  return Statistics.orderList(data).then(res => {
    return {
      data:{
        data_X: Object.keys(res.data),
        data_Y: Object.values(res.data),
      },
    }
  })
}

/**
 * 获取订单统计
 * @param {Object} data
 * @param {String} data.start_date - 开始时间
 * @param {String} data.end_date - 结束时间
 */
export async function getAllDate(data = {}) {
  return Statistics.getAllDate(data).then(res => {
    const obj = res.data
    return {
      data:{
        saleAll:obj.total_sale,
        saleAllY:obj.valid_order_total,
        orderAll:obj.valid_order_count,
        orderAllW:obj.invalid_order_total,
        saleAllW:obj.invalid_order_count,
        userAll:obj.user_count,
        vipAll:obj.have_order_user_count,
        ratio:`${obj.proportion*100}%`,
      },
    }
  })
}
