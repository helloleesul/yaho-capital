<template>
  <main>
    <section class="bg-primary">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section</p>
        </b-row>
      </b-container>
    </section>
    <section class="bg-secondary">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section</p>
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
        <b-row class="text-center align-items-center justify-content-center">
          <p class="fw-900 text-50 text-white">Section</p>
          <ul class="d-flex justify-content-between align-items-center w-50 m-0 p-0">
            <li v-for="item in items" :key="item">
              <b-btn>{{item.name}}</b-btn>
            </li>
          </ul>
        </b-row>
      </b-container>
    </section>
    <section class="bg-dark">
      <b-container>
        <b-row class="text-center align-items-center">
          <p class="fw-900 text-50 text-white">Section</p>
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
  data() {
    return {
      items: [
        {id: 1, name: 'a'},
        {id: 2, name: 'a'},
        {id: 3, name: 'a'},
        {id: 4, name: 'a'},
      ]
    }
  }
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