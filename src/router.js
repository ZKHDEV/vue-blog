import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store/store'
import types from './store/mutation-types'

Vue.use(VueRouter)

const routes = [
  {
    path: '/test',
    name: 'test',
    component: resolve => require(['./components/Test.vue'], resolve)
  },
  {
    path: '/u/:uid',
    name: 'index',
    component: resolve => require(['./components/Index/Index.vue'], resolve),
    children: [
      {
        path: '/',
        name: '/',
        component: resolve => require(['./components/Index/Home.vue'], resolve)
      },
      {
        path: 'post/:postId',
        name: 'post',
        component: resolve => require(['./components/Index/Post.vue'], resolve)
      },
      {
        path: 'cate/:cateId?',
        name: 'cate',
        component: resolve => require(['./components/Index/Category.vue'], resolve)
      },
      {
        path: 'gallery',
        name: 'gallery',
        component: resolve => require(['./components/Index/Gallery.vue'], resolve)
      },
      {
        path: 'about',
        name: 'about',
        component: resolve => require(['./components/Index/About.vue'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['./components/Index/Login.vue'], resolve)
  },
  {
    path: '/admin',
    name: 'admin',
    meta: {
      auth: true
    },
    component: resolve => require(['./components/Admin/Layout/Admin.vue'], resolve),
    children: [
      {
        path: '',
        name: 'welcome',
        component: resolve => require(['./components/Admin/Welcome.vue'], resolve)
      },
      {
        path: 'post',
        name: 'admin-post',
        component: resolve => require(['./components/Admin/Post/List.vue'], resolve),
      },
      {
        path: 'post-new',
        name: 'admin-post-new',
        component: resolve => require(['./components/Admin/Post/Write.vue'], resolve)
      },
      {
        path: 'post-edit/:postId',
        name: 'admin-post-edit',
        component: resolve => require(['./components/Admin/Post/Write.vue'], resolve)
      },
      {
        path: 'category',
        name: 'admin-category',
        component: resolve => require(['./components/Admin/Post/Category.vue'], resolve)
      },
      {
        path: 'upload',
        name: 'admin-upload',
        component: resolve => require(['./components/Admin/Upload/Upload.vue'], resolve)
      }
    ]
  }
]

if (window.localStorage.getItem('macro_login_user')) {
  store.commit(types.LOGIN, JSON.parse(window.localStorage.getItem('macro_login_user')))
} else {
  store.commit(types.LOGOUT)
}

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
  //缺省路由
  if(!to.name){
    if(store.state.loginUser && store.state.loginUser.phone){
      next({
        name: 'index',
        params: {uid: store.state.loginUser.id}
      })
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  }
  //用户校验
  if (to.matched.some(r => r.meta.auth)) {
    if (store.state.loginUser && store.state.loginUser.token) {
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