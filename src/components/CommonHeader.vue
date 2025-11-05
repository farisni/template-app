<template>
  <div class="header-container">
    <div class = "hamburger" >
      <el-icon :size="25" @click="appStore.collapseMenu">
        <Expand v-if="!appStore.isCollapse" />
        <Fold v-else />
      </el-icon>
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb"><!--动态效果-->
        <el-breadcrumb-item key="/home" to="/home" @click="handleBreadcrumbClick('/home')">首页</el-breadcrumb-item>
          <!--&& !tab.path.includes('pathMatch') ? tab.path : undefined-->
          <!-- 获取有效的 :to 值-->
        <el-breadcrumb-item :key="tab.path" :to="tab.path in componentMap ? tab.path : undefined"
                            v-for="tab in breadcrumbList"
                            @click="handleBreadcrumbClick(tab.path)">
          {{ tab.meta.title }}
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
import router,{removeDynamicRoutes, componentMap} from "@/router/index.js";
import { useAppStore } from '@/stores/app'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { useRoute } from 'vue-router'


const route = useRoute()
const appStore = useAppStore()





const doClick =  async (command) => {
  if (command === 'cancel') {
    // 演示请求后端做一些后端清理记录工作
    // 清除token 和其他localStorage
    appStore.clearPersistedData()
    ElMessage.success('已退出')
    // 清除动态路由
    removeDynamicRoutes()
    // 跳转登录页面
    router.push("/login")
  }
}

const handleBreadcrumbClick = (path) => {
  appStore.activePath = path
}

// 平铺路由后，通过当前路由，找到所有父路由（路径）
const generateBreadcrumb = () => {
  const currentPath = route.path
  const paths = currentPath.split('/').filter(Boolean)

  const breadcrumbItems = []
  let accumulatedPath = ''


  // 根据路径分段构建面包屑
  paths.forEach((segment, index) => {
    accumulatedPath += `/${segment}`

    // 跳过根路径和首页
    if (accumulatedPath === '/' || accumulatedPath === '/home') {
      return
    }

    // 查找这个路径对应的路由信息
    const matchedRoute = router.getRoutes().find(r => r.path === accumulatedPath)

    if (matchedRoute) {
      breadcrumbItems.push({
        path: accumulatedPath,
        meta: { title: matchedRoute.meta?.title || segment },
        name: matchedRoute.name
      })
    } else {
      // 如果没有找到路由，使用路径段作为标题
      breadcrumbItems.push({
        path: accumulatedPath,
        meta: { title: segment },
        name: segment
      })
    }
  })

  return breadcrumbItems
}

// 计算属性，根据路由变化面包屑导航
const breadcrumbList = computed(() =>{
  // return route.matched.filter(item => item.path !== '/'
  //     && item.path !== '/home')
  //
  // console.log(router.getRoutes())
  return generateBreadcrumb()
})



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
