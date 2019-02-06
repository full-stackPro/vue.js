<template>
  <div class="links-2 padLeft-20">
    <ul>
      <router-link tag="li" :to="'alert-list'">
        <a>My Alerts</a>
      </router-link>
      <router-link tag="li" :to="'subscription'">
        <a>Subscription</a>
      </router-link>
      <router-link tag="li" :to="'account'">
        <a>Account</a>
      </router-link>
    </ul>
  </div>
</template>