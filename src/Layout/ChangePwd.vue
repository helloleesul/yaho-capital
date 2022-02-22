<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }" v-if="show">
        <b-form @submit.prevent="handleSubmit(changePwd)" class="pt-3 mt-4" :style="{borderTop: '3px dashed #000'}">
            <validation-provider
            name="현재 비밀번호"
            :rules="{ required: true }"
            v-slot="validationContext"
            >
                <b-form-group id="password-input-group" label="현재 비밀번호" label-for="password-input">
                    <b-form-input
                    id="password-input"
                    name="password-input"
                    v-model="input.originalPassword"
                    type="password"
                    placeholder="비밀번호를 입력하세요."
                    :state="getValidationState(validationContext)"
                    aria-describedby="password-input-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="password-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <validation-provider
                :rules="{ required: true }"
                name="새 비밀번호"
                vid="password"
                v-slot="validationContext"
            >
                <b-form-group id="newPassword-input-group" label="새 비밀번호" label-for="newPassword-input" class="mt-3">
                <b-form-input
                    id="newPassword-input"
                    name="newPassword-input"
                    type="password"
                    v-model="input.newPassword"
                    :state="getValidationState(validationContext)"
                    aria-describedby="newPassword-input-feedback"
                    placeholder="비밀번호를 입력하세요."
                ></b-form-input>
                <b-form-invalid-feedback id="newPassword-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <validation-provider
                :rules="{ required: true, confirmed: 'password' }"
                name="새 비밀번호 확인"
                v-slot="validationContext"
            >
                <b-form-group id="newPassword2-input-group" label="새 비밀번호 확인" label-for="newPassword2-input" class="mt-3">
                <b-form-input
                    id="newPassword2-input"
                    name="newPassword2-input"
                    type="password"
                    v-model="newPasswordCheck"
                    :state="getValidationState(validationContext)"
                    aria-describedby="newPassword2-input-feedback"
                    placeholder="비밀번호를 입력하세요."
                ></b-form-input>
                <b-form-invalid-feedback id="newPassword2-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <!-- <b-button type="submit" variant="primary">비밀번호 변경</b-button> -->
            <b-button type="submit" class="mt-4" pill block :style="{background:'#FDDA00',border:'3px solid #000'}">
                <span class="text-20 px-4 fw-900" :style="{color:'#000'}">재설정</span>
            </b-button>
            <!-- {{input}} -->
        </b-form>
  </validation-observer>
</template>

<script>
export default {
    name: 'ChangePwd',
    props: {
        show: Boolean,
    },
    data() {
        return {
            input: {
                newPassword: null,
                originalPassword: null
            },
            newPasswordCheck: null,
        }
    },
    methods: {
        async changePwd(){
            const { data } = await this.$axios.post("/admin/users/reset-password", this.input);
            console.log(data)
            // console.log(this.input)

            if (data.code === "0000") {
                this.$bvModal.msgBoxOk('비밀번호가 성공적으로 변경되었습니다.', {
                    title: '비밀번호 변경',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                    footerBgVariant:"white",
                    titleClass: "fw-900"
                }).then(() => {
                    Object.assign(this.$data, this.$options.data());
                    this.$refs.observer.reset();
                    this.$emit('hide')
                })
            } else if (data.code === "1006") {
                this.$bvModal.msgBoxOk('입력하신 현재 비밀번호가 일치하지 않습니다.', {
                    title: '비밀번호 불일치',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                    noCloseOnBackdrop: true,
                    footerBgVariant:"white",
                    titleClass: "fw-900"
                }).then(() => {
                    Object.assign(this.$data, this.$options.data());
                    this.$refs.observer.reset();
                })
            }
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
    },
}
</script>

<style>
input[type="password"] {
    font-family: sans-serif;
}
input[type="password"]::placeholder {
    font-family: "NanumSquare";
}
</style>