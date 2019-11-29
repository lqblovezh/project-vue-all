import {
  request_post,
  request_get,
  request_put,
  request_delete,
} from 'services/common/request'
class System {
  /**
   * 获取简繁字体
   * @param {Object} data
   * @param {String} data.simp  搜索简繁字体
   */
  getList(data) {
    return request_get('/api/setting', {
      key: [
        'vip1_icon',
        'vip2_icon',
        'vip3_icon',
        'vip4_icon',
        'vip5_icon',
        // 'vip6_icon',
        'privilege',
      ],
    }).then(res => {
      const array = res.data.filter(item => item.key === 'privilege')
      const array2 = res.data.filter(item => item.key != 'privilege')
      const newArray = array2.concat(array)

      return {
        data: newArray.map(item => {
          return {
            id: item.id,
            name: item.name,
            abs: item.abs,
            key: item.key,
            img: item.value,
            img_src: item.value_src,
          }
        }),
      }
    })
  }

  /**
   * 添加修改
   */
  save(data = []) {
    return request_post('/api/setting/multiple_edit', {
      multiple: data.map(item => {
        item.value = item.img
        return item
      }),
    })
  }
  /**
   * 系统设置页获取数据
   */
  getInfo(){
    return request_get('/api/setting/system')
  }
  /**
   * 系统设置页设置
   * @param {Object} data
   * @param {String} data.agreement
   * @param {String} data.code_src
   * @param {String} data.img
   * @param {String} data.img_src
   * @param {String} data.code
   * @param {String} data.name
   * @param {String} data.radio
   * @param {String} data.order_timeout
   */
  saveInfo(data){
    return request_post('/api/setting/system',data)
  }
}

export default new System()
