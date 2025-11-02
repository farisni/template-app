import {createWebHistory, createRouter, useRouter} from 'vue-router'


import Layout from '@/views/Layout.vue'
import HomeView from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import type { RouteRecordRaw } from 'vue-router'



// 基础路由（静态路由）
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
    }
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

// 动态路由
export const dynamicRoutes: RouteRecordRaw[] = []

export const addDynamicRoutes = (menuArr) => {

    const addRoutes = (menuList) => {
        menuList.forEach((menu) => {
            if (!menu.path) return false
            if (menu.path === '/' || menu.path === '/home') return false

            // 构建路由
            const routeItem: RouteRecordRaw =  {
                path: menu.path,
                name: menu.id, // 唯一标志
                meta: {title: menu.name},
                component:componentMap[menu.path] || (() => import('@/views/404.vue')) // 如果菜单有，但是没有组件映射，直接404
            }

            if (menu.path  && !router.hasRoute(menu.path)) {
                dynamicRoutes.push(routeItem)
                // 加入路由，注意父级一定要有name属性
                router.addRoute('Layout', routeItem);
            }
            // 递归处理子菜单
            if (menu.children && menu.children.length > 0) {
                addRoutes(menu.children);
            }
        });
        // 统配组件放到最后，未找到或者未配置页面，直接跳转404页面
        router.addRoute("Layout",{
            path: '/:pathMatch(.*)*',
            name: '404',
            meta: { title: "404 NotFound" },
            component: () => import('@/views/404.vue')
        })
    };

    // 调用
    addRoutes(menuArr);

};


export function removeDynamicRoutes() {
    dynamicRoutes.forEach(name => {
        if (router.hasRoute(name)) {
            router.removeRoute(name)
        }
    })
    dynamicRoutes.length = 0 // 清空记录
}


export default router; // 导出路由
