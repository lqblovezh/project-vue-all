import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl,
        component: () => import('./page/SecondRouter'),
        children: [
          {
            path: '/',
            redirect: 'home',
          },
          {
            path: 'home',
            component: () => import('@/page/Home'),
            meta: {
              level: 1
            }
          },
          {
            name: 'login',
            path: 'login',
            component: () => import('./page/User')
          },
          {
            path: 'login/phone',
            component: () => import('./page/User/login-phone')
          },
          {
            path: 'login/forget-password',
            component: () => import('./page/User/forget-password')
          },
          {
            path: 'register',
            component: () => import('./page/User/register')
          },
          {
            path: 'subject-list',
            component: () => import('./page/Subject'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'subject-detail',
            component: () => import('./page/Subject/detail'),
            meta: {
              level: 3,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'hot-list',
            component: () => import('./page/Home/hot-list'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'search',
            component: () => import('./page/Search'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'search/result',
            component: () => import('./page/Search/result'),
            meta: {
              level: 3,
              auth: true
            }
          },
          {
            path: 'category',
            component: () => import('./page/Category'),
            meta: {
              level: 1,
              auth: true
            }
          },
          {
            path: 'category/book-list',
            component: () => import('./page/Category/book-list'),
            meta: {
              level: 2,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'book-detail',
            name: 'book',
            component: () => import('./page/Book/detail'),
            meta: {
              level: 4,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'book-detail/comment',
            component: () => import('./page/Book/comment'),
            meta: {
              level: 5,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'book-detail/comment/edit',
            component: () => import('./page/Book/comment-edit'),
            meta: {
              level: 5,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'book-detail/catalog',
            component: () => import('./page/Book/catalog'),
            meta: {
              level: 5,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'knowledge-point',
            component: () => import('./page/Knowledge'),
            meta: {
              level: 5,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'knowledge-point/list',
            component: () => import('./page/Knowledge/chapter-list'),
            meta: {
              level: 6,
              auth: true,
              is_vip: true
            }
          },
          {
            path: 'book-room',
            component: () => import('./page/book-room'),
            meta: {
              level: 1,
              auth: true
            }
          },
          {
            path: 'my',
            component: () => import('./page/My'),
            meta: {
              level: 1,
              auth: true
            }
          },
          {
            path: 'my/info',
            component: () => import('./page/My/info'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/read-history',
            component: () => import('./page/My/read-history'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/quote-record',
            component: () => import('./page/My/quote-record'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/annotation',
            component: () => import('./page/My/annotation'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/comment',
            component: () => import('./page/My/comment'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/vip',
            component: () => import('./page/My/vip'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/vip/transaction-record',
            component: () => import('./page/My/transaction-record'),
            meta: {
              level: 3,
              auth: true
            }
          },
          {
            name: 'vip-buy',
            path: 'my/vip/pay',
            component: () => import('./page/My/vip-pay'),
            meta: {
              level: 4,
              auth: true
            }
          },
          {
            path: 'my/system-setting',
            component: () => import('./page/My/system-setting'),
            meta: {
              level: 2,
              auth: true
            }
          },
          {
            path: 'my/system-setting/safe-settings',
            component: () => import('./page/My/safe-settings'),
            meta: {
              level: 3,
              auth: true
            }
          },
          {
            path: 'my/system-setting/safe-settings/update-password',
            component: () => import('./page/My/update-password'),
            meta: {
              level: 4,
              auth: true
            }
          },
          {
            path: 'my/system-setting/safe-settings/update-phone',
            component: () => import('./page/My/update-phone'),
            meta: {
              level: 4,
              auth: true
            }
          },
          {
            path: 'my/system-setting/help',
            component: () => import('./page/My/help'),
            meta: {
              level: 3,
              auth: true
            }
          },
          {
            path: 'reader',
            component: () => import('./page/Reader'),
            meta: {
              level: 7,
              auth: true,
              is_vip: true
            }
          }
        ],
      },
    ],
  })
}
