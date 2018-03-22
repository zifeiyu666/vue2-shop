import Util from '../../util/common'
import * as types from '../types'
const state = {
  token:0
}

const mutations = {
  CHANGE_TOKEN (state,res) {
    state.token = res
  },
  LOG_IN (state, res) {
    console.log('登录')
  },
  LOG_OUT (state, res) {
    console.log('登出')
  }
}


export default {
  state,
  mutations
}
