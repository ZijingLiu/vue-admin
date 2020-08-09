import router from "./index.js";
import cookie from "cookie_js";

const whitelist = ["/login"];

router.beforeEach((to, from, next) => {
    if (cookie.get("token")) {
        next();
    } else {
        if (whitelist.indexOf(to.path) !== -1) {
            next();
        } else {
            next("/login");
        }
    }
});

