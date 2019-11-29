export default class FileSlice {
  constructor(file, chunkSize = 1024 * 1024) {
    let start = 0,
      count = 0,
      file_size = file.size
    const total = Math.ceil(file_size / chunkSize)
    this.hasNext = () => {
      return start < file_size
    }

    this.next = () => {
      const end = start + chunkSize > file_size ? file_size : start + chunkSize
      const size = end - start
      const chunk = file.slice(start, end)
      start = end
      return {
        chunk,
        size,
        total,
        count: count++,
      }
    }
  }
}
