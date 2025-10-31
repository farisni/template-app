// 公共变量，状态交换的地方

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isCollapse: false,
        tabList:[
            // {"id":"1","name":"商品管理"}
        ],

    }),


    actions: {
        collapseMenu() {
            this.isCollapse = !this.isCollapse
        },
        // 更新面包屑
        updateBreadcrumb(data) {
            //
            this.tabList = data;

        }
    }
})
