import { request_get } from '../../common/request'

class Home {
  getBannerList(){
    return request_get('/api/home/banners')
  }
  /**
   * 热门阅读
   */
  hotRead(data){
    return request_get('/api/home/hot_book',data)
  }
  /**
   * 热门搜索
   */
  hotList(data){
    return request_get('/api/hot_words',data)
  }
}

export default new Home
