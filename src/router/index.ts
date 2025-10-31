import {createWebHistory, createRouter} from 'vue-router'

import Main from '@/views/Layout.vue'
import HomeView from '@/views/Home.vue'
import UserView from '@/views/User.vue'
import Login from '@/views/Login.vue'
import Brand from '@/views/Brand.vue'
import GoodsAdd from '@/views/GoodsAdd.vue'

const routes = [
    {
        path: "/",
        component: Main,
        redirect: '/home', // 添加默认重定向
        children: [
            {path: '/home', component: HomeView},
            {path: '/user', component: UserView},
            {path: '/mall', component: UserView},
            {path: '/mall/brand', component: Brand},
            {path: '/mall/add', component: GoodsAdd},
        ]
    },
    {
        path: "/login",
        component: Login,
    }

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router; // 导出供其他地方使用
