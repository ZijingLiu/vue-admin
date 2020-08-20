import service from "@/utils/request.js";

/**
 * 添加一级分类
 */
export function addFirstClass(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    });
};

/**
 * 获取分类列表
 */
export function getCategoryList(data) {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    });
}