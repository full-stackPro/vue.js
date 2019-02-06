<template>
  <div>
    <div class="brdBtm-1"></div>
    <div class="wraper">
      <template v-for="i in [1,2]">
        <div :key="i" class="mix clearfix">
          <div v-if="i === 1" :key="i" class="leftPart pull-left">
            <ul>
              <li>
                <p>{{alert.distribution.emails.length + ' Emails'}}</p>
              </li>
            </ul>
          </div>
          <div v-else :key="i" class="leftPart pull-left">
            <ul>
              <li>
                <p>{{alert.distribution.sms.length + ' SMS'}}</p>
              </li>
            </ul>
          </div>
          <div class="rightPart pull-right">
            <router-link :to="getRecpRoot + (i === 2?'sms':'email')" tag="i" class="fa fa-pencil" aria-hidden="true"></router-link>
          </div>
        </div>
      </template>

      <div class="rightPart pull-right">
        <i class="fas fa-pen"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "@/store/vuex_ext";
export default {
  computed: {
    ...mapState("alert", { alert: "alert" }),
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
