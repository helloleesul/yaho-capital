<template>
  <div
    class="position-absolute"
    :style="{
      right: '3rem',
      top: quickTop + 'px',
      transition: 'all 1s cubic-bezier(0.22, 0.61, 0.36, 1)',
    }"
    ref="quickMenu"
  >
    <a
      class="go-button mb-3 rounded-circle d-flex justify-content-center align-items-center fw-900 text-20"
      href="#loanItems"
      v-smooth-scroll="{ duration: 200, offset: -200 }"
    >
      대출상품
    </a>
    <a
      class="go-button rounded-circle d-flex justify-content-center align-items-center fw-900 text-20"
      href="#inquiry"
      v-smooth-scroll="{ duration: 200, offset: -200 }"
    >
      상담신청
    </a>
  </div>
</template>

<script>
export default {
  name: "GoButton",
  data() {
    return { quickTop: 700 };
  },
  methods: {
    scrollEvents() {
      this.$refs.quickMenu.style.top = window.scrollY + this.quickTop + "px";
    },
  },
  mounted() {
    // window.scrollTo(0, 0);
    document.addEventListener("scroll", this.scrollEvents);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollEvents);
  },
};
</script>

<style lang="scss" scoped>
.go-button {
  width: 6rem;
  height: 6rem;
  background: #ffdf14;
  border: 2px solid #000;
  box-shadow: 2px 2px 0 0;
  font-family: "SBAggroB", "NanumSquare", sans-serif;
  &:hover {
    color: inherit;
  }
}
</style>
