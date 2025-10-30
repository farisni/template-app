<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >
    <!--有子菜单-->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>导航一</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>

    <!--没有子菜单-->
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>导航二</template>
    </el-menu-item>

    <el-menu-item index="3" disabled>
      <el-icon><document /></el-icon>
      <template #title>导航三</template>
    </el-menu-item>

    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>导航四</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed} from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'

import MenuData from '../data/MenuData'



const isCollapse = ref(false) //
const menuData = ref(MenuData) // 菜单数据

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}


</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
