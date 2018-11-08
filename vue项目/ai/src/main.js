import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './common/elementReset.less';
import './common/commom.less';

import services from './common/service'; // 所有请求的合集
import tools from './common/tools'; // 所有工具的合集
import { Dialog } from './components/common'; // 所有逻辑组建的和集

Vue.use(ElementUI);
Vue.use(Dialog);
Vue.config.productionTip = false;
// 将全局方法和请求添加到对象属性上
Vue.prototype._services = services;
Vue.prototype.tools = tools;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
