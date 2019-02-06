import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import error from './modules/error';
import alert from './modules/alert';
import trigger from './modules/trigger';
import tab from './modules/tab';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        auth,
        error,
        alert,
        trigger,
        tab
    }
});