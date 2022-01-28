<template>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit)">
            <validation-provider
            name="이름"
            :rules="{ required: true, min: 1 }"
            v-slot="validationContext"
            >
                <b-form-group id="name-input-group" label="이름" label-for="name-input">
                    <b-form-input
                    id="name-input"
                    name="name-input"
                    v-model="input.name"
                    placeholder="이름을 입력하세요."
                    :state="getValidationState(validationContext)"
                    aria-describedby="name-input-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="name-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
            <validation-provider
            name="연락처"
            :rules="{ required: true, integer: true }"
            v-slot="validationContext"
            >
                <b-form-group id="tel-input-group" label="연락처" label-for="tel-input">
                    <b-form-input
                    id="tel-input"
                    name="tel-input"
                    v-model="input.tel"
                    type="tel"
                    placeholder="-없이 입력하세요."
                    maxlength="11"
                    :state="getValidationState(validationContext)"
                    aria-describedby="tel-input-feedback"
                    ></b-form-input>
                    <b-form-invalid-feedback id="tel-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                </b-form-group>
            </validation-provider>
            <validation-provider
            name="상담내용"
            :rules="{ required: false }"
            >
                <b-form-group id="contents-input-group" label="상담내용" label-for="contents-input">
                    <b-form-textarea
                    id="contents-input"
                    v-model="input.contents" 
                    placeholder="상담내용을 간단히 입력하세요."
                    rows="3"
                    max-rows="6"
                    ></b-form-textarea>
                </b-form-group>
            </validation-provider>
            <validation-provider
            name="개인정보동의"
            :rules="{ required: true }"
            v-slot="validationContext"
            >
                    <b-form-checkbox-group
                    :state="getValidationState(validationContext)"
                    v-model="check"
                    id="check-input"
                    >
                        <b-form-checkbox value="개인정보동의">
                            개인정보동의
                            <b-btn variant="link">자세히보기</b-btn>
                        </b-form-checkbox>
                        <b-form-invalid-feedback id="check-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                    </b-form-checkbox-group>
            </validation-provider>

            <b-button type="submit" variant="primary">상담신청</b-button>
        </b-form>
    </validation-observer>
</template>

<script>
export default {
    name: 'Inquiry',
    data() {
        return {
            input:{
                name: '',
                tel: null,
                contents: '',
            },
            check: [],
        }
    },
    methods: {
        async submit(){
            console.log(this.input)
            
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
#check-input-feedback {
    display: block !important;
}
</style>