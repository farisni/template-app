import { createApp } from 'vue'
import App from './App.vue'
import '@/mock/index.js' // 引入mock文件  mock 方式，正式发布时，注释掉该处即可
import ElementPlus from 'element-plus' // 引入ElementPlus
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import 'element-plus/dist/index.css'
import { createPinia } from 'pinia' // 状态管理
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入Icon
import 'uno.css' //
import '@/styles/index.scss' // 引入全局样式
import '@/router/guard' // 路由守卫
import {addDynamicFLatRoutes} from "@/router/index.js";
import 'simplebar/dist/simplebar.min.css';




const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(ElementPlus, {
    locale: zhCn, // 中文本地化
} as any)
app.use(pinia)
// app.use(router)



async function bootstrap() {
    const token = localStorage.getItem('token')
    if (token && token!=="") {
        const store = JSON.parse(localStorage.getItem('app-store') || '{}')
        const menu = store?.userInfo?.menu
        if (menu && menu.length) {
            addDynamicFLatRoutes(menu)
        }
    }

    app.use(router)
    await router.isReady()
    app.mount('#app')
}

bootstrap()

