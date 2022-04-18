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
import DataVisualization from "@/views/datavisualization/DataVisualization";
import SelectGraph from "@/views/datavisualization/SelectGraph";
import ExportGraph from "@/views/datavisualization/ExportGraph";
import FormBuilder from '@/views/formbuilder/FormBuilder'
import AllTicket from "@/views/AllTicket";

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      requireAuthen: false
    }
  },
  {
    path: '/create-an-account',
    name: 'CreateAnAccount',
    component: CreateAnAccount,
    meta: {
      title: 'Create An Account',
      requireAuthen: false
    }
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
    meta: {
      title: 'Forgot Password',
      requireAuthen: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      // requireAuthen: true
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: 'Profile',
      //requireAuthen: true
    }
  },
  {
    path: '/form',
    name: 'form',
    component: Form,
    meta: {
      title: 'Form',
      //requireAuthen: true
    }
  },
  {
    path: '/report',
    name: 'report',
    component: Report,
    meta: {
      title: 'Report',
     // requireAuthen: true
    }
  },
  {
    path: '/manage-users',
    name: 'ManageUsers',
    component: ManageUsers,
    meta: {
      title: 'Manage Users',
      // requireAuthen: true,
      requireRole: ["003"]
    }
  },
  {
    path: '/form-builder',
    name: 'FormBuilder',
    component: FormBuilder,
    meta: {
      title: 'Form Builder',
      // requireAuthen: true,
    }
  },
  {
    path: '/DataVisualization',
    name: 'DataVisualization',
    component: DataVisualization,
    meta: {
      title: 'Data Visualization',
     // requireAuthen: true
    },
    props: true
  },
  {
    path: '/DataVisualization/SelectGraph',
    name: 'SelectGraph',
    component: SelectGraph,
    meta: {
      title: 'SelectGraph',
      // requireAuthen: true
    },
    props: true
  },
  {
    path: '/DataVisualization/SelectGraph/ExportGraph',
    name: 'ExportGraph',
    component: ExportGraph,
    meta: {
      title: 'ExportGraph',
      // requireAuthen: true
    }
  },
  {
    path: '/AllTicket',
    name: 'AllTicket',
    component: AllTicket,
    meta: {
      title: 'AllTicket',
      // requireAuthen: true
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

router.beforeEach(async(to, from, next)=> {
  if (to.meta.requireAuthen) {
    if (localStorage.getItem("token")) {
      const role = localStorage.getItem("role_id")
      console.log(role)
      if (to.meta.requireRole && !to.meta.requireRole.find((requireRole) => requireRole === role)) {
        return next({ name: "Dashboard" });
      }
      return next();
    } else {
      return next({ name: "Login" });
    }
  }

  if (to.path === "/") {
    if (localStorage.getItem("token") != null) {
      return next({ name: "Dashboard" });
    }
  }

  return next();
})
export default router
