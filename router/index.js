import Vue from 'vue';
import Router from 'vue-router';

import HomeRoutes from './home';
import authRoutes from './auth';
import welcomeRoutes from './welcome';
import alertRoutes from './alert';

Vue.use(Router);

export default new Router({
  routes: [
    ...welcomeRoutes,
    ...HomeRoutes,
    ...authRoutes,
    ...alertRoutes
  ],
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active'
});