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
            // {path: '/home',  name: '1', meta:{title:"首页"}, component:  HomeView}
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
    '/home': () => import('@/views/Home.vue'),
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

const findComponent = (path: string) => {
    if (!path) return false
    const component = componentMap[path]

    // 如果组件存在且是函数，直接返回
    if (component && typeof component === 'function') {
        return componentMap[path]
    }

    // 如果组件不存在或者不是函数，返回 404
    return () => import('@/views/404.vue')
}


export const addDynamicRoutes = (menuArr) => {

    const addRoutes = (parentName,menuList) => {
        menuList.forEach((menu) => {
            if (!menu.path || menu.path === '/') return false

            // 构建路由
            const routeItem: RouteRecordRaw =  {
                path: menu.path,
                name: menu.id, // 唯一标志, 注意我把菜单的id用作了路由的name
                meta: {title: menu.name},
                component:componentMap[menu.path]// 如果菜单有，但是没有组件映射，直接404 (() => import('@/views/404.vue'))
            }

            if (menu.path  && !router.hasRoute(menu.path)) {
                dynamicRoutes.push(routeItem)
                // 加入路由，注意父级一定要有name属性
                router.addRoute(parentName, routeItem);
            }
            // 递归处理子菜单
            if (menu.children && menu.children.length > 0) {
                // 菜单的id用作了路由的name
                addRoutes(menu.id, menu.children);
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
    addRoutes('Layout',menuArr);

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
