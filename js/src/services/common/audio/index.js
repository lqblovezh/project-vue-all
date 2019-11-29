import {request_post,request_get,request_put,request_delete} from 'services/common/request';
import pathToRegexp from 'path-to-regexp';
import qs from 'qs'
import {
    addResListener
} from '../dbi'
let toPath = pathToRegexp.compile('/api/audios/:id');
let toPathGroup = pathToRegexp.compile('/api/audios/groups/:id');
/**
 * 音频添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name - 音频名称
 * @param {String} data.author - 音频作者
 * @param {String} data.preview - 音频内容
 * @param {String} data.tag - 音频标签
 * @param {String} data.img - 封面
 * @param {String} data.abs - 音频摘要或者简介
 * @param {String} data.format - 格式
 * @param {String} data.length - 长度
 * @param {String} data.size - 大小
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function add(data = {}) {
    return request_post('/api/audios',data).then(result=>{
        const{
            _id,
            name,
            abs,
            author,
            tag,
            type_name,
        }=result.data
        addResListener({
            res_id:_id,
            res_type:type_name,
            res_name:name,
            res_exp:abs,
            res_author:author,
            res_lables:[tag],
        })
        return result
    });
}

/**
 * 音频修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.preview
 * @param {String} data.tag
 * @param {String} data.img
 * @param {String} data.abs
 * @param {Array} data.attributes -  [{key:"",value : ""}...]
 * @example
 * data.attributes = [{key : '',value: ''}]
 */
export function modify({id,...data} = {}) {
    return request_put(toPath({id}),data);
}

/**
 * 音频列表
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id - 未分组 ： non
 */
export function listAudio(data = {}) {
    return request_get('/api/audios',data);
}

/**
 * 音频导出
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.state
 * @param {String} data.name
 * @param {String} data.author
 * @param {String} data.tag
 * @param {String} data.start_time
 * @param {String} data.end_time
 * @param {String} data.pageStart
 * @param {String} data.pageOffset
 * @param {String} data.pageNum
 * @param {String} data.group_id - 未分组 ： non
 * @param {Array} data.id
 */
export function educe(data = {}) {
    return request_get('/api/audios/export',data)
}

/**
* 音频导入
* @return {Promise}
* @param {Object} data
* @param {String} data.name
* @param {String} data.temp
*/
export function putin(data = {}) {
  return request_post('/api/audios/import', data)
}

/**
 * 音频删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteAudio(data = {}) {
    return request_post('/api/audios/delete',data);
}

/**
 * 音频详情
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 */
export function detailAudio(data = {}) {
    return request_get(toPath(data),data);
}

/**
 * 音频分组修改
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.id
 * @param {String} data.name
 */
export function modifyGroup({id,...data} = {}) {
    return request_put(toPathGroup({id}),data);
}

/**
 * 音频分组删除
 * @return {Promise}
 * @param {Object} data
 * @param {Array} data.id
 */
export function deleteGroup(data = {}) {
    return request_post('/api/audios/groups/delete',data);
}

/**
 * 音频分组添加
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.name
 */
export function addGroup(data = {}) {
    return request_post('/api/audios/groups',data);
}

/**
 * 音频分组列表
 * @return {Promise}
 */
export function listGroup() {
    return request_get('/api/audios/groups');
}

/**
 * 音频分组移动
 * @return {Promise}
 * @param {Object} data
 * @param {String} data.new_group_id - 要移动到的分组ID
 * @param {String} data.old_group_id - 当前的所属分组ID
 * @param {Array} data.id - 书籍ID
 */
export function moveGroup(data = {}) {
    return request_put('/api/audios/groups',data);
}
