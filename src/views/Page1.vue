<template>
  <div class="app-container">
    <div id="search_area">
      <el-form label-width="70px" >
        <el-row :gutter="20" >
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
          <el-col :span="12"  class="btn-area">
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

    <div id="operation_area">
      <el-row>
        <el-col :span="24" :push="4">
          <el-button type="success" >
            <el-icon><Plus /></el-icon>新建
          </el-button>
        </el-col>
      </el-row>
    </div>
    <div id="table_area">
      <el-table stripe :data="tableData" style="width: 100%" height="250">
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" />
      </el-table>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useDefaultPopperOptions } from '@/utils/usePopperOptions'

const dateRange = ref([])
const popperOptions = useDefaultPopperOptions()


const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },{
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },{
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-08',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-06',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
  {
    date: '2016-05-07',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036',
  },
]

</script>
<style lang="less" scoped>
.app-container {
  display: flex;
  flex-direction: column;// 垂直布局
  height: calc(100vh - 90px); /* 90px是header+tags的高度*/


  #search_area {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 55px;
    width: 100%;
    flex-shrink: 0;
    margin-top: 5px;
    border: 1px solid #EBEEF5;


    background-color: #fff;

    .el-form {
      height: 100%;
      width: 100%;
      padding: 0 10px;

      // ✅ 让整行垂直居中
      ::v-deep(.el-row) {
        height: 100%;
        display: flex;
        align-items: center;
      }

      // ✅ 修正 el-form-item 的默认顶部对齐
      ::v-deep(.el-form-item) {
        margin-bottom: 0;          /* 去掉默认的下边距 */
        height: 100%;              /* 撑满容器高度 */
        display: flex;
        align-items: center;       /* 垂直居中 ✅ */
      }

      // ✅ 按钮区域右对齐
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

  #operation_area {
    display: flex;
    align-items: center;
    height: 50px;
    flex-shrink: 0;
  }

  #table_area {
    flex: 1;               /* ✅ 占满剩余空间 */
    overflow-y: auto;      /* ✅ 只让表格区域滚动 */
    overflow-x: hidden;    /* 可选：防止横向滚动 */
    background-color: #fff;
    border: 1px solid #EBEEF5;

    /* ✅ 修正 el-table 100% 高度显示 */
    .el-table {
      width: 100%;
      min-height: 100%; /* 防止滚动时塌陷 */
    }
  }
}
</style>
