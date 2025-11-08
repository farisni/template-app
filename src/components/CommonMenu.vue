<!-- components/CommonMenu.vue -->
<template>
  <template v-for="item in menuData" :key="item.id">
    <!-- 有子菜单的情况 -->
    <el-sub-menu
        v-if="item.children && item.children.length"
        :index="item.path"
    >
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
      </template>
      <!--重点-->
      <!-- 递归调用 -->
      <CommonMenu :menu-data="item.children"   @menu-item-click="emit('menu-item-click', $event)" />   <!-- 这里传递事件 -->
    </el-sub-menu>

    <!-- 没有子菜单的情况 -->
    <el-menu-item
        v-else
        :index="item.path"
        @click="handleMenuItemClick(item, $event)"
    >
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      <template #title>
        <span>{{ item.name }}</span>
      </template>
    </el-menu-item>
  </template>
</template>

<script setup>

import { useAppStore } from '@/stores/app'
const appStore = useAppStore()

defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
})

// 定义发射时间，通知父组件去调用
const emit = defineEmits(['menu-item-click'])

const handleMenuItemClick = (item,event) => {
  // 安全地阻止事件冒泡
  // 使用可选链安全调用
  event?.stopPropagation?.();
  // console.log('收到子组件的数据:', item);
  emit('menu-item-click', item)
}
</script>
<style lang="less" scoped>

@subMenuBg:#1f2d3d;
@subMenuHover:#001528;

.el-menu {
  & .nest-menu .el-sub-menu > .el-sub-menu__title,
  & .el-sub-menu .el-menu-item {
    background-color: @subMenuBg ;

    &:hover {
      background-color: @subMenuHover ;
    }
  }

  .el-menu-item, .el-sub-menu  {
    //background-color: #1f2d3d;
    span {
      padding-left: 5px;
    }
  }
}


</style>
