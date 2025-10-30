<template>
  <div class="header-container">
    <div class = "hamburger" @click="appStore.CollapseMenu">
      <el-icon :size="25" >
        <Expand />
      </el-icon>
    </div>
    <div class="right-content">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-icon class="el-icon--right"  :size="25" >
            <SwitchButton />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>最近登录</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

    </div>
  </div>
</template>
<script setup>
import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

</script>
<style lang="less" scoped>
.header-container {
  background-color: #efefef;
  height: 60px;
  display: flex; // 让hamburger和头像居中
  justify-content: space-between;
  align-items: center; //
  padding: 0 20px; // 不要紧贴边框

  .hamburger {
    cursor: pointer; /* 鼠标移入变成手型 */
  }

  .right-content {
    :deep(.el-tooltip__trigger:focus-visible) {
      outline: unset;  // 移除鼠标放上去的边框
    }
  }

}
</style>
