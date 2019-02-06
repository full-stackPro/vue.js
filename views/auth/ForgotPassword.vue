<template>
  <div class="text-center padBtm-90 padTop-45">
    <div class="mainBox">
      <logo/>
      <div class="signInForm">
        <div class="form-group">
          <input
            v-validate="'required|email'"
            data-vv-name="email"
            data-vv-as="email"
            v-model="email"
            type="email"
            placeholder="Email"
          >
          <span class="error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          <div class="popularButton mrgTop-30">
            <button @click="doResetPassword" class="blueStyle">Reset Password</button>
            <div class="mrgTop-80">
              <router-link to="signup">SignUp</router-link>&nbsp;·&nbsp;
              <router-link to="login">Login</router-link>&nbsp;·&nbsp;
              <a href="#">Need Help?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import Logo from "@/components/shared/Logo";

export default {
  name: "login",
  data() {
    return {
      email: null
    };
  },
  methods: {
    ...mapActions("auth", ["resetPassword"]),
    doResetPassword() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.resetPassword({ email: this.email });
        }
      });
    }
  },
  components: { Logo }
};
</script>
