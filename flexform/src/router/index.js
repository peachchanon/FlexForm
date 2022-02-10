import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import CreateAnAccount from '@/views/CreateAnAccount'
import ForgotPassword from '@/views/ForgotPassword'
import Dashboard from '../views/Dashboard'
import Profile from '../views/Profile'
import Form from '../views/Form'
import Report from '../views/Report'
import ManageUsers from '@/views/ManageUsers'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login'
    }
  },
  {
    path: '/create-an-account',
    name: 'CreateAnAccount',
    component: CreateAnAccount,
    meta: {
      title: 'Create An Account'
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile'
    }
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
    meta: {
      title: 'Form'
    }
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta: {
      title: 'Report'
    }
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: ManageUsers,
    meta: {
      title: 'Manage Users'
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
