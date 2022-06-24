<template>
  <header class="position-fixed w-100 shadow" id="header">
    <b-container>
      <b-row class="align-items-center justify-content-between">
        <b-col class="col-3">
          <b-navbar-brand
            tag="h1"
            class="m-0 p-0 fw-900 text-30 font-italic cursor-pointer d-inline-block"
            @click="$router.push('/').catch(() => {}), scrollTop('#header')"
          >
            <img
              src="@/assets/yaho.svg"
              alt="야호 캐피탈"
              :style="{ width: '15rem' }"
            />
          </b-navbar-brand>
        </b-col>
        <b-col class="col-8 text-20 text-right p-0 yaho">
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
                  <span class="mx-2 text-17">
                    {{ $store.state.name }}({{ $store.state.serviceId }}) 님
                  </span>
                  <b-btn
                    @click="logout()"
                    pill
                    class="decoration-0"
                    variant="dark"
                  >
                    <span> 로그아웃 </span>
                  </b-btn>
                </b-col>
              </template>
              <!-- 로그아웃 상태 -->
              <template v-else>
                <b-col> <span> 관리자 전용 페이지 </span></b-col>
              </template>
            </template>
            <!-- 기본 헤더 -->
            <template v-else>
              <b-col>
                <b-nav class="justify-content-center">
                  <b-nav-item-dropdown
                    text="대출상품"
                    toggle-class="nav-link-custom"
                  >
                    <b-dropdown-item
                      v-for="item in $store.state.loanItems"
                      :key="item.id"
                      :to="`/loanType/${item.id}`"
                      @click="scrollTop('#header')"
                      >{{ item.name }}</b-dropdown-item
                    >
                  </b-nav-item-dropdown>
                  <b-nav-item @click="scrollTop('#inquiry')" to="/">
                    상담신청
                  </b-nav-item>
                </b-nav>
              </b-col>
              <b-col>
                <span class="yaho light mainColor"> 상담전화 </span>
                <!-- <span class="mx-2">|</span> -->
                <a href="tel:1600-1481" class="bold yaho mainColor">
                  1600-1481
                </a>
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
      // user: true,
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
    scrollTop(el) {
      const element = document.querySelector(el);
      const elementTop = element.offsetTop - 200;
      window.scrollTo(0, elementTop);
      // console.log(elementTop);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  font-size: 22px;
  &.active {
    color: #000;
    // font-weight: 900;
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
    a:hover {
      color: #000;
    }
  }
}
</style>
