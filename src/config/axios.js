import axios from 'axios';
import * as Cookies from 'js-cookie';

// set axios base url
const instance = axios.create({
  baseURL: `${process.env.VUE_APP_BACKEND_URL}`
});

// send cookie with request if available
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
