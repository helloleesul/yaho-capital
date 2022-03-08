<template>
  <main class="center">
    <b-container class="w-25">
      <b-row class="yellow-wrap">
        <p class="text-30 fw-900 mb-4">로그인</p>
        <validation-observer ref="observer" v-slot="{ handleSubmit }">
          <b-form @submit.prevent="handleSubmit(login)">
            <validation-provider
              name="아이디"
              :rules="{ required: true }"
              v-slot="validationContext"
            >
              <b-form-group
                id="serviceId-input-group"
                label="아이디"
                label-for="serviceId-input"
              >
                <b-form-input
                  id="serviceId-input"
                  name="serviceId-input"
                  v-model="input.serviceId"
                  placeholder="아이디를 입력하세요."
                  :state="getValidationState(validationContext)"
                  aria-describedby="serviceId-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="serviceId-input-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>
            <validation-provider
              name="비밀번호"
              :rules="{ required: true }"
              v-slot="validationContext"
            >
              <b-form-group
                id="password-input-group"
                label="비밀번호"
                label-for="password-input"
                class="mt-3"
              >
                <b-form-input
                  id="password-input"
                  name="password-input"
                  v-model="input.password"
                  type="password"
                  placeholder="비밀번호를 입력하세요."
                  :state="getValidationState(validationContext)"
                  aria-describedby="password-input-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="password-input-feedback">{{
                  validationContext.errors[0]
                }}</b-form-invalid-feedback>
              </b-form-group>
            </validation-provider>

            <b-button
              class="mt-5 w-100"
              type="submit"
              pill
              block
              :style="{ background: '#FDDA00', border: '3px solid #000' }"
            >
              <span class="text-20 px-4 fw-900" :style="{ color: '#000' }"
                >로그인</span
              >
            </b-button>
          </b-form>
        </validation-observer>
      </b-row>
    </b-container>
  </main>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      input: {
        serviceId: null,
        password: null,
      },
    };
  },
  methods: {
    async login() {
      const { data } = await this.$axios.post("/auth/token", this.input);
      console.log(data);
      // this.$store.dispatch('setLogin', data.data.token, data.data.serviceId)

      if (data.code === "0000") {
        // console.log(this.input);
        // console.log(this.$store.state.token);
        // console.log(this.$store.state.serviceId);

        this.$store.dispatch("setToken", data.data.token);
        this.$store.dispatch("setServiceId", data.data.serviceId);
        this.$store.dispatch("setRole", data.data.role);
        this.$store.dispatch("setName", data.data.name);
        if (!data.data.second) {
          location.replace("/admin/myAccount");
        } else {
          this.$router.push("/admin/inquiryList");
        }
      } else if (data.code === "1003") {
        // console.log(data.code)
        this.$bvModal.msgBoxOk("탈퇴된 계정입니다.", {
          title: "로그인 실패",
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
      } else if (data.code === "1005") {
        // console.log(data.code)
        this.$bvModal.msgBoxOk(
          "입력하신 아이디 또는 비밀번호가 일치하지 않습니다.",
          {
            title: "로그인 실패",
            size: "sm",
            buttonSize: "sm",
            okVariant: "danger",
            centered: true,
            okTitle: "확인",
            footerClass: "p-2",
            noCloseOnBackdrop: true,
            footerBgVariant: "white",
            titleClass: "fw-900",
          }
        );
      } else if (data.code === "4041") {
        // console.log(data.code)
        this.$bvModal.msgBoxOk("요청하신 계정을 찾을 수 없습니다.", {
          title: "로그인 실패",
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
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  },
};
</script>

<style>
input[type="password"] {
  font-family: sans-serif;
}
input[type="password"]::placeholder {
  font-family: "NanumSquare";
}
</style>
