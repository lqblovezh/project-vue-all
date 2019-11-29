import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'
import {dateRules} from '../extend/schemas'
import { Book} from './Book.js'
class Book_hymz extends Book {
    constructor() {
      super()
    }
  /**
   * 书籍列表
   * @param {Object} data
   * @param {String} data.name 书籍名 和 作者名
   * @param {String} data.status
   */
  getList(data){
    if(data.book_name){
      data.name = data.book_name
    }
    return request_get('/api/books',data).then(res => {
      const data=res.data.map(el => {
        return {
          id:el.id,
          img_src:el.books_info.img_src,
          book_name: el.books_info.name,
          status_type:el.status_name,
          status:el.books_info.status,
          author:el.books_info.author,
          create_time:el.books_info.create_time,
        }
      })
      return {
        data,
        page:res.page,
      }
    })
  }

  /**
   * 书籍上下架
   * @param {Object} data
   * @param {Array} data._ids
   * @param {String} data.status  'true', 'false'
   */
  online(data){
    if(!Array.isArray(data.id)){
      data.id = [data.id]
    }
    if(data.type=='up'){
      return request_put('/api/books/put',{
        id:data.id,
      })
    }
    return request_put('/api/books/pull',{
      id:data.id,
    })
  }
  /**
   * 书籍详情  后台
   * @param {Object} data
   * @param {String} data._id
   */
  async detail({id}){
    return request_get(`/api/books/${id}`).then(res => {
      const constitute = res.data.books_info.components.books
      return {
        data:{
          attributes:res.data.books_info.attributes,
          constitute,
          knowledge:res.data.books_info.knowledge,
          author: res.data.books_info.author,
          name:res.data.books_info.name,
          tag:res.data.books_info.tag,
          abs:res.data.books_info.abs,
          img_src:res.data.books_info.img_src,
        },
      }
    })
  }


}

export default new Book_hymz
