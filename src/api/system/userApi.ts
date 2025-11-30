import request from '@/utils/request'; // 导入封装好的 axios 实例

// todo 改后端登录URL
// const api_name = '/admin/system/index'

const api_name = '/admin/system/sysUser'

export default {
    login(data) {
        return request({
            // url: '/user/login',
            url: `/admin/system/index/login`,
            method: 'post',
            data: data // 请求体数据
        });
    },
    getUserInfo() {
        return request({
            //  url: '/user/info',
            url: `${api_name}/info`,
            method: 'get'
        })
    },
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
            method: 'get'
        })
    },
    save(user) {
        return request({
            url: `${api_name}/save`,
            method: 'post',
            data: user
        })
    },
    updateById(user) {
        return request({
            url: `${api_name}/update`,
            method: 'put',
            data: user
        })
    },
    //更新用户状态
    updateStatus(id, status) {
        return request({
            url: `${api_name}/updateStatus/${id}/${status}`,
            method: 'get'
        })
    },
    logout(data) {
        return request({
            url: '/user/logout',
            method: 'post',
            data: data // 请求体数据
        });
    }
}

