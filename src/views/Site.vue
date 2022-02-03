<template>
  <div id="user-page">
    <Header />
    <router-view/>
    <Footer />
  </div>
</template>

<script>
import Footer from '../Layout/Footer.vue'
import Header from '../Layout/Header.vue'

export default {
  name: 'Site',
  components: { Header, Footer },
}
</script>

<style lang="scss" scoped>
</style>