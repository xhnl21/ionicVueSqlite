import { createStore } from "vuex";
import state from "./storeModules/state";
import getters from "./storeModules/getters";
import mutations from "./storeModules/mutations";
import actions from "./storeModules/actions";
// import modules from "./storeModules/modules";
const core = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
    // modules
};
export default createStore(core);