export default {
  rules: {
    name: {
      required: true,
      pattern: /[a-zA-Z0-9]+/,
      len: { min: 4, max: 16 },
    },
    password: {
      required: true,
      pattern: /^[a-zA-Z0-9_+@]+$/,
      len: { min: 4, max: 16 }
    },
    phone: {
      required: true,
      pattern: /^(13[0-9]|147|15[0-3]|15[5-9]|18[0256789]\d{9}$)/,
      len: 11
    }
  },
  messages: {
    name: {
      required: '请输入用户名',
      pattern: '用户名只能包含字母数字',
      len: '用户名的长度应该是4-16'
    },
    password: {
      required: '请输入密码',
      pattern: '请输入正确形式的密码',
      len: '密码长度需在4-16之间'
    },
    phone: {
      required: '请输入手机号码',
      pattern: '请输入有效的手机号码',
      len: '手机号码应是11位'
    }
  }
}