import "./common/css";
import Vue from "vue";
import { Toast } from "mint-ui";
import { sync } from "vuex-router-sync";

import App from "./App.vue";
import { createStore } from "./store";
import { createRouter } from "./router";
import { installGlobalComponents } from "./components";
import initGlobalFunc from "./common/js/initGlobalFunc";

Vue.use(installGlobalComponents);
Vue.use(initGlobalFunc);

Vue.prototype.$Toast = Toast;
// Vue.prototype.$services = services;

export function createApp() {
  const store = createStore();
  const router = createRouter();
  router.beforeEach((to, from, next) => {
    next();
  });
  sync(store, router);
  const app = new Vue({
    store,
    router,
    render: h => h(App)
  });
  return { app, store, router };
}

Vue.mixin({
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route
      });
    }
  },
  computed: {}
});
