import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex/store"

import "babel-polyfill"
import "./assets/scss/reset.scss"

import {busPlugin} from "./plugins/"
Vue.use(busPlugin);

import "../element-css/icon.css"
import "../element-css/tabs.css"
import "../element-css/tab-pane.css"
import "../element-css/scrollbar.css"
import ElTabs from "../element-packages/tabs/index"
import ElPane from "../element-packages/tab-pane/index"
Vue.use(ElTabs);
Vue.use(ElPane);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})




/**
 *
 * 　　　┏┓　　　┏┓
 * 　　┏┛┻━━━┛┻┓
 * 　　┃　　　　　　　┃
 * 　　┃　　　━　　　┃
 * 　　┃　┳┛　┗┳　┃
 * 　　┃　　　　　　　┃
 * 　　┃　　　┻　　　┃
 * 　　┃　　　　　　　┃
 * 　　┗━┓　　　┏━┛Code is far away from bug with the animal protecting
 * 　　　　┃　　　┃    神兽保佑,代码无bug
 * 　　　　┃　　　┃
 * 　　　　┃　　　┗━━━┓
 * 　　　　┃　　　　　 ┣┓
 * 　　　　┃　　　　 ┏┛
 * 　　　　┗┓┓┏━┳┓┏┛
 * 　　　　　┃┫┫　┃┫┫
 * 　　　　　┗┻┛　┗┻┛
 *
 */
