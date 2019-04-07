import * as Cookies from 'js-cookie';
import { SET_USER, DESTROY_USER } from './mutationTypes'; //eslint-disable-line
import axios from '@/config/axios';

export default {
  setToken(context, data) {
    Cookies.set('jwt', data, { domain: process.env.VUE_APP_DOMAIN.split(/^https?:\/\//)[1] });
  },
  destroyToken() {
    Cookies.remove('jwt');
  },
  async setUser({ commit }) {
    try {
      const { data: user } = await axios.get('users/self');
      commit(SET_USER, user);
    } catch (error) {
      commit(DESTROY_USER);
    }
  }
};
