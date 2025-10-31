<template>
  <div class="header-container">
    <div class = "hamburger" >
      <el-icon :size="25" @click="appStore.collapseMenu">
        <Expand v-if="!appStore.isCollapse" />
        <Fold v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
        <el-breadcrumb-item key="1"><a href="/home">首页</a></el-breadcrumb-item>
        <el-breadcrumb-item
            v-for="tab in appStore.tabList"
            :key="tab.id"
        >
          {{ tab.name }}
          <!--<a v-if="tab.path === '/home'" :href="tab.path">{{ tab.name }}</a>-->
          <!--<span v-else>{{ tab.name }}</span>-->
        </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-dropdown @command="doClick">
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right"  :size="25" >
            <SwitchButton />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="recently">最近登录</el-dropdown-item>
            <el-dropdown-item command="cancel">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>
<script setup>
import router from "@/router/index.js";
import { useAppStore } from '@/stores/app'
import { logout,login } from '@/api/user'; // 导入 API 方法
import { ElMessage } from 'element-plus'

const appStore = useAppStore()
const doClick =  async (command) => {
  if (command === 'cancel') {
    // 演示请求后端做一些后端清理记录工作
    const response = await login({"id":"aa"})
    // 清除token
    localStorage.removeItem("token")
    ElMessage.success('已退出')
    // 跳转登录页面
    router.push("/login")
  }
}
</script>
<style lang="less" scoped>
.header-container {
  background-color: #f5f5f5;
  height: 60px;
  display: flex; // 让hamburger和头像居中
  justify-content: space-between;
  align-items: center; //
  padding: 0 20px; // 不要紧贴边框

  .hamburger {
    display: flex;
    align-items: center; // 垂直居中
    cursor: pointer; /* 鼠标移入变成手型 */
    .el-icon {
      margin-right: 15px;
    }
  }

  .right-content {
    cursor: pointer;
    :deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;  // 移除鼠标放上去的边框
    }

  }

  /* 只保留进入动画，离开时立即消失 */
  .breadcrumb-enter-active {
    transition: all 0.5s ease-out;
  }

  .breadcrumb-enter-from {
    opacity: 0;
    transform: translateX(20px);
  }

  .breadcrumb-leave-active {
    transition: none; /* 离开时无动画 */
    display: none; /* 立即隐藏 */
  }

}
</style>
