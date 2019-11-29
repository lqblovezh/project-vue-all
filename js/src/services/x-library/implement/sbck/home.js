import { mockSuccess } from '../utils'
import { mock, Random } from 'mockjs'

/**
 * 获取首页信息
 */
export async function getHomeInfo() {
  return mockSuccess(
    mock({
      'nav|4': [ // 首页导航 FIXME:待定
        {
          id: '@guid', 
          img: '@image("300x150",@color())', // 图片地址
        },
      ],
      'hot|1-10': [ // 热门阅读
        {
          id: '@guid',
          img: '@image("160x210",@color())', // 图片地址
          title: '@csentence(3, 5)', // 标题
          author: '@cname', // 作者
        },
      ],
    })
  )
}
