<template>
  <main>
    <!-- 상단 메인 -->
    <section class="yellow">
      <b-container>
        <b-row class="text-center align-items-center">
          <h2 class="yaho font-italic text-50">야호캐피탈</h2>
          <p class="fw-900 text-50 mb-5">아파트최고한도(후순위)</p>
          <span class="text-24">전국 모든 아파트소유자면 누구나가능</span>
        </b-row>
      </b-container>
    </section>
    <!-- 멘트 -->
    <section class="border-bottom">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-30 mb-3">
            필요할 때만 쓰고, 이자는 사용한 만큼만
          </p>
          <span class="text-20" :style="{ color: '#aaa' }">
            매일 사용한 금액에 대해서만 이자가 발생합니다. <br />
            필요할 때만 꺼내쓰고, 언제든지 편리하게 돈을 채워넣어 이자의 부담을
            덜 수 있습니다.
          </span>
        </b-row>
      </b-container>
    </section>
    <!-- 대출소개 -->
    <section>
      <b-container>
        <b-row class="m-auto">
          <b-col>
            <p class="text-32 fw-900 yellow-underline mb-5">대출소개</p>
            <span class="d-block text-18"
              >방문없이 인터넷, 스마트폰, 전화로 <br />대출신청이 가능한
              상품입니다.</span
            >
          </b-col>
          <b-col class="col-7">
            <table>
              <thead>
                <tr>
                  <th>구분</th>
                  <th :style="{ background: '#535D71', color: '#fff' }">
                    내용
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in table" :key="item.index">
                  <th>{{ item.th }}</th>
                  <td>{{ item.td }}</td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- 대출진행절차 -->
    <section>
      <b-container>
        <b-row class="m-auto">
          <b-col>
            <p class="text-32 fw-900 yellow-underline mb-5">대출진행절차</p>
            <span class="d-block text-18"
              >담당 상담원이 말씀드린 서류를 <br />안내한 FAX번호로
              보내주세요.</span
            >
          </b-col>
          <b-col class="col-7">
            <ol class="p-0 m-0">
              <li
                v-for="(step, index) in steps"
                :key="step.index"
                class="mb-4 d-flex align-items-center"
              >
                <div
                  class="text-center text-18 me-4"
                  :style="{
                    background: '#E4E4E6',
                    width: '5rem',
                    height: '5rem',
                    paddingTop: '1rem',
                    borderRadius: '100%',
                  }"
                >
                  <span class="fw-900">{{ index + 1 }}</span>
                  <p class="m-0" :style="{ lineHeight: '1' }">step</p>
                </div>
                <div>
                  <p class="mb-1 text-20 fw-900">{{ step.title }}</p>
                  <span class="text-18">{{ step.content }}</span>
                </div>
              </li>
            </ol>
          </b-col>
        </b-row>
      </b-container>
    </section>
    <!-- 상담신청 -->
    <section id="inquiry">
      <b-container class="position-relative">
        <b-row class="align-items-center yellow-wrap">
          <p class="text-30 fw-900 mb-4">대출상담 신청하기</p>
          <Inquiry />
        </b-row>
      </b-container>
    </section>
    <!-- 대출상품 -->
    <section class="bg-white">
      <b-container>
        <b-row class="text-center align-items-center justify-content-center">
          <div>
            <h3 class="mb-5 text-30">
              <span class="yaho fw-900 font-italic">야호 캐피탈 </span>
              <span class="mx-2">대출상품</span>
            </h3>
            <ul
              class="d-flex justify-content-between align-items-center w-100 m-0 p-0"
              :style="{ flexWrap: 'wrap', gap: '10px' }"
            >
              <li
                v-for="item in loanItems"
                :key="item.index"
                :style="{ width: '16%' }"
              >
                <b-btn
                  @click="modalShow(item)"
                  class="w-100 position-relative border-0"
                  :style="{ height: '8rem', background: item.color }"
                >
                  <span class="text-20 loanItem">
                    {{ item.name }}
                  </span>
                  <font-awesome-icon
                    class="loanItem-icon fa-3x"
                    :icon="item.icon"
                  />
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
import GoButton from "../Layout/GoButton.vue";
import Modal from "../Layout/Modal.vue";
import Inquiry from "../Layout/Inquiry.vue";

export default {
  name: "Home",
  components: { GoButton, Inquiry, Modal },
  data() {
    return {
      loanItem: null,
      loanItems: [
        { name: "아파트담보대출", color: "#35A67D", icon: "building" },
        { name: "공동명의지분대출", color: "#35A67D", icon: "hotel" },
        { name: "무설정아파트", color: "#35A67D", icon: "campground" },
        { name: "빌라/단독주택", color: "#35A67D", icon: "house-user" },
        { name: "전/월세 보증금", color: "#35A67D", icon: "warehouse" },
        { name: "기타부동산", color: "#35A67D", icon: "industry" },
        { name: "경매취하/압류/가압류", color: "#35A67D", icon: "store-slash" },
        { name: "자동차담보", color: "#35A67D", icon: "car" },
        { name: "직장인대출", color: "#526BAA", icon: "briefcase" },
        { name: "사업자대출", color: "#526BAA", icon: "hand-holding-usd" },
        { name: "저금리대환", color: "#526BAA", icon: "coins" },
        {
          name: "저신용자희망대출",
          color: "#526BAA",
          icon: "file-invoice-dollar",
        },
      ],
      steps: [
        {
          title: "대출상담 신청하기",
          content:
            "대출상품을 클릭 후 내용을 기입하시고 대출신청완료 버튼을 눌러주세요.",
        },
        {
          title: "담당 상담원과 통화",
          content:
            "신청하신 연락처로 담당 상담원이 대출상품 및 필요한 서류들을 안내해드립니다.",
        },
        {
          title: "구비서류 준비",
          content: "담당 상담원이 말씀드린 서류를 안내한 FAX번호로 보내주세요.",
        },
        {
          title: "대출승인",
          content:
            "대출심사완료 후 고객님이 기재하신 연락처로 대출승인금액을 통보해드립니다.",
        },
        {
          title: "대출금 송금",
          content: "대출 승인 완료 후 고객님의 온라인 계좌로 송금해드립니다.",
        },
      ],
      table: [
        { th: "대출대상", td: "전국 아파트소유자 및 담보제공가능자" },
        { th: "대출한도", td: "감정가의 100%(최대 20억)" },
        { th: "대출기간", td: "최장 30년" },
        { th: "대출금리", td: "연 5% ~ 최대 연 20%이내" },
        { th: "상환방법", td: "원리금균등분할상환, 만기일시상환" },
      ],
    };
  },
  methods: {
    modalShow(item) {
      this.loanItem = item;
      this.$bvModal.show("loanItem");
    },
  },
};
</script>

<style lang="scss" scoped>
.loanItem {
  position: absolute;
  left: 1rem;
  top: 1rem;
}
.loanItem-icon {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  opacity: 0.5;
}
table {
  width: 100%;
  border-right: 1px solid #ddd;
  border-top: 1px solid #ddd;
  box-shadow: 10px 10px 10px #eee;
  th,
  td {
    padding: 30px;
    text-align: center;
    font-size: 18px;
    border-left: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  }
  th {
    background: #f4f4f4;
    font-weight: 800;
  }
}
</style>
