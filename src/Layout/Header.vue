<template>
    <header class="position-fixed w-100 yaho yellow" id="header">
        <b-container>
            <b-row class="align-items-center justify-content-between">
                <b-col class="col-3">
                    <b-navbar-brand tag="h1" class="m-0 p-0 fw-900 text-30 font-italic">야호 캐피탈</b-navbar-brand>
                </b-col>
                <!-- 관리자 경로 -->
                <b-col v-if="$store.getters.isLogin" class="col-8 text-20 text-right p-0">
                    <template>
                        <b-row class="align-items-center justify-content-between">
                            <b-col>
                                <b-nav class="justify-content-center">
                                    <b-nav-item to="/admin/inquiryList"
                                    :class="path.includes('/admin/inquiryList') ? 'active' : ''">상담리스트</b-nav-item>
                                    <b-nav-item to="/admin/userList" v-if="$store.getters.isSuper"
                                    :class="path.includes('/admin/user') ? 'active' : ''">계정관리</b-nav-item>
                                    <b-nav-item to="/admin/myAccount"
                                    :class="path.includes('/admin/myAccount') ? 'active' : ''">내 정보관리</b-nav-item>
                                </b-nav>
                            </b-col>
                            <b-col>
                                <span class="mx-2">
                                    <font-awesome-icon icon="user" />
                                    {{ $store.state.serviceId }}
                                </span>
                                <b-btn @click="logout()" pill class="text-warning bg-white text-14 border-0">
                                로그아웃
                                </b-btn>
                            </b-col>
                        </b-row>
                    </template>
                </b-col>
                <!-- 기본 경로 -->
                <b-col v-else class="col-3 text-20 text-right p-0">
                    <span class="fw-900">
                        <!-- <font-awesome-icon icon="headset" /> -->
                        상담전화
                    </span>
                    <span class="mx-2">|</span>
                    <a href="tel:02-1234-1234" class="fw-900">
                        02-1234-1234
                    </a>
                </b-col>
            </b-row>
        </b-container>
    </header>
</template>

<script>
export default {
    name: 'Header',
    props: {
        admin: {type: Boolean, default: false},
    },
    data() {
        return {
            user: true,
        }
    },
    computed: {
        path() {
            return this.$route.path;
        },
    },
    methods: {
        logout() {
            this.$store.dispatch('logout');
        },
    },
}
</script>

<style lang="scss" scoped>
.nav-item {
    &.active {
        color: #fff;
        font-weight: 900;
        &::after {
            content:'';
            width: 80%;
            height: 2px;
            display: block;
            background: #fff;
            position: relative;
            left: 50%; top: -5px;
            transform: translateX(-50%);
        }
    }
    .nav-link {
        color: #fff;
        &:hover, &:active {
            color: #fff;
        }
    }
}
</style>