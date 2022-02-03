<template>
  <b-nav
    class="position-fixed"
    :style="{
      bottom: '3rem',
      right: '3rem',
    }"
  >
    <a
      class="go-button rounded-circle bg-warning text-white d-flex justify-content-center align-items-center"
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
}
</style>