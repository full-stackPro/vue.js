<template>
  <div>
    <div class="brdBtm-1"></div>
    <div class="popularButton mrgTop-12 mrgbtm-12 mrgLeft-20">
      <router-link tag="button" :to="getRecpRoot + 'email'" class="blueStyle-2">Email</router-link>
      <router-link tag="button" :to="getRecpRoot + 'sms'" class="blueStyle-2 mrgLeft-10">SMS</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    getRecpRoot() {
      if (this.$store.state.alert.isRecpFormActive) {
        return "";
      } else {
        return "recipients/";
      }
    }
  }
};
</script>
