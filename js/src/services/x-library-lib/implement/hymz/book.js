import { mock, Random } from 'mockjs'
import Sort from 'services/x-library-lib/hymz/Sort'
import Book from 'services/x-library-lib/hymz/Book'
import Knowledge from 'services/x-library-lib/hymz/knowledge'
import CommentMsg from 'services/x-library-lib/mgr/Comments'
/**
 * 书房书籍列表
 * @param {Object} data
 */
export async function queryBookShelfList(data = {}) {
  return Book.getList(data).then(res => {
    const data = res.data.map(el => {
      let latest = {}
      try {
        latest = JSON.parse(el.read_record_data)._latest
      } catch (error) {
        console.warn('chapterName -> 获取失败')
      }
      return {
        id: el.id,
        book_id: el.book_id,
        book_shelf_id: el.book_shelf_id,
        book_name: el.name,
        create_time: el.create_time,
        author: el.author,
        picture: el.img_src,
        // book_shelf: el.book_shelf.Read,
        speed: latest.chapterName || '尚未阅读',
        product_id: el.product_id,
        chapterRid: latest.chapterRid,
        chapterId: latest.chapterId,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
/**
 * 书详情
 */

export async function getDetailBookInfo(data = {}) {
  let points = []
  // await Knowledge.getBookKnowledge({ id: data.bookId }).then(res => {
  //   console.log(res.data);
  //   points = res.data.knowledge
  // })
  return Book.detail({ id: data.bookId }).then(res => {
    const BI = res.data.books_info
    const hasJoin = res.data.book_shelf.Read
    const data = {
      auth_nationality: res.data.books_info.auth_nationality,
      id: res.data.id,
      book_shelf_id: res.data.book_shelf_id,
      book_id: BI.id,
      bookname: BI.name,
      abs: BI.abs,
      author: BI.author,
      translator: BI.translator,
      img: BI.img_src,
      publish_year: BI.year,
      points: res.data.knowledge,
      book_shelf: res.data.is_shelf,
      product_id: BI.product_id,
      has_join: hasJoin,
      publishInfo: {
        publisher: BI.press,
        ISBN: BI.isbn,
        version: BI.edition,
        own_book: BI.book_series,
        own_category: BI.theme_type,
      },
    }
    return data
  })
}

/**
 * 评论
 * @param  {Object} [data={}] [description]
 * @return {[type]}           [description]
 */
export async function getComments(data = {}) {
  return CommentMsg.list({
    book_id: data.bookId,
  }).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        commentor_name: el.user_name,
        commentor_avatar: el.picture,
        is_expert: el.expert, //是否为专家
        create_time: el.create_time,
        content: el.content,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}
/**
 * 书章节
 */
export async function getCatalog(data) {
  return Book.getCatalog({ id: data.bookId }).then(res => {
    const data = res.data.books.chapters.map(el => {
      el.name = el.chapter_name
      return el
    })
    return {
      data,
    }
  })
}
/**
 * 分类下的书籍列表
 * @param  {Object} data [description]
 * @param {String} data.id 分类id
 * @param {String} data.nationality 国籍【可不传】
 * @return {[type]}      [description]
 */
export async function queryBookListByCategoryId({ sid, ...args } = {}) {
  return Sort.detail({ ...args, id: sid }).then(res => {
    const data = res.data.map(el => {
      return {
        id: el.id,
        auth_nationality: el.auth_nationality,
        book_name: el.name,
        author: el.author,
        translator: el.translator,
        has_join: el.is_book_shelf,
        book_shelf_id: el.book_shelf_id,
        abs: el.abs,
        is_book_shelf: el.is_book_shelf,
        picture: el.img_src,
        points: el.knowledge,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 加入书房
 * @param {String} data.bookId 书籍id
 * @param {Object} [data={}] [description]
 */
export async function addToBookShelf(data = {}) {
  return Book.bookShelfAdd({
    book_id: data.bookId,
    type: 3,
  })
}

/**
 * 移出书房
 * @param {String} data.bookId 书籍id
 * @param {Object} [data={}] [description]
 */
export async function removeFromBookShelf({ bookId, book_shelf_id } = {}) {
  return Book.bookShelfDel({
    id: bookId,
    book_shelf_id,
  })
}

/**
 * 相关书籍【随机6本书】
 * @param  {Object} data [description]
 * @param {String} data.bookId 书籍id
 * @return {[type]}      [description]
 */
export async function queryRelatedBookList(data = {}) {
  data.book_id = data.bookId
  return Book.aboutBook(data).then(res => {
    const data = res.data.list.map(el => {
      return {
        id: el.book_id,
        picture: el.img_src,
        book_name: el.name,
        author: el.author,
      }
    })
    return {
      data,
      page: res.page,
    }
  })
}

/**
 * 获取书籍的access_code
 * @param {Object} data
 * @param {String} data.id
 */
export async function getAccessCode(data = {}) {
  return Book.getAccessCode(data)
}

/**
 * 添加书籍评论
 * @param {Object} data
 * @param {String} data.id 书籍id
 * @param {String} data.content 评论内容
 */
export async function addComment(data = {}) {
  return CommentMsg.add({
    book_id: data.id,
    content: data.content,
  })
}

/**
 * 图书知识点
 * @param {Object} data
 * @param {String} data.book_id
 */
export async function queryBookKnowledge({ bookId } = {}) {
  return Knowledge.getBookKnowledge({ id: bookId })
}
