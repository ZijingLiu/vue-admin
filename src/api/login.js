import service from "@/utils/request.js"

/**
 * 获取验证码
 */
export function getSMS(data) {
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    });
}

/**
 * 注册
 */
export function register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    });
}

/**
 * 登录
 */
export function login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data
    });
}