import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import auth from './modules/auth';

Vue.use(Vuex);

const debug = provess.env.NODE_ENG != 'production';

export default new Vuex.Store({
    modules: {
        user,
        auth,
    },
    strict: debug,
})