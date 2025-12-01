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
      <el-button type="success" @click="add">
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
        <el-table-column prop="name" label="菜单名称" width="150"/>
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
  <!--详情/编辑/新增-->
  <el-drawer v-model="state.drawerVisible"  direction="rtl">
    <template #header>
      <h4>{{state.drawerTitle}}</h4>
      <!--<div class="i-svg:api" />-->
    </template>
    <template #default>
      <div>
        <el-form ref="elFormRef" :model="state.formData" label-width="100px">
          <el-form-item label="父级菜单" v-if="state.formData.parentId === ''">
            <el-input v-model="state.formData.parentName"/>
          </el-form-item>
          <el-form-item label="菜单类型" prop="type">
            <!--<el-radio-group v-model="state.formData.type" :disabled="typeDisabled">-->
            <!--  <el-radio :label="0" :disabled="type0Disabled">目录</el-radio>-->
            <!--  <el-radio :label="1" :disabled="type1Disabled">菜单</el-radio>-->
            <!--  <el-radio :label="2" :disabled="type2Disabled">按钮</el-radio>-->
            <!--</el-radio-group>-->
          </el-form-item>
          <el-form-item label="菜单名称" prop="name">
            <el-input v-model="state.formData.name"/>
          </el-form-item>
          <!--<el-form-item label="图标" prop="icon" v-if="state.formData.type !== 2">-->
          <!--  <el-select v-model="state.formData.icon" clearable>-->
          <!--    <el-option v-for="item in iconList" :key="item.class" :label="item.class" :value="item.class">-->
          <!--        <span style="float: left;">-->
          <!--          <el-icon><component :is="item.class" /></el-icon>-->
          <!--        </span>-->
          <!--      <span style="padding-left: 6px;">{{ item.class }}</span>-->
          <!--    </el-option>-->
          <!--  </el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="排序">
            <el-input-number v-model="state.formData.sortValue" controls-position="right" :min="0" />
          </el-form-item>
          <el-form-item prop="path">
              <template #label>
                <div class="flex-x-center">
                  路由地址
                  <el-tooltip placement="top" content="访问的路由地址，如：/system/menuList">
                    <el-icon class="cursor-pointer ml-4"><QuestionFilled /></el-icon>
                  </el-tooltip>
                </div>
              </template>
              <el-input v-model="state.formData.path" placeholder="请输入路由地址" />
          </el-form-item>
          <!--如果是按钮的菜单则不显示-->
          <el-form-item v-if="state.formData.type !== MenuTypeEnum.BUTTON" label="图标" prop="icon">
            <!-- 图标选择器 -->
            <icon-select v-model="state.formData.icon" />
          </el-form-item>
          <!--<el-form-item prop="component" v-if="state.formData.type !== 0">-->
          <!--  <template #label>-->
          <!--    <el-tooltip content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" placement="top">-->
          <!--      <el-icon><QuestionFilled /></el-icon>-->
          <!--    </el-tooltip>-->
          <!--    组件路径-->
          <!--  </template>-->
          <!--  <el-input v-model="state.formData.component" placeholder="请输入组件路径" />-->
          <!--</el-form-item>-->
          <!--<el-form-item v-if="state.formData.type === 2">-->
          <!--  <template #label>-->
          <!--    <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(hasAuthority('bnt.sysRole.list'))" placement="top">-->
          <!--      <el-icon><QuestionFilled /></el-icon>-->
          <!--    </el-tooltip>-->
          <!--    权限字符-->
          <!--  </template>-->
          <!--  <el-input v-model="state.formData.perms" placeholder="请输入权限标识" maxlength="100" />-->
          <!--</el-form-item>-->
          <el-form-item label="状态" prop="type">
            <el-radio-group v-model="state.formData.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="state.drawerVisible = false">取 消</el-button>
        <el-button type="primary" @click="">确 定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/system/menuApi.js"
import IconSelect from "@/components/IconSelect/index.vue"
import { processDateRange } from '@/utils/dateUtils'

// const elFormRef = ref(ElForm);


const MenuTypeEnum = {
  CATALOG: 0,     // 目录
  MENU: 1,        // 菜单
  BUTTON: 2       // 按钮
}

const formData = {
  id: '',
  parentId: '',
  parentName:'',
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
      formData:formData,
      listLoading: false,
      drawerVisible:false,
      drawerTitle:"",
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

const reset = ()=>{
  state.value.createTimes = []
  state.value.searchObj = {}
  fetchData()
}

const add = ()=>{
  state.value.drawerVisible = true
  state.value.drawerTitle = "新建菜单";
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
:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}
</style>
