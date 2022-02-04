<template>
    <header class="position-fixed w-100 bg-warning text-white">
        <b-container>
            <b-row class="align-items-center justify-content-between">
                <b-col class="col-3">
                    <b-navbar-brand tag="h1" class="m-0 p-0 fw-900 text-40">yaho</b-navbar-brand>
                </b-col>
                <!-- 관리자 경로 -->
                <b-col v-if="admin" class="col-8 text-20 text-right p-0">
                    <template v-if="user">
                        <b-row class="align-items-center justify-content-between">
                            <b-col>
                                <b-nav class="justify-content-center">
                                    <b-nav-item to="/admin/inquiryList"
                                    :class="path.includes('/admin/inquiryList') ? 'active' : ''">상담리스트</b-nav-item>
                                    <b-nav-item to="/admin/userList"
                                    :class="path.includes('/admin/userList') ? 'active' : ''">계정관리</b-nav-item>
                                    <b-nav-item to="/admin/myAccount"
                                    :class="path.includes('/admin/myAccount') ? 'active' : ''">내 정보수정</b-nav-item>
                                </b-nav>
                            </b-col>
                            <b-col>
                                <span class="mx-2">
                                    <font-awesome-icon icon="user" />
                                    관리자 ID
                                </span>
                                <b-btn pill class="text-warning bg-white text-14 border-0">
                                로그아웃
                                </b-btn>
                            </b-col>
                        </b-row>
                    </template>
                    <template v-else>
                        <b-col>
                            <span>
                                <font-awesome-icon icon="user-lock" />
                                관리자 페이지
                            </span>
                        </b-col>
                    </template>
                </b-col>
                <!-- 기본 경로 -->
                <b-col v-else class="col-3 text-20 text-right p-0">
                    <span class="mx-2">
                        <font-awesome-icon icon="headset" />
                        상담전화
                    </span>
                    <b-btn href="tel:02-1234-1234" variant="link" class="text-decoration-none text-white px-0 text-20 fw-900">
                        02-1234-1234
                    </b-btn>
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
            user: true
        }
    },
    computed: {
        path() {
        return this.$route.path;
        },
    }
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