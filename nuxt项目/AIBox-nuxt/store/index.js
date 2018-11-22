import Vue from 'vue'
import Vuex from 'vuex'
import zh from '../assets/lang/zh/index'
import en from '../assets/lang/en/index'


//在prototype上挂载变量---start
Vue.prototype.$product = 'structured' // structured 代表嵌入式结构化分析器； target 代表一级结构化分析器
//在prototype上挂载变量---end

Vue.use(Vuex)

const store = () => new Vuex.Store({

  state: {
    counter: 0,
    language: '',
    userInfo: {
        name: 'Mr.Gao',
        company: 'seemmo'
    },
    isRouterAlive: true
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store