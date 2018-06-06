import Vue from 'vue'
import Router from 'vue-router'

//首页和其他路由
const Home = resolve => require(['views/Home'], resolve);
const test = resolve => require(['../views/test/Test.vue'], resolve);

const checkbox =  resolve => require(['../views/checkbox/checkbox.vue'], resolve);

//element-ui
const elTabs =  resolve => require(['../element/examples/tabs.vue'], resolve);

//mint-ui
const loadmore =  resolve => require(['../mint-ui/examples/loadmore.vue'], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
    {path: '/', redirect: 'home'},
    {path: '/home', component: Home},
    {path: '/test', component: test},


    {path: '/checkbox', component: checkbox},
//element-ui
    {path: '/elTabs', component: elTabs},

//mint-ui
    {path: '/loadmore', component: loadmore},
  ]
})
router.beforeEach((to, from, next) => {
  //token验证功能,token过期则跳回登陆界面
  next();
});
export default router;



