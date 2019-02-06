<template>
  <div>
    <div class="brdBtm-1"></div>
    <div class="popularButton mrgTop-20 padLeft-20 padRight-20">
      <button @click="add" class="blueStyle fullWidth">Create New Alert</button>
    </div>

    <alert-list/>

    <div class="mainBox padLeft-20">
      <div class="wrapperButton clearfix">
        <div class="leftButton pull-left fullWidth">
          <div class="popularButton">
            <router-link tag="button" class="greenStyle" :to="'/run-alerts'">Run Alerts</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AlertList from "@/components/alert/AlertList";
import { mapActions } from "vuex";
import { mapState } from "@/store/vuex_ext";
import router from "@/router";

export default {
  name: "Alerts",
  methods: {
    ...mapActions("alert", ["createDraft"]),
    add() {
      this.createDraft().then(() => router.push(`/alerts/${this.alert.id}`));
    }
  },
  computed: { ...mapState("alert", { alert: "alert" }) },
  components: { AlertList }
};
</script>
