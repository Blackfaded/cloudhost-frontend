import { SET_TOKEN, DESTROY_TOKEN } from './mutationTypes'; //eslint-disable-line

export default {
  setToken({ commit }, data) {
    commit(SET_TOKEN, data);
  },
  destroyToken({ commit }) {
    commit(DESTROY_TOKEN);
  }
};
