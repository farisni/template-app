<template>
  <div class="search-area">
    <el-form>
      <el-row :gutter="10" >
        <el-col :span="5" >
          <el-form-item label="关键字" >
            <el-input placeholder="系统模块/操作人" v-model="state.searchObj.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="5" >
          <el-form-item label="请求路径" >
            <el-input placeholder=""  v-model="state.searchObj.operUrl"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" >
          <el-form-item label="创建时间">
            <el-date-picker
                v-model="state.createTimes"
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
          <el-button @click="reset">
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

        <el-table-column prop="title" label="系统模块" width="90"/>
        <el-table-column prop="operatorType" label="操作类型" width="90" />
        <el-table-column prop="businessType" label="请求方式" width="85"/>
        <el-table-column prop="operUrl" label="请求路径" width="380" show-overflow-tooltip/>
        <el-table-column prop="operName" label="操作人员" width="85"/>
        <el-table-column prop="operIp" label="操作IP" width="120"/>

        <el-table-column prop="status" label="操作状态" >
          <template  v-slot="scope">
            <span v-if="scope.row.status === 0">正常</span>
            <span v-if="scope.row.status === 1">异常</span>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="130" fixed="right">
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
          :total="state.total"
          @current-change="fetchData"/>
    </div>
  </div>
  <!--详情-->
  <el-dialog
      title="日志详情"
      v-model="state.dialogVisible"
      width="40%">
    <el-descriptions :column="1" direction="vertical" >
      <el-descriptions-item labelStyle="font-weight: 700" label="请求路径">
        {{ state.info.operUrl }}
      </el-descriptions-item>
      <el-descriptions-item labelStyle="font-weight: 700" label="请求参数">
        {{ state.info.operParam }}
      </el-descriptions-item>
      <el-descriptions-item labelStyle="font-weight: 700" label="返回结果">
        {{ state.info.jsonResult }}
      </el-descriptions-item>
    </el-descriptions>
    <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="state.dialogVisible = false">
            关 闭
          </el-button>
        </span>
    </template>


  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/system/OperLogApi"
import { processDateRange } from '@/utils/dateUtils'


const state = ref(
    {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      createTimes: [],
      searchObj: {
        keyword:"",
        operUrl:"",
        createTimeBegin:"",
        createTimeEnd:"",
      }, // 查询表单对象
      tableData: [],
      listLoading: false,
      dialogVisible:false,
      info: {
        jsonResult: "无",
        operParam: "无",
        operUrl:""
      }
    }
)

// 直接在 setup 中执行，相当于 created
const fetchData = async () => {
  let {currentPage, pageSize, searchObj} = state.value
  const timeRange = processDateRange(state.value.createTimes)
  searchObj.createTimeBegin = timeRange[0]
  searchObj.createTimeEnd = timeRange[1]
  // 获取数据的逻辑
  let res = await api.getPageList(currentPage, pageSize, searchObj)
  state.value.tableData = res.data.list
  state.value.total = res.data.total
}

// 立即执行，相当于 created
fetchData()

const showInfo = async (id) => {
  console.log("详情....")
  let resp = await api.getById(id)
  state.value.info.jsonResult = resp.data.jsonResult
  state.value.info.operParam = resp.data.operParam
  state.value.info.operUrl = resp.data.operUrl
  state.value.dialogVisible = true
}

const reset = ()=>{
  state.value.createTimes = []
  state.value.searchObj = {}
  fetchData()
}


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

<style scoped>
/* 组件自身的 scoped 样式 */
:deep(.el-descriptions__table td) {
  word-break: break-word;
}
</style>
