import Mock from "mockjs";


// 模拟用户数
Mock.mock('/user/login', 'post', {
    code: 200,
    data: {
        token: Mock.Random.guid(),
        message: '登录成功',
        userInfo: {
            id: Mock.Random.id(),
            username: 'admin',
            avatar: Mock.Random.image('100x100')
        }
    }
})

// 模拟获取用户信息 function写法
Mock.mock('/user/info', 'get', function(options) {
    console.log('请求参数:', options)
    return {
        code: 200,
        data: {
            id: 1,
            username: 'admin',
            email: 'admin@example.com',
            roles: ['admin'],
            timestamp: new Date().getTime()
        }
    }
})


// 拦截登出
Mock.mock('/user/logout', 'logout', {
    code: 200,
    data: {
        message: '已退出登录'
    }
})

export default Mock
