import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./vuex/store"

import "babel-polyfill"
import "./assets/scss/reset.scss"
import 'element-ui/lib/theme-chalk/index.css';

// import {elTabs} from "./base/index";
import {busPlugin} from "./plugins/"
import {ElTabs} from "./packages/index"


// Vue.use(elTabs);
Vue.use(ElTabs);
Vue.use(busPlugin);

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
