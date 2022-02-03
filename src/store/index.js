import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    token: null,
    user: null,
  },
  mutations: {
    set(s, [k, v]) {
      s[k] = v;
    },
  },
  gatters: {
    token(s) {
      return s.token;
    },
    user(s) {
      return s.user;
    },
    loaded(s) {
      return s.loaded;
    },
  },
  actions: {
  },
  modules: {
  }
})
