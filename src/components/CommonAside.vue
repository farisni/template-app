<template>

  <!-- 菜单 -->
  <el-menu
      :default-active="appStore.activePath"
      :collapse="appStore.isCollapse"
      active-text-color="#409eff"
      background-color="#304156"
      text-color="#BFCBD9"
  >
    <div id="title">
      <img class="logo" src="../assets/images/logo2.png" alt="">
      <!---->
      <img class="logo-text"  v-if="!appStore.isCollapse" src="../assets/images/logo-text.png" alt="">
    </div>
    <!--引入递给菜单组件-->
    <!--从pinia 的持久化自动拿到Menu localStorage获取数据或者app.ts-->
    <CommonMenu
        :menu-data="appStore.userInfo.menu"
        @menu-item-click="handleMenuClick"

    />

  </el-menu>
</template>

<script lang="ts" setup>
import CommonMenu from "@/components/CommonMenu.vue";
import router from "@/router/index";
import { useAppStore } from '@/stores/app'
import { useRoute } from 'vue-router'

const route = useRoute()


const appStore = useAppStore()


// 处理菜单项点击
const handleMenuClick = (item) => {
  router.push(item.path)
  // 添加标签
  appStore.addTag(item)
  appStore.activePath = item.path
}

</script>

<style lang="less" scoped>
.el-menu:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}

.el-menu {
  height: 100vh;


  // 用户头像
  #title {
    display: flex;
    justify-content: start; // X 轴居中
    align-items: center;
    padding: 10px;

    .logo {
      //display: flex;
      width: 45px;
      height: 45px;
    }

    .logo-text {
      height: 33px;
      width: 135px;
    }
  }

}

</style>
