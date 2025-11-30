import request from '@/utils/request'

/*
菜单管理相关的API请求函数
*/
const api_name = '/admin/system/sysMenu'

export default {
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
    }
}
