<template>
  <main>
      <section class="yellow">
        <b-container>
          <b-row class="text-center align-items-center">
            <h2 class="yaho font-italic text-50">야호캐피탈</h2>
            <p class="fw-900 text-50 mb-5">아파트최고한도(후순위)</p>
            <span class="text-24">전국 모든 아파트소유자면 누구나가능</span>
          </b-row>
        </b-container>
      </section>
      <section>
        <b-container :style="{paddingBottom:0}">
          <b-row class="text-center align-items-center">
            <p class="fw-900 text-30 mb-3">필요할 때만 쓰고, 이자는 사용한 만큼만</p>
            <span class="text-20" :style="{color:'#aaa'}">
              매일 사용한 금액에 대해서만 이자가 발생합니다. <br/>
              필요할 때만 꺼내쓰고, 언제든지 편리하게 돈을 채워넣어 이자의 부담을 덜 수 있습니다.
            </span>
          </b-row>
        </b-container>
      </section>
      <section id="inquiry">
        <b-container class="position-relative">
          <b-row class="align-items-center inquiry-wrap">
            <p class="text-30 fw-900 m-0">대출상담 신청하기</p>
            <Inquiry />
          </b-row>
          <b-row class="inquiry-back"></b-row>
        </b-container>
      </section>
      <section class="bg-white">
        <b-container>
          <b-row class="text-center align-items-center justify-content-center">
            <div>
              <h3 class="mb-5 text-30">
                <span class="yaho fw-900 font-italic">야호 캐피탈 </span>
                <span class="mx-2">대출상품</span>
              </h3>
              <ul class="d-flex justify-content-between align-items-center w-100 m-0 p-0"
              :style="{flexWrap:'wrap', gap:'10px'}">
                <li v-for="item in items" :key="item.index" :style="{width:'16%'}">
                  <b-btn @click="modalShow(item)" class="w-100 position-relative border-0" :style="{ height:'8rem', background: item.color }">
                    <span class="text-20 loanItem">
                      {{item.name}}
                    </span>
                    <font-awesome-icon class="loanItem-icon fa-3x" :icon="item.icon" />
                  </b-btn>
                </li>
              </ul>
            </div>
          </b-row>
        </b-container>
      </section>

      <Modal :loanItem="loanItem" />
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
      loanItem: null,
      items: [
        {name: '아파트담보대출', color: '#35A67D', icon: 'building'},
        {name: '공동명의지분대출', color: '#35A67D', icon: 'hotel'},
        {name: '무설정아파트', color: '#35A67D', icon: 'campground'},
        {name: '빌라/단독주택', color: '#35A67D', icon: 'house-user'},
        {name: '전/월세 보증금', color: '#35A67D', icon: 'warehouse'},
        {name: '기타부동산', color: '#35A67D', icon: 'industry'},
        {name: '경매취하/압류/가압류', color: '#35A67D', icon: 'store-slash'},
        {name: '자동차담보', color: '#35A67D', icon: 'car'},
        {name: '직장인대출', color: '#526BAA', icon: 'briefcase'},
        {name: '사업자대출', color: '#526BAA', icon: 'hand-holding-usd'},
        {name: '저금리대환', color: '#526BAA', icon: 'coins'},
        {name: '저신용자희망대출', color: '#526BAA', icon: 'file-invoice-dollar'},
      ],
    }
  },
  methods: {
    modalShow(item) {
      this.loanItem = item;
      this.$bvModal.show('loanItem');
    }
  }
}
</script>

<style lang="scss" scoped>
  .loanItem {
    position: absolute;
    left: 1rem; top: 1rem;
  }
  .loanItem-icon {
    position: absolute;
    right: 1rem; bottom: 1rem;
    opacity: .5;
  }
  .inquiry-wrap {
    border: 4px solid #000;
    border-radius: 2rem;
    padding: 2rem;
    width: 80%;
    height: 320px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
    background: #fff;
  }
  .inquiry-back {
    background: #FDDA00;
    width: 80%;
    height: 320px;
    margin: 0 auto;
    border: 4px solid #000;
    border-radius: 2rem;
    position: absolute;
    z-index: 1;
    bottom: 5rem; right: 5rem;
  }
</style>