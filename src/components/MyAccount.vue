<template>
  <main class="center">
    <b-container class="w-50">
      <b-row class="yellow-wrap">
        <p class="text-30 fw-900 mb-4 position-relative">
          내 정보수정
          <b-btn
            @click="changePwdToggle()"
            pill
            block
            :style="{
              background: '#ddd',
              border: '3px solid #000',
              float: 'right',
            }"
          >
            <span class="fw-900 text-20 px-4" :style="{ color: '#000' }"
              >비밀번호 재설정
              <font-awesome-icon :icon="changePwdShow ? 'minus' : 'plus'"
            /></span>
          </b-btn>
        </p>
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(updateMe)">
            <div
              class="d-flex justify-content-between"
              :style="{ gap: '1rem' }"
            >
              <validation-provider
                name="아이디"
                :rules="{ required: false }"
                class="w-100"
              >
                <b-form-group
                  id="serviceId-input-group"
                  label="아이디"
                  label-for="serviceId-input"
                >
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
                class="w-100"
              >
                <b-form-group
                  id="name-input-group"
                  label="이름"
                  label-for="name-input"
                >
                  <b-form-input
                    disabled
                    id="name-input"
                    name="name-input"
                    v-model="user.name"
                  ></b-form-input>
                </b-form-group>
              </validation-provider>
            </div>
            <div
              class="d-flex justify-content-between mt-3"
              :style="{ gap: '1rem' }"
            >
              <validation-provider
                name="연락처"
                :rules="{ required: true, integer: true, min: 9 }"
                v-slot="validationContext"
                class="w-100"
              >
                <b-form-group
                  id="tel-input-group"
                  label="연락처"
                  label-for="tel-input"
                >
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
                  <b-form-invalid-feedback id="tel-input-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
              <validation-provider
                name="이메일"
                :rules="{ required: true, email: true }"
                v-slot="validationContext"
                class="w-100"
              >
                <b-form-group
                  id="email-input-group"
                  label="이메일"
                  label-for="email-input"
                >
                  <b-form-input
                    id="email-input"
                    name="email-input"
                    v-model="user.email"
                    type="email"
                    placeholder="이메일주소를 입력하세요."
                    :state="getValidationState(validationContext)"
                    aria-describedby="email-input-feedback"
                  ></b-form-input>
                  <b-form-invalid-feedback id="email-input-feedback">{{
                    validationContext.errors[0]
                  }}</b-form-invalid-feedback>
                </b-form-group>
              </validation-provider>
            </div>

            <!-- 비밀번호 변경 -->
            <ChangePwd :show="changePwdShow" @hide="changePwdHide()" />

            <b-button
              type="submit"
              class="mt-4"
              v-if="update"
              pill
              block
              :style="{ background: '#FDDA00', border: '3px solid #000' }"
            >
              <span class="text-20 px-4 fw-900" :style="{ color: '#000' }"
                >정보수정</span
              >
            </b-button>
          </b-form>
        </validation-observer>
      </b-row>
      <!-- {{user}} -->
    </b-container>
  </main>
</template>

<script>
import ChangePwd from "../Layout/ChangePwd.vue";
export default {
  name: "Login",
  components: { ChangePwd },
  data() {
    return {
      user: {},
      changePwdShow: false,
      update: true,
    };
  },
  mounted() {
    this.getMe();
  },
  methods: {
    async updateMe() {
      const { data } = await this.$axios.put("/admin/users/me", {
        email: this.user.email,
        phone: this.user.phone,
        second: this.user.second,
      });
      console.log(data);

      if (data.code === "0000") {
        this.$bvModal.msgBoxOk("내 정보가 성공적으로 수정되었습니다.", {
          title: "내 정보수정",
          size: "sm",
          buttonSize: "sm",
          okVariant: "success",
          centered: true,
          okTitle: "확인",
          footerClass: "p-2",
          footerBgVariant: "white",
          titleClass: "fw-900",
        });
      } else if (data.code === "1007") {
        this.$bvModal.msgBoxOk("가입 시 반드시 비밀번호를 변경해야합니다.", {
          title: "비밀번호 변경",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          centered: true,
          okTitle: "확인",
          footerClass: "p-2",
          noCloseOnBackdrop: true,
          footerBgVariant: "white",
          titleClass: "fw-900",
        });
      }
    },
    changePwdHide() {
      this.changePwdShow = false;
      this.user.second = true;
      this.update = !this.update;
    },
    changePwdToggle() {
      this.changePwdShow = !this.changePwdShow;
      this.update = !this.update;
    },

    async getMe() {
      const { data } = await this.$axios.get("/admin/users/me");
      console.log(data);

      this.user = data.data;

      if (!this.user.second) {
        this.$bvModal.msgBoxOk("가입 시 반드시 비밀번호를 변경해야합니다.", {
          title: "비밀번호 변경",
          size: "sm",
          buttonSize: "sm",
          okVariant: "danger",
          centered: true,
          okTitle: "확인",
          footerClass: "p-2",
          noCloseOnBackdrop: true,
          footerBgVariant: "white",
          titleClass: "fw-900",
        });
        this.changePwdShow = true;
        this.update = false;
      }
    },

    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  },
};
</script>

<style></style>
