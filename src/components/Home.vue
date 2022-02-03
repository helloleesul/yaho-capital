<template>
  <main>
      <section class="bg-dark">
        <b-container>
          <b-row class="text-center align-items-center">
            <p class="fw-900 text-50 text-white">Section</p>
          </b-row>
        </b-container>
      </section>
      <section id="inquiry">
        <b-container class="w-25">
          <b-row class="align-items-center">
            <Inquiry />
          </b-row>
        </b-container>
      </section>
      <section class="bg-dark">
        <b-container>
          <b-row class="text-center align-items-center">
            <p class="fw-900 text-50 text-white">Section</p>
          </b-row>
        </b-container>
      </section>
      <section class="bg-white">
        <b-container>
          <b-row class="text-center align-items-center justify-content-center">
            <div>
              <h3 class="mb-5 fw-900">대출상품</h3>
              <ul class="d-flex justify-content-between align-items-center w-100 m-0 p-0"
              :style="{flexWrap:'wrap', gap:'10px'}">
                <li v-for="item in items" :key="item.id" :style="{width:'16%'}">
                  <b-btn @click="modalShow(item)" class="w-100" :style="{height:'8rem'}">{{item.name}}</b-btn>
                </li>
              </ul>
            </div>
          </b-row>
        </b-container>
      </section>

      <Modal :currentItem="currentItem" />
      <GoButton />
    </main>
</template>

<script>
import GoButton from '../Layout/GoButton.vue'
import Modal from '../Layout/Modal.vue'
import Inquiry from '../Layout/Inquiry.vue'

export default {
  name: 'Home',
  components: { GoButton, Inquiry, Modal },
  data() {
    return {
      currentItem: null,
      items: [
        {id: 1, name: '아파트담보대출'},
        {id: 2, name: '공동명의지분대출'},
        {id: 3, name: '무설정아파트'},
        {id: 4, name: '빌라/단독주택'},
        {id: 5, name: '전/월세 보증금'},
        {id: 6, name: '기타부동산'},
        {id: 7, name: '경매취하/압류/가압류'},
        {id: 8, name: '자동차담보'},
        {id: 9, name: '직장인대출'},
        {id: 10, name: '사업자대출'},
        {id: 11, name: '저금리대환'},
        {id: 12, name: '저신용자희망대출'},
      ],
    }
  },
  methods: {
    modalShow(item) {
      this.currentItem = item;
      this.$bvModal.show('modal2');
    }
  }
}
</script>

<style>

</style>