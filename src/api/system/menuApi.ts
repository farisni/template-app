import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysMenu'

export default {
    /*获取权限(菜单/功能)列表*/
    page(page, limit, searchObj) {
        return request({
            url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj // url查询字符串或表单键值对
        })
    },
    getMenuByRoleId(roleId) {
        return request({
            url: `${api_name}/toAssign/${roleId}`,
            method: 'get'
        })
    },
    /*
  给某个角色授权
  */
    saveRoleMenu(roleMenuVo) {
        return request({
            url: `${api_name}/doAssign`,
            method: "post",
            data: roleMenuVo
        })
    },
    getById(id) {
        return request({
            url: `${api_name}/getInfo/${id}`,
            method: 'get'
        })
    },
    findNodes() {
        return request({
            url: `${api_name}/findNodes`,
            method: 'get'
        })
    },
}
