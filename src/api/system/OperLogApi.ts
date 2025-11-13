import request from '@/utils/request';

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysOperLog'

export default {
    getPageList(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj // url查询字符串或表单键值对
        })
    },

    getById(id) {
        return request({
            url: `${api_name}/get/${id}`,
            method: 'get',
        })
    },
}
