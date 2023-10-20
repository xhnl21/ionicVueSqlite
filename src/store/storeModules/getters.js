// metodos para consultas de status
export default {
    language(state) {
        return state.language[window.langLocal];
    },
    apis(state) {
        return state.apis;
    },
    GetRefreshLaguage(state) {
        return state.refreshLaguage;
    },
    GethttpResques(state) {
        return state.httpResques;
    },
    GetDemo(state) {
        return state.demo;
    }
};
