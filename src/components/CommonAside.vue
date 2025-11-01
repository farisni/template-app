<template>

  <!-- 菜单 -->
  <el-menu
      default-active="2"
      class="el-menu-vertical"
      :collapse="appStore.isCollapse"

      active-text-color="#409eff"
      background-color="#304156"
      text-color="#BFCBD9"
  >
    <div id="title">
      <img src="../assets/images/1.png" alt="">
      <span v-if="!appStore.isCollapse">欢迎你，管理员！</span>
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
import { computed } from 'vue'
import MenuData from '@/data/MenuData'
import CommonMenu from "@/components/CommonMenu.vue";
import router from "@/router/index";
import { useRoute } from 'vue-router'


import { useAppStore } from '@/stores/app'

const appStore = useAppStore()

const menuData = ref(MenuData) // 菜单数据

const findMenuParentsById = (id, data, parents = []) => {
  for (let item of data) {
    // 如果找到目标节点，返回包括当前节点在内的完整路径
    if (item.id === id) {
      return [...parents, { id: item.id, name: item.name }];
    }
    // 如果有子节点，递归查找
    if (item.children && item.children.length > 0) {
      const result = findMenuParentsById(id, item.children, [
        ...parents,
        { id: item.id, name: item.name }
      ]);
      // 如果在子节点中找到，返回结果（包含完整路径）
      if (result) {
        return result;
      }
    }
  }
  return null;
}

// 处理菜单项点击
const handleMenuItemClick = (item) => {
  // console.log(item.name + " " + item.id)
  router.push(item.path)
}

// 通过菜单id找到所以父菜单


</script>

<style lang="less" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;

}

.el-menu-vertical {
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


    span {
      /*文字禁止换行*/
      color: #BFCBD9;
      white-space: nowrap;
      padding-left: 10px;
      /*先把文字隐藏*/
      //display: none;
    }
  }

}

</style>
