<template>
  <div>
    <div class="topBox clearfix">
      <div class="back pull-left">
        <router-link :to="'/alert-list'">< Back To Menu</router-link>
      </div>
      <div class="delete pull-right">
        <a @click="doConfirm" style="cursor: pointer">Delete</a>
      </div>
    </div>
    <div class="wraperInput clearfix">
      <div class="titleAlert pull-left">
        <input
          v-model="name"
          type="text"
          @mouseenter="setActive(true)"
          @mouseleave="setActive(false)"
          placeholder="Enter Alert Title"
          :class="active?'noPadTop active-input':'noPadTop'"
        >
      </div>
      <div class="rightPart pull-right padRight-20">
        <i class="fas fa-pen"></i>
      </div>
    </div>

    <alert-tabs/>

    <div class="brdBtm-1"></div>

    <router-view></router-view>
    <div v-if="currentTab" class="mainBox padLeft-20">
      <div v-if="!isTriggerForm && !isRecipientsForm" class="wrapperButton clearfix">
        <div class="leftButton pull-right">
          <div class="popularButton">
            <button v-if="currentTab.next" @click="next">Next</button>
            <button v-else class="greenStyle" @click="run">Activate</button>
          </div>
        </div>

        <div class="rightButton pull-left">
          <div class="popularButton">
            <button v-if="currentTab.prev" @click="back">Back</button>
            <router-link v-else :to="'/alert-list'" tag="button">Cancel</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapState } from "@/store/vuex_ext";
import { mapActions } from "vuex";
import { isValidId, isValidUrl } from "@/utils";

import AlertTabs from "@/components/alert/AlertTabs";

export default {
  data() {
    return {
      active: false
    };
  },
  computed: {
    ...mapState("alert", { alert: "alert" }),
    ...mapState("trigger", { triggersLength: "triggersLength" }),
    ...mapState("tab", { alertTabs: "alertTabs" }),
    name: {
      get: () => store.state.alert.alert.name,
      set: name => store.commit("alert/setName", name)
    },
    message: {
      get: () => store.state.alert.alert.message
    },
    trackedlink: {
      get: () => store.state.alert.alert.trackedlink
    },
    isRecipientsForm: () => store.state.alert.isRecpFormActive,
    isLastStep() {
      return this.activeTab === "activation";
    },
    isTriggerForm() {
      return this.$route.path.includes("triggers/new");
    },
    currentTab() {
      const routes = this.$route.fullPath.split("/");
      const activeTav = routes[routes.length - 1];
      return this.alertTabs.find(node => node.tab.name === activeTav);
    },
    isValidAlert() {
      if (this.currentTab.tab.name === "message") {
        return isValidUrl(this.trackedlink);
      }
      return !!this.name;
    }
  },
  methods: {
    ...mapActions("alert", ["fetchAlert", "updateAlert"]),
    ...mapActions("alert", ["deleteAlert", "runAlert"]),
    ...mapActions("trigger", ["fetchTriggers", "deleteTrigger"]),
    next() {
      if (this.isValidAlert) {
        this.updateAlert(this.alert);
        this.$router.push(this.currentTab.next.route);
      }
    },
    back() {
      this.$router.push(this.currentTab.prev.route);
    },
    doConfirm() {
      const alertId = this.$route.params.alertId;
      if (alertId) {
        if (confirm("Do you want to delete the selected alert?")) {
          this.deleteAlert(this.alert);
          this.$router.push("/alert-list");
        }
      }
    },
    run() {
      if (this.isValidAlert) {
        if (!this.triggersLength) {
          const ok = confirm(
            "The alert must have at least one trigger! Do you want to open triggers?"
          );
          if (ok) {
            this.$router.push(`/alerts/${alertId}/triggers`);
          }
          return;
        }
      }
      const alertId = this.alert.id;
      this.runAlert(alertId);
      this.$router.push(`/run-alert/${alertId}`);
    },
    setActive(state) {
      this.active = state;
    }
  },
  components: { AlertTabs },
  mounted() {
    const alertId = this.$route.params["alertId"];
    if (isValidId(alertId)) {
      this.fetchAlert(alertId);
      this.fetchTriggers(alertId);
    }
  }
};
</script>
