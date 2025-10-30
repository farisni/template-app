import { createApp } from 'vue'
import App from './App.vue'
// 引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index'
// 引入Icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 状态管理
import { createPinia } from 'pinia'


const app = createApp(App)
const pinia = createPinia()

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.use(pinia)

app.mount('#app')

