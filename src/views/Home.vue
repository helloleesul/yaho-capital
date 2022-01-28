<template>
  <main>
    <section class="bg-primary">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section 1</p>
        </b-row>
      </b-container>
    </section>
    <section class="bg-secondary">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section 2</p>
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
    <section class="bg-info">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section 4</p>
        </b-row>
      </b-container>
    </section>
    <section class="bg-dark">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section 5</p>
        </b-row>
      </b-container>
    </section>

    <GoButton />
  </main>
</template>

<script>
import GoButton from '../components/GoButton.vue'
import Inquiry from '../components/Inquiry.vue'
export default {
  name: 'Home',
  components: { GoButton, Inquiry },
}
</script>

<style lang="scss" scoped>
  main {
    padding-top: 4rem;
    .row {
      height: 30rem;
    }
  }
</style>