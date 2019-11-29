import * as common from 'services/common'

export function isFileBig(file, size = 50) {
  if (!file) return
  if (file.size / 1024 > size) {
    this.$message.error(`图片过大, 请上传小于${size}kb的图片`)
    return
  }
  return file
}
export async function globalUpdateFile(file) {
  let loading = this.$loading({
    text: '正在上传',
    background: 'rgba(0, 0, 0, 0.8)',
  })
  let res
  try {
    res = await common.getTask(file)
  } catch (error) {
    loading.close()
    return {}
  }
  loading.close()
  return res.data
}

export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return fmt
}

/**
 *
 * @param {*} refName 默认ids
 * @param {Object} data 过滤的数据
 * @param {String} name 需要过滤的名字
 * @param {String} value 需要过滤的值
 * @param {String} error 过滤时的弹出信息
 */
export function getChecked({
  isShowMessage = true,
  refName = 'ids',
  data,
  name,
  value,
  error,
} = {}) {
  let ids = []
  let names = this.$refs[refName] //这里的this指向调用该方法的组件
  if (!names) {
    throw new Error('没有该refName:' + refName)
  }
  for (let item of names) {
    if (item.checked) {
      if (data && name && value) {
        let index = data.findIndex(v => v[name] == value && v.id == item.value)
        if (index > -1) {
          if (error) {
            this.$message.error(error)
            return false
          }
          break
        }
      }
      ids.push(item.value)
    }
  }
  if (ids.length > 0) {
    return ids
  } else {
    if (isShowMessage) {
      this.$message.error('请先选中')
      return false
    } else {
      return []
    }
  }
}

export function checkAll(e, refName = 'ids', flag) {
  let names = this.$refs[refName] //这里的this指向调用该方法的组件
  changeCheck(names, e.target.checked)
}
export function unCheck(refName = 'ids', flag = false) {
  let names = this.$refs[refName] || [] //这里的this指向调用该方法的组件
  changeCheck(names, flag)
}

export function changeCheck(names, flag = false) {
  if (!names) {
    throw new Error('没有该refName:' + refName)
  }
  names.forEach(item => {
    item.checked = flag
  })
}
