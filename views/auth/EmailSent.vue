<template>
  <div class="text-center padBtm-90 padTop-45">
    <div class="mainBox">
      <logo/>
      <div class="title mrgTop-80">
        <p>Email reset link was sent to your email</p>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "@/components/shared/Logo";

export default {
  name: "welcome",
  components: {
    Logo
  }
};
</script>
