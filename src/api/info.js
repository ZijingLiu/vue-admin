import service from "@/utils/request.js";

/**
 * 添加一级分类
 */
export function addFirstClassReq(data) {
    return service.request({
        method: "post",
        url: "/news/addFirstCategory/",
        data
    });
};

/**
 * 获取分类列表
 */
export function getCategoryListReq(data) {
    return service.request({
        method: "post",
        url: "/news/getCategoryAll/",
        data
    });
}

/**
 * 删除一级分类
 */
export function deleteFirstCategoryReq(data) {
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    });
}

/**
 * 编辑一级分类
 */
export function editFirstCategoryReq(data) {
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    });
}