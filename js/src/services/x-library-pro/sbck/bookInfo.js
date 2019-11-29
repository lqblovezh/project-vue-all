import { decorate } from 'core-decorators'
import { isBrowser } from 'browser-or-node'
import {request_post,request_get,request_put,request_delete} from 'services/common/request'
import Joi from 'joi'

class BookInfo {
  async getDetail (bookId) {
    const { data: {
      access_code,
      chapters,
    } } = await request_get('/api/book/info_home', {
        _id: bookId
    })
    return {
      ...convertBookDetail(chapters),
      access_code,
    }
  }

  async getRelativeBooks (bookId) {
    const { data } = await request_get('/api/book/recommend', {
      book_id: bookId,
    })
    return data.map(convertBookInfo)
  }

  async getTopBooks () {
    return request_get('/api/home_book_count')
  }
}

export default new BookInfo()

export function convertBookInfo ({
  id,
  book_id,
  book_name,
  author_name,
  img,
  img_src,
}) {
  return {
    id: book_id || id,
    name: book_name,
    author: author_name,
    img:img || img_src,
  }
}

function convertBookDetail ({
  id,
  author_name,
  book_name,
  img_src,
  // product_id,
  create_time,
  update_time,
  is_join,
  is_read,
  info: {
    product_id,
    abs,
    components: {
      books: [book]
    },
    search: {
      annotation,
      belong_to,
      edition,
      place,
      source,
      subject,
      version,
      'can_yu_zhe_（_zhao_dai_）': author_1,
      'can_yu_zhe': author_2,
      years,
      publisher,
    },
    // serch: {
      // root_classify,
    // },
    tag,
  }
}) {
  console.log(333333333)
  console.log(edition)
  return {
    id,
    img: img_src,
    name: book_name,
    author: author_name,
    version: edition,
    printOrder: version,
    owner: belong_to,
    inscribe: subject,
    collection: place,
    skoliast: annotation,
    printPeople: publisher,
    publishTime: years,
    source,
    abs,
    tags: tag,
    bookId: book.id,
    is_join: is_join,
    isRead: is_read,
    product_id,
    catalogs: convertCatalogs(book.chapters),
  }
}

function convertCatalogs (chapters) {
  const map = {}
  const list = []
  chapters.forEach(({
    id,
    pid,
    chapter_id,
    index,
    chapter_name,
  })=> {
    const item = {
      chapterId: id,
      chapterRid: index.split(' ')[1],
      name: chapter_name,
    }
    map[item.chapterId] = item
    if (pid == 'root') {
      list.push(item)
    } else {
      const parent = map[pid]
      if (parent) {
        if (!parent.children) {
          parent.children = []
        }
        parent.children.push(item)
      }
    }
  })
  return list
}
