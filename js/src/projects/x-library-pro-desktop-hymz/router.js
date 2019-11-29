import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl,
        component: () => import('./pages/Router'),
        children: [
          {
            path: '/',
            redirect: 'home',
          },
          {
            path: 'home',
            component: () => import('./pages/Home'),
            meta: {
              hide_sidebar: true,
              // keepAlive: true,
            },
          },
          {
            path: 'advance-search',
            component: () => import('./pages/Home/search'),
            meta: {
              requireAuth: true,
              checkVip: true,
            },
          },
          {
            path: 'result',
            component: () => import('./pages/Home/result'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'helpCenter',
            component: () => import('./components/common/helpCenter'),
            meta: {
              hide_sidebar: false,
              requireAuth: true,
            },
          },
          {
            path: 'hotread',
            component: () => import('./pages/Book/hot'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'category',
            component: () => import('./pages/Category'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'subject',
            component: () => import('./pages/Subject'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'indexTable',
            component: () => import('./pages/IndexTable'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'indexTable/chapters',
            component: () => import('./pages/Knowledge/chapters'),
            meta: {
              requireAuth: true,
              checkVip: true,
            },
          },
          {
            path: 'subject/detail/:sid',
            name: 'subject_detail',
            component: () => import('./pages/Subject/detail'),
            meta: {
              hide_sidebar: true,
              requireAuth: true,
              checkVip: true,
            },
          },
          {
            path: 'knowledge',
            component: () => import('./pages/Knowledge/'),
            meta: {
              requireAuth: true,
            },
          },
          {
            path: 'knowledge/chapters',
            component: () => import('./pages/Knowledge/chapters'),
            meta: {
              requireAuth: true,
              checkVip: true,
            },
          },
          {
            path: 'book-detail',
            name: 'book_detail',
            component: () => import('./pages/Book'),
            meta: {
              requireAuth: true,
              checkVip: true,
            },
          },
          {
            path: 'book-knowledge',
            component: () => import('./pages/Book/knowledge'),
            meta: {
              hide_sidebar: true,
              requireAuth: true,
              checkVip: true,
            },
          },
          {
            path: 'members',
            component: () => import('./pages/UserCenter/members'),
            meta: {
              hide_sidebar: true,
              requireAuth: true,
            },
          },
          {
            path: 'user',
            component: () => import('./pages/UserCenter'),
            children: [
              {
                path: '/',
                redirect: 'center',
              },
              {
                path: 'center',
                component: () => import('./pages/UserCenter/center'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'read',
                component: () => import('./pages/UserCenter/read'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'bookRoom',
                component: () => import('./pages/UserCenter/bookRoom'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'annot',
                component: () => import('./pages/UserCenter/annot'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'record',
                component: () => import('./pages/UserCenter/record'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'assess',
                component: () => import('./pages/UserCenter/assess'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'vip',
                component: () => import('./pages/UserCenter/vip'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'account',
                component: () => import('./pages/UserCenter/account'),
                meta: {
                  requireAuth: true,
                },
              },
              {
                path: 'security',
                component: () => import('./pages/UserCenter/security'),
                meta: {
                  requireAuth: true,
                },
              },
            ],
          },
          {
            path: 'user-services',
            component: () => import('./pages/UserCenter/services'),
            meta: {
              hide_sidebar: true,
            },
          },
        ],
      },
      {
        path: '/reader',
        component: () => import('./pages/Reader'),
        meta: {
          hide_sidebar: true,
          requireAuth: true,
          checkVip: true,
        },
      },
    ],
    scrollBehavior(to, from, savePosition) {
      if (savePosition) {
        return savePosition
      } else {
        return { x: 0, y: 0 }
      }
    },
  })
}
