<template>
  <b-modal
  id="alertModal"
  size="sm"
  button-size="sm"
  centered
  ok-title="확인"
  footer-class="p-2"
  title-class="fw-900"
  no-close-on-backdrop
  footer-bg-variant="white"
  ok-only
  hide-header-close
  :ok-variant="okVariant"
  :title="title"
  @ok="$emit('okClick')"
  >
    <template #default>
      {{ body }}
    </template>
  </b-modal>
</template>

<script>
export default {
    props: {
      alertShow: Boolean,
      okVariant: String,
      title: String,
      body: String,
    }
}
</script>

<style>

</style>