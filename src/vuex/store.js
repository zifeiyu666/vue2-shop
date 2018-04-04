//store.js
import Vue from 'vue'
import Vuex from 'vuex'

// 模块
import detail from './modules/detail'
import category from './modules/category'
import login from './modules/login'
import show from './modules/show'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    detail,
    category,
    login,
    show
  },
  state: {
    userInfo:  {}
  },
  mutations: {
    setUserInfo(state, res) {
      console.log('已经存储用户信息')
      state.userInfo = res
    }
  }
})
