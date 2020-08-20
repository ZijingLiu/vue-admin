import { MessageBox, Message } from "element-ui";

export function deleteNews(warning, type) {
    MessageBox.confirm(warning, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: type
    }).then(() => {
        Message({
            type: 'success',
            message: '删除成功!'
        });
    }).catch(() => {
        Message({
            type: 'info',
            message: '已取消删除'
        });
    });
};