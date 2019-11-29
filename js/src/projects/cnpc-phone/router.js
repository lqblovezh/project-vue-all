import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export function createRouter() {
  return new Router({
    mode: routerMode,
    routes: [
      {
        path: baseUrl,
        component: () => import("./page/SecondRouter"),
        children: [
          {
            path: "/",
            redirect: "home"
          },
          {
            path: "home",
            component: () => import("@/page/Home"),
            meta: {
              level: 1
            }
          }
        ]
      }
    ]
  });
}
