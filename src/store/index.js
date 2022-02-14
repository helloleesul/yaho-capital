import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serviceId: null,
    role: null,
    token: null,
  },
  getters: {
    isLogin(state){
      return state.token == null ? false : true ;
    },
    isSuper(state){
      return state.role === "SUPER" ? true : false ;
    },
  },
  mutations: {
    // setLogin(state, _token, _serviceId){
    //   state.token = _token;
    //   state.serviceId = _serviceId;
    //   localStorage.setItem('token', JSON.stringify(_token))
    //   localStorage.setItem('serviceId', JSON.stringify(_serviceId))
    // },
    setToken(state, _token){
      state.token = _token;
      localStorage.setItem('token', JSON.stringify(_token))
      axios.defaults.headers.common['Authorization'] = _token
    },
    setServiceId(state, _serviceId) {
      state.serviceId = _serviceId;
      localStorage.setItem('serviceId', JSON.stringify(_serviceId))
    },
    setRole(state, _role) {
      state.role = _role;
      localStorage.setItem('role', JSON.stringify(_role))
    },

    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('serviceId');
      localStorage.removeItem('role');
      location.replace('/admin')
    }
  },
  actions: {
    // setLogin:({commit} , _token, _serviceId) => {
    //   commit('setLogin' , _token, _serviceId);
    // },
    setToken:({commit} , _token) => {
      commit('setToken' , _token);
    },
    setServiceId:({commit} , _serviceId) => {
      commit('setServiceId' , _serviceId);
    },
    setRole:({commit} , _role) => {
      commit('setRole' , _role);
    },

    logout:({commit}) => {
      commit('logout');
    },
  },
  modules: {
  }
})
