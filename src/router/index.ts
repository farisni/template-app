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
        children: []
    },
    {
        path: "/login",
        meta:{title:"登录"},
        component: Login,
    }
]


// 组件映射表（菜单Path - 组件对照）
export const componentMap: Record<string, any> = {
    '/home': () => import('@/views/Home.vue'),
    // '/mall': () => import('@/views/Mall.vue'), // 有子菜单一般没有组件，只负责展开
    '/mall/brand': () => import('@/views/Brand.vue'),
    '/mall/add': () => import('@/views/GoodsAdd.vue'),
    '/user': () => import('@/views/User.vue'),
    '/other/page1': () => import('@/views/Page1.vue'),
    '/other/CommonTable': () => import('@/views/CommonTable.vue'),
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




export const addDynamicFLatRoutes = (menuArr) => {

    let flattenRoutes = buildFlattenRoutes(menuArr);
    // console.log(flattenRoutes)

    flattenRoutes.forEach(item => {
        // 这里必须设置到对应的一级菜单下面
        router.addRoute("Layout", item);
    });


    router.addRoute("Layout",{
        path: '/:pathMatch(.*)*',
        name: '404',
        meta: { title: "404 NotFound" },
        component: () => import('@/views/404.vue')
    })


};


export  const processMultiLevelMenu = (menuList: any[]) => {
    const routes: any[] = []

    const buildRoute = (item: any, parentPath = ''): any => {
        // 创建路由对象
        const route: any = {
            path: item.path,
            name: item.id,
            meta: { title: item.name }
        }

        // 设置组件
        route.component = componentMap[item.path] //|| (() => import('@/views/404.vue'))

        // 如果有子菜单，递归处理并设置为 children
        if (item.children && item.children.length > 0) {
            route.children = item.children.map((child: any) => buildRoute(child, item.id))
        }

        routes.push(route)
        return route
    }
    menuList.forEach(item => buildRoute(item))
    return routes
}

// 动态平铺路由
export const buildFlattenRoutes = (menuList: any[]) => {
    const allRoutes: any[] = []

    const buildRoute = (item: any) => {
        // 创建路由对象
        const route: any = {
            path: item.path,
            name: item.id,
            meta: { title: item.name },
            component: componentMap[item.path] || (() => import('@/views/404.vue'))
        }

        // 立即添加到平铺数组
        allRoutes.push(route)

        // 递归构建子路由，但不设置 children
        if (item.children && item.children.length > 0) {
            item.children.forEach(buildRoute)
        }

        return route
    }

    menuList.forEach(buildRoute)
    return allRoutes
}



export function removeDynamicRoutes() {
    dynamicRoutes.forEach(name => {
        if (router.hasRoute(name)) {
            router.removeRoute(name)
        }
    })
    dynamicRoutes.length = 0 // 清空记录
}


export default router; // 导出路由
