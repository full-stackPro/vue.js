<template>
  <div>
    <home-tabs/>
    <router-view></router-view>
  </div>
</template>

<script>
import HomeTabs from "@/components/shared/HomeTabs";
export default {
  name: "Home",
  components: {
    HomeTabs
  }
};
</script>
