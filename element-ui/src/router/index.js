import Vue from 'vue'
import Router from 'vue-router'

//首页和其他路由
const Home = resolve => require(['views/Home'], resolve);
const test = resolve => require(['../views/Test.vue'], resolve);

const tabs = resolve => require(['../pages/tabs.vue'], resolve);
const elTabs =  resolve => require(['../../element-example/tabs.vue'], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
    {path: '/', redirect: 'home'},
    {path: '/home', component: Home},
    {path: '/test', component: test},


    {path: '/tabs', component: tabs},
    {path: '/elTabs', component: elTabs},
  ]
})
router.beforeEach((to, from, next) => {
  //token验证功能,token过期则跳回登陆界面
  next();
});
export default router;



