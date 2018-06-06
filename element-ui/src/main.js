import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex/store"

import "babel-polyfill"
import "./assets/scss/reset.scss"

import {busPlugin} from "./plugins/"
Vue.use(busPlugin);

//引用element-ui （包括css和js）
import "./element/element-use"

//引用mint-ui （包括css和js）
import "./mint-ui/mint-ui-use"

//引用自定义组件
import {header,wrapper} from "./base/index"
Vue.use(header);
Vue.use(wrapper);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
