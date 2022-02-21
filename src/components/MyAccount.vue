<template>
    <main>
        <b-container class="w-25">
            <h1>내 정보관리</h1>
            <validation-observer ref="observer" v-slot="{ handleSubmit }">
                <b-form @submit.prevent="handleSubmit(updateMe)">
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
                    name="이름"
                    :rules="{ required: false }"
                    >
                        <b-form-group id="name-input-group" label="이름" label-for="name-input">
                            <b-form-input
                            disabled
                            id="name-input"
                            name="name-input"
                            v-model="user.name"
                            ></b-form-input>
                        </b-form-group>
                    </validation-provider>
                    <validation-provider
                    name="연락처"
                    :rules="{ required: true, integer: true, min: 9 }"
                    v-slot="validationContext"
                    >
                        <b-form-group id="tel-input-group" label="연락처" label-for="tel-input">
                            <b-form-input
                            id="tel-input"
                            name="tel-input"
                            v-model="user.phone"
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
                    name="이메일"
                    :rules="{ required: true, email: true }"
                    v-slot="validationContext"
                    >
                        <b-form-group id="email-input-group" label="이메일" label-for="email-input">
                            <b-form-input
                            id="email-input"
                            name="email-input"
                            v-model="user.email"
                            type="email"
                            placeholder="이메일주소를 입력하세요."
                            :state="getValidationState(validationContext)"
                            aria-describedby="email-input-feedback"
                            ></b-form-input>
                            <b-form-invalid-feedback id="email-input-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
                        </b-form-group>
                    </validation-provider>

                    <!-- 비밀번호 변경 -->
                    <b-btn class="w-100 my-3" @click="changePwdToggle()">비밀번호 변경</b-btn>
                    <ChangePwd :show="changePwdShow" @hide="changePwdHide()" />

                    <b-button type="submit" variant="primary" v-if="update">수정</b-button>
                </b-form>
            </validation-observer>
            {{user}}
        </b-container>
    </main>
</template>

<script>
import ChangePwd from '../Layout/ChangePwd.vue'
export default {
    name: 'Login',
    components: { ChangePwd },
    data() {
        return {
            user:{},
            changePwdShow: false,
            update: true,
        }
    },
    mounted() {
        this.getMe();
    },
    methods: {
        async updateMe(){
            const { data } = await this.$axios.put("/admin/users/me", {
                email: this.user.email,
                phone: this.user.phone,
                second: this.user.second
            })
            console.log(data);

            if (data.code === "0000") {
                this.$bvModal.msgBoxOk('내 정보가 성공적으로 수정되었습니다.', {
                    title: '내 정보수정',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'success',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                })
            } else if (data.code === "1007") {
                this.$bvModal.msgBoxOk('가입 시 반드시 비밀번호를 변경해야합니다.', {
                    title: '비밀번호 변경',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                    noCloseOnBackdrop: true
                })
            }
        },
        changePwdHide() {
            this.changePwdShow = false
            this.user.second = true
            this.update = !this.update
        },
        changePwdToggle() {
            this.changePwdShow = !this.changePwdShow
            this.update = !this.update
        },

        async getMe(){
            const { data } = await this.$axios.get("/admin/users/me");
            console.log(data);
            
            this.user = data.data;

            if(!this.user.second) {
                this.$bvModal.msgBoxOk('가입 시 반드시 비밀번호를 변경해야합니다.', {
                    title: '비밀번호 변경',
                    size: 'sm',
                    buttonSize: 'sm',
                    okVariant: 'danger',
                    centered: true,
                    okTitle: '확인',
                    footerClass: 'p-2',
                    noCloseOnBackdrop: true
                })
                this.changePwdShow = true
                this.update = false
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