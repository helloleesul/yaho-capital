<template>
    <main>
        <b-container class="w-25">
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(submit)">
                    <validation-provider
                    name="아이디"
                    :rules="{ required: false }"
                    >
                        <b-form-group id="serviceId-input-group" label="아이디" label-for="serviceId-input">
                            <b-form-input
                            disabled
                            id="serviceId-input"
                            name="serviceId-input"
                            v-model="user.serviceId"
                            ></b-form-input>
                        </b-form-group>
                    </validation-provider>
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
                            v-model="user.newPassword"
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
                            v-model="user.newPassword2"
                            :state="getValidationState(validationContext)"
                            aria-describedby="newPassword2-input-feedback"
                            placeholder="비밀번호를 입력하세요."
                        ></b-form-input>
                        <b-form-invalid-feedback id="newPassword2-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>

                    <b-button type="submit" variant="primary">로그인</b-button>
                </b-form>
            </validation-observer>
        </b-container>
    </main>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            user:{},
        }
    },
    methods: {
        async submit(){
            console.log(this.user)
            
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