import router from "./index.js";
import cookie from "cookie_js";
import store from "@/store/index";

const whitelist = ["/login"];

router.beforeEach((to, from, next) => {
    if (cookie.get("token")) {
        if (to.path === "/login") {
            cookie.remove("token");
            cookie.remove("username");
            store.commit("login/clearTokenUsername");
            next();
        } else {
            next()
        }
    } else {
        if (whitelist.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login");
        }
    }
});

