import { mockSuccess } from '../utils'
import { mock, Random } from 'mockjs'

/**
 * 获取首页信息
 */
export async function getHomeInfo() {
  return mockSuccess(
    mock({
      'Knowledge_points|1-10': [ // 知识点
        {
          id: '@guid',
          keyword: '@csentence(3, 5)', // 关键字
        },
      ],
      'theme|1-10': [ // 推荐专题
        {
          id: '@guid',
          img: '@image("300x150",@color())', // 图片地址
          title: '@csentence(3, 5)', // 标题
          abs: '@cparagraph(5)', // 简介
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
