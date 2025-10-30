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
      <CommonMenu :menu-data="item.children" />
    </el-sub-menu>

    <!-- 没有子菜单的情况 -->
    <el-menu-item
        v-else
        :index="item.path"
        @click="handleMenuItemClick(item)"
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
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  menuData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['menu-item-click'])

const handleMenuItemClick = (item) => {
  emit('menu-item-click', item) // 告诉父组件：我被点击了，这是点击的数据
}
</script>
