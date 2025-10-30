<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <!--引入递给菜单组件-->
    <CommonMenu
        :menu-data="menuData.data"
        @menu-item-click="handleMenuItemClick"
    />

  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed} from 'vue'

import MenuData from '../data/MenuData'
import CommonMenu from "../components/CommonMenu.vue";



const isCollapse = ref(false) //
const menuData = ref(MenuData) // 菜单数据

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}

// 处理菜单项点击
const handleMenuItemClick = (item) => {
  console.log("CommonAside: "+ item.name)
}

</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
