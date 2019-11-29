import Sort from '../../mgr/Sort'
import { request_put } from '../../../common/request'
/**
 * 获取分类列表
 * @param {Object} data
 */
export function getList() {
  return Sort.getList()
}

/**
 * 分类详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 分类id
 * @param {String} data.type - 必有字段 分类类型
 */
export function detail(data = {}) {
  console.log(3444444444)
  return Sort.book_classify_list({
    ...data,
    classify_id: data.id,
  })
}

/**
 * 分类详情 关联书籍
 * @param {Object} data
 * @param {String} data.category_id - 必有字段 分类id
 * @param {String} data.type - 必有字段 分类类型
 * @param {Array} data.rel_id - 必有字段 资源id,数组
 */
export function add(data = {}) {
  if (!data.rel_id.length) {
    return
  }
  return Sort.book_classify_add({
    classify_id: data.category_id,
    book_ids: data.rel_id,
  })
}

/**
 * 分类详情删除
 * @param {Object} data
 * @param {String} data.category_id - 必有字段 分类id
 * @param {String} data.type - 必有字段 分类类型
 * @param {Array} data.rel_id - 必有字段 资源id,数组
 */
export function dels(data = {}) {
  return Sort.book_classify_del({
    _ids: data.rel_id,
  })
}

/**
 * 删除分类
 * @param {Object} data
 * @param {Array} data.id - 必有字段 分类id
 */
export function del(data = {}) {
  return Sort.del(data)
}

/**
 * 保存分类
 * @param {Object} data
 * @param {String} data.type - 类型，'column'栏目,'subject'套系,'case'案例,'keyword'关键词
 * @param {String} data.pid - 选填 顶级为root,
 * @param {String} data.name - 选填 名称
 */
export function save({ id, ...data } = {}) {
  if (!id) {
    return Sort.add(data)
  }
  data._id = id
  if (data.pid == 'root') {
    data.pid = 0
  }
  return Sort.edit(data)
}

/**
 * 分类排序
 * @param {Object} data
 * @param {String} data.type - 类型，'column'栏目,'subject'套系,'case'案例,'keyword'关键词
 * @param {String} data.id - 选填 顶级为root,
 * @param {String} data.sort - 必填 up down名称
 */
export function sort({ id, ...data } = {}) {
  return request_put('api/data_categorys/sort/' + id, data)
}

/**
 * 分类资源排序
 * @param {Object} data
 * @param {String} data.type - 类型，'column'栏目,'subject'套系,'case'案例,'keyword'关键词
 * @param {String} data.id - 选填 顶级为root,
 * @param {String} data.sort - 必填 up down名称
 */
export function sorts({ id, ...data } = {}) {
  return Sort.updown({
    book_id: id,
    rbook_id: data.book_id,
    up_down: data.sort,
    number: data.number,
    category_id: data.category_id,
  })
}

/**
 * 模板下载
 * @param {Object} data
 */
export function download(data = {}) {
  return Sort.book_classify_download(data)
}

/**
 * 模板导入
 * @param {Object} data
 * @param  {...[file]} data.file [上传文件]
 */
export function importClass(data = {}) {
  return Sort.book_classify_upload(data)
}
