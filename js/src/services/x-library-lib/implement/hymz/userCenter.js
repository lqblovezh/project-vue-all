import * as user from './user'
import * as info from './info'
import * as book from './book'
import { mockSuccess } from '../utils'
import { mock } from 'mockjs'
import UserCenter from 'services/x-library-lib/hymz/UserCenter'
import Book from 'services/x-library-lib/hymz/Book'
import { request_get, request_post } from '../../../common/request'
/**
 * 个人中心
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function centerList(data = {}) {
  let bookRoomList = []
  let readList = []
  await Book.getList({
    pageOffset: 4,
    pageStart: 0,
  }).then(res => {
    bookRoomList = res.data.map(el => {
      let latest = {}
      try {
        latest = JSON.parse(el.read_record_data)._latest
      } catch (error) {
        console.warn('chapterName -> 获取失败')
      }
      return {
        id: el.id,
        book_name: el.name,
        speed: latest.chapterName||'尚未阅读',
        create_time: el.create_time,
        author: el.author,
        picture: el.img_src,
        book_id: el.book_id,
        chapterRid: latest.chapterRid,
        chapterId: latest.chapterId,
      }
    })
  })
  await Book.read_history({
    pageOffset: 4,
    pageStart: 0,
  }).then(res => {
    readList = res.data.map(el => {
      let latest = {}
      try {
        latest = JSON.parse(el.data)._latest
      } catch (error) {
        console.warn('chapterName -> 获取失败')
      }
      return {
        id: el.id,
        book_name: el.book_name,
        speed: latest.chapterName||'尚未阅读',
        author: el.author_name,
        book_id: el.book_id,
        chapterRid: latest.chapterRid,
        chapterId: latest.chapterId,
      }
    })
  })
  console.log(readList, bookRoomList, 11111)
  return {
    data: {
      readList,
      bookRoomList,
    },
  }
}

/**
 * 我的vip
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */

export async function vipList(data = {}) {
  let orderList = []
  let privilege = []
  await request_get('/api/setting', {
    key: [
      'vip1_icon',
      'vip2_icon',
      'vip3_icon',
      'vip4_icon',
      'vip5_icon',
      // 'vip6_icon',
    ],
  }).then(res => {
    privilege = res.data.map(el => {
      return {
        id: el.id,
        img_src: el.value_src,
        name: el.name,
      }
    })
  })
  await UserCenter.order({
    pageOffset: 100,
    pageStart: 0,
  }).then(res => {
    orderList = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        order: el.order_number,
        goods: el.goods_name,
        money: el.pay_price,
        create_time: el.create_time,
        status_type: el.is_pay,
        // eslint-disable-next-line no-dupe-keys
        create_time: el.create_time,
        // eslint-disable-next-line no-undef
        effective_time: el.pay_time,
        expire_date: el.vip_end_time,
        price: el.pay_price,
        pay_method: el.pay_type_name,
      }
    })
  })
  return {
    data: {
      privilege,
      orderList,
    },
  }
}

/**
 * 阅读历史
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function readList(data = {}) {
  return user.queryHistoryList(data)
}

/**
 * 我的书房
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function bookRoomList(data = {}) {
  return book.queryBookShelfList(data)
}

/**
 * 我的批注
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function annotList(data = {}) {
  return user.queryAnnotationList(data)
}

/**
 * 引用记录
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function recordList(data = {}) {
  return info.queryQuoteList(data)
}

/**
 * 我的评论
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function assessList(data = {}) {
  return user.queryCommentList(data)
}

/**
 * 用户中心所有删除
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function del(data = {}) {
  return UserCenter.del(data)
}

/**
 * 用户中心所有详情
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function detail(data = {}) {
  return mockSuccess(
    mock({
      data: {
        id: '@id',
        order_id: '@guid',
        status: 1, // 已支付
        create_time: '@datetime',
        effective_time: '@datetime', //生效时间
        price: '@day', //价格
        expire_date: '@datetime', //到期时间
        'pay_method|1': ['微信支付', '支付宝'], //支付方式
      },
      status: true,
    })
  )
}
