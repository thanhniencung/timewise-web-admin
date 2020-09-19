<template>
  <div class="sign-up-container">
    <div class="sign-up-box">
      <img
        src="https://theme.hstatic.net/1000256404/1000579580/14/logo.png?v=195"
        width="83"
        height="83"
        alt="logo"
      />
      <form @submit.prevent="submitSignIn" class="sign-in-form">
        <section>
          <label class="mdc-text-field mdc-text-field--filled email">
            <span class="mdc-text-field__ripple"></span>
            <input
              class="mdc-text-field__input"
              type="text"
              aria-labelledby="my-label-id"
              aria-controls="my-helper-id"
              aria-describedby="my-helper-id"
            />
            <span class="mdc-floating-label" id="my-label-id">Email</span>
            <span class="mdc-line-ripple"></span>
          </label>
          <span style="font-size: 13px; color: red;">{{errEmail}}</span>
        </section>

        <section>
          <label class="mdc-text-field mdc-text-field--filled password">
            <span class="mdc-text-field__ripple"></span>
            <input
              class="mdc-text-field__input"
              type="password"
              aria-labelledby="my-label-id"
              aria-controls="my-helper-id"
              aria-describedby="my-helper-id"
            />
            <span class="mdc-floating-label" id="my-label-id">Mật khẩu</span>
            <span class="mdc-line-ripple"></span>
          </label>
          <span style="font-size: 13px; color: red;">{{errPass}}</span>
        </section>

        <button type="submit" class="mdc-button mdc-button--raised">
          <span class="mdc-button__label">Đăng nhập</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useUser } from "../stores/userStore";
import router from "../router/router";

export default {
  name: "SignIn",
  setup() {
    let txtEmail, txtPassword;
    onMounted(() => {
      txtEmail = new mdc.textField.MDCTextField(
        document.querySelector(".email")
      );

      txtPassword = new mdc.textField.MDCTextField(
        document.querySelector(".password")
      );

      var button = new mdc.ripple.MDCRipple.attachTo(
        document.querySelector(".mdc-button--raised")
      );
    });

    const { errEmail, errPass, signInResponse, doSignIn } = useUser();

    const submitSignIn = async () => {
      const email = txtEmail.value;
      const pass = txtPassword.value;

      const result = await doSignIn(email, pass);
      if (result) {
        router.push("/");
      }
    };

    return { errEmail, errPass, submitSignIn };
  },
};
</script>

<style scoped>
.sign-up-container {
  width: 100%;
  height: 100%;
  background: #eceff1;
}
.sign-up-box {
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 300px;
  height: 330px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.sign-up-box img {
  margin-bottom: 20px;
}

.sign-in-form {
  width: 100%;
}

section {
  margin-bottom: 10px;
}

.mdc-text-field {
  width: 100%;
}

.mdc-button {
  margin-top: 15px;
  width: 100%;
  height: 40px;
}
</style>
