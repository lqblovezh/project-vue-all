import Home from 'services/x-library-pro/mgr/Home'
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
