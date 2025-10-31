import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus' // 引入ElementPlus
import 'element-plus/dist/index.css'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入Icon
import { createPinia } from 'pinia' // 状态管理


const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// 路由守卫
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

app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')

