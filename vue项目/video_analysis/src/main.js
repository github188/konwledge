// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import directive from '@/components/directive'
import method from './components/method'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/common/index.scss'
import FillContent from '@/components/content/FillContent'
import {Dialog} from '@/components/common'
import store from './vuex/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(FillContent)
Vue.use(Dialog)
Vue.use(directive)
Vue.use(method)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
