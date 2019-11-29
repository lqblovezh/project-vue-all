import {request_post,request_get,request_put,request_delete} from 'services/common/request'
class Typeface {
  /**
   * 获取简繁字体
   * @param {Object} data
   * @param {String} data.simp  搜索简繁字体
   */
   getList(data){
     return request_get('/api/simp',data)
   }
   /**
    * 详情
    */
   detail(data){
     return request_get(`/api/simp/${data.simp}`,data)
   }
   /**
    * 添加修改
    */
   save(data){
     data.trad = data.trad.map(el => {
       return el.trad
     })
     if(data.id){
       return request_put(`/api/simp/${data.id}`,data)
     }
     return request_post('/api/simp',data)
   }
   /**
    * 删除
    * @param {Object} data
    * @param {Array} data.id
    */
   del(data){
     return request_post('/api/simp/delete',data)
   }
   /**
    * 删除繁体字
    * @param {Object} data
    * @param {Array} data.id
    */
   dels(data){
     return request_post('/api/simp/id/delete',data)
   }
}

export default new Typeface
