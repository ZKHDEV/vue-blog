import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import types from './store/mutation-types'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: resolve => require(['./components/Home/Index.vue'], resolve),
    children: [
      {
        path: '',
        name: '/',
        component: resolve => require(['./components/Home/Main.vue'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['./components/Common/Login.vue'], resolve)
  },
  {
    path: '/admin',
    meta: {
      auth: true
    },
    component: resolve => require(['./components/Layout/Admin.vue'], resolve),
    children: [
      {
        path: '',
        name: '/',
        component: resolve => require(['./components/Welcome.vue'], resolve)
      },
      {
        path: 'post',
        name: 'post',
        component: resolve => require(['./components/Admin/Post/List.vue'], resolve),
      },
      {
        path: 'post-new',
        name: 'post-new',
        component: resolve => require(['./components/Admin/Post/New.vue'], resolve)
      },
      {
        path: 'post-edit/:postId',
        name: 'post-edit',
        component: resolve => require(['./components/Admin/Post/Edit.vue'], resolve)
      },
      {
        path: 'category',
        name: 'category',
        component: resolve => require(['./components/Admin/Post/Category.vue'], resolve)
      },
      {
        path: 'upload',
        name: 'upload',
        component: resolve => require(['./components/Upload/Upload.vue'], resolve)
      }
    ]
  }
]

if (window.localStorage.getItem('back_token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('back_token'))
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.auth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  else {
    next();
  }
})

export default router;