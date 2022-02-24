<template>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
        <b-form @submit.prevent="handleSubmit(submit)">
            <div class="d-flex justify-content-between mb-4" :style="{gap: '1rem'}">
                <validation-provider
                name="이름"
                :rules="{ required: true, min: 1 }"
                v-slot="validationContext"
                class="w-100"
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
                :rules="{ required: true, integer: true, min: 9, max: 11 }"
                v-slot="validationContext"
                class="w-100"
                >
                    <b-form-group id="tel-input-group" label="연락처" label-for="tel-input">
                        <b-form-input
                        id="tel-input"
                        name="tel-input"
                        v-model="input.phone"
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
                class="w-100"
                >
                    <b-form-group id="contents-input-group" label="상담내용" label-for="contents-input">
                        <b-form-textarea
                        id="contents-input"
                        v-model="input.content" 
                        placeholder="상담내용을 간단히 입력하세요."
                        ></b-form-textarea>
                    </b-form-group>
                </validation-provider>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <validation-provider
                name="개인정보취급방침이용동의"
                :rules="{ required: true }"
                v-slot="validationContext"
                >
                        <b-form-checkbox-group
                        :state="getValidationState(validationContext)"
                        v-model="check"
                        id="check-input"
                        >
                            <b-form-checkbox value="개인정보취급방침이용동의">
                                <span class="px-2 fw-900 text-18">개인정보취급방침이용동의</span>
                                <!-- <b-btn v-b-modal.check1 variant="link" class="decoration-0 p-0 align-top"> -->
                                <b-btn v-b-modal.check1 variant="link" class="decoration-0 p-0 align-top">
                                    <span class="text-black">[자세히보기]</span>
                                </b-btn>
                            </b-form-checkbox>
                            <b-form-invalid-feedback id="check-input-feedback" :class="{'hide': checkHide}">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-checkbox-group>
                </validation-provider>
                <b-button type="submit" pill :style="{height:'fit-content',background:'#FDDA00',border:'3px solid #000'}">
                    <span class="text-20 px-4 fw-900" :style="{color:'#000'}">상담신청</span>
                </b-button>
            </div>
            <!-- {{ check }} -->
        </b-form>
    </validation-observer>
</template>

<script>
export default {
    name: 'Inquiry',
    data() {
        return {
            input:{
                name: null,
                phone: null,
                content: null,
            },
            check: [],
            checkHide: false,
        }
    },
    methods: {
        async submit(){
            const { data } = await this.$axios.post("/api/v1/inquiry", this.input);
            console.log(data)
            // console.log(this.input)

            if (data.code === "0000") {
                this.$bvModal.msgBoxOk('상담신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.', {
                    title: '상담신청 완료',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                }).then(() => {
                    // console.log(value)
                    Object.assign(this.$data, this.$options.data());
                    this.$refs.observer.reset();
                    this.checkHide = true;
                })
            } 
        },
        getValidationState({ dirty, validated, valid = null }) {
            return dirty || validated ? valid : null;
        },
    },
} 
</script>

<style lang="scss">
#check-input-feedback {
    display: block !important;
    margin: 0 !important;
    &.hide {
        display: none !important;
    }
}
#contents-input {
    height: 38px;
}
</style>