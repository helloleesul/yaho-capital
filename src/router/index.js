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
        meta: { isLogin: true },
      },
      {
        path: "/admin/inquiryList",
        name: "InquiryList",
        component: () => import('../components/InquiryList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: "/admin/inquiryList/:id",
        name: "InquiryDetail",
        component: () => import('../components/InquiryDetail.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: "/admin/userList",
        name: "UserList",
        component: () => import('../components/UserList.vue'),
        meta: { requiresAuth: true, roleSuper: "SUPER" },
      },
      {
        path: "/admin/myAccount",
        name: "MyAccount",
        component: () => import('../components/MyAccount.vue'),
        meta: { requiresAuth: true },
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
      alert('회원만 접근할수있습니다.');
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
      alert('슈퍼회원만 접근할수있습니다.');
      next('/admin/inquiryList')
      return
    }
    next()
  }
  next()
});

export default router
