import Mock from "mockjs";
import {userMenus} from "@/mock/data/fakeData.js";
import homeData from '@/mock/data/homeData.js'


/*
* 注意事项：
* axios 全局有 BASE_API = "/api"
* 该Mock会拦截 util/request.ts的请求时
* 注意request的路径匹配，与没有带额外参数，如_t, 加了baseUrl
* 推荐全部用正则匹配 GET 请求，尤其是带 query 参数或 baseURL 的接口
* */

// 模拟用户数
Mock.mock('/api/user/login2', 'post', function (options) {
        let body = JSON.parse(options.body)
        let username = body.username
        const user = userMenus.find(user => user.name === username)
        if (user) {
            return {
                code: 200, data: {
                    token: Mock.Random.guid(),
                    message: '登录成功',
                    userInfo: {id: "1", username: user.name, menu: user.menu}
                }
            }
        } else {
            return {code: 500, data: {message: '登录失败'}}
        }
    }
)

// 模拟获取用户信息 function写法
Mock.mock('/api/user/info', 'get', function (options) {
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
Mock.mock('/api/user/logout', 'post', {
    code: 200,
    data: {
        message: '已退出登录'
    }
})


//拦截指定接口，返回一个回调函数的返回值
Mock.mock('/api/home/getTableData',homeData.getTableData)
Mock.mock('/api/home/getCountData', homeData.getCountData)
Mock.mock('/api/home/getEchartsData', homeData.getEchartsData)


// 测试接口
Mock.mock('/api/test-api', 'get', {
    success: true,
    message: 'Mock 工作正常!',
    data: { test: '测试数据' }
})


// 操作日志
import systemData from '@/mock/data/systemData'
Mock.mock(/\/admin\/system\/sysOperLog/, "get",systemData.operLogList);

export default Mock
