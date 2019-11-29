import Comments from '../../mgr/Comments'
/**
 * 获取评论列表
 * @param {Object} data
 * @param {String} data.book_name - 选填字段 书籍名称
 * @param {String} data.nick_name - 选填字段 用户昵称
 * @param {String} data.user_type - 选填字段 书籍id 0-专家 1-普通
 * @param {String} data.pageNum - 页数
 * @param {String} data.pageOffset - 分页条数
 */
export async function getList(data = {}) {
  return Comments.getList(data).then(res => {
    const data = res.data.map(el => {
      if(el.state == 'wait'){
        el.status_type = '待审核'
      }else if ( el.state == 'fail'){
        el.status_type = '未通过'
      }else{
        el.status_type = '通过'
      }
      return {
        id:el.id,
        nike_name:el.user_name,
        user_type: '',
        status_type: el.status_type,
        content:el.content,
        book_name:el.book_name,
        create_time:el.create_time,
      }
    })
    return {
      data,
      page:res.page,
    }
  })
}

/**
 * 删除评论
 * @param {Array} data.id - 必有 评论id
 */
export async function del(data) {
  return Comments.del({
    _ids:data.id,
  })
}

/**
 * 获取评论通过
 * @param {Array} data.id - 必有 评论id
 */
export async function adopt(data) {
  data._ids = data.id
  data.state = 'success'
  return Comments.check(data)
}
