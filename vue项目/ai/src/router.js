import Vue from 'vue';
import Router from 'vue-router';

import Login from './views/login.vue';
import Main from './views/main.vue';

Vue.use(Router);

// 不添加mode为history的话，路由方式是加#，导致不能立刻跳转，后面切成多页面的形式的时候会报错的
let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: '登录',
            redirect: '/login'
        },
        {
            path: '/login',
            name: '登录',
            component: Login
        },
        {
            path: '/main',
            name: '首页',
            component: Main,
            redirect: '/main/homepage',
            children: [
                {
                    path: '/main/homepage',
                    name: '首页',
                    component: () => import('./views/homepage.vue')
                },
                {
                    path: '/main/faceLibQuery',
                    name: '人脸检索',
                    component: () => import('./views/faceLibQuery.vue')
                },
                {
                    path: '/main/initial',
                    name: '违法初审',
                    component: () => import('./views/initial.vue')
                },
                {
                    path: '/main/confirm',
                    name: '违法复核',
                    component: () => import('./views/confirm.vue')
                },
                {
                    path: '/main/search',
                    name: '违法查询',
                    component: () => import('./views/search.vue')
                },
                {
                    path: '/main/illegalState',
                    name: '违法统计',
                    component: () => import('./views/illegalState.vue')
                },

                {
                    path: '/main/pretrialTest',
                    name: '预审测试数据导入',
                    component: () => import('./views/pretrialTest.vue')
                },
                {
                    path: '/main/dataImport',
                    name: '数据导入',
                    component: () => import('./views/dataImport.vue')
                },
                {
                    path: '/main/dataLabel',
                    name: '数据标注',
                    component: () => import('./views/dataLabel.vue')
                },
                {
                    path: '/main/preTestResult',
                    name: '预审测试结果',
                    component: () => import('./views/preTestResult.vue')
                },
                {
                    path: '/main/preTestCheck',
                    name: '预审测试审核',
                    component: () => import('./views/preTestCheck.vue')
                },
                {
                    path: '/main/deviceManage',
                    name: '设备管理',
                    component: () => import('./views/deviceManage.vue')

                }

            ]
        },

        {
            path: '/managePlatform',
            name: '平台管理',
            component: () => import('./views/managePlatform.vue'),
            redirect: '',
            children: [
                {
                    path: '/managePlatform/personalIndex',
                    name: '个人首页',
                    component: () => import('./views/personalIndex.vue')
                },
                {
                    path: '/managePlatform/deviceManage',
                    name: '设备管理',
                    component: () => import('./views/deviceManage.vue')
                },
                {
                    path: '/managePlatform/userManage',
                    name: '用户管理',
                    component: () => import('./views/userManage.vue')
                },
                {
                    path: '/managePlatform/operateLog',
                    name: '操作日志',
                    component: () => import('./views/operateLog.vue')
                },

                {
                    path: '/managePlatform/iaconfig',
                    name: '违法行为接入配置',
                    component: () => import('./views/iaconfig.vue')
                },
                {
                    path: '/managePlatform/pcconfig',
                    name: '号牌颜色配置',
                    component: () => import('./views/pcconfig.vue')
                },
                {
                    path: '/managePlatform/pdconfig',
                    name: '过车方向配置',
                    component: () => import('./views/pdconfig.vue')
                },
                {
                    path: '/managePlatform/dpconfig',
                    name: '数据发布管理',
                    component: () => import('./views/dpconfig.vue')
                },
                {
                    path: '/managePlatform/dfconfig',
                    name: '设备备案维护',
                    component: () => import('./views/dfconfig.vue')
                },
                {
                    path: '/managePlatform/carcolorconfig',
                    name: '车辆颜色维护',
                    component: () => import('./views/carcolorconfig.vue')
                },
                {
                    path: '/managePlatform/companyinfoconfig',
                    name: '厂商信息维护',
                    component: () => import('./views/companyInfoconfig.vue')
                }
            ]
        },

        {
            path: '*',
            name: '404notFound',
            component: () => import('./components/404.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title，判断登陆态 */

    if (to.path.startsWith('/login')) {
        if (to.name) {
            document.title = to.name;
        }
        next();
    } else {
        if (to.name) {
            document.title = to.name;
        }
        let token = window.sessionStorage.getItem('access-token');

        if (!token) {
            next({ path: '/login' });
        } else {
            next();
        }
    }
});

export default router;
