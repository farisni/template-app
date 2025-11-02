// 路由守卫
import router from "@/router/index";
import {addDynamicRoutes} from "@/router/index.js";

// 恢复路由只执行一次
let isRoutesRestored = false
router.beforeEach((to, from, next) => {


    // 在路由跳转前执行
    let token = localStorage.getItem("token");
    // 登录状态检查
    if (!token && to.path !=='/login') {
        // token不存在非登录页，重定向到登录页
        return next('/login')
    }

    // token存在，说明用户登录，此时跳转到首页
    // 保证token存在情况下，无法再跳转到登录，不会让用户一直登录
    if(token && to.path === '/login' ){
        return next('/home')
    }

    // 动态路由恢复逻辑（仅执行一次）
    if (token && !isRoutesRestored) {
        // const store = JSON.parse(localStorage.getItem('app-store'))

        const store = JSON.parse(localStorage.getItem('app-store') || '{}')
        const menu = store?.userInfo?.menu

        if (menu && menu.length) {
            addDynamicRoutes(menu)
            isRoutesRestored = true

            // ⚠️ 路由刚动态添加完需要重新导航一次，否则会 404
            return next({ ...to, replace: true })
        }
    }


    next() // 正常放行
})
