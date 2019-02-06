<template>
  <div class="text-center padBtm-90 padTop-45">
    <div class="mainBox">
      <logo/>
      <div class="signInForm">
        <div class="form-group">
          <input
            @input="setAuthError('')"
            v-validate="'required|email'"
            data-vv-name="user.email"
            data-vv-as="email"
            v-model="user.email"
            type="email"
            placeholder="Email"
          >
          <span class="error" v-show="errors.has('user.email')">{{ errors.first('user.email') }}</span>
          <input
            v-validate="'required|min:6|max:30'"
            data-vv-name="user.password"
            data-vv-as="password"
            v-model="user.password"
            name="password"
            type="password"
            placeholder="Password"
            ref="password"
          >
          <span
            class="error"
            v-show="errors.has('user.password')"
          >{{ errors.first('user.password') }}</span>
          <input
            v-validate="'required|confirmed:password'"
            data-vv-name="user.cpassword"
            data-vv-as="password"
            v-model="user.cpassword"
            name="cpassword"
            type="password"
            placeholder="Password"
          >
          <span
            class="error"
            v-show="errors.has('user.cpassword')"
          >{{ errors.first('user.cpassword') }}</span>
          
          <span v-if="authError" class="error">{{authError}}</span>

          <div class="popularButton mrgTop-80">
            <button @click="doSignUp" class="blueStyle">Sign up</button>
            <div class="goToSignin">
              <span>Already have an account?</span>
              <router-link to="login">Sign in</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { mapState } from "@/store/vuex_ext";

import Logo from "@/components/shared/Logo";

export default {
  name: "signup",
  data() {
    return {
      user: {
        email: null,
        password: null,
        cpassword: null
      }
    };
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    ...mapMutations("auth", ["setAuthError"]),
    doSignUp() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.signup(this.user);
        }
      });
    }
  },
  computed: { ...mapState("auth", { authError: "authError" }) },
  components: { Logo }
};
</script>
