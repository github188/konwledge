import Vue from 'vue'
import Router from 'vue-router'
import {cookie} from '../assets/js/common'

Vue.use(Router)

const Login = () => import('@/pages/login/Login.vue')
const Home = () => import('@/pages/Home.vue')

const CurrentTask = () => import('@/pages/currentTask/CurrentTask.vue')
const Ftp = () => import('@/pages/network/ftp/Ftp.vue')
const Ip = () => import('@/pages/network/ip/Ip.vue')

const ROI = () => import('@/pages/passageway/roi/ROI.vue')
const Passageway = () => import('@/pages/passageway/passageway/Passageway.vue')

const User = () => import('@/pages/user/User.vue')

const Device = () => import('@/pages/system/device/Device.vue')
const CheckTime = () => import('@/pages/system/checkTime/CheckTime.vue')
const HomeControl = () => import('@/pages/system/homeControl/HomeControl.vue')
const Authorize = () => import('@/pages/system/authorize/Authorize.vue')
const Record = () => import('@/pages/system/record/Record.vue')
const LevelUp = () => import('@/pages/system/levelUp/LevelUp.vue')
const AutoService = () => import('@/pages/system/autoService/AutoService.vue')

const Test = () => import('@/pages/test/DataImport.vue')

const router = new Router({
  routes: [
    {
      path: '/',
      component: Home,
      meta: {requiresAuth: true},
      children: [
        {
          path: '/',
          component: CurrentTask
        },
        {
          path: 'currentTask',
          name: 'currentTask',
          component: CurrentTask
        },
        {
          path: 'ip',
          component: Ip
        },
        {
          path: 'ftp',
          component: Ftp
        },
        {
          path: '/roi',
          component: ROI
        },
        {
          path: '/device',
          component: Device
        },
        {
          path: '/checkTime',
          component: CheckTime
        },
        {
          path: '/homeControl',
          component: HomeControl
        },
        {
          path: '/authorize',
          component: Authorize
        },
        {
          path: '/passageway',
          component: Passageway
        },
        {
          path: '/record',
          component: Record
        },
        {
          path: '/levelUp',
          component: LevelUp
        },
        {
          path: '/user',
          component: User
        },
        {
          path: '/autoService',
          component: AutoService
        },
        {
          path: '/test',
          component: Test
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
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
