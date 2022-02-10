<template>
  <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(changePwd)">
            <validation-provider
            name="현재 비밀번호"
            :rules="{ required: true }"
            v-slot="validationContext"
            >
                <b-form-group id="password-input-group" label="현재 비밀번호" label-for="password-input">
                    <b-form-input
                    id="password-input"
                    name="password-input"
                    v-model="user.password"
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
                <b-form-group id="newPassword-input-group" label="새 비밀번호" label-for="newPassword-input">
                <b-form-input
                    id="newPassword-input"
                    name="newPassword-input"
                    type="password"
                    v-model="pwd.new"
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
                <b-form-group id="newPassword2-input-group" label="새 비밀번호 확인" label-for="newPassword2-input">
                <b-form-input
                    id="newPassword2-input"
                    name="newPassword2-input"
                    type="password"
                    v-model="pwd.new2"
                    :state="getValidationState(validationContext)"
                    aria-describedby="newPassword2-input-feedback"
                    placeholder="비밀번호를 입력하세요."
                ></b-form-input>
                <b-form-invalid-feedback id="newPassword2-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>

            <b-button type="submit" variant="primary">비밀번호 변경</b-button>
            Return value: {{ String(change) }}
            {{user}} {{pwd}}
        </b-form>
  </validation-observer>
</template>

<script>
export default {
    name: 'ChangePwd',
    data() {
        return {
            user:{
            },
            pwd: {
                new: null,
                new2: null,
            },
            change: false
        }
    },
    methods: {
        async changePwd(){
            console.log(this.user)
            this.$bvModal.msgBoxOk('비밀번호가 성공적으로 변경되었습니다.', {
                title: '비밀번호 변경',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'success',
                centered: true,
                okTitle: '확인',
                footerClass: 'p-2',
            })
            
            // const { data } = await this.$axios.post("/token", this.input);
            // console.log(data)
            // if (data.data.code === '0000') {
            //     this.sheet2 = true;
            // } 
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