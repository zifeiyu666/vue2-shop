import Util from '../../util/common'
import * as types from '../types'
const state = {
  itemList: [],
  currentItem: undefined
}

const mutations = {
  SAVE_ITEMLIST (state,res) {

  },
  SAVE_CURRENT_ITEM (state, res) {
    console.log('-----------------')
    console.log(res.title)
    state.currentItem = res
  }
}

const actions = {
  GET_ITEMLIST ({commit}, res) {
    
  },
  GET_CURRENT_ITEM ({commit}, res) {

  }
}

export default {
  state,
  mutations,
  actions
}
