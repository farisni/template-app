<template>
  <div class="search-area">
    <el-form>
      <el-row :gutter="10" >
        <el-col :span="5" >
          <el-form-item label="关键字" >
            <el-input placeholder="用户名/姓名/手机号码" v-model="state.searchObj.keyword" />
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
        <el-col :span="7" class="btn-col" :push="5">
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
      <el-button type="danger" >
        <el-icon><Delete /></el-icon><span>删除</span>
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

        <!--表头-->
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="name" label="姓名"/>
        <el-table-column prop="phone" label="手机" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column prop="role" label="角色" />
        <el-table-column label="启用状态" width="90">
          <template #default="scope">
            <el-switch
                :model-value="scope.row.status === 1"
                @update:model-value="(value) => switchStatus(scope.row, value)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="190"/>
        <el-table-column label="操作" width="190" fixed="right">
          <template v-slot="scope">
            <!--@click="info(scope.row.id)"-->
            <el-button type="text" >详情</el-button>
            <el-button type="text" @click="edit(scope.row.id)">修改</el-button>
            <el-button type="text" @click="assignRole(scope.row)">分配角色</el-button>
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
  <!--新增/详情/修改-->
  <el-dialog :title="state.dialogTitle"  v-model="state.dialogVisible" width="40%">
    <el-form ref="dataForm" :model="state.sysUser"  label-width="100px"  style="padding-right: 40px;">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="state.sysUser.username"/>
      </el-form-item>
      <el-form-item v-if="!state.sysUser.id" label="密码" prop="password">
        <el-input v-model="state.sysUser.password" type="password"/>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="state.sysUser.name"/>
      </el-form-item>
      <el-form-item label="手机" prop="phone">
        <el-input v-model="state.sysUser.phone"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogVisible = false"><el-icon><Close /></el-icon><span>取消</span></el-button>
        <el-button type="primary" @click="saveOrUpdate"><el-icon><Check /></el-icon><span>确定</span></el-button>
      </div>
    </template>
  </el-dialog>
  <!--分配角色-->
  <el-dialog title="分配角色" v-model="state.dialogRoleVisible">
    <el-form label-width="80px">
      <el-form-item label="用户名">
        <el-input disabled :value="state.sysUser.username"></el-input>
      </el-form-item>
      <el-form-item label="角色列表">
        <el-checkbox style="width: 100%" :indeterminate="state.isIndeterminate" v-model="state.checkAll" @change="checkAllRoleChange">全选</el-checkbox>
        <el-checkbox-group v-model="state.userRoleIds" @change="roleChange">
          <el-checkbox v-for="role in state.allRoles" :key="role.id" :label="role.id">{{role.roleName}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="state.dialogRoleVisible = false"><el-icon><Close /></el-icon><span>取消</span></el-button>
        <el-button type="primary" @click="saveRoles"><el-icon><Check /></el-icon><span>保存</span></el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/userApi"
import roleApi from '@/api/system/sysRole'
import { processDateRange } from '@/utils/dateUtils'
import {ElMessage} from "element-plus";

const defaultForm = {
  id: '',
  username: '',
  password: '',
  name: '',
  phone: '',
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
      dialogTitle:"",
      dialogVisible:false,
      dialogRoleVisible:false, // 角色面板
      sysUser: defaultForm,
      allRoles: [], // 所有角色列表
      userRoleIds: [], // 用户的角色ID的列表
      isIndeterminate: false, // 是否是不确定的（全选checkBox显示"-"）
      checkAll: false // 角色是否全选
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
  let res = await api.getPageList(refreshPage, pageSize, searchObj)
  state.value.tableData = res.data.list
  state.value.total = res.data.total
}

// 立即执行，相当于 created
fetchData()

const info = async (id) => {
  state.value.dialogTitle = "详情"
  let resp = await api.getById(id)
  state.value.dialogVisible = true
}

const reset = ()=>{
  state.value.createTimes = []
  state.value.searchObj = {}
  fetchData()
}


const add =  () => {
  state.value.dialogTitle = "新增"
  state.value.sysUser = {}
  state.value.dialogVisible = true
}

const edit = async (id) =>{
  state.value.dialogTitle = "修改"
  let resp = await api.getById(id)
  if (resp) {
    state.value.sysUser  = resp.data
    state.value.dialogVisible = true
  }
}

const saveOrUpdate = () =>{
  if (!state.value.sysUser.id) {
    // 如果id不存在则走新增保存
    save()
  } else {
    // 否则走更新
    update()
  }
}

const save = async () => {
  let resp = await api.save(state.value.sysUser)
  ElMessage.success(resp.msg ||'操作成功')
  state.value.dialogVisible = false
  fetchData(state.value.currentPage)
}

//更新
const update = async () =>{
  let resp = await api.updateById(state.value.sysUser)
  ElMessage.success(resp.msg || '操作成功')
  state.value.dialogVisible = false
  fetchData(state.value.currentPage)
}

const removeDataById = ()=>{

}

const switchStatus  = async (row,value) => {
  row.status = row.status === 1 ? 0 : 1
  let response = await api.updateStatus(row.id, row.status) // 返回已经是json
  if (response.code) {
    ElMessage.success(response.msg || '操作成功')
    fetchData(state.value.currentPage)
  }
}

//展示分配角色
const assignRole =  async (row) => {
  state.value.sysUser = row
  state.value.dialogRoleVisible = true
  let response = await roleApi.getRolesByUserId(row.id)
  state.value.allRoles = response.data.allRoles // 系统所以角色
  state.value.userRoleIds = response.data.userRoleIds // 当前用户所拥有的角色
  state.value.checkAll = state.value.userRoleIds.length === state.value.allRoles.length
  state.value.isIndeterminate = state.value.userRoleIds.length>0
                                && state.value.userRoleIds.length < state.value.allRoles.length
}

// 分配角色全选
const checkAllRoleChange =  (value) => {
  // value 当前勾选状态true/false
  // 如果当前全选, userRoleIds就是所有角色id的数组, 否则是空数组
  state.value.userRoleIds = value ? state.value.allRoles.map(item => item.id) : []
  // 如果当前不是全选也不全不选时, 指定为false
  state.value.isIndeterminate = false
}

/*角色列表选中项发生改变的监听*/
const roleChange = (value) => {
  const {userRoleIds, allRoles} = state.value
  state.value.checkAll = userRoleIds.length === allRoles.length && allRoles.length>0
  state.value.isIndeterminate = userRoleIds.length>0 && userRoleIds.length<allRoles.length
}


const saveRoles = async () => {
  let assginRoleVo = {
    userId: state.value.sysUser.id,
    roleIdList: state.value.userRoleIds
  }
  let response = roleApi.saveRoles(assginRoleVo)
  ElMessage.success(response.msg || '分配角色成功')
  state.value.dialogRoleVisible = false
  fetchData(state.value.currentPage)
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
:deep(.el-form-item__label) {
  font-weight: bold;
}
</style>
