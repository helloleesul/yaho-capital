<template>
  <main>
      <b-row class="align-items-center justify-content-center my-5">
        <div class="text-center">
          <font-awesome-icon icon="exclamation-triangle" class="fa-6x text-warning mb-5" />
        </div>
        <h1 class="text-center mb-3">요청하신 페이지를 찾을 수 없습니다</h1>
        <b-btn @click="$router.go(-1)" variant="dark fw-900 text-17 w-25">
            <font-awesome-icon icon="arrow-left" />
            <span class="ms-2">이전페이지로 돌아가기</span>
        </b-btn>
      </b-row>
  </main>
</template>

<script>
export default {
  name: 'Error'
}
</script>

<style>

</style>