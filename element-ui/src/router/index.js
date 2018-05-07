import Vue from 'vue'
import Router from 'vue-router'

//首页和其他路由
const Home = resolve => require(['views/Home'], resolve);
const test = resolve => require(['views/Test'], resolve);
const test2 = resolve => require(['../views/test2.vue'], resolve);
const tabs = resolve => require(['../views/example/tabs.vue'], resolve);
Vue.use(Router);

const router = new Router({
  routes: [
    {path: '/', redirect: 'home'},
    {path: '/home', component: Home},
    {path: '/tabs', component: tabs},



    {path: '/test', component: test},
    {path: '/test2', component: test2},
  ]
})
router.beforeEach((to, from, next) => {
  //token验证功能,token过期则跳回登陆界面
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // if (!getToken()) {
    //   router.push("/login");
    // }
  }
  next();
});
export default router;



