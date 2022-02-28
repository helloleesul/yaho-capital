import Vue from 'vue'
import VueRouter from 'vue-router'

import User from '@/views/User.vue'
import Admin from '@/views/Admin.vue'

import ErrorPage from '@/components/ErrorPage.vue'

Vue.use(VueRouter)

const routes = [
  // USER PAGE
  {
    path: '/',
    component: User,
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import('../components/Home.vue'),
      },
    ]
  },
  {
    path: '*',
    name: "Error",
    component: ErrorPage,
  },
  // ADMIN PAGE
  {
    path: '/admin',
    component: Admin,
    // redirect: "/admin/login",
    children: [
      {
        path: "/",
        name: "Login",
        component: () => import('../components/Login.vue'),
        meta: { isLogin: true },
      },
      {
        path: "inquiryList",
        name: "InquiryList",
        component: () => import('../components/InquiryList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: "inquiryList/:id",
        name: "InquiryDetail",
        component: () => import('../components/InquiryDetail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: "userList",
        name: "UserList",
        component: () => import('../components/UserList.vue'),
        meta: { requiresAuth: true, roleSuper: "SUPER" },
      },
      {
        path: "userCreate",
        name: "UserCreate",
        component: () => import('../components/UserCreate.vue'),
        meta: { requiresAuth: true, roleSuper: "SUPER" },
      },
      {
        path: "myAccount",
        name: "MyAccount",
        component: () => import('../components/MyAccount.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '*',
        name: 'Error',
        component: ErrorPage
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isUser = localStorage.getItem('token')
  const isSuper = localStorage.getItem('role')
  const roleSuper = to.meta.roleSuper
  // console.log(to)

  if(to.matched.some(record=>record.meta.requiresAuth)) {
    if(!isUser) {
      alert('관리자만 접근할수있습니다.');
      next('/admin')
      return
    }
    next()
  }
  if(to.matched.some(record=>record.meta.isLogin)) {
    if(isUser) {
      // alert('로그인상태입니다');
      next('/admin/inquiryList')
      return
    }
    next()
  }
  if(roleSuper) {
    if(isSuper!=='"SUPER"') {
      // console.log(roleSuper)
      // console.log(isSuper)
      alert('최고관리자만 접근할수있습니다.');
      next('/admin/inquiryList')
      return
    }
    next()
  }
  next()
});

export default router
