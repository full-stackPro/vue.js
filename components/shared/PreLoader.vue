<template>
  <div class="mainBox">
    <div class="center text-center">
      <img src="@/assets/images/loader.gif">
      <p>{{loaderStatus}}</p>
      <div class="logo">
        <h1>
          <a href="#">
            <img src="@/assets/images/logo_Call_To_Action.png">
          </a>
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  computed: {
    loaderStatus() {
      if (this.$route.name === "TestAlert") {
        return "Testing Alert Triggers";
      } else if (this.$route.name === "RunAlert") {
        return "Running Alert..";
      } else {
        return "Running All Alerts..";
      }
    }
  },
  mounted() {
    const alertId = this.$route.params["alertId"];
    setTimeout(function() {
      if (alertId) {
        router.push(`/alerts/${alertId}/triggers`);
      } else {
        router.push("/alert-list");
      }
    }, 3000);
  }
};
</script>
