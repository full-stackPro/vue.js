import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import api from './api';
import VeeValidate from "vee-validate";


Vue.use(VeeValidate);

Vue.config.productionTip = false;

api.config.init();

var appLoaded = false;

router.beforeEach((to, from, next) => {
  store.commit('auth/setAuthError', '');
  const token = localStorage.getItem('token');
  if (token) {
    next();
    if (!appLoaded) {
      appLoaded = true;
      router.push('/welcome');
    }
  } else {
    next();
    if (to.name === 'Signup'
      || to.name === 'Login'
      || to.name === 'ForgotPassword') {
      router.push(to.path);
    } else {
      router.push('/login');
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
