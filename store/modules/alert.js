import axios from 'axios';
import { Alert } from '../../models/alert.model';

export default {
    namespaced: true,
    state: {
        alerts: [],
        alert: new Alert(),
        RecipientList: [],
        isRecpFormActive: false
    },
    mutations: {
        setAlerts(state, alerts) {
            state.alerts = alerts;
        },
        setAlert(state, alert) {
            const _alert = new Alert(
                alert.id,
                alert.name,
                alert.message,
                alert.trackedlink,
                alert.maxsendfrequency,
                alert.active,
                alert.draft,
                alert.distribution
            );

            state.alert = _alert;
        },
        // Start - Alert Internal Mutations
        setName(state, name) {
            state.alert.name = name;
        },
        setMessage(state, message) {
            state.alert.message = message;
        },
        setTrackedLink(state, trackedLink) {
            state.alert.trackedlink = trackedLink;
        },
        setMaxSendFrequency(state, maxsendfrequency) {
            state.alert.maxsendfrequency = maxsendfrequency;
        },
        setActive(state, active) {
            state.alert.active = active;
        },
        setDraft(state, draft) {
            state.alert.draft = draft;
        },
        setDistributionEmails(state, emails) {
            state.alert.distribution.emails = emails;
        },
        setDistributionSMS(state, sms) {
            state.alert.distribution.sms = sms;
        },
        // End - Alert Internal Mutations
        appendAlert(state, alert) {
            const currentAlert = state.alerts.find(a => a.id === alert.id);
            if (!currentAlert) {
                state.alerts.push(alert);
            }
            this.commit('alert/setAlert', alert);
        },
        updateAlert(state, alert) {
            const alertIndex = state.alerts.findIndex(i => i === alert.id);
            state.alerts.splice(alertIndex, 1, alert);
        },
        removeAlert(state, alert) {
            state.alerts = state.alerts.filter(a => a.id !== alert.id);
        },
        replaceAlert(state, { oldAlert, newAlert }) {
            this.commit('alert/removeAlert', oldAlert);
            this.commit('alert/appendAlert', newAlert);
        },
        setRecipientList(state, payload) {
            state.RecipientList = payload;
        }
    },
    actions: {
        /**
         * @description createAlert for creating new alert
         * @param {*} payload an object contains alert data
         */
        createAlert({ commit }, alert) {
            axios.post('/alerts', alert)
                .then(res => commit('appendAlert', res.data))
                .catch(error => console.log(error));
        },
        /**
         * @description createDraft creates an alert draft
         */
        createDraft({ commit }) {
            return axios.post('/alerts', {
                name: `New Alert ${Math.ceil(Math.random() * 100)}`,
                message: 'You are receiving this alert because a trigger condition within the file is true.',
                active: false,
                draft: true
            })
                .then(res => commit('appendAlert', res.data))
                .catch(error => console.log(error));
        },
        /**
         * @description getDraft returns only the first Alert Draft from the Drafts list
         */
        getDraft({ commit }) {
            axios.get('/alerts?filter[where][draft]=true')
                .then(res => {
                    const drafts = res.data;
                    if (drafts.length) {
                        commit('setAlert', drafts[0]);
                    }
                });
        },
        /**
         * @description for fetching all the existing alerts from the api
         */
        fetchAlerts({ commit }) {
            axios.get('/alerts')
                .then(res => commit('setAlerts', res.data))
                .catch(error => console.error(error));
        },
        /**
         * @description for fetching a specific alert with Id
         * @param {String} id
         */
        fetchAlert({ state, commit }, id) {
            const currentAlert = state.alerts.find(a => a.id === id);
            if (!currentAlert) {
                axios.get(`/alerts/${id}`)
                    .then(res => commit('appendAlert', res.data));
            } else {
                commit('appendAlert', currentAlert);
            }
        },
        /**
         * @description updateAlert for updating existing alert data using patch request
         * @param {*} payload alert data to be updated
         */
        updateAlert({ commit }, alert) {
            axios.patch(`/alerts/${alert.id}`, alert)
                .then(res => commit('updateAlert', res.data))
                .catch(error => console.log(error));
        },
        /**
         * @description deleteAlert deletes an existing alert by Id
         * @param {String} id alertId
         */
        deleteAlert({ commit }, alert) {
            axios.delete(`/alerts/${alert.id}`)
                .then(() => commit('removeAlert', alert));
        },
        /**
        * @param {String} id alertId
        */
        async runAlert({ commit }, id) {
            const alert = await axios.patch(`/alerts/${id}`, { active: true, draft: false });
            if (alert.data) {
                const activeAlert = await axios.get(`/alerts/${id}/run`);
                commit('replaceAlert', { newAlert: activeAlert.data, oldAlert: alert.data })
            }
        },
        /**
         * @description updateAlertDistribution make a patch update with the distribution information
         * @param {*} distribution object contains the different types of recepients [Email, SMS] 
         */
        updateAlertDistribution({ commit }, { alertId, distribution }) {
            axios.patch(`/alerts/${alertId}`, { distribution })
                .then(res => commit('updateAlert', res.data))
                .catch(error => console.log(error));
        },
        /**
         * @description fetchAlertRecipient returns the alert Recipient list
         * @param {String} alertId
         */
        fetchAlertRecipient({ commit }, alertId) {
            axios.get(`/alerts/${alertId}/recipientlists`)
                .then(res => commit('setRecipientList', res.data));
        },
        /**
         * @description updateAlertRecipient updates the alert recipient by deleting
         * the recipient list by Id and the update alert repipient list again
         * @param {*} { alertId, listId }
         */
        updateAlertRecipient(context, { alertId, listId }) {
            axios.delete(`/alerts/${alertId}/recipientlists/rel/${listId}`)
                .then(() => {
                    axios.put(`/alerts/${alertId}/recipientlists/rel/${listId}`)
                        .then(() => context.dispatch('fetchAlertRecipient', alertId));
                });
        }
    }
}


