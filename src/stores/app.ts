// 公共变量，状态交换的地方

import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => ({
        isCollapse: false
    }),


    actions: {
        CollapseMenu() {
            this.isCollapse = !this.isCollapse
        },

    }
})
