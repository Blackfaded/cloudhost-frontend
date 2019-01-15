import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Nodejs from '../views/Nodejs';
import NodejsApplication from '../views/NodejsApplication';
import AdminUsers from '../views/AdminUsers';

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
      component: Dashboard,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/node',
      name: 'node',
      component: Nodejs,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/node/:id',
      name: 'node-application',
      component: NodejsApplication,
      meta: {
        layout: 'default'
      }
    },
    {
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUsers,
      meta: {
        layout: 'default'
      }
    }
  ]
});
