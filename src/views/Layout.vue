<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="auto"><CommonAside/></el-aside>
      <el-container>
        <el-header><CommonHeader/></el-header>
        <CommonTags/>
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
import CommonAside from "@/components/CommonAside.vue"
import CommonHeader from "@/components/CommonHeader.vue"
import CommonTags from "@/components/CommonTags.vue";

</script>
<style lang="less" scoped>
// 顶部
.el-header {
  height: 50px;
  padding: 0; // 去除header的内边距
}
// 标签，实际高 height + 上下padding
.tags {
  height: 20px;
  padding: 10px 10px 12px 10px;
}

.el-main {
  padding: 0 10px 0 10px;
  height: calc(100vh - 92px); // 100vh（屏幕总高）- 顶部 50px + tags（20 height + 10px+12px padding）
}
</style>
