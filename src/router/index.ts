import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layout from "@/Layout/index.vue";
import Home from "@/Layout/index.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Layout,
    children: [
      {
        path: "home",
        name: "Home",
        component: Home
      },
      {
        path: "/",
        redirect: "/column"
      },
      {
        path: "column",
        name: "Column",
        component: () => import("@/modules/Column.vue")
      },
      {
        path: "pie",
        name: "Pie",
        component: () => import("@/modules/Pie.vue")
      },
      {
        path: "tableNum",
        name: "TableNum",
        component: () => import("@/modules/TableNum.vue")
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 修复路由返回一个promise没有catch接收而报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};
export default router;
