<template>

  <!-- 菜单 -->
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="appStore.isCollapse"
  >
    <div id="title">
      <img src="../assets/images/1.png" alt="">
      <span>欢迎你，管理员！</span>
    </div>
    <!--引入递给菜单组件-->
    <CommonMenu
        :menu-data="menuData.data"
        @menu-item-click="handleMenuItemClick"
    />

  </el-menu>
</template>

<script lang="ts" setup>
import { ref} from 'vue'

import MenuData from '@/data/MenuData'
import CommonMenu from "@/components/CommonMenu.vue";
import router from "@/router/index";

import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const menuData = ref(MenuData) // 菜单数据

// 处理菜单项点击
const handleMenuItemClick = (item) => {
  router.push(item.path)
}

</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu {
  height: 100vh;

  // 用户头像
  #title {
    display: flex;
    justify-content: center; // X 轴居中
    align-items: center;
    padding: 10px 5px;

    img {
      width: 50px;
      height: 50px;
      /*变圆型头像*/
      border-radius: 50%;
    }

    //#304156

    span {
      /*文字禁止换行*/
      white-space: nowrap;
      padding-left: 10px;
      /*先把文字隐藏*/
      //display: none;
    }
  }

}

</style>
