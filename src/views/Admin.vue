<template>
  <div id="admin-page">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from '../Layout/Header.vue'

export default {
  name: 'Admin',
  components: { Header },
}
</script>

<style lang="scss" scoped>
</style>