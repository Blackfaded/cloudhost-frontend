import { SET_USER, DESTROY_USER } from './mutationTypes'; //eslint-disable-line

export default {
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
