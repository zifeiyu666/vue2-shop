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
    userInfo:  {},
    selectedProp: undefined,
    allMoney: '',
    allJS: ''
  },
  mutations: {
    updateAllMoney(state, res) {
      console.log('全部金额')
      console.log(res)
      state.allMoney = res
    },
    updateAllJs(state, res) {
      state.allJS = res
    },
    setUserInfo(state, res) {
      console.log('已经存储用户信息')
      state.userInfo = res
    },
    saveSelectedProp(state, res) {
      console.log('保存用户选择规格')
      console.log(res)
      state.selectedProp = res
    }
  }
})
