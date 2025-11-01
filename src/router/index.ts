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
        meta:{},
        children: [
            {path: '/home', meta:{title:"首页"}, component: HomeView},
            {path: '/user',  meta:{title:"用户管理"},component: UserView},
            {path: '/mall',  meta:{title:"商品管理"}, component: UserView,
                children: [
                    {path: '/mall/brand',meta:{title:"品牌管理"},component: Brand},
                    {path: '/mall/add',  meta:{title:"添加商品"},component: GoodsAdd},
                ]
            },

        ]
    },
    {
        path: "/login",
        meta:{title:"登录"},
        component: Login,
    }
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router; // 导出供其他地方使用
