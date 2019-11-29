import { mock, Random } from 'mockjs'
import Home from 'services/x-library-lib/hymz/Home'
import Subject from 'services/x-library-lib/hymz/Subject'
import { request_get, request_post } from 'services/common/request'
import getDeviceId from 'services/x-library-lib/getDeviceId'
import { jumpInfo } from '../ec'

export async function queryBannerList(data = {}) {
  return Home.getBannerList().then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        picture: el.img_src,
        url: '',
        book_id: el.book_id,
      }
    })
    return {
      data,
    }
  })
}
/**
 * 推荐专题
 */
export async function queryRecommendSubjects({
  pageStart = 0,
  pageOffset,
} = {}) {
  return Subject.getList({
    pageStart,
    pageOffset,
    pageNum: 1,
  })
}

/**
 * 热门阅读
 */
export async function queryHotReadList(data) {
  return Home.hotRead(data).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        picture: el.img_src,
        bookname: el.name,
        author: el.author,
        abs: el.abs,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 热门搜索
 */
export async function queryHotList(data) {
  return Home.hotList(data)
}

/**
 * 获取权限列表
 */
export async function queryPrivilegeList() {
  return request_get('/api/setting', {
    key: [
      'vip1_icon',
      'vip2_icon',
      'vip3_icon',
      'vip4_icon',
      'vip5_icon',
      // 'vip6_icon',
      'privilege',
    ],
  }).then(res => {
    return res.data.map(el => {
      return {
        id: el.id,
        img_src: el.value_src,
        name: el.name,
        abs: el.abs,
        key: el.key,
      }
    })
  })
}

/**
 * 获取权限列表
 */
export async function queryServicesInfo() {
  return request_get('/api/setting', {
    key: 'agreement',
  }).then(res => {
    return {
      agreement: res.data.value,
    }
  })
}

export async function getWatermark() {
  return request_get('/api/copyright').then(res => res.data)
}

/**
 * 获取跳转列表
 */
export async function queryJumpInfo(data = {}) {
  return jumpInfo()
}
