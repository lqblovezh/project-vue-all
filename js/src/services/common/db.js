import qs from 'qs';
import {request_post,request_get,request_put,request_delete,request_file} from 'services/common/request';
/**
  * 数据库备份添加
  * @return {Promise}
  * @param {Object} data - 传入对象
  * @param {String} data.task_id - 任务ID
  * @param {Number} data.status - 状态
  * @param {Number} data.percent - 完成百分比
  * @param {String} data.messages - 任务状态说明
  * @param {String} data.create_time
  * @param {String} data.update_time
*/
export function addBackups(data = {}){
  return request_post('/common/api/db/backups', data).then(res => {
    const { task_id, status, percent, messages, create_time, update_time } = result.data
    addResListener({
      res_id: task_id,
      res_status: status,
      res_percent: percent,
      res_messages: messages,
    })
    return result
  })
}

/**
  * 数据库备份列表
  * @return {Promise}
  * @param {Object}  data - 传入对象
  * @param {String} data.task_id - 任务ID
  * @param {Number} data.status - 状态(0等待备份，1备份中，2备份完成，-1备份失败)
  * @param {String} data.percent - 完成百分比
  * @param {String} data.messages - 任务状态说明
  * @param {String} data.create_time
  * @param {String} data.update_time
  * @param {Object} data.restore - 最后一次还原任务
*/
export function backupAndRestoreList(){
  return request_get('/common/api/db/backups')
}

/**
  *数据库备份删除
  * @param {Promise}
  * @param {Object} data - 传入对象
  * @param {String} data.task_id - 任务ID
  * @param {Number} data.status - 状态
  * @param {Number} data.percent - 完成百分比
  * @param {String} data.messages - 任务状态说明
  * @param {String} data.create_time
  * @param {String} data.update_time
*/
export function deleteBackupAndRestore(data={}){
  return request_delete('/common/api/db/backups/'+data.task_id)
}

/**
  * 数据库备份恢复
  * @return {Promise}
  * @param {Object} data - 传入对象
  * @param {String} data.task_id - 任务ID
  * @param {Number} data.status - 状态(0等待备份，1备份中，2备份完成，-1备份失败)
  * @param {String} data.percent - 完成百分比
  * @param {String} data.messages - 任务状态说明
  * @param {String} data.create_time
  * @param {String} data.update_time
*/
export function restoreBackup(){
  return request_post('/common/api/db/restore')
}

/**
  * 数据库备份还原任务查询
  * @return {Promise}
  * @param {Object}  data - 传入对象
  * @param {String} data.task_id - 任务ID
  * @param {Number} data.status - 状态(0等待备份，1备份中，2备份完成，-1备份失败)
  * @param {String} data.percent - 完成百分比
  * @param {String} data.messages - 任务状态说明
  * @param {String} data.create_time
  * @param {String} data.update_time
  * @param {Object} data.restore - 最后一次还原任务
*/
export function queryBackupRestore(data={}){
  return request_get('/common/api/db/backups/'+data.task_id)
}
