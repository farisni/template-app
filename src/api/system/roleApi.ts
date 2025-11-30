import request from '@/utils/request';

const api_name = '/admin/system/sysRole'

export default {
    // todo 改统一的 url: `${api_name}/${page}/${limit}`,
    getPageList(page, limit,searchObj) {
        return request({
            url: `${api_name}` + '/page',
            // url: `${api_name}/${page}/${limit}`,
            method: 'get',
            params: searchObj
        })
    },
    //根据用户id查询用户已分配的角色
    getRolesByUserId(userId) {
        return request({
            url: `${api_name}/toAssign/${userId}`,
            method: 'get'
        })
    },
    //分配角色
    saveRoles(assginRoleVo) {
        return request({
            url: `${api_name}/doAssign`,
            method: 'post',
            data: assginRoleVo
        })
    },
    getById(id) {
        return request({
            url: `${api_name}/info/${id}`,
            method: 'get'
        })
    },
    // 更新
    updateById(role) {
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: role
        })
    },
    save(role) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: role
        })
    },

}
