import Home from 'services/x-library-lib/mgr/Home'
import Sort from 'services/x-library-lib/hymz/Sort'
import { getList as bookList } from './book'
import { getList as videoList } from './video'
import { getList as specialList } from './special'
/**
 * 获取首页信息
 */
export async function homeInfo(data) {
  return Home.home_data(data)
}

/**
 * 获取首页信息
 */
export async function homeSearch(data) {
  return Home.search_statistics(data)
}

/**
 * 根据类型获取列表
 */
export async function getList({ type, ...data }) {
  switch (type) {
    case 'book':
      return bookList(data)
    case 'video':
      return videoList(data)
    case 'special':
      return specialList(data)
    default:
      return bookList(data)
  }
}
