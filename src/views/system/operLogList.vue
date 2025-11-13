<template>
  <div class="search-area">
    <el-form>
      <el-row :gutter="10" >
        <el-col :span="5" >
          <el-form-item label="关键字" >
            <el-input placeholder="Keyword" v-model="state.searchObj.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="5" >
          <el-form-item label="请求路径" >
            <el-input placeholder="Path"  v-model="state.searchObj.operUrl"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" >
          <el-form-item label="操作时间">
            <el-date-picker
                v-model="state.searchObj.createTimes"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                type="daterange"
                range-separator="至"
            />
          </el-form-item>
        </el-col>
        <el-col :span="7" class="btn-col" >
          <el-button type="primary" @click="fetchData">
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
      <!--<el-table-->
      <!--    stripe-->
      <!--    :data="state.tableData"-->
      <!--&gt;-->
      <!--  <el-table-column type="selection" width="55" />-->
      <!--  <el-table-column fixed prop="date" label="Date" width="150" />-->
      <!--  <el-table-column prop="name" label="Name" width="120" />-->
      <!--  <el-table-column prop="state" label="State" width="120" />-->
      <!--  <el-table-column prop="city" label="City" width="320" />-->
      <!--  <el-table-column prop="address" label="Address" width="600" />-->
      <!--  <el-table-column prop="zip" label="Zip" />-->
      <!--</el-table>-->

      <el-table
          v-loading="state.listLoading"
          :data="state.tableData"
          stripe>

        <el-table-column type="selection" width="30" />
        <el-table-column
            label="序号"
            width="55"
            align="center">
          <template v-slot="scope">
            {{ (state.currentPage - 1) * state.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>

        <el-table-column prop="title" label="系统模块" />
        <el-table-column prop="operatorType" label="操作类型" />
        <el-table-column prop="businessType" label="请求方式" />
        <el-table-column prop="operUrl" label="请求路径" />
        <el-table-column prop="operName" label="操作人员" />
        <el-table-column prop="operIp" label="操作IP"/>

        <el-table-column prop="status" label="操作状态" >
          <template  v-slot="scope">
            <span v-if="scope.row.status === 0">正常</span>
            <span v-if="scope.row.status === 1">异常</span>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="130">
          <template v-slot="scope">
            <el-button type="text" @click="showInfo(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
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
import api from "@/api/system/OperLogApi"

const state = ref(
    {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      searchObj: {
        keyword:"",
        operUrl:"",
        createTimes: [],
      }, // 查询表单对象
      tableData: [],
      listLoading: false,
    }
)

// 直接在 setup 中执行，相当于 created
const fetchData = async () => {
  let {currentPage, pageSize, searchObj} = state.value
  // console.log(searchObj)
  // 获取数据的逻辑
  let res = await api.getPageList(currentPage, pageSize, searchObj)
  state.value.tableData.push(...res.data.list);
  state.value.total = res.data.total
}

// 立即执行，相当于 created
fetchData()

const showInfo = (id) => {
  console.log("详情....")
}

</script>

<style lang="scss" >
// 引人公共样式 不要写scoped

$search-wrapper-height:55px;
$table-area_operation-height:50px;
@import '@/styles/commonTable.scss'; // 引人公共table样式

.search-area {
  height: $search-wrapper-height; // 覆盖父类
}

.table-area_operation {
  height: $table-area_operation-height; // 覆盖父类
}


</style>
