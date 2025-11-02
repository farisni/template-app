// 路由守卫
import router from "@/router/index";
// import { useAppStore } from '@/stores/app'
//
// const appStore = useAppStore()

router.beforeEach((to, from, next) => {
    // 在路由跳转前执行
    let token = localStorage.getItem("token");
    // 登录状态检查
    if (!token && to.path !=='/login') {
        // token不存在非登录页，重定向到登录页
        next('/login')
    }else if(token && to.path === '/login' ){
        // token存在，说明用户登录，此时跳转到首页
        // 保证token存在情况下，无法再跳转到登录，不会让用户一直登录
        next('/home')
    } else {
        next() // 其他放行
    }
})
