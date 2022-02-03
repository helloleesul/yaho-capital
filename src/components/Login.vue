<template>
    <main>
        <b-container class="w-25">
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(submit)">
                    <validation-provider
                    name="아이디"
                    :rules="{ required: true }"
                    v-slot="validationContext"
                    >
                        <b-form-group id="serviceId-input-group" label="아이디" label-for="serviceId-input">
                            <b-form-input
                            id="serviceId-input"
                            name="serviceId-input"
                            v-model="user.serviceId"
                            placeholder="아이디를 입력하세요."
                            :state="getValidationState(validationContext)"
                            aria-describedby="serviceId-input-feedback"
                            ></b-form-input>
                            <b-form-invalid-feedback id="serviceId-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider
                    name="비밀번호"
                    :rules="{ required: true }"
                    v-slot="validationContext"
                    >
                        <b-form-group id="password-input-group" label="비밀번호" label-for="password-input">
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