// 公共变量，状态交换的地方

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isCollapse: false,
        tabList:[
            // {"id":"1","name":"首页"}
        ],

    }),


    actions: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse
        },
        // 更新面包屑
        updateBreadcrumb(data) {
            this.tabList = [];
            data.filter(item => item.name !== '首页').forEach(item=>{
                this.tabList.push({
                    id: item.id,
                    name: item.name || '未命名',
                })
            })

        }
    }
})
