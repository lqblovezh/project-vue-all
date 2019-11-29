import { default as reader } from '../reader'
import { getDetailBookInfo } from '../implement/hymz/book'
import UserCenter from 'services/x-library-lib/hymz/UserCenter'
import { Message } from 'element-ui'

async function render_relative_page(
  { pageCN, pageEN, bookName, chapterName, chapterRid, selectedText },
  { extraParams }
) {
  console.warn(extraParams)
  const {
    author,
    bookname,
    publishInfo: { publisher },
    publish_year,
    translator,
    ...others
  } = await getDetailBookInfo({
    bookId: extraParams.id,
  })
  const list = []
  author && list.push(author)
  translator && list.push(translator + '译')
  list.push(`《${bookname || bookName}》`)
  publisher && list.push(publisher)
  publish_year && list.push(publish_year)
  pageCN && list.push(`第 ${pageCN} 页`)
  pageEN && list.push(`原著第 ${pageEN} 页`)
  const text = list.join('，')

  const quote_count = extraParams.quote_count

  if (quote_count) {
    selectedText = selectedText.substr(0, quote_count)
  }

  let html = `<div style="padding: 1em;"><p>“${selectedText}”</p><p>——${text}</p></div>`
  let textHtml = `“${selectedText}”\n——${text}`
  let { message } = await UserCenter.add({
    content: selectedText,
    book_id: extraParams.id,
    chapter_id: chapterRid,
    book_author: author,
    book_name: bookName,
    chapter_name: chapterName,
    text: textHtml,
    preview: html,
  }).catch(({ payload }) => {
    // Message({ message: payload.message, type: 'error', showClose: true })
    throw new Error(payload.message)
  })

  if (quote_count) {
    message = `成功引用${selectedText.length}个字`
  }

  return {
    html,
    text: textHtml,
    message,
  }
}

async function render_reference(
  { pageCN, pageEN, bookName, chapterName, chapterRid, selectedText },
  { extraParams }
) {
  const {
    author,
    bookname,
    publishInfo: { publisher },
    publish_year,
    translator,
    ...others
  } = await getDetailBookInfo({
    bookId: extraParams.id,
  })
  const list = []
  author && list.push(author)
  translator && list.push(translator + '译')
  list.push(`《${bookname || bookName}》`)
  publisher && list.push(publisher)
  publish_year && list.push(publish_year)
  pageCN && list.push(`第 ${pageCN} 页`)
  pageEN && list.push(`原著第 ${pageEN} 页`)
  const text = list.join('，')

  const quote_count = extraParams.quote_count

  if (quote_count) {
    selectedText = selectedText.substr(0, quote_count)
  }

  let html = `<div style="padding: 1em;"><p>“${selectedText}”</p><p>——${text}</p></div>`
  let textHtml = `“${selectedText}”\n——${text}`

  let { message } = await UserCenter.quoteStatistics()

  if (quote_count) {
    message = `成功引用${selectedText.length}个字`
  }

  return {
    html,
    text: textHtml,
    message,
    params: {
      content: selectedText,
      book_id: extraParams.id,
      chapter_id: chapterRid,
      book_author: author,
      book_name: bookName,
      chapter_name: chapterName,
      text: textHtml,
      preview: html,
    },
  }
}

/**
 * 复制限制
 * @param {String} book_id
 */
export async function request_copy(
  { bookId, chapterRid, text },
  { extraParams }
) {
  const copy_count = extraParams.copy_count

  if (copy_count) {
    text = text.substr(0, copy_count)
  }
  let { message } = await UserCenter.copyStatistics()
  if (copy_count) {
    message = `成功复制${text.length}个字`
  }

  return {
    text,
    message,
    params: {
      book_id: extraParams.id,
    },
  }
}
export default {
  ...reader,
  request_copy,
  render_reference,
}
