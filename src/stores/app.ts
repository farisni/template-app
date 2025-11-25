// 公共变量/数据/方法，状态交换的地方
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isCollapse: false,
        activePath:'',// 被激活的菜单
        // menu:[], // 不同账号的菜单数据
        userInfo: {
            username: '？',
            role: '',
            avatar: '',
            menu:[]
        },
        token:"",
        tagsData: [
            {
                id: "1",
                path: '/home',
                name: '首页',
            }
        ],
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
        // 更新标签
        addTag(menuItem) {
            // 如果点击的不在标签数据中,则添加
            const index = this.tagsData.findIndex(val => val.path === menuItem.path)
            if (index === -1) {
                this.tagsData.push({id:menuItem.id, path: menuItem.path, name:menuItem.name})
            }
        },
        // 删除tag:删除tabList中对应的item
        removeTag(item) {
            // 要删除的是tagsData中的item
            const index = this.tagsData.findIndex(val => val.path === item.name)
            this.tagsData.splice(index, 1)
        },
        // 设置用户信息并保存到 localStorage
        setUserInfo(userInfo: any) {
            this.userInfo = {
                ...this.userInfo, // 保留原有结构
                ...userInfo       // 用新数据覆盖
            }
        },
        setToken(token:string) {
          this.token = token
        },
        clearPersistedData() {
            // 重置内存状态
            this.$reset()
            localStorage.removeItem("token")
            localStorage.removeItem('app-store')
            // 只保留第一个标签
            this.tagsData = [ {id: "1", path: '/home', name: '首页',}]
        },

    },
    // 自动持久化到 localStorage
    persist: [{
        key: 'app-store',
        storage: localStorage,
        pick: ['userInfo', 'isCollapse'], // 只持久化这些字段，注意pick和paths的区别
    },{
        key: 'token',
        storage:localStorage,
        pick: ['token']
    }]
})
