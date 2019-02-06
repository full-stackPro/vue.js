<template>
  <div>
    <div class="theTitle padLeft-20 blackColor">
      <p>Add {{type === 'sms'? type.toUpperCase():'Email'}}</p>
    </div>
    <div class="brdBtm-1"></div>
    <div class="theTitle padLeft-20 noPadTop mrgTop-10 noMrgTop">
      <p>Select cell range or input comma</p>
      <p>delimited email list:</p>
    </div>
    <div class="areaMessage">
      <textarea
        v-if="type === 'email'"
        v-model="emails"
        class="mixBrd height-175"
        placeholder="Email list"
      ></textarea>
      <textarea v-else v-model="sms" class="mixBrd height-175" placeholder="SMS list"></textarea>
    </div>

    <!-- Start - Validation Error -->
    <label v-if="type === 'email' && !isValid" class="error mrgLeft-20">Emails list is not valid</label>
    <label
      v-if="type === 'sms' && !isValid"
      class="error mrgLeft-20"
    >Phones list is not valid, remove trailing space if exists</label>
    <!-- End - Validation Error -->
    <div class="mainBox padLeft-20">
      <div class="wrapperButton clearfix">
        <div class="leftButton pull-left">
          <div class="popularButton">
            <button @click="save">Save</button>
          </div>
        </div>
        <div class="rightButton pull-right">
          <div class="popularButton">
            <router-link tag="button" :to="'.'">Cancel</router-link>
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
import { isValidCollection } from "@/utils";

export default {
  methods: {
    ...mapActions("alert", ["updateAlert"]),
    save() {
      if (this.isValid) {
        this.alert.distribution.sms = this.sms
          .trim()
          .split(",\n")
          .filter(e => e.trim() !== "");
        this.alert.distribution.emails = this.emails
          .trim()
          .split(",\n")
          .filter(e => e.trim() !== "");
        this.updateAlert(this.alert);
        this.$router.push(".");
      }
    }
  },
  computed: {
    ...mapState("alert", { alert: "alert" }),
    emails: {
      get: () => store.state.alert.alert.distribution.emails.join(",\n"),
      set: emails => {
        const temp = emails.split(",").map(e => e.trim());
        store.commit("alert/setDistributionEmails", temp);
      }
    },
    sms: {
      get: () => store.state.alert.alert.distribution.sms.join(",\n"),
      set: sms => {
        const temp = sms.split(",").map(e => e.replace(/^\s+/, ""));
        store.commit("alert/setDistributionSMS", temp);
      }
    },
    type() {
      const type = this.$route.params["distributionMethod"];
      if (type != null) {
        store.state.alert.isRecpFormActive = true;
      }
      return type;
    },
    isValid() {
      if (this.type === "email") {
        return isValidCollection(this.emails.split(",\n"), "emails");
      } else {
        return isValidCollection(this.sms.split(",\n"), "sms");
      }
    }
  },
  destroyed() {
    store.state.alert.isRecpFormActive = false;
  }
};
</script>

