import Vue from 'vue';
import Router from 'vue-router';
import Login from '../views/Login';
import Dashboard from '../views/Dashboard';
import Nodejs from '../views/Nodejs';
import NodejsApplication from '../views/NodejsApplication';
import AdminUsers from '../views/admin/Users';
import AdminUserEdit from '../views/admin/UserEdit';

Vue.use(Router);

const router = new Router({
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
      path: '/admin/users',
      name: 'admin-users',
      component: AdminUsers,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '/admin/users/:id',
      name: 'admin-user-edit',
      component: AdminUserEdit,
      meta: {
        layout: 'default',
        requiresAuth: true
      }
    },
    {
      path: '*',
      redirect: '/dashboard'
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (false) {
      next({
        path: '/login'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
