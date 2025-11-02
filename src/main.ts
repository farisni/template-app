import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus' // 引入ElementPlus
import 'element-plus/dist/index.css'
import { createPinia } from 'pinia' // 状态管理
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router/index'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 引入Icon
import '@/styles/index.scss' // 引入全局样式
import './mock/index.js' // 引入mock文件  mock 方式，正式发布时，注释掉该处即可
import './router/guard' // 路由守卫



const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)


// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}


app.use(ElementPlus)
app.use(pinia)
app.use(router)

app.mount('#app')

