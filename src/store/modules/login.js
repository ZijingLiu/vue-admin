import { login } from "@/api/login.js";
import cookie from "cookie_js"

const state = {
    token: "",
    username: cookie.get("username") || ""
};

const mutations = {
    setToken(state, data) {
        state.token = data;
        cookie.set("token", data);
    },
    setUsername(state, data) {
        state.username = data;
        cookie.set("username", data);
    },
    clearTokenUsername(state) {
        state.token = "";
        state.username = "";
    }
};

const getters = {

};

const actions = {
    login(context, data) {
        return login(data).then(res => {
            const token = res.data.data.token;
            context.commit("setToken", token);
            context.commit("setUsername", data.username);
            return res;
        });
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};