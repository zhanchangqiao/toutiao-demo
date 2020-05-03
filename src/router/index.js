import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/index.vue'
import home from '@/views/home/index.vue'
import firstpage from '@/views/firstpage/firstpage.vue'
import Article from '@/views/article/article.vue'
import Publish from '@/views/publish/publish.vue'
import Image from '@/views/image/image.vue'
import Comment from '@/views/comment/comment.vue'
import Setting from '@/views/setting/setting.vue'
import Fans from '@/views/fans/fans.vue'
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
      },
      {
        path: '/publish',
        name: 'publish',
        component: Publish
      },
      {
        path: '/image',
        name: 'iamge',
        component: Image
      },
      {
        path: '/comment',
        name: 'comment',
        component: Comment
      },
      {
        path: '/setting',
        name: 'setting',
        component: Setting
      },
      {
        path: '/fans',
        name: 'fans',
        component: Fans
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
