<template>
    <aside>
        <!-- 개인정보취급방침이용동의 -->
        <b-modal id="check1" 
        scrollable
        centered
        hide-header-close 
        title="개인정보취급방침이용동의"
        ok-only
        ok-title="확인"
        ok-variant="warning"
        footer-bg-variant="white"
        title-class="fw-900"
        no-close-on-backdrop
        >
            <p class="" v-for="i in 10" :key="i">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
        </b-modal>

        <!-- 이용동의 -->
        <b-modal id="check2" 
        scrollable
        centered
        hide-header-close 
        title="이용동의"
        ok-only
        ok-title="확인"
        ok-variant="warning"
        footer-bg-variant="white"
        title-class="fw-900"
        no-close-on-backdrop
        >
            <p class="" v-for="i in 10" :key="i">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
        </b-modal>

        <!-- 대출상품 -->
        <b-modal id="loanItem" 
        scrollable
        centered
        hide-header-close
        ok-only
        ok-title="확인"
        ok-variant="warning"
        footer-bg-variant="white"
        no-close-on-backdrop
        >
            <template #modal-header>
                <h5 class="fw-900">{{loanItem.name}}</h5>
            </template>
            <template #default>
                <h5>{{loanItem.name}}</h5>
            </template>
        </b-modal>
    </aside>
</template>

<script>
export default {
    name: 'Modal',
    props: {
        loanItem: null,
    },
}
</script>

<style lang="scss">
</style>