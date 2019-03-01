import * as Cookies from 'js-cookie';
import { SET_TOKEN, DESTROY_TOKEN, SET_USER, DESTROY_USER } from './mutationTypes'; //eslint-disable-line
import axios from '@/config/axios';

export default {
  setToken({ commit }, data) {
    Cookies.set('jwt', data);
    commit(SET_TOKEN, data);
  },
  destroyToken({ commit }) {
    Cookies.remove('jwt');
    commit(DESTROY_TOKEN);
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
