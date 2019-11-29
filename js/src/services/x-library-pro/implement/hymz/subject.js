import { mock, Random } from 'mockjs'
import Subject from 'services/x-library-pro/hymz/Subject'
export async function queryAllSubjectList(data) {
  return Subject.getList(data)
}
/**
 * 查询专题的详情
 * @param {String} data.sid 专题id
 * @return {[type]} [description]
 */
export async function querySubjectInfo(data = {}) {
  return Subject.detail({id:data.sid})
}
