import Vue from 'vue';
import VueHighlightJS from 'vue-highlightjs';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css'; // eslint-disable-line
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/icons';
import App from './App.vue';
import router from './router';
import store from './store';
import clickOutside from './directives/clickOutside';

// Tell Vue.js to use vue-highlightjs
Vue.use(VueHighlightJS);

Vue.use(BootstrapVue);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.directive('click-outside', clickOutside);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
