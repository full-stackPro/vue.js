<template>
  <div id="app" class="coverBox">
    <transition enter-active-class="animated fadeIn fast" leave-active-class="fadeOut">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions("alert", ["fetchAlerts", "getDraft"]),
    ...mapActions("trigger", ["fetchUserTriggers", "fetchTriggers"]),
    ...mapActions("tab", ["initTabs"])
  },
  beforeMount() {
    this.initTabs();
    this.getDraft();
  },
  mounted() {
    if (this.alerts && !this.alerts.length) this.fetchAlerts();
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "SegoeUI";
  src: url("./assets/fonts/segoeui/SegoeUI.eot?#iefix")
      format("embedded-opentype"),
    url("./assets/fonts/segoeui/SegoeUI.woff") format("woff"),
    url("./assets/fonts/segoeui/SegoeUI.ttf") format("truetype"),
    url("./assets/fonts/segoeui/SegoeUI.svg#SegoeUI") format("svg");
  font-weight: normal;
  font-style: normal;
}
@import "./assets/css/main.scss";
@import "./assets/css/reset.css";
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");
</style>
