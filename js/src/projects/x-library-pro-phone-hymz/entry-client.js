import { createApp } from './app'
const { app, router, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// reader3.mergeI18n({
//   PREV_CHAPTER: function () { return '上一篇' },
//   NEXT_CHAPTER: function () { return '下一篇' },
//   FONT_DECREASE: function () { return '字体缩小' },
//   FONT_INCREASE: function () { return '字体放大' },
//   NIGHT_SHIFT: function () { return '夜间模式' },
//   DAY_SHIFT: function () { return '日间模式' }
// })

router.onReady(() => {
  hidePreLoad()

  app.$mount('#app')
})
function hidePreLoad () {
  let node = document.querySelector('.my-pre-mask')
  node.classList.add('load-hide')
  setTimeout(() => {
    node.style.display = 'none'
  }, 600)
}
