import Vue from 'vue'
import App from './App.vue'

import {NumRoll, Draw} from './components'
Vue.use(NumRoll)
Vue.use(Draw)

new Vue({
  render: h => h(App)
}).$mount('#app');