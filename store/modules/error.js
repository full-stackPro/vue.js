export default {
    namespaced: true,
    state: {
        hasError: false,
        errorBody: null
    },
    mutations: {
        setErrorBody(state, error) {
            state.error = error;
        },
        setHasError(state, hasError) {
            state.hasError = hasError;
        }
    },
    getters: {
        getError(state) {
            return state.hasError;
        }
    }
};