import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

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
  modules: {},
  plugins: [createPersistedState()]
});
