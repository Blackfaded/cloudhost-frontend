import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    theme: {
      bright: false
    }
  },
  mutations: {
    toggleTheme(state) {
      state.theme.bright = !state.theme.bright;
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('toggleTheme');
    }
  },
  modules: {
    user
  },
  plugins: [createPersistedState()]
});
