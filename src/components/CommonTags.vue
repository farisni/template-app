<template>
  <div class="tags">
    <el-tag v-for="(tag, index) in appStore.tagsData" :key="tag.path"
            :closable="tag.path !== '/home'" :type="tagsType[index%5]"
            :effect="tag.path === route.path ? 'dark' : 'light'"
            @click="changeRoute(tag)" @close="handleClose(tag,index)">
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router/index";
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import type { TagProps } from 'element-plus'


const route = useRoute()
const appStore = useAppStore()

const tagsType = ['primary', 'success', 'info', 'warning', 'danger']

// 点击标签，跳转路由
const changeRoute  = (tag) => {
  router.push(tag.path)
}

// 关闭
const handleClose = (tag, index) => {
  appStore.removeTag(tag)
  // 如果删除的刚好是自己
  if (tag.path === route.path) {
    const length = appStore.tagsData.length
    // 如果删除的是最后一个:跳到前一个
    if (length === index) {
      router.push(appStore.tagsData[index - 1].path)
    }
    // 不是最后一个:往后一个
    else {
      router.push(appStore.tagsData[index].path)
    }
  }
}


</script>
<style lang="less" scoped>
.tags{
  padding: 10px;

  .el-tag{
    margin-right: 15px;
    // 鼠标悬停:小手
    cursor: pointer;
  }

  .el-tag {
    margin-right: 10px;
  }

}
</style>
