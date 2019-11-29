import { request_get, request_put, request_post } from '../../common/request'

class Special {
  getList(data) {
    /**
     * 主题列表
     * @param {Object} data
     * @param {String} data.name
     */
    return request_get('/api/theme', data).then(res => {
      const data = res.data.map(el => {
        return {
          id: el.id,
          img_src: el.img_src,
          name: el.name,
          status_type: el.is_show_name,
          create_time: el.create_time,
        }
      })
      return {
        data,
        page: res.page,
      }
    })
  }
  /**
   * 专题 新增 修改   有ID 时为修改
   * @param {Object} data
   * @param {String} data.id 专题id（修改时 需要）
   * @param {String} data.abs 简介
   * @param {String} data.name 标题
   * @param {String} data.img 封面
   * @param {String} data.is_show 是否显示（默认false）
   * @param {String} data.preview 正文
   * @param {Array} data.constitute [{book_id:''}]
   */
  save(data) {
    console.log(data, 'xxx')
    let constitute = []
    constitute =
      data.relation &&
      data.relation.map(el => {
        return { book_id: el.book_id || el.id }
      })
    const obj = {
      abs: data.abs,
      name: data.name,
      img: data.img_src,
      is_show: data.status,
      preview: data.text,
      constitute,
    }
    if (data.id) {
      obj.id = data.id
    }
    return request_put('/api/theme', obj)
  }
  /**
   * 删除
   */
  del(data) {
    return request_post('/api/theme/delete', data)
  }
  /**
   * 详情
   */
  detail(data) {
    return request_get(`/api/theme/${data.id}`).then(res => {
      const data = {
        id: res.data.id,
        img_src: res.data.img_src,
        img: res.data.img,
        name: res.data.name,
        abs: res.data.abs,
        number: 2,
        status: res.data.is_show == 'false' ? false : true,
        text: res.data.preview,
        create_time: res.data.create_time,
        relation: res.data.constitute,
      }
      return {
        data,
        page: res.page,
      }
    })
  }
}

export default new Special()
