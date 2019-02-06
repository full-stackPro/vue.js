<template>
  <div>
    <div class="brdBtm-1"></div>
    <!-- Start - Message Section -->
    <div class="theTitle padLeft-20">
      <p>What message would you like to send?</p>
    </div>
    <div class="areaMessage">
      <textarea v-model="message" placeholder="Alert Message"></textarea>
    </div>
    <!-- End - Message Section -->
    <!-- Start - Tracked Link Section -->
    <div class="areaMessage">
      <input
        v-model="trackedlink"
        v-validate="'url'"
        name="trackedlink"
        placeholder="Tracked Link URL (Optional)"
      >
    </div>
    <span class="error mrgLeft-20" v-show="errors.has('trackedlink') || !isValid">Not Valid URL</span>
    <!-- End - Tracked Link Section -->
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "@/store/vuex_ext";
import { mapActions } from "vuex";
import { isValidUrl } from "@/utils";

export default {
  computed: {
    ...mapState("alert", { alert: "alert" }),
    message: {
      get: () => store.state.alert.alert.message,
      set: message => store.commit("alert/setMessage", message)
    },
    trackedlink: {
      get: () => store.state.alert.alert.trackedlink,
      set: trackedlink => store.commit("alert/setTrackedLink", trackedlink)
    },
    isValid() {
      return isValidUrl(this.trackedlink);
    }
  }
};
</script>

