import axios from 'axios';
import { Measure } from '@/models/measure.model';
import { Trigger } from '@/models/trigger.model';
import { FieldSet } from '@/models/field.ds';

export default {
    namespaced: true,
    state: {
        triggers: [],
        triggersLength: 0,
        trigger: new Trigger(),
        measures: [],
        measure: new Measure(),
        fieldSet: FieldSet,
    },
    mutations: {
        setTriggers(state, triggers) {
            state.triggers = triggers;
        },
        setTrigger(state, trigger) {
            state.trigger = trigger;
        },
        appendTrigger(state, trigger) {
            const currentTrigger = state.triggers.find(t => t.id === trigger.id);
            if (!currentTrigger) {
                state.triggers.push(trigger);
            }
            state.trigger = trigger;
        },
        replaceTrigger(state, { oldTrigger, newTrigger }) {
            this.commit('trigger/removeTrigger', oldTrigger);
            this.commit('trigger/appendTrigger', newTrigger);
        },
        removeTrigger(state, trigger) {
            state.triggers = state.triggers.filter(t => t.id !== trigger.id);
        },
        setName(state, name) {
            state.trigger.name = name;
        },
        setDescription(state, description) {
            state.trigger.description = description;
        },
        setTriggersLength(state, length) {
            state.triggersLength = length;
        },
        setMeasures(state, measures) {
            state.measures = measures;
        },
        setMeasure(state, measure) {
            state.measure = measure;
        },
        appendMeasure(state, measure) {
            state.measures.push(measure);
        },
        appendMeasures(state, measures) {
            state.measures.push(measures);
        },
        removeMeasure(state, measure) {
            state.measures = state.measures.filter(m => m.id !== measure.id);
        },
        replaceMeasure(state, { oldMeasure, newMeasure }) {
            this.commit('trigger/removeMeasure', oldMeasure);
            this.commit('trigger/appendMeasure', newMeasure);
        }
    },
    actions: {
        /**
         * @description fetchTriggers get al Triggers for existing Alert by Id
         * @param {String} alertId 
         */
        fetchTriggers({ state, commit }, alertId) {
            commit('setTriggers', []);
            axios.get(`/alerts/${alertId}/triggers`)
                .then(res => {
                    commit('setTriggers', res.data);
                    commit('setTriggersLength', state.triggers.length);
                });
        },
        /**
         * @description fetchTriggers get al Triggers for existing Alert by Id
         * @param {String} alertId 
         */
        fetchUserTriggers({ commit, rootGetters }) {
            const user = rootGetters['auth/getUser'];
            axios.get(`/users/${user.id}/triggers`)
                .then(res => commit('setTriggers', res.data));
        },
        /**
         * @description fetchTrigger returns existing Trigger in Triggers list if not
         * a GET request made to update the state
         * @param {*} id triggerId
         */
        async fetchTrigger({ state, commit, dispatch }, id) {
            let currentTrigger = state.triggers.find(t => t.id === id);
            if (!currentTrigger) {
                const res = await axios.get(`/triggers/${id}`);
                commit('appendTrigger', res.data)
                dispatch('fetchMeasures', res.data.id)
            } else {
                commit('appendTrigger', currentTrigger);
                dispatch('fetchMeasures', currentTrigger.id)
            }
        },
        /**
         * @description createTrigger creates a new Trigger
         * @param {*} trigger object contains new Trigger data
         */
        createTrigger({ state, commit }, trigger) {
            return axios.post('/triggers', trigger)
                .then(res => {
                    commit('appendTrigger', res.data);
                    commit('setTriggersLength', state.triggers.length);
                });
        },
        /**
         * @description updateTrigger updates an existing Trigger
         * @param {*} trigger object contains existing Trigger data
         */
        updateTrigger({ commit }, trigger) {
            return axios.patch(`/triggers/${trigger.id}`, trigger)
                .then(res => commit('replaceTrigger', { newTrigger: res.data, oldTrigger: trigger }));
        },
        /**
         * @description deleteTrigger deletes an existing Trigger by Id and removes it from the state
         * @param {String} id TriggerId
         */
        deleteTrigger({ state, commit }, id) {
            axios.delete(`/triggers/${id}`)
                .then(() => {
                    commit('removeTrigger', { id });
                    commit('setTriggersLength', state.triggers.length);
                });
        },
        /**
         * @description getMeasures returns all Measure Conditions for
         * an existing Trigger which specify the rules of how the Trigger get Triggered for Field
         * that has a value change according to the Measure Conditions!
         * @param {*} triggerId 
         */
        fetchMeasures({ state, commit }, triggerId) {
            commit('setMeasure', new Measure());
            axios.get(`/triggers/${triggerId}/measureconditions`)
                .then(res => {
                    commit('setMeasures', res.data);
                    commit('setMeasure', res.data[0]);
                });
        },
        /**
         * @description fetchMeasure returns an existing Measure Condition by Id
         * @param {*} id Measure Condition Id
         */
        fetchMeasure({ commit }, id) {
            axios.get(`/measureconditions/${id}`)
                .then(res => commit('appendMeasure', res.data));
        },
        /**
         * @description createMeasure creates a new Measure
         * @param {*} measure Measure Condition Object
         */
        createMeasure({ state, commit }, measure) {
            axios.post(`/triggers/${state.trigger.id}/measureconditions`, measure)
                .then(res => commit('appendMeasure', res.data));
        },
        /**
         * @description deleteMeasure deletes an existing Measure by Id
         * @param {*} measure Measure Condition Object
         */
        deleteMeasure({ commit }, measure) {
            axios.delete(`/triggers/${measure.triggerId}/measureconditions/${measure.id}`)
                .then(res => commit('removeMeasure', res.data));
        },
        /**
        * @description updateMeasure updates an existing Measure by Id
        * @param {*} measure Measure Condition Object
        */
        updateMeasure({ commit }, measure) {
            axios.put(`/triggers/${measure.triggerId}/measureconditions/${measure.id}`, measure)
                .then(res => commit('replaceMeasure', { newMeasure: res.data, oldMeasure: measure }));
        }
    },
    getters: {
        getTriggers(state, getters, rootState) {
            const alertId = rootState.alert.alert.id;
            const triggers = state.triggers.filter(t => t.alertId === alertId);
            state.triggersLength = triggers.length;
            return triggers;
        }
    }
}
