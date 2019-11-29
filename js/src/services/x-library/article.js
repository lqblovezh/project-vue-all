import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';

let toPathGroup = pathToRegexp.compile('/api/data_articles/groups/:id');
let toPathGroupModify = pathToRegexp.compile('/api/data_articles/:id/groups');
let artiDetail = pathToRegexp.compile('/api/data_articles/:id')

/**
 * 获取文章列表
 * @param {Object} data
 * @param {String} data.name - 选填 名称
 * @param {String} data.author - 选填 作者
 * @param {String} data.tag - 选填 标签
 * @param {String} data.start_time - 选填 开始时间
 * @param {String} data.end_time - 选填 结束时间
 * @param {String} data.group_id - 选填 分组id
 * @param {String} data.status - 选填 上架状态(0未上架,1已上架)
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 */
export function getList(data = {}){
	return request_get('/api/data_articles',data)
}

/**
 * 文章详情
 * @param {Object} data
 * @param {String} data.id - 必有字段 图书id
 */
export function detail(data = {}){
	return request_get(artiDetail(data),data)
}

/**
 * 文章修改
 * @param {Object} data
 * @param {String} data.id - 必有字段 图书id
 */
export function modifyArt({id,...data}){
	return request_put(artiDetail({id}),data)
}

/**
 * 删除文章
 * @param {Object} data
 * @param {Array} data.id - 必有字段 文章id
 */
export function del(data = {}){
	return request_post('/api/data_articles/delete',data)
}

/**
 * 导出
 * @param {Object} data
 * @param {Array} data.id - 必有字段 文章id
 */
export function exported(data = {}){
	return request_get('/api/data_articles/export',data)
}
/**
 * 文章上架
 * @param {Object} data
 * @param {Array} data.id - 必有字段 文章id
 */
export function put(data){
	return request_put('/api/data_articles/put', data)
}

/**
 * 文章下架
 * @param {Object} data
 * @param {Array} data.id - 必有字段 图书id
 */
export function pull(data){
	return request_put('/api/data_articles/pull', data)
}

/**
 * 保存上架设置数据
 * @param {Object} data
 * @param {String} data.id - 必有字段 id
 * @param {String} data.category_ids - 必有字段 分类ID[]
 * @param {Array} data.book_price - 必有字段 价格
 */
export function putSave(data){
	return request_put('/api/data_articles/set', data)
}

/**
 * 文章分组列表
 */
export function groupList(data={}){
	return request_get('/api/data_articles/groups',data )
}

/**
 * 文章新增或修改分组
 * @param {Object} data
 * @param {String} data.name - 必有 分组名称
 * @param {String} data.id - 没有id是新增，有id表示修改
 */
export function group({id,...data}){
	if(id){
		return request_put(toPathGroupModify({id}), data)
	}
	return request_post('/api/data_articles/groups',data)
}

/**
 * 文章删除分组
 * @param {Object} data
 * @param {String} data.id
 */
export function groupDel({id,...data}={} ){
	return request_delete(toPathGroup({id}), data)
}

/**
 * 文章移动分组
 * @param {Object} data
 * @param {String} data.old_group_id
 * @param {String} data.new_group_id
 * @param {Array} data.rel_id
 */
export function groupMove(data){
	return request_put('/api/groups/data_articles', data)
}

/**
 * 获取设置信息
 * @param {Object} data
 * @param {String} data.type  - column -> 栏目 subject-> 套系
 * @param {Array} data.rel_id
 */
export function getClass(data={}){
	return request_get('/api/data_categorys/books/class', data)
}
