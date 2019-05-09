import Vue from 'vue';
import Router from 'vue-router';
import Auth from '../views/Login';
import { isLoggedIn } from '@/helpers/auth';

const Dashboard = () => import('../views/Dashboard');
const Mongo = () => import('../views/Mongo');
const Nodejs = () => import('../views/Nodejs');
const NodejsApplication = () => import('../views/NodejsApplication');
const Help = () => import('../views/Help');
const Admin = () => import('../views/admin');
const AdminUsers = () => import('../views/admin/Users');
const AdminUserEdit = () => import('../views/admin/UserEdit');
const FourOFour = () => import('../views/FourOFour');

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

// gets executed before each route change
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      // redirect to /auth when not logged in
      next({
        path: '/auth'
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()
  }
});

const { pathname } = window.location;
// initial reroute when page gets loaded but user is logged in
if (isLoggedIn() && (pathname === '/' || pathname === '/auth')) {
  router.push('/dashboard');
}

export default router;
