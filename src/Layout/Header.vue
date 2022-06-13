<template>
  <header class="position-fixed w-100 yaho shadow" id="header">
    <b-container>
      <b-row class="align-items-center justify-content-between">
        <b-col class="col-3">
          <b-navbar-brand
            tag="h1"
            class="m-0 p-0 fw-900 text-30 font-italic cursor-pointer d-inline-block"
            @click="$router.push('/'), scrollTop()"
          >
            <img
              src="@/assets/yaho.svg"
              alt="야호 캐피탈"
              :style="{ width: '13rem' }"
            />
          </b-navbar-brand>
        </b-col>
        <b-col class="col-8 text-20 text-right p-0">
          <b-row class="align-items-center justify-content-between">
            <!-- 관리자 헤더 -->
            <template v-if="path.includes('/admin')">
              <!-- 로그인 상태 -->
              <template v-if="$store.getters.isLogin">
                <b-col>
                  <b-nav class="justify-content-center">
                    <b-nav-item
                      to="/admin/inquiryList"
                      :class="
                        path.includes('/admin/inquiryList') ? 'active' : ''
                      "
                      >상담신청 관리</b-nav-item
                    >
                    <b-nav-item
                      to="/admin/userList"
                      v-if="$store.getters.isSuper"
                      :class="path.includes('/admin/user') ? 'active' : ''"
                      >계정 관리</b-nav-item
                    >
                    <b-nav-item
                      to="/admin/myAccount"
                      :class="path.includes('/admin/myAccount') ? 'active' : ''"
                      >내 정보수정</b-nav-item
                    >
                  </b-nav>
                </b-col>
                <b-col>
                  <span class="mx-2 text-15">
                    {{ $store.state.name }}({{ $store.state.serviceId }}) 님
                  </span>
                  <b-btn
                    @click="logout()"
                    pill
                    class="logout-btn decoration-0"
                    variant="link"
                  >
                    <span> 로그아웃 </span>
                  </b-btn>
                </b-col>
              </template>
              <!-- 로그아웃 상태 -->
              <template v-else>
                <b-col
                  ><span class="mx-2 text-15"> 관리자 전용 페이지 </span></b-col
                >
              </template>
            </template>
            <!-- 기본 헤더 -->
            <template v-else>
              <b-col>
                <b-nav class="justify-content-center">
                  <b-nav-item
                    to="/"
                    :class="path.includes('/admin/inquiryList') ? 'active' : ''"
                    >대출상품</b-nav-item
                  >
                  <b-nav-item
                    to="/"
                    :class="path.includes('/admin/user') ? 'active' : ''"
                    >접수하기</b-nav-item
                  >
                  <b-nav-item
                    to="/"
                    :class="path.includes('/admin/myAccount') ? 'active' : ''"
                    >고객센터</b-nav-item
                  >
                </b-nav>
              </b-col>
              <b-col>
                <div
                  class="logout-btn rounded-pill d-inline-flex py-2 px-3 align-items-center"
                >
                  <font-awesome-icon icon="phone-alt" />
                  <a href="tel:1600-1481" class="fw-900 ms-2"> 1600-1481 </a>
                </div>
              </b-col>
            </template>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      user: true,
    };
  },
  computed: {
    path() {
      return this.$route.path;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    scrollTop() {
      window.scrollTo({ top: 0 });
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  &.active {
    color: #000;
    font-weight: 900;
    &::after {
      content: "";
      width: 80%;
      height: 2px;
      display: block;
      background: #000;
      position: relative;
      left: 50%;
      top: -5px;
      transform: translateX(-50%);
    }
  }
  .nav-link {
    color: #000;
    &:hover,
    &:active {
      color: #000;
    }
  }
}
.logout-btn {
  background: #ffdf14;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 0 #000;
  span {
    color: #000;
  }
}
</style>
