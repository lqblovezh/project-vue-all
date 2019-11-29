import {request_post,request_get,request_put,request_delete} from 'services/common/request'

class Copyright {
  getList(data){
    return request_get('/api/copyright',data)
  }
  /**
   * 设置版权
   * @param {Object} data
   * @param {String} data.img logo
   * @param {String} data.transparency 透明度
   * @param {String} data.density 水印密度
   * @param {String} data.data 备用数据
   * @param {String} data.copy_number 允许复制字数
   */
  save(data){
    return request_post('/api/copyright',data)
  }
}

export default new Copyright