import * as Cookies from 'js-cookie';
import { SET_USER, DESTROY_USER } from './mutationTypes'; //eslint-disable-line
import axios from '@/config/axios';

const domain = process.env.VUE_APP_DOMAIN.split(/^https?:\/\//)[1];

export default {
  setToken(context, data) {
    Cookies.set('jwt', data, { domain });
  },
  destroyToken() {
    Cookies.remove('jwt', { domain });
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
