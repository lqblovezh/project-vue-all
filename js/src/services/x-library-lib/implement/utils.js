/**
  error = {
  details:Array<Object>, // 优先判断
  message:String, // 缺省错误信息
}
*/
export function mockSuccess(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data)
    }, 0)
  })
}
export function mockFailure(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        details: [], // 优先判断
        message: '', // 缺省错误信息
      })
    }, 2000)
  })
}
