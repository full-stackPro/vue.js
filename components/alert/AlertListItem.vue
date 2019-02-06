<template>
  <div v-if="alert" class="mix clearfix brdGrey pad-10">
    <div class="leftPart pull-left">
      <ul>
        <li>
          <p>{{alert.name}}</p>
        </li>
      </ul>
    </div>
    <div class="rightPart pull-right mrgLeft-20">
      <router-link :to="`/alerts/${alert.id}`" tag="i" class="fa fa-pencil" aria-hidden="true"></router-link>
    </div>
    <div class="rightPart pull-right">
      <!-- <img :src="`${getAlertIcon(alert)}`"> -->
      <!-- <img src="@/assets/images/Group 12179.png"> -->
      <span :class="`tag ${alert.active?'running':'stopped'}`">{{alert.active?'running':'stopped'}}</span>
    </div>
  </div>
</template>

<script>
import alertActive from "@/assets/images/alert-active.svg";
import alertInactive from "@/assets/images/alert-inactive.svg";
import alertDraft from "@/assets/images/alert-draft.svg";

export default {
  name: "AlertListItem",
  methods: {
    getAlertIcon(alert) {
      if (alert.draft && !alert.active) {
        return alertDraft;
      }
      if (alert.active) {
        return alertActive;
      } else {
        return alertInactive;
      }
    }
  },
  computed: {
    alertState: {
      get() {
        return !!this.alert.active;
      },
      set(val) {
        this.alert.active = val;
      }
    }
  },
  props: ["alert"]
};
</script>
