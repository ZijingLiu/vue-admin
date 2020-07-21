import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Login/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "login"
  },
  {
    path: "/login",
    name: "Login",
    component: Index
  }
];

const router = new VueRouter({
  routes
});

export default router;
