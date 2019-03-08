import axios from 'axios';
import store from '@/store';

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`
});

instance.interceptors.request.use(
  config => {
    if (store.state.user.auth.token) {
      config.headers.authorization = `Bearer ${store.state.user.auth.token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default instance;
