<template>
  <b-nav
    class="position-fixed"
    :style="{
      bottom: '3rem',
      right: '3rem',
    }"
  >
    <a
      class="go-button rounded-circle d-flex justify-content-center align-items-center fw-900 text-20"
      href="#inquiry" v-smooth-scroll="{ duration: 200, offset: -200 }"
    >
        상담신청
    </a>
  </b-nav>
</template>

<script>
export default {
    name: 'GoButton',
};
</script>

<style lang="scss" scoped>
.go-button {
    width: 6rem;
    height: 6rem;
    background: #FFDF14;
    border: 2px solid #000;
    box-shadow: 2px 2px 0 0;
    font-family: 'SBAggroB', "NanumSquare", sans-serif;
    &:hover {
      color: inherit;
    }
}
</style>