import {createWebHistory, createRouter, useRouter} from 'vue-router'


import Layout from '@/views/Layout.vue'
import HomeView from '@/views/Home.vue'
import UserView from '@/views/User.vue'
import Login from '@/views/Login.vue'
import Brand from '@/views/Brand.vue'
import GoodsAdd from '@/views/GoodsAdd.vue'
import Notfound from "@/views/Notfound.vue";
import type { RouteRecordRaw } from 'vue-router'


const asyncRoutes : RouteRecordRaw[] = [
    {
        path: "/",
        component: Layout,
        redirect: '/home', // 添加默认重定向
        meta:{},
        children: [
            {path: '/home',  meta:{title:"首页"}, component:  HomeView},
            {path: '/user',  meta:{title:"用户管理"},component: UserView},
            {path: '/mall',  meta:{title:"商品管理"}, component: null,
                children: [
                    {path: '/mall/brand',meta:{title:"品牌管理"},component: Brand},
                    {path: '/mall/add',  meta:{title:"商品列表"},component: GoodsAdd},
                ]
            },
            // 通配符路由 - 放在最后
            {
                path: '/:pathMatch(.*)*',
                name: 'NotFound',
                meta:{title:"NotFound"},
                component: Notfound
            }
        ]
    },
    {
        path: "/login",
        meta:{title:"登录"},
        component: Login,
    },
]


const routes: RouteRecordRaw[] = [
    {
        path: "/",
        name:'Layout', // 必须要有name！否则动态添加路由找不到父级
        component: Layout,
        redirect: '/home', // 添加默认重定向
        meta:{},
        children: [
            {path: '/home',  meta:{title:"首页"}, component:  HomeView}
        ]
    },
    {
        path: "/login",
        meta:{title:"登录"},
        component: Login,
    },
]


// 组件映射表（菜单Path - 组件对照）
const componentMap: Record<string, any> = {

    '/mall/brand': () => import('@/views/Brand.vue'),
    '/mall/add': () => import('@/views/GoodsAdd.vue'),
    '/user': () => import('@/views/User.vue'),
}



const router = createRouter({
    history: createWebHistory(),
    routes
})


export const addDynamicRoutes = (menuArr) => {

    const addRoutes = (menuList) => {
        menuList.forEach((menu) => {
            // 构建路由
            const routeItem: RouteRecordRaw =  {
                path: menu.path,
                // name: menu.id,
                meta: {title: menu.name},
                component:componentMap[menu.path] || (() => import('@/views/Notfound.vue'))
            }

            if (menu.path && !router.hasRoute(menu.path)) {

                // 加入路由，注意父级一定要有name属性
                router.addRoute('Layout', routeItem);
            }
            // 递归处理子菜单
            if (menu.children && menu.children.length > 0) {
                addRoutes(menu.children);
            }
        });
        // 统配组件
        addNotFoundRoute()
    };

    // 调用
    addRoutes(menuArr);

};

// 添加 404 路由
function addNotFoundRoute() {
    router.addRoute({
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        meta: { title: "NotFound" },
        component: () => import('@/views/NotFound.vue')
    })
}


export default router; // 导出路由
