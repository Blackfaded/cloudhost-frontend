import Vue from 'vue';
import Router from 'vue-router';
import Auth from '../views/Login';
import Dashboard from '../views/Dashboard';
import Mongo from '../views/Mongo';
import Nodejs from '../views/Nodejs';
import NodejsApplication from '../views/NodejsApplication';
import Help from '../views/Help';
import Admin from '../views/admin';
import AdminUsers from '../views/admin/Users';
import AdminUserEdit from '../views/admin/UserEdit';
import FourOFour from '../views/FourOFour';

import { isLoggedIn } from '@/helpers/auth';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/auth'
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/help',
      name: 'help',
      component: Help,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/mongo',
      name: 'mongo',
      component: Mongo,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/node',
      name: 'node',
      component: Nodejs,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/node/:id',
      name: 'node-application',
      component: NodejsApplication,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      meta: {
        layout: 'default',
        requiresAuth: true,
        requiresRole: ['admin']
      },
      children: [
        {
          path: 'users',
          name: 'admin-users',
          component: AdminUsers,
          meta: {
            layout: 'default'
          }
        },
        {
          path: 'users/:id',
          name: 'admin-user-edit',
          component: AdminUserEdit,
          meta: {
            layout: 'default'
          }
        }
      ]
    },
    {
      path: '*',
      name: 'fourofour',
      component: FourOFour
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: '/auth'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
