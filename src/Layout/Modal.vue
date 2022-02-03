<template>
    <aside>
        <!-- 개인정보동의 -->
        <b-modal id="modal1" 
        scrollable
        centered
        hide-header-close 
        title="개인정보동의"
        ok-only
        ok-title="확인">
            <p class="" v-for="i in 10" :key="i">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
            </p>
        </b-modal>

        <!-- 대출상품 -->
        <b-modal id="modal2" 
        scrollable
        centered
        hide-header-close
        size="lg"
        ok-only
        ok-title="확인">
            <template v-if="currentItem" #modal-header>
                <h5>{{currentItem.name}}</h5>
            </template>
            <template #default>
                <h5>{{currentItem.name}}</h5>
            </template>
        </b-modal>
    </aside>
</template>

<script>
export default {
    props: {
        currentItem: null
    }
}
</script>

<style>

</style>