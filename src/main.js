/* eslint-disable */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./router/guard"
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import icon from './icons/index';

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
