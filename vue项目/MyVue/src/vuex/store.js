/**
 * Created by pc-20170420 on 2017/5/4.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import {state} from "./state";
import {mutations} from "./mutations";
import {getters} from "./getters"
import {actions} from "./actions"

// 告诉 vue “使用” vuex
Vue.use(Vuex);

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})