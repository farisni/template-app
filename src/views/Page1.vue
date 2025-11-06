<template>
  <div class="app-container">
    <div id="search_area">
      <el-form label-width="70px">
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="关键字">
              <el-input placeholder="请输入关键字" />
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="操作时间">
              <el-date-picker
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  type="daterange"
                  range-separator="至"
                  :popper-options="popperOptions"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12" class="btn-area">
            <div class="btn-wrapper">
              <el-button type="primary" @click="">
                <el-icon><Search /></el-icon>
                搜索
              </el-button>
              <el-button @click="">
                <el-icon><Refresh /></el-icon>
                重置
              </el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div id="table_main">
      <div id="operation_area">
        <el-row>
          <el-col :span="24">
            <el-button type="success">
              <el-icon><Plus /></el-icon>新建
            </el-button>
          </el-col>
        </el-row>
      </div>
      <div id="data_area">
        <el-table
            stripe
            :data="tableData"
            :height="tableHeight"
        >
          <el-table-column fixed prop="date" label="Date" width="150" />
          <el-table-column prop="name" label="Name" width="120" />
          <el-table-column prop="state" label="State" width="120" />
          <el-table-column prop="city" label="City" width="320" />
          <el-table-column prop="address" label="Address" width="600" />
          <el-table-column prop="zip" label="Zip" />
        </el-table>
      </div>
      <div id="pagination">
        <el-pagination
            v-model:current-page="currentPage8"
            v-model:page-size="pageSize8"
            :page-sizes="[100, 500, 1000, 5000]"
            :background="true"
            :pager-count="9"
            layout="total, sizes, prev, pager, next, jumper"
            :total="100000"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useDefaultPopperOptions } from '@/utils/usePopperOptions'


// 大量数据
const currentPage8 = ref(1)
const pageSize8 = ref(100)
const pageSize4 = ref(100)

const dateRange = ref([])
const popperOptions = useDefaultPopperOptions()
const tableHeight = ref(400) // 初始高度

// 模拟表格数据
const tableData = ref([
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  },
  // 可以添加更多数据来测试滚动条
  ...Array.from({ length: 20 }, (_, index) => ({
    date: `2016-05-${String(index + 1).padStart(2, '0')}`,
    name: `User${index + 1}`,
    state: 'California',
    city: 'Los Angeles',
    address: `No. ${index + 1}, Grove St, Los Angeles`,
    zip: 'CA 90036'
  }))
])

// 计算表格高度
const calculateTableHeight = () => {
  nextTick(() => {
    const windowHeight = window.innerHeight
    const searchArea = document.getElementById('search_area')
    const operationArea = document.getElementById('operation_area')
    const tableMain = document.getElementById('table_main')
    const pagination = document.getElementById('pagination')

    if (searchArea && operationArea && tableMain) {
      const searchHeight = searchArea.offsetHeight
      const operationHeight = operationArea.offsetHeight
      const paginationHeight = pagination.offsetHeight;
      const tableMainTop = tableMain.getBoundingClientRect().top
      const margin = 20 // 预留边距

      tableHeight.value = windowHeight - tableMainTop - operationHeight - paginationHeight- margin
    }
  })
}

onMounted(() => {
  calculateTableHeight()
  window.addEventListener('resize', calculateTableHeight)
})

onUnmounted(() => {
  window.removeEventListener('resize', calculateTableHeight)
})
</script>

<style lang="less" scoped>
// 定义高度变量
@app-header-tags-height: 90px;      // header + tags 总高度
@search-area-height: 55px;          // 搜索区域高度
@search-area-margin-top: 5px;       // 搜索区域上边距
@operation-area-height: 30px;       // 操作区域高度
@table-main-margin-top: 10px;       // 表格主区域上边距
@common-padding: 10px;              // 通用内边距
@border-color: #EBEEF5;             // 边框颜色
@background-color: #fff;            // 背景颜色
@scroll-margin: 20px;               // 滚动边距

.app-container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - @app-header-tags-height);

  #search_area {
    display: flex;
    align-items: center;
    justify-content: start;
    height: @search-area-height;
    width: 100%;
    flex-shrink: 0;
    margin-top: @search-area-margin-top;
    border: 1px solid @border-color;
    background-color: @background-color;

    .el-form {
      height: 100%;
      width: 100%;
      padding: 0 @common-padding;

      ::v-deep(.el-row) {
        height: 100%;
        display: flex;
        align-items: center;
      }

      ::v-deep(.el-form-item) {
        margin-bottom: 0;
        height: 100%;
        display: flex;
        align-items: center;
      }

      .btn-area {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        height: 100%;

        .btn-wrapper {
          display: flex;
        }
      }
    }
  }

  #table_main {
    margin-top: @table-main-margin-top;
    border: 1px solid @border-color;
    background-color: @background-color;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    margin-bottom: 10px;

    #operation_area {
      height: @operation-area-height;
      flex-shrink: 0;
      padding: @common-padding;
      display: flex;
      align-items: center;
      border-bottom: 1px solid @border-color;
    }

    #data_area {
      flex: 1;
      min-height: 0;

      ::v-deep(.el-table) {
        height: 100%;

        .el-table__header-wrapper {
          position: sticky;
          top: 0;
          z-index: 1;
        }
      }
    }

    #pagination {
      align-items: center;
      justify-items: flex-end;
      height: 40px;
    }
  }

}
</style>
