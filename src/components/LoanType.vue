<template>
  <main class="blank">
    <template v-if="errorPage">
      <ErrorPage />
    </template>
    <template v-else>
      <!-- 상단 메인 -->
      <section class="">
        <b-container>
          <b-row class="text-center align-items-center">
            <h2 class="yaho font-italic text-50">
              {{ $store.state.loanItems[this.id].id }}.
              {{ $store.state.loanItems[this.id].name }}
            </h2>
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
    </template>
  </main>
</template>

<script>
import Inquiry from "../Layout/Inquiry.vue";
import ErrorPage from "./ErrorPage.vue";
export default {
  name: "LoanType",
  components: { Inquiry, ErrorPage },
  data() {
    return { errorPage: false };
  },
  computed: {
    id() {
      return this.$route.params.id - 1;
    },
  },
  mounted() {
    console.log(this.id, this.$store.state.loanItems.length, isNaN(this.id));
    if (this.id >= this.$store.state.loanItems.length || isNaN(this.id)) {
      this.errorPage = true;
    }
  },

  methods: {},
};
</script>

<style></style>
