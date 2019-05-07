import Vue from 'vue';
// import highlight js for syntax highlighting
import VueHighlightJS from 'vue-highlightjs';
// import fontawesome vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// import snotify (for toasts)
import Snotify, { SnotifyPosition } from 'vue-snotify';

// import bootstrap vue and its css files
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line
import 'bootstrap-vue/dist/bootstrap-vue.css';

// import custom axios config
import axios from './config/axios';

// import icons
import './assets/icons';

import App from './App.vue';
import router from './router';
import store from './store';
import clickOutside from './directives/clickOutside';

import BaseButton from './components/buttons/BaseButton';

// attach frameworks to Vue instance
Vue.use(Snotify, {
  toast: {
    position: SnotifyPosition.centerTop
  }
});
Vue.use(VueHighlightJS);
Vue.use(BootstrapVue);

Vue.directive('click-outside', clickOutside);

/* globalcomponents */
Vue.component('base-button', BaseButton);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// appatch axios to vue instance
Vue.prototype.$axios = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
