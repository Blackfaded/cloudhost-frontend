import { SET_TOKEN, DESTROY_TOKEN } from './mutationTypes'; //eslint-disable-line

export default {
  [SET_TOKEN](state, data) {
    state.token = data;
  },
  [DESTROY_TOKEN](state) {
    state.token = '';
  }
};
