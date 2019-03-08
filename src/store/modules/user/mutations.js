import { SET_TOKEN, DESTROY_TOKEN, SET_USER, DESTROY_USER } from './mutationTypes'; //eslint-disable-line

export default {
  [SET_TOKEN](state, data) {
    state.auth.token = data;
  },
  [DESTROY_TOKEN](state) {
    state.auth.token = '';
  },
  [SET_USER](state, data) {
    state.email = data.email;
    state.name = data.name;
    state.userName = data.userName;
    state.roles = data.roles;
    state.profilePictureUrl = data.profilePictureUrl;
  },
  [DESTROY_USER](state) {
    state.email = '';
    state.name = '';
    state.roles = [];
  }
};
