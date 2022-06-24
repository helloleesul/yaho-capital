import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "./assets/style/common.scss";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueSmoothScroll from "vue2-smooth-scroll";
import VueMoment from "vue-moment";
import vuescroll from "vuescroll/dist/vuescroll-native";
import "vuescroll/dist/vuescroll.css";

Vue.use(VueMoment);

import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from "vee-validate";
import ko from "vee-validate/dist/locale/ko.json";
import * as rules from "vee-validate/dist/rules";

// Install VeeValidate rules and localization
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

localize("ko", ko);

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue);

library.add(fas, far, fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(VueSmoothScroll);
Vue.use(vuescroll, {
  ops: {
    rail: {
      size: "5px",
      gutterOfSide: "0px",
    },
    bar: {
      keepShow: true,
      // background: '#FFEF6B',
      background: "#000",
      size: "5px",
    },
  },
});

Vue.config.productionTip = false;

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:8100";
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error)
    if (error.message == "Network Error") {
      alert("서버와의 통신에 실패했습니다.");
      store.dispatch("logout");
    }
    if (error.response.status == "401") {
      // console.log(error.response.status)
      alert("접속 후 1시간이 경과되어 자동로그아웃합니다.");
      store.dispatch("logout");
    }
    return Promise.reject(error);
  }
);

new Vue({
  router,
  store,
  created() {
    const isToken = localStorage.getItem("token");
    if (isToken) {
      const tokenData = JSON.parse(isToken);
      this.$store.dispatch("setToken", tokenData);
    }
    const isServiceId = localStorage.getItem("serviceId");
    if (isServiceId) {
      const serviceIdData = JSON.parse(isServiceId);
      this.$store.dispatch("setServiceId", serviceIdData);
    }
    const isRole = localStorage.getItem("role");
    if (isRole) {
      const roleData = JSON.parse(isRole);
      this.$store.dispatch("setRole", roleData);
    }
    const isName = localStorage.getItem("name");
    if (isName) {
      const nameData = JSON.parse(isName);
      this.$store.dispatch("setName", nameData);
    }
  },
  render: (h) => h(App),
}).$mount("#app");
