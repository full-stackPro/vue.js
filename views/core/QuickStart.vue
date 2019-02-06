<template>
    <div class="mainBox">
      <div class="logo">
        <h1>
          <a href="#">
            <img src="@/assets/images/logo_Call_To_Action.png">
          </a>
        </h1>
      </div>
      <div class="title mrgTop-10">
        <p>Start creating alerts now!</p>
      </div>
      <div class="createAlert mrgTop-55">
        <ul>
          <li class="clearfix">
            <a href="#">
              <div class="leftCorner">
                <img src="@/assets/images/Path 638.png">
              </div>
              <div class="rightCorner">
                <p>Create data alerts based on cell values.</p>
              </div>
            </a>
          </li>
          <li class="clearfix">
            <a href="#">
              <div class="leftCorner">
                <img src="@/assets/images/Path 637.png">
              </div>
              <div class="rightCorner">
                <p>Sense SMS or Email alerts from Excel.</p>
              </div>
            </a>
          </li>
          <li class="clearfix">
            <a href="#">
              <div class="leftCorner">
                <img src="@/assets/images/Path 637.png">
              </div>
              <div class="rightCorner">
                <p>Provide a call to action link and see when people check your alert.</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <div class="popularButton mrgTop-55">
        <router-link to="signup" class="blueStyle">Sign up</router-link>
        <div class="goToSignin">
          <span>Already have an account?</span>
          <router-link to="login">Sign in</router-link>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: "QuickStart"
};
</script>
