import router from '@/router';
import axios from 'axios';
import api from '@/api';
import { showMessage } from '@/common/message_handler';

export default {
    namespaced: true,
    state: {
        token: null,
        userId: null,
        user: JSON.parse(localStorage.getItem('user')),
        authError: null
    },
    getters: {
        isLoggedIn: state => !!state.token,
        getToken: state => state.token || api.config.token,
        getUser: state => state.user || JSON.parse(localStorage.getItem('user'))
    },
    mutations: {
        createSession(state, context) {
            const now = new Date().getTime();
            const expirationDate = new Date(now + context.ttl * 1000);

            // Updating localStorage with session information
            localStorage.setItem('token', context.token);
            localStorage.setItem('expiresIn', expirationDate);
            localStorage.setItem('userId', context.userId);
            axios.defaults.headers.common['Authorization'] = context.token;

            state.token = context.token;
            state.userId = context.userId;
        },
        destroySession(state) {
            // Remove session information from localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('expiresIn');
            localStorage.removeItem('userId');
            axios.defaults.headers.common['Authorization'] = null;

            state.token = null;
            state.userId = null;
        },
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user))
        },
        updateToken({ commit }, { userId, token }) {
            axios.post(
                `/users/${userId}/accessTokens?access_token=${token}`,
                { "ttl": -1, "source": "Created by User" }
            ).then(res => {
                commit('createSession', {
                    token: res.data.id,
                    userId: res.data.userId,
                    ttl: res.data.ttl
                });
            });
        },
        setAuthError(state, message) {
            state.authError = message;
        }
    },
    actions: {
        /**
         * 
         * @param {*} credentials an object present user name and password
         * @description login is used to preform a login action to the server and getting the security token back..
         */
        login({ commit, dispatch }, credentials) {
            return axios
                .post('/users/login', { email: credentials.email, password: credentials.password })
                .then(res => {
                    // a response contains token, userId and expiration date
                    commit('createSession', {
                        token: res.data.id,
                        userId: res.data.userId,
                        ttl: res.data.ttl
                    });

                    // Update session context with user info
                    dispatch('getClaims');
                    router.push('/welcome');
                }).catch(res => commit('setAuthError', resolveError(res.response["data"].error.statusCode)));
        },
        /**
         * 
         * @description signup to register a new user to the system
         * @param {*} user object contains basic data {email, password}
         */
        signup({ commit, dispatch }, user) {
            axios
                .post("/users", { email: user.email, password: user.password })
                .then(() => dispatch('login', { email: user.email, password: user.password }))
                .catch(res => commit('setAuthError', resolveError(res.response["data"].error.statusCode)));
        },
        /**
         * 
         * @description getClaims to return the user information from current session
         */
        getClaims({ state, commit }) {
            axios
                .get(`/users/${state.userId}`)
                .then(res => commit('setUser', res.data));
        },
        /**
         * 
         * @description logout to log the user out and destroy the current session
         */
        logout({ commit }) {
            commit('destroySession');
            router.push('/login');
        },
        /**
         * 
         * @description resetPassword to reset user forgotten password using registered email address
         * @param {*} email 
         */
        resetPassword({ state }, email) {
            axios
                .post("/users/reset", email)
                .then(() => router.push('/email-sent'))
                .catch(error => showMessage(error));
        }
    }
};

function resolveError(errorCode) {
    if (errorCode === 422) {
        return 'Email Address Already Registered!';
    } else if (errorCode === 403) {
        return 'Invalid email domain provider';
    } else if (errorCode === 401) {
        return 'Bad Credentials!';
    }
}