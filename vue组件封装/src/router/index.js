import Vue from 'vue'
import Router from 'vue-router'
import {cookie} from '../assets/js/common'

Vue.use(Router)

const Home = () => import('@/pages/Home.vue')
const CurrentTask = () => import('@/pages/currentTask/CurrentTask.vue')
const Main = () => import('@/pages/Main.vue')
const Header = () => import('@/pages/Header.vue')

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {requiresAuth: false},
      children: [
        {
          path: '/',
          components: {
            default: Main,
            header: Header
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!cookie.get('seemmo')) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }

  next()
})

export default router
