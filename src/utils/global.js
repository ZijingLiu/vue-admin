import { MessageBox, Message } from "element-ui";

export function warningBox(param) {
    MessageBox.confirm(param.warning, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: param.iconType
    }).then(() => {
        param.fn && param.fn(param.id || "");
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