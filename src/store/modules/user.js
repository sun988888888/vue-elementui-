import { getToken } from '@/utils/setToken'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
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
