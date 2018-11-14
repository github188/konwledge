// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import "babel-polyfill"
Vue.config.productionTip = false;

// style
import './assets/font/iconfont.css'
import 'mint-ui/lib/style.css'
import './libs/scss/reset.scss'
import './libs/scss/base.scss'
import './libs/scss/common.scss'
import "./assets/scss/common1.scss"

import {wwwCheck} from "./assets/js/common";
// if(!wwwCheck()){ //这样写保证在正式环境不会引入这个文件，减小文件大小
//   let script =  document.createElement('script');
//   script.src = './vueStatic/resource/vconsole.min.js';
//   document.getElementsByTagName('body')[0].appendChild(script);
//   script.onload =function () {
//     new VConsole();
// 	}
// }

// plugin
import Storage from "./plugin/methods"
import {directive} from "./plugin/directive"
import Loading from './base/loading'
import header from "./base/header"
import VueLazyload from 'vue-lazyload'
import ElTabs from "./base/tabs"
import ElTabPane from "./base/tab-pane"
Vue.use(Loading);
Vue.use(directive);
Vue.use(header);
Vue.use(VueLazyload, {
  error: require('assets/img/lazy.png'),
  loading: require('assets/img/lazy.png'),
  attempt: 1
});
Vue.use(ElTabs);
Vue.use(ElTabPane);
Vue.use(Storage);

//重新定义tofixed；body高度
import {redefinitionToFixed,bodyRelative} from "./assets/js/common"
redefinitionToFixed();
bodyRelative();

import store from "./vuex/store"
/* eslint-disable no-new */
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
