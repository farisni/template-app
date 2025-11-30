<template>
  <div class="search-area">
    <el-form>
      <el-row :gutter="10" >
        <el-col :span="5" >
          <el-form-item label="关键字" >
            <el-input placeholder="系统模块/操作人" v-model="state.searchObj.keyword" />
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
      <el-button type="success" @click="add">
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

        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleCode" label="角色编码" />
        <el-table-column prop="status" label="状态" />

        <el-table-column prop="createTime" label="创建时间" width="160"/>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="scope">
            <el-button
                type="primary"
                size="small"
                link
                icon="edit"
                @click="edit(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
                type="primary"
                size="small"
                link
                icon="position"
                @click="assignRole(scope.row)"
            >
              分配权限
            </el-button>
            <el-button
                type="danger"
                size="small"
                link
                icon="delete"
                @click="delete(scope.row.id)"
                :disabled="isDisabled(scope.row)"
            >
              删除
            </el-button>
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

    <!-- 角色表单弹窗 -->
    <el-dialog
        v-model="state.dialogVisible"
        :title="state.dialogTitle"
        width="500px">
      <el-form ref="roleFormRef" :model="state.formData" :rules="state.rules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="state.formData.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码" prop="roleCode">
          <el-input v-model="state.formData.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="state.formData.status">
            <el-radio :value="1">正常</el-radio>
            <el-radio :value="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button  @click="state.dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
        </div>
      </template>
    </el-dialog>
    <!--临时侧边栏-->
    <el-drawer v-model="state.drawerVisible"  direction="rtl">
      <template #header>
        <h4>「{{state.checkedRole.name}}」分配权限 </h4>
      </template>
      <template #default>
        <div>
          <el-tree
              ref="treeRef"
              :data="state.roleMenuTreeList"
              node-key="id"
              show-checkbox
              default-expand-all
              :props="state.defaultProps"
              @check=""
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="state.drawerVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveRoleMenu()">确 定</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup>
import {ref} from "vue";
import api from "@/api/system/roleApi.js"
import menuApi from "@/api/system/menuApi.js"
import { processDateRange } from '@/utils/dateUtils'
import {ElMessage} from "element-plus";

const radio1 = ref('Option 1')
const rules = {
  roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  roleCode: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
  status: [{ required: true, message: "请选择状态", trigger: "blur" }],
}

const state = ref(
    {
      currentPage: 1,
      pageSize: 20,
      total: 0,
      createTimes: [],
      searchObj: {
        keyword:"",
        createTimeBegin:"",
        createTimeEnd:"",
      }, // 查询表单对象
      tableData: [],
      listLoading: false,
      dialogVisible:false,
      dialogTitle:"",
      rules:rules,
      formData:{ // 表单数据
        status: 1,
      },
      checkedRole:{
        id:"",
        name:""
      },
      drawerVisible:false,
      roleMenuTreeList:[],
      defaultProps: { // 配置 tree 组件如何解析数据格式
        children: 'children', // 指定子节点字段名
        label: 'name' // 指定显示文本字段名
      },
    }
)

const treeRef = ref()



// 直接在 setup 中执行，相当于 created
const fetchData = async (page=1) => {
  let {pageSize, searchObj} = state.value
  let refreshPage = page
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

const reset = ()=>{
  state.value.createTimes = []
  state.value.searchObj = {}
  fetchData()
}

const add = ()=>{
  state.value.dialogVisible = true
  state.value.dialogTitle = "新建角色";
}


const edit = async (id) => {
  state.value.dialogVisible = true
  state.value.dialogTitle = "修改角色";
  let resp = await api.getById(id)
  state.value.formData = resp.data
}

const saveOrUpdate = async () =>{
  let resp
  if (!state.value.formData.id) {
    // 如果id不存在则走新增保存
    resp = await api.save(state.value.formData)
  } else {
    // 否则走更新
    resp = await api.updateById(state.value.formData)
  }
  ElMessage.success(resp.msg ||'操作成功')
  fetchData(state.value.currentPage)
  state.value.dialogVisible = false
}

const  isDisabled = (row) => {
  return row.id === '1' || row.roleCode === 'SYSTEM'
}

const assignRole = async (row)=>{
  state.value.checkedRole.id = row.id
  state.value.checkedRole.name = row.roleName
  state.value.drawerVisible=true
  let resp = await menuApi.getMenuByRoleId(row.id)
  state.value.roleMenuTreeList = resp.data
  // 回显角色已拥有的菜单
  const checkedIds = getSelectedIds(resp.data)
  if (treeRef.value) {
    // el-tree 设置选中的id状态
    treeRef.value.setCheckedKeys(checkedIds)
  }

}

// 递归方法获取被选中的权限Id
function getSelectedIds (auths, initArr = []) {
  return auths.reduce((pre, item) => {
    if (item.select && item.children.length === 0) {
      pre.push(item.id)
    } else if (item.children) {
      getSelectedIds(item.children, initArr)
    }
    return pre
  }, initArr)
}


const saveRoleMenu = async ()=>{
  const allCheckedNodes = treeRef.value.getCheckedNodes(false, true)
  const idList = allCheckedNodes.map(node => node.id) // 获取当前选中的节点ID列表
  let roleMenuVo = {
    roleId: state.value.checkedRole.id,
    menuIdList: idList
  }
  let resp = await menuApi.saveRoleMenu(roleMenuVo)
  ElMessage.success(resp.msg ||'操作成功')
  state.value.drawerVisible = false
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
/* 组件自身的 scoped 样式 */
:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-light);
}

</style>
