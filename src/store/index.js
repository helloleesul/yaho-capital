import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, _token){
      state.token = _token;
    }
  },
  gatters: {
    isLogin(state){
      return state.token == null ? false : true ;
    }
  },
  actions: {
    setToken:({commit} , _token) => {
        commit('setToken' , _token);
    }
  },
  modules: {
  }
})
