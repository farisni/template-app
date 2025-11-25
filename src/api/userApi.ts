import request from '@/utils/request'; // 导入封装好的 axios 实例

// todo 改后端登录URL
const api_name = '/admin/system/index'

export default {
    login(data) {
        return request({
            // url: '/user/login',
            url: `${api_name}/login`,
            method: 'post',
            data: data // 请求体数据
        });
    },
    getUserInfo() {
        return request({
            url: `/admin/system/sysUser/info`,
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

