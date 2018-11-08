import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userData: {
            userName: '李四'
        },
        menuData: []
    },
    mutations: {
        saveUserData(state, obj) {
            state.userData = obj;
        },
        saveMenuData(state, arr) {
            state.menuData = arr;
        }
    },
    getters: {
        mainMenuData(state) {
            return state.menuData.filter(i => i.menuName !== '平台管理');
        },
        manageMenuData(state) {
            return state.menuData.filter(i => i.menuName === '平台管理')[0].children;
        },
        userData(state) {
            return state.userData;
        }
    },
    actions: {}
});
