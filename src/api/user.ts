// src/api/user.js
import request from '@/utils/request'; // 导入封装好的 axios 实例

// 获取用户信息
export function getUserInfo(userId) {
    return request({
        url: `/user/${userId}`,
        method: 'get'
    });
}

// 用户登录
export function login(data) {
    return request({
        url: '/user/login',
        method: 'post',
        data: data // 请求体数据
    });
}

export function logout(data) {
    return request({
        url: '/user/logout',
        method: 'post',
        data: data // 请求体数据
    });
}


