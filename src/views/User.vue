<template>
  <div id="user-page">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "../Layout/Header.vue";
import Footer from "../Layout/Footer.vue";

export default {
  name: "User",
  components: { Header, Footer },
};
</script>

<style lang="scss" scoped></style>
