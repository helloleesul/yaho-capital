import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style/common.scss'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueSmoothScroll from 'vue2-smooth-scroll'
import VueMoment from 'vue-moment'

Vue.use(VueMoment);

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate"
import ko from "vee-validate/dist/locale/ko.json"
import * as rules from "vee-validate/dist/rules"

// Install VeeValidate rules and localization
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

localize("ko", ko);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue)

library.add(
  fas, far, fab
)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueSmoothScroll)

Vue.config.productionTip = false

Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8100'

new Vue({
  router,
  store,
  created() {
    // const userString = localStorage.getItem('token');
    // const userString2 = localStorage.getItem('serviceId');
    // if (userString) {
    //   const userData = JSON.parse(userString);
    //   const userData2 = JSON.parse(userString2);
    //   this.$store.dispatch('setLogin', userData, userData2);
    // }
    
    // console.log('headers', axios.defaults.headers.common['Authorization'])
    // if(!axios.defaults.headers.common['Authorization'] && isToken) {
    //   console.log('없다');
    //   this.$store.dispatch('logout')
    // }
    
    const isHeaders = axios.defaults.headers.common['Authorization'];
    const isToken = localStorage.getItem('token');
    // console.log('isHeaders', isHeaders)
    // console.log('isToken', isToken)
    if (isToken) {
      const tokenData = JSON.parse(isToken);
      this.$store.dispatch('setToken', tokenData);
      this.$store.dispatch('logoutTimer')
      
      console.log('isHeaders', isHeaders)
      console.log('tokenData', tokenData)
    }

    const isServiceId = localStorage.getItem('serviceId');
    if (isServiceId) {
      const serviceIdData = JSON.parse(isServiceId);
      this.$store.dispatch('setServiceId', serviceIdData);
    }
    const isRole = localStorage.getItem('role');
    if (isRole) {
      const roleData = JSON.parse(isRole);
      this.$store.dispatch('setRole', roleData);
    }
  },
  render: h => h(App)
}).$mount('#app')
