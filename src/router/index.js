import Vue from 'vue'
import VueRouter from 'vue-router'
import Site from '../views/Site.vue'
import Admin from '../views/Admin.vue'

Vue.use(VueRouter)

const routes = [
  // USER PAGE
  {
    path: '/',
    component: Site,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import('../components/Home.vue'),
      },
    ]
  },
  // ADMIN PAGE
  {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: "/",
        name: "Login",
        component: () => import('../components/Login.vue'),
      },
      {
        path: "/admin/inquiryList",
        name: "InquiryList",
        component: () => import('../components/InquiryList.vue'),
      },
      {
        path: "/admin/inquiryList/:id",
        name: "InquiryDetail",
        component: () => import('../components/InquiryDetail.vue'),
      },
      {
        path: "/admin/userList",
        name: "UserList",
        component: () => import('../components/UserList.vue'),
      },
      {
        path: "/admin/myAccount",
        name: "MyAccount",
        component: () => import('../components/MyAccount.vue'),
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
