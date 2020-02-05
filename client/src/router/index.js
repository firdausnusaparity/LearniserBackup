import Vue from "vue";
import VueRouter from "vue-router";

import Authentication from "../components/Authentication.vue";
import HelloWorld from "../components/HelloWorld.vue";
import Form from "../components/Form.vue";
import Dashboard from "../components/Dashboard.vue";
import Learning from "../components/Learning.vue";
import Admin from "../components/Admin.vue";
import AdminDash from "../components/AdminDash.vue";
import AdminSubjects from "../components/AdminSubjects.vue";
import AdminSecurity from "../components/AdminSecurity.vue";

/* eslint-disable no-console */
Vue.use(VueRouter);

function loggedinRedirectHome(to, from, next) {
  if (localStorage.token) {
    next("/home");
  } else {
    next();
  }
}

function loggedinRedirectAdmin(to, from, next) {
  if (localStorage.token_admin) {
    next("/admin-dashboard");
  } else {
    next();
  }
}

function ifNotLoggedInRedirectHome(to, from, next) {
  if (localStorage.token) {
    next();
  } else {
    next("/");
  }
}

function ifNotLoggedInRedirectAdminHome(to, from, next) {
  if (localStorage.token_admin) {
    next();
  } else {
    next("/admin");
  }
}

function ifNotAdminRedirectAdminHome(to, from, next) {
  if (localStorage.role === "admin") {
    next();
  } else {
    next("/admin");
  }
}

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Authentication",
      component: Authentication,
      beforeEnter: loggedinRedirectHome
    },
    {
      path: "/home",
      name: "Home",
      component: HelloWorld,
      beforeEnter: ifNotLoggedInRedirectHome
    },
    {
      path: "/form",
      name: "Form",
      component: Form,
      beforeEnter: ifNotLoggedInRedirectHome
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: ifNotLoggedInRedirectHome
    },
    {
      path: "/learning",
      name: "Learning",
      component: Learning,
      beforeEnter: ifNotLoggedInRedirectHome
    },

    //Admin Routes
    {
      path: "/admin",
      name: "Admin",
      component: Admin,
      beforeEnter: loggedinRedirectAdmin
    },
    {
      path: "/admin-dashboard",
      name: "AdminDashboard",
      component: AdminDash,
      ifNotAdminRedirectAdminHome,
      beforeEnter: ifNotLoggedInRedirectAdminHome
    },
    {
      path: "/admin-subjects",
      name: "AdminSubjects",
      component: AdminSubjects,
      ifNotAdminRedirectAdminHome,
      beforeEnter: ifNotLoggedInRedirectAdminHome
    },
    {
      path: "/admin-security",
      name: "AdminSecurity",
      component: AdminSecurity,
      ifNotAdminRedirectAdminHome,
      beforeEnter: ifNotLoggedInRedirectAdminHome
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});
