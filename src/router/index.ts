import {createWebHistory, createRouter} from 'vue-router'

import Main from '../views/Main.vue'
import HomeView from '../views/Home.vue'
import UserView from '../views/User.vue'

const routes = [
    {
        path: "/", component: Main, children: [
            {path: '/home', component: HomeView},
            {path: '/user', component: UserView},
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router; // 导出供其他地方使用
