import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    serviceId: null,
    name: null,
    role: null,
    token: null,
    loanItems: [
      { id: 1, name: "아파트담보대출", icon: "building" },
      { id: 2, name: "공동명의지분대출",  icon: "hotel" },
      { id: 3, name: "무설정아파트",  icon: "campground" },
      { id: 4, name: "빌라/단독주택",  icon: "house-user" },
      { id: 5, name: "전/월세 보증금",  icon: "warehouse" },
      { id: 6, name: "기타부동산",  icon: "industry" },
      { id: 7, name: "경매취하/압류/가압류", icon: "store-slash" },
      { id: 8, name: "자동차담보",  icon: "car" },
      { id: 9, name: "직장인대출",  icon: "briefcase" },
      { id: 10, name: "사업자대출",  icon: "hand-holding-usd" },
      { id: 11, name: "저금리대환",  icon: "coins" },
      { id: 12, name: "저신용자희망대출", icon: "file-invoice-dollar"},
    ],
  },
  getters: {
    isLogin(state){
      return state.token === null ? false : true ;
    },
    isSuper(state){
      return state.role === "SUPER" ? true : false ;
    },
  },
  mutations: {
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
    setName(state, _name) {
      state.name = _name;
      localStorage.setItem('name', JSON.stringify(_name))
    },
    logout() {
        localStorage.clear();
        // localStorage.removeItem('token');
        // localStorage.removeItem('serviceId');
        // localStorage.removeItem('role');
        // localStorage.removeItem('name');
        axios.defaults.headers.common['Authorization'] = undefined;
        location.replace('/admin')
        // console.log(axios.defaults.headers.common['Authorization']);
    },
  },
  actions: {
    setToken:({commit} , _token) => {
      commit('setToken' , _token);
    },
    setServiceId:({commit} , _serviceId) => {
      commit('setServiceId' , _serviceId);
    },
    setRole:({commit} , _role) => {
      commit('setRole' , _role);
    },
    setName:({commit} , _name) => {
      commit('setName' , _name);
    },
    logout:({commit}) => {
      commit('logout');
    },
  },
  modules: {
  },
  // plugins: [
  //   createPersistedState()
  // ]
})
