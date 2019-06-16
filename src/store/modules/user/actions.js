import * as Cookies from 'js-cookie';
import { SET_USER, DESTROY_USER } from './mutationTypes'; //eslint-disable-line
import axios from '../../../config/axios';

export default {
  // save jwt in cookie
  setToken(context, data) {
    Cookies.set('jwt', data);
  },

  // destroy jwt cookie
  destroyToken() {
    Cookies.remove('jwt');
  },

  // get userdata
  async setUser({ commit }) {
    try {
      const { data: user } = await axios.get('users/self');
      commit(SET_USER, user);
    } catch (error) {
      commit(DESTROY_USER);
    }
  }
};
