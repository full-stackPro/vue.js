<template>
  <div class="babyBlue padLeft-25">
    <div class="price">
      <div class="wrapperButton clearfix mrgTop-15">
        <div class="leftButton pull-left">
          <div class="popularButton">
            <button @click="logout" class="brdRad-5 fontSize-10 bold padTopBtm-15">SignOut</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Subscription",
  methods: {
    ...mapActions("auth", ["logout"])
  }
};
</script>
