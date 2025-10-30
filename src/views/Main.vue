<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px"><CommonAside/></el-aside>
      <el-container>
        <el-header><CommonHeader/></el-header>
        <el-main>
          <!--内容区域-->
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script setup lang="ts">
// 自动注册，无需 components 选项
import CommonAside from "../components/CommonAside.vue"
import CommonHeader from "../components/CommonHeader.vue"

</script>
<style lang="less" scoped>
.el-header {
 padding: 0; // 去除header的外边距
}
</style>
