import { mock, Random } from 'mockjs'
import { mockSuccess } from '../utils'
import { search as _search } from '../../sbck'
import { parsePageFromPHP, toPhpPage } from '../../sbck/pageUtil'
/**
  * 搜索结果访问
*/
export async function searchResultVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
  * 高级搜索访问
*/
export async function seniorSearchVisit () {
  return mockSuccess(
    mock({
      data: '',
    })
  )
}

/**
* 资源类型 --经部，史部，子部，集部
*/
export async function getResTypes () {
  return mockSuccess(
    mock({
      data:[],
    })
  )
}

/**
  * 获取搜索关键字导引
*/
export async function getSearchKeywords (param) {
  const { data, page } = await _search.getHotWords(param)
  return {
   data: (data || []).map(i => i.keyword),
   page
  }
}

/**
  * 获取搜索历史
*/
export async function getSearchHistory () {
  const { data } = await _search.getRecords()
  return (data || []).map(i => i.keyword)
}

/**
  * 搜索历史单个删除
  * @param { string} keyword - 单条记录id
*/
export async function clear (keyword) {
  return _search.delRecord([keyword])
}

/**
  * 搜索历史清空
  * @param { string} keywords -
*/
export async function clearAll (...keywords) {
  return _search.delRecord(keywords)
}

/**
  * 检索
*/

export async function search ({type, keyword, ...page}) {
  return _search.normalSearch({type, keyword}, page)
}

/**
  * 高级检索
  * @param {String} bookName -书名
  * @param {String} author - 作者
  * @param {String} version - 版本
  * @param {String} collection - 馆藏地
  * @param {String} inscribe - 刊刻主体
  * @param {String} owner - 所属丛书
  * @param {String} printOrder - 编/印次
  * @param {String} publishTime - 出版年代
  * @param {String} chapter - 章节
  * @param {String} title - 标题
  * @param {Array} types - 类别
*/
export async function advancedSearch (query, page){
  
  return _search.advancedSearch(query, page)
  if(true){
    return mockFailure(
      mock({
        message:'@csentence',
        details:{},
      })
    )
  }
}
