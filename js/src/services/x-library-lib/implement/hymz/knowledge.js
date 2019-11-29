import { mock, Random } from 'mockjs'
import Knowledge from 'services/x-library-lib/hymz/knowledge'
/**
 * 查询推荐的知识点列表
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function queryKnowLedgeList(data = {}) {
  return Knowledge.getNavList(data)
}
/**
 * 查询知识点的详细信息
 * 最好是树形结构
 * @param  {Object} [data={}] [description]
 * @param {String} data.bookId // 当该bookId有时，才有personlist和addresslist
 * @param {String} data.id 知识点id
 * @return {[type]}           [description]
 */
export async function queryKnowLedgeDetailInfo(data = {}) {
  return Knowledge.getList(data)
}
/**
 * 获取某一知识点下的关联篇章
 * @param  {Object} [data={}] [description]
 * @param {String} data.id 知识点id
 * @param {String} data.bookId 书籍id 【可不传】
 * @return {[type]}           [description]
 */
export async function queryRelatedChapter(data = {}) {
  return Knowledge.detail(data).then(res => {
    const data = res.data.map(el => {
      return {
        ...el,
        id: el.id,
        content: el.content || el.point || el.chapter_name || el.name,
        book_name: el.book_name,
        chapter_name: el.name,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
