<template>
  <div class="links padLeft-20 padRight-20">
    <ul class="brdTop-2">
      <router-link :class="isTriggerForm?'active':''" :event="''" tag="li" :to="'triggers'">
        <a>Triggers</a>
      </router-link>
      <router-link :class="isDistributionForm?'active':''" :event="''" tag="li" :to="'recipients'">
        <a>Recipients</a>
      </router-link>
      <router-link :event="''" tag="li" :to="'message'">
        <a>Message</a>
      </router-link>
      <router-link :event="''" tag="li" :to="'activation'">
        <a>Activate</a>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    isTriggerForm() {
      return !!this.$route.params["triggerId"];
    },
    isDistributionForm() {
      return !!this.$route.params["distributionMethod"];
    }
  }
};
</script>
