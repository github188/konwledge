// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import directive from '@/components/directive'
import method from './components/method'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/scss/common/index.scss'
import FillContent from '@/components/content/FillContent'
import * as commonComps from '@/components/common'
import store from './vuex/store'
import VueI18n from 'vue-i18n'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(FillContent)
Vue.use(directive)
Vue.use(method)
Vue.use(VueI18n)

for (let i in commonComps) {
  Vue.use(commonComps[i])
}

const i18n = new VueI18n({
  locale: 'zh', // 语言识别
  messages: {
    'zh': require('./assets/lang/zh'),
    'en': require('./assets/lang/en')
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  components: { App },
  template: '<App/>'
})
