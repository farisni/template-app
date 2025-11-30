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
                range-separator="至"/>
          </el-form-item>
        </el-col>
        <el-col :span="7" class="btn-col" >
          <el-button type="primary" @click="fetchData()">
            <el-icon><Search /></el-icon>
            <span>搜索</span>
          </el-button>
          <el-button @click="reset">
            <el-icon><Refresh /></el-icon>
            <span>重置</span>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
  <div class="table-area">
    <!--列表操作-->
    <div class="table-area_operation">
      <el-button type="success">
        <el-icon><Plus /></el-icon><span>新建</span>
      </el-button>
    </div>
    <!--列表数据-->
    <div class="table-area_data">
      <el-table
          row-key="id"
          :data="state.tableData"
          stripe
          :default-expand-all="false"
          :tree-props="{children: 'children'}">
        <el-table-column type="selection" width="30" />
        <el-table-column prop="name" label="菜单名称" width="130"/>
        <el-table-column label="类型" align="center" width="75">
          <template #default="scope">
            <el-tag v-if="scope.row.type === 0" type="warning">目录</el-tag>
            <el-tag v-if="scope.row.type === 1" type="success">菜单</el-tag>
            <el-tag v-if="scope.row.type === 2" type="danger">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="图标">
          <template #default="scope">
            <el-icon><component :is="scope.row.icon" /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="perms" label="权限标识" width="160"/>
        <el-table-column prop="path" label="路由地址" width="200"/>
        <el-table-column prop="component" label="组件路径" width="200"/>
        <el-table-column prop="sortValue" label="排序" width="60"/>
        <el-table-column label="状态" width="80">
          <template #default="scope">
            <el-switch
                :model-value="scope.row.status === 1"
                inline-prompt
                active-text="启用"
                inactive-text="停用"
                style="--el-switch-off-color: gray">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170"/>
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
import api from "@/api/system/menuApi.js"
import { processDateRange } from '@/utils/dateUtils'


const formData = {
  id: '',
  parentId: '',
  name: '',
  type: 0,
  path: '',
  component: '',
  perms: '',
  icon: '',
  sortValue: 1,
  status: 1
}

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
    }
)

// 直接在 setup 中执行，相当于 created
const fetchData = async (page=1) => {
  let refreshPage = page
  let {pageSize, searchObj} = state.value
  const timeRange = processDateRange(state.value.createTimes)
  searchObj.createTimeBegin = timeRange[0]
  searchObj.createTimeEnd = timeRange[1]
  // 获取数据的逻辑
  let res = await api.page(refreshPage, pageSize, searchObj)
  state.value.tableData = res.data.list
  state.value.total = res.data.total
}

// 立即执行，相当于 created
fetchData()

const showInfo = async (id) => {
  console.log("详情....")
  let resp = await api.getById(id)
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
