import { getStorage } from '@/utils/setStorage'

const state = {
  token: getStorage('token'),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  identity:''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_IDENTITY: (state, value) => {
    state.identity = value
  },
  RESET_STATE: (state, data) => {
    console.log('data: ', data);
    
    state = data
  }
}

const actions = {
  // remove token
  resetToken({ commit },payload) {
    commit('SET_TOKEN', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
