<template>
  <div class="mainBox">
    <div class="title">
      <h1>Welcome</h1>
    </div>
    <div class="title mrgTop-10">
      <p>Start creating alerts now!</p>
    </div>
    <div class="createAlert mrgTop-55">
      <ul>
        <li class="clearfix">
          <a href="#">
            <div class="leftCorner">
              <h1>1</h1>
            </div>
            <div class="rightCorner">
              <p class="fontWeight-600">Add an alert trigger based on a cell value.</p>
            </div>
          </a>
        </li>
        <li class="clearfix">
          <a href="#">
            <div class="leftCorner">
              <h1>2</h1>
            </div>
            <div class="rightCorner">
              <p
                class="fontWeight-600"
              >Specify what email or SMS to send to from within the workbook or enter</p>
            </div>
          </a>
        </li>
        <li class="clearfix">
          <a href="#">
            <div class="leftCorner">
              <h1>3</h1>
            </div>
            <div class="rightCorner">
              <p
                class="fontWeight-600"
              >Set the message that should be sent and a call to action link.</p>
            </div>
          </a>
        </li>
        <li class="clearfix">
          <a href="#">
            <div class="leftCorner">
              <h1>4</h1>
            </div>
            <div class="rightCorner">
              <p class="fontWeight-600">Click the run alerts button!</p>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div class="popularButton mrgTop-55 text-center">
      <button @click="openMyAlerts" class="blueStyle">Get Started</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "welcome",
  methods: {
    openMyAlerts() {
      this.$router.push("/alert-list");
    }
  }
};
</script>
