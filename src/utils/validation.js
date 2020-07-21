/**``
 * 验证特殊字符
 */
/* eslint-disable */
export function stripscript(str) {
    let pattern = new RegExp("[`~!@#$^&*() =|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{}【】‘；：”“'。，、？]")
    let result = "";
    for (let i = 0; i < str.length; i++) {
        result = result + str.substr(i, 1).replace(pattern, '');
    }
    return result;
}

/**
 * 验证邮箱
 */
export function validateEmail(str) {
    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    return !reg.test(str);
}

/**
 * 验证密码
 */
export function validatePwd(str) {
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/;
    return !reg.test(str);
}

/**
 * 验证码
 */
export function validateVCode(str) {
    let reg = /^[a-z0-9]{6}$/;
    return !reg.test(str);
}