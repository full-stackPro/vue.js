<template>
  <div>
    <div class="brdBtm-1"></div>
    <div class="Recipients padTop-22 mrgbtm-12 padLeft-20">
      <ul>
        <li class="padBtm-25">Triggers: {{triggersLength}}</li>
        <li>Recipients:</li>
        <li>{{emailCount}} Emails</li>
        <li>{{smsCount}} Phone Numbers</li>
      </ul>
    </div>
    <div class="brdBtm-1"></div>
    <div class="theTitle padLeft-20 blackColor padBtm-10">
      <p>Want to test the alert?</p>
    </div>
    <div class="theTitle padLeft-20 nomrgTop">
      <p class="fontSize-14">This will run the trigger checks without</p>
      <p class="fontSize-14">sending anything to recipients.</p>
    </div>

    <div class="mainBox padLeft-20">
      <div class="wrapperButton clearfix mrgbtm-20">
        <div class="leftButton pull-left fullWidth d-block">
          <div class="popularButton">
            <button @click="test(alert.id)">Test Alert</button>
          </div>
        </div>
      </div>
      <div class="brdBtm-1"></div>
    </div>
  </div>
</template>

<script>
import { mapState } from "@/store/vuex_ext";

export default {
  methods: {
    test(alertId) {
      if (!this.triggersLength) {
        const ok = confirm(
          "The alert must have at least one trigger! Do you want to open triggers?"
        );
        if (ok) {
          this.$router.push(`/alerts/${alertId}/triggers`);
        }
        return;
      }
      this.$router.push(`/test-alert/${alertId}`);
    }
  },
  computed: {
    ...mapState("alert", { alert: "alert" }),
    ...mapState("trigger", { triggersLength: "triggersLength" }),
    emailCount() {
      return this.alert.distribution.emails.length;
    },
    smsCount() {
      return this.alert.distribution.sms.length;
    }
  }
};
</script>
