import Vue from "vue";
import VueRouter from "vue-router";
import Overview from "../views/Content/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/console/index",
    hidden: true
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    component: (resolve) => require(['../views/Login/index.vue'], resolve)
  },
  {
    path: "/console",
    name: "Console",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: (resolve) => require(['../views/Layout/index.vue'], resolve),
    children: [
      {
        path: "/console/index",
        meta: {
          name: "概览"
        },
        component: Overview
      },
      {
        path: "/console/test",
        meta: {
          name: "测试"
        },
        component: (resolve) => require(['../views/Content/test.vue'], resolve)
      }
    ]
  },
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: (resovle) => require(['../views/Layout/index.vue'], resovle),
    children: [
      {
        path: "/info/list",
        meta: {
          name: "信息列表"
        },
        component: (resovle) => require(['../views/Info/list.vue'], resovle)
      },
      {
        path: "/info/category",
        meta: {
          name: "信息分类"
        },
        component: (resovle) => require(['../views/Info/category.vue'], resovle)
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
