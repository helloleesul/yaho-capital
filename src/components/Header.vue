<template>
    <header class="position-fixed w-100 bg-warning text-white">
        <b-container>
            <b-row class="align-items-center justify-content-between">
                <b-col class="col-9">
                    <h1 class="m-0 fw-900">yaho</h1>
                </b-col>
                <b-col class="col-3 text-20 text-right p-0">
                    <span>
                        <font-awesome-icon icon="headset" />
                        상담전화
                    </span>
                    <b-btn href="tel:02-1234-1234" variant="link" class="text-decoration-none text-white text-20 fw-900">
                        02-1234-1234
                    </b-btn>
                </b-col>
            </b-row>
        </b-container>
    </header>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>
    header {
        .row {
            height: 4rem;
        }
    }
</style>