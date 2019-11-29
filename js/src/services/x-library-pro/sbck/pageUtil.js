import {
  calculateStart,
  calculatePageNumber,
  calculateTotalPage,
} from 'page-converter'

export function toPhpPage (page = {}) {
  if (page.pageNum) {
    const pageOffset = page.pageOffset || 10
    return {
      pageStart: Number((page.pageNum - 1) * pageOffset),
      pageOffset,
    }
  }
  return page
}

export function parsePageFromPHP ({
  start = 0,
  offset = 10,
  total = 0,
} = {}) {
  return {
    pageNum: calculatePageNumber(start, offset),
    pageOffset: offset,
    total: calculateTotalPage(total, offset),  //总页数
    totalAll: total,                           //总的数据量
  }
}
