<template>
  <div class="search-area">
    <el-form>
      <!--5+7+6+6 每个col占据4-->
      <el-row :gutter="10" >
        <el-col :span="5" >
          <el-form-item label="关键字">
            <el-input placeholder="Name/City/Address" />
          </el-form-item>
        </el-col>
        <el-col :span="7" >
          <el-form-item label="录入时间">
            <el-date-picker
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                range-separator="至"
            />
          </el-form-item>
        </el-col>
        <!--:push=6 表示向右边移动6个栅栏-->
        <el-col :span="12" class="btn-col" >
            <el-button type="primary" @click="fetchData()">
              <el-icon><Search /></el-icon>
              搜索
            </el-button>
            <el-button @click="">
              <el-icon><Refresh /></el-icon>
              重置
            </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div class="table-area">
    <!--列表操作-->
    <div class="table-area_operation">
      <el-button type="success">
        <el-icon><Plus /></el-icon>新建
      </el-button>
      <el-button type="danger" >
        <el-icon><Delete /></el-icon>删除
      </el-button>
    </div>
    <!--列表数据-->
    <div class="table-area_data">
      <el-table
          stripe
          :data="state.tableData"
          >
        <el-table-column type="selection" width="55" />
        <el-table-column fixed prop="date" label="Date" width="150" />
        <el-table-column prop="name" label="Name" width="120" />
        <el-table-column prop="state" label="State" width="120" />
        <el-table-column prop="city" label="City" width="320" />
        <el-table-column prop="address" label="Address" width="600" />
        <el-table-column prop="zip" label="Zip" />
      </el-table>
    </div>
    <!--分页-->
    <div class="table-pagination" >
      <el-pagination
          v-model:current-page="state.currentPage"
          v-model:page-size="state.pageSize"
          :page-sizes="[20, 50, 100, 300]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="state.total"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import exampleApi from "@/api/exampleApi.js"

const state = ref(
    {
      currentPage: 3,
      pageSize: 20,
      total: 300,
      tableData: []
    }
)

// 直接在 setup 中执行，相当于 created
const fetchData = async (page=1) => {
  // 获取数据的逻辑
  state.value.tableData = await exampleApi.getUserList()
}

// 立即执行，相当于 created
fetchData()

</script>

<style lang="scss" >
// 引人公共样式 不要写scoped

$search-wrapper-height:55px;
$table-area_operation-height:50px;
@use '@/styles/commonTable.scss'; // 引人公共table样式

.search-area {
  height: $search-wrapper-height; // 覆盖父类
}

.table-area_operation {
  height: $table-area_operation-height; // 覆盖父类
}



</style>

