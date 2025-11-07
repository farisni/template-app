<template>
  <div class="search-wrapper">

  </div>
  <div class="table-wrapper">

  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>

  .search-wrapper {
    height: 55px;
    border: 1px solid #EBEEF5;
  }

  .table-wrapper {
    /* 父级元素的高-search-wrapper（55+2） - 自身（10+2）- 底部稍微多余点空间 */
    height: calc(100% - 57px - 12px - 5px);
    margin-top: 10px;
    border: 1px solid #EBEEF5;
  }

</style>
