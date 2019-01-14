import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        layout: 'none'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import(/* webpackChunkName: "dashboard" */ '../views/Dashboard'),
      meta: {
        layout: 'default'
      }
    }
  ]
});
