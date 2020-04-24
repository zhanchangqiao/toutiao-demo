import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue'
import home from '@/views/home/index.vue'
import firstpage from '@/views/firstpage/firstpage.vue'
import Article from '@/views/article/article.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/',
    component: home,
    children: [
      {
        path: '',
        name: 'home',
        component: firstpage
      },
      {
        path: '/article',
        name: 'article',
        component: Article
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('token')
  if (to.path !== '/login') {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
export default router
