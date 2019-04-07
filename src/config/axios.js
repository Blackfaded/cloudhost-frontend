import axios from 'axios';
import * as Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`
});

instance.interceptors.request.use(
  config => {
    const jwt = Cookies.get('jwt');
    if (jwt) {
      config.withCredentials = true;
    }

    return config;
  },
  error => Promise.reject(error)
);

export default instance;
