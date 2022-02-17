<template>
    <main>
        <b-container class="w-25">
            <h1>계정 생성</h1>
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(userCreate)">
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
                    name="아이디"
                    :rules="{ required: true, min: 1, alpha_dash: true }"
                    v-slot="validationContext"
                    >
                        <b-form-group id="serviceId-input-group" label="아이디" label-for="serviceId-input">
                            <b-form-input
                            id="serviceId-input"
                            name="serviceId-input"
                            v-model="input.serviceId"
                            placeholder="생성하실 아이디를 입력하세요."
                            :state="getValidationState(validationContext)"
                            aria-describedby="serviceId-input-feedback"
                            ></b-form-input>
                            <b-form-invalid-feedback id="serviceId-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                        <b-btn @click="serviceIdCheck()">중복확인</b-btn>
                    </validation-provider>
                    <validation-provider
                    name="이메일"
                    :rules="{ required: false, email: true }"
                    v-slot="validationContext"
                    >
                        <b-form-group id="email-input-group" label="이메일" label-for="email-input">
                            <b-form-input
                            id="email-input"
                            name="email-input"
                            v-model="input.email"
                            type="email"
                            placeholder="이메일주소를 입력하세요."
                            :state="getValidationState(validationContext)"
                            aria-describedby="email-input-feedback"
                            ></b-form-input>
                            <b-form-invalid-feedback id="email-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider
                    name="연락처"
                    :rules="{ required: false, integer: true, min: 9, max: 11 }"
                    v-slot="validationContext"
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

                    <b-button type="submit" variant="primary">생성</b-button>
                    {{input}}
                </b-form>
            </validation-observer>
        </b-container>
    </main>
</template>

<script>
export default {
    name: 'UserCreate',
    data() {
        return {
            input:{
                name: null,
                serviceId: null,
                email: null,
                phone: null,
            },
        }
    },
    methods: {
        async userCreate(){
            const { data } = await this.$axios.post("/admin/users", this.input);
            console.log(data)
            // console.log(this.input)

            if (data.code === "0000") {
                this.$bvModal.msgBoxOk('회원 계정이 생성되었습니다.', {
                    title: '회원 계정 생성',
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
                    this.$router.push('/admin/userList');
                })
            } else if (data.code === "1002") {
                this.$bvModal.msgBoxOk('입력하신 아이디가 이미 존재합니다.', {
                    title: '아이디 사용 불가',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                })
            }
        },
        async serviceIdCheck(){
            const { data } = await this.$axios.post("/admin/users/valid-id", {
                serviceId: this.input.serviceId
            });
            console.log(data)
            console.log(this.input.serviceId)
            if (data.code === "0000") {
                if(this.input.serviceId) {
                    this.$bvModal.msgBoxOk('사용 가능한 아이디입니다.', {
                        title: '아이디 사용 가능',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'success',
                        centered: true,
                        okTitle: '확인',
                        footerClass: 'p-2',
                    })
                } else {
                    this.$bvModal.msgBoxOk('아이디 값을 입력하세요.', {
                        title: '아이디 미입력',
                        size: 'sm',
                        buttonSize: 'sm',
                        okVariant: 'danger',
                        centered: true,
                        okTitle: '확인',
                        footerClass: 'p-2',
                    })
                }
            } else if (data.code === "1002") {
                this.$bvModal.msgBoxOk('입력하신 아이디가 이미 존재합니다.', {
                    title: '아이디 중복',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
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
</style>