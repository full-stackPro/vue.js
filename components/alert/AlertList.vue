<template>
  <div>
    <div v-if="alerts.length" class="wraper mrgTop-15 mrgLeft-10">
      <alert-list-item v-for="(alert, i) in alerts" :key="i" :alert="alert"/>
    </div>
    <div v-else class="wraper mrgTop-15 mrgLeft-10">No Alerts Added Yet!</div>
  </div>
</template>

<script>
import { mapState } from "@/store/vuex_ext";
import { mapActions } from "vuex";

import AlertListItem from "./AlertListItem";

export default {
  name: "AlertList",
  methods: { ...mapActions("alert", ["fetchAlerts"]) },
  computed: { ...mapState("alert", { alerts: "alerts" }) },
  components: { AlertListItem },
  mounted() {
    if (this.alerts && !this.alerts.length) this.fetchAlerts();
  }
};
</script>
