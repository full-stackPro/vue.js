<template>
  <div class="text-center padBtm-90 padTop-45">
    <div class="mainBox">
      <logo/>
      <div class="signInForm">
        <div class="form-group">
          <input
            v-validate="'required|email'"
            data-vv-name="credentials.email"
            data-vv-as="email"
            v-model="credentials.email"
            type="email"
            placeholder="Email"
            @keyup.enter="doLogin"
            autofocus
          >
          <span
            class="error"
            v-show="errors.has('credentials.email')"
          >{{ errors.first('credentials.email') }}</span>
          
          <input
            v-validate="'required|min:6|max:30'"
            data-vv-name="credentials.password"
            data-vv-as="password"
            v-model="credentials.password"
            name="password"
            type="password"
            placeholder="Password"
            @keyup.enter="doLogin"
          >
          <span
            class="error"
            v-show="errors.has('credentials.password')"
          >{{ errors.first('credentials.password') }}</span>
          
          <span v-if="authError" class="error">{{authError}}</span>

          <div class="popularButton mrgTop-80">
            <button @click="doLogin" class="blueStyle">Sign in</button>
            <div class="goToSignin">
              <span>New to Call To action?</span>
              <router-link to="signup">Create Account</router-link>
              <router-link
                to="forgot-password"
                class="blackColor d-block padTop-22"
              >Forgot password?</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { mapActions } from "vuex";
import { mapState } from "@/store/vuex_ext";
import Logo from "@/components/shared/Logo";

export default {
  name: "login",
  data() {
    return {
      credentials: {
        email: null,
        password: null
      },
      badCredentials: false
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),
    doLogin() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.login(this.credentials);
        }
      });
    }
  },
  computed: { ...mapState("auth", { authError: "authError" }) },
  components: { Logo }
};
</script>
