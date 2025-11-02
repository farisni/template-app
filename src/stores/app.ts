// 公共变量/数据/方法，状态交换的地方
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isCollapse: false,
        // menu:[], // 不同账号的菜单数据
        userInfo: {
            username: '？',
            role: '',
            avatar: '',
            menu:[]
        }
        }
    ),

    actions: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse
        },
        // 设置menu数据
        setMenu(val) {
            // 菜单信息用localStorage存起来，否则刷新后menu的信息就清空了
            // localStorage.setItem("menu",JSON.stringify(val))
            // this.menu = val
        },
        getMenu: (state) => {
            return state.userInfo.menu
        },
        // 设置用户信息并保存到 localStorage
        setUserInfo(userInfo: any) {
            this.userInfo = {
                ...this.userInfo, // 保留原有结构
                ...userInfo       // 用新数据覆盖
            }
        },
        clearPersistedData() {
            localStorage.removeItem("token")
            localStorage.removeItem('app-store')
        },

    },
    // 自动持久化到 localStorage
    persist: {
        key: 'app-store',
        storage: localStorage,
        paths: ['userInfo', 'isCollapse'], // 只持久化这些字段
    }
})
