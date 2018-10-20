import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/signin',
      name: 'Signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/user/:uid',
      name: 'Mypage',
      component: () => import('./views/Mypage.vue'),
      meta: {requireAuth: true}
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requireAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signup',
          query: {redirect: to.fullPath}
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
