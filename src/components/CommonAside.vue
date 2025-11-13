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
      <img src="../assets/images/logo2.png" alt="">
      <!---->
      <span v-if="!appStore.isCollapse">地那拉权限管理</span>
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

    img {
      display: flex;
      width: 45px;
      height: 45px;
    }

    span {
      /*文字禁止换行*/
      color: #fff;
      white-space: nowrap;
      font-size: 17px;
      font-weight: 500;
      //color:
      /*先把文字隐藏*/
      //display: none;
    }
  }

}

</style>
