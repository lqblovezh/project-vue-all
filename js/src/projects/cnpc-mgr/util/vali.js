import VaForm from '@/components/common/VaForm'

export default {
  install(Vue, opts) {
    Vue.prototype.$vali = vali
    // 注册一个全局自定义指令 `v-va` 用于验证
    Vue.directive('va', {
      inserted(el, binding, vnode) {
        el.onblur = function() {
          vali([vnode])
        }
        el.onkeyup = function() {
          let maxlength = vnode.data.attrs && vnode.data.attrs.max
          let nextnode = vnode.elm.nextElementSibling
          if (vnode.elm.value.length > maxlength) {
            if (!nextnode) {
              vnode.elm.classList.remove('inputSuccess')
              vnode.elm.classList.add('inputDanger')
              vnode.elm.insertAdjacentHTML(
                'afterend',
                `<span class="errmsg">最大长度不能超过${maxlength}</span>`
              )
            }
          } else {
            vnode.elm.classList.remove('inputDanger')
            vnode.elm.classList.add('inputSuccess')
            if (nextnode && nextnode.className === 'errmsg') {
              vnode.elm.parentNode.removeChild(nextnode)
            }
          }
        }
      },
    })
    Vue.component('VaForm', VaForm) //全局验证组件
  },
}

//验证
function vali(arr = []) {
  var flags = true
  arr.forEach(item => {
    var val = item.elm.value
    var type = item.data.directives.filter(d => {
      return d.name === 'va'
    })[0]
    var reg = rules[type.value.type].reg || type.value.reg //正则
    var msg = type.value.msg || rules[type.value.type].msg //错误信息
    var flag = reg.test(val.trim()) // 匹配结果
    if (!flag) {
      flags = false
      item.elm.classList.remove('inputSuccess')
      item.elm.classList.add('inputDanger')
      var nextnode = item.elm.nextElementSibling
      if (nextnode && nextnode.className === 'errmsg') {
        item.elm.parentNode.removeChild(nextnode)
      }
      item.elm.insertAdjacentHTML(
        'afterend',
        `<span class="errmsg">${msg}</span>`
      )
    } else {
      item.elm.classList.remove('inputDanger')
      item.elm.classList.add('inputSuccess')
      var nextnode = item.elm.nextElementSibling
      if (nextnode && nextnode.className === 'errmsg') {
        item.elm.parentNode.removeChild(nextnode)
      }
    }
  })
  return flags
}

var rules = {
  required: {
    msg: '不能为空!',
    reg: /^.+$/,
  },
}

//常用正则表
var regList = {
  ImgCode: /^[0-9a-zA-Z]{4}$/,
  SmsCode: /^\d{4}$/,
  MailCode: /^\d{4}$/,
  UserName: /^[\w|\d]{4,16}$/,
  Password: /^[\w!@#$%^&*.]{6,16}$/,
  Mobile: /^1[3|4|5|7|8]\d{9}$/,
  RealName: /^[\u4e00-\u9fa5|·]{2,16}$|^[a-zA-Z|\s]{2,20}$/,
  BankNum: /^\d{10,19}$/,
  Money: /^([1-9]\d*|[0-9]\d*\.\d{1,2}|0)$/,
  Answer: /^\S+$/,
  Mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
}
