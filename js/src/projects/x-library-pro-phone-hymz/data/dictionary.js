export default {
  custom: {
    email: {
      required: '请输入邮箱',
      email: '请输入正确格式的邮箱地址'
    },
    username: {
      required: '请输入用户名',
      min: (name, value) => `用户名的长度应不小于${value}`,
      max: (name, value) => `用户名的长度应不大于${value}`
    }
  }
}