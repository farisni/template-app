<template>
  <div class="user-management-container">
    <!-- 搜索筛选区域 - 固定高度 -->
    <div class="search-section">
      <el-card class="search-card">
        <el-form :model="searchForm" label-width="80px">
          <el-row :gutter="20">
            <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="用户名/服务/手机号">
                <el-input
                    v-model="searchForm.keyword"
                    placeholder="请输入用户名、服务或手机号"
                    clearable
                />
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="状态">
                <el-select v-model="searchForm.status" placeholder="全部" clearable>
                  <el-option label="全部" value="" />
                  <el-option label="启用" value="enable" />
                  <el-option label="禁用" value="disable" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :xs="24" :sm="12" :md="8" :lg="6">
              <el-form-item label="创建时间">
                <el-date-picker
                    v-model="searchForm.createTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="截止时间"
                    value-format="YYYY-MM-DD"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="24" style="text-align: right;">
              <el-button type="primary" @click="handleSearch">
                <el-icon><Search /></el-icon>
                搜索
              </el-button>
              <el-button @click="handleReset">
                <el-icon><Refresh /></el-icon>
                重置
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>

    <!-- 操作按钮区域 -->
    <div class="action-section">
      <el-card class="action-card">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增
        </el-button>
        <el-button type="danger" @click="handleShowDeleted">
          <el-icon><View /></el-icon>
          已删除
        </el-button>
        <el-button @click="handleImport">
          <el-icon><Upload /></el-icon>
          导入
        </el-button>
        <el-button @click="handleExport">
          <el-icon><Download /></el-icon>
          导出
        </el-button>
      </el-card>
    </div>

    <!-- 列表展示区域 - 独立滚动 -->
    <div class="table-section">
      <el-card class="table-card">
        <el-table
            :data="tableData"
            style="width: 100%"
            v-loading="loading"
            :height="tableHeight"
            stripe
            border
        >
          <el-table-column type="index" label="编号" width="60" align="center" />
          <el-table-column prop="username" label="用户名" width="120" />
          <el-table-column prop="service" label="用户服务" min-width="150" show-overflow-tooltip />
          <el-table-column prop="gender" label="性别" width="80" align="center">
            <template #default="{ row }">
              <el-tag :type="row.gender === '男' ? 'primary' : 'danger'" size="small">
                {{ row.gender }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="department" label="部门" width="120" />
          <el-table-column prop="phone" label="手机号码" width="130" />
          <el-table-column prop="status" label="状态" width="80" align="center">
            <template #default="{ row }">
              <el-switch
                  v-model="row.status"
                  :active-value="'enable'"
                  :inactive-value="'disable'"
                  @change="handleStatusChange(row)"
              />
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160" />
          <el-table-column label="操作" width="180" fixed="right" align="center">
            <template #default="{ row }">
              <el-button type="primary" link size="small" @click="handleResetPassword(row)">
                重置密码
              </el-button>
              <el-button type="danger" link size="small" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
              v-model:current-page="pagination.currentPage"
              v-model:page-size="pagination.pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="pagination.total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh, Plus, View, Upload, Download } from '@element-plus/icons-vue'

// 搜索表单
const searchForm = reactive({
  keyword: '',
  status: '',
  createTime: []
})

// 分页配置
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 3
})

// 表格数据
const tableData = ref([
  {
    id: 1,
    username: 'admin',
    service: '卡布奇诺',
    gender: '男',
    department: '诚海网络',
    phone: '1819989879',
    status: 'enable',
    createTime: '2023-01-28 15:03:17'
  },
  {
    id: 2,
    username: 'ceam',
    service: 'Cealway卡布奇诺',
    gender: '',
    department: '财务部',
    phone: '18310989769',
    status: 'enable',
    createTime: '2023-01-28 16:04:35'
  },
  {
    id: 6,
    username: 'ctq',
    service: '陈佳琪',
    gender: '女',
    department: '诚海网络',
    phone: '19899890098',
    status: 'enable',
    createTime: '2024-04-22 08:30:59'
  }
])

const loading = ref(false)
const tableHeight = ref('400px')

// 方法
const handleSearch = () => {
  pagination.currentPage = 1
  fetchData()
}

const handleReset = () => {
  Object.assign(searchForm, {
    keyword: '',
    status: '',
    createTime: []
  })
  handleSearch()
}

const handleAdd = () => {
  ElMessage.info('点击了新增')
}

const handleShowDeleted = () => {
  ElMessage.info('点击了已删除')
}

const handleImport = () => {
  ElMessage.info('点击了导入')
}

const handleExport = () => {
  ElMessage.info('点击了导出')
}

const handleResetPassword = (row: any) => {
  ElMessageBox.confirm(`确定要重置用户 "${row.username}" 的密码吗？`, '提示', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('密码重置成功')
  })
}

const handleDelete = (row: any) => {
  ElMessageBox.confirm(`确定要删除用户 "${row.username}" 吗？`, '警告', {
    type: 'warning',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
  }).then(() => {
    ElMessage.success('删除成功')
  })
}

const handleStatusChange = (row: any) => {
  const action = row.status === 'enable' ? '启用' : '禁用'
  ElMessage.success(`已${action}用户 ${row.username}`)
}

const handleSizeChange = (size: number) => {
  pagination.pageSize = size
  fetchData()
}

const handleCurrentChange = (page: number) => {
  pagination.currentPage = page
  fetchData()
}

const fetchData = async () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 计算表格高度
const calculateTableHeight = () => {
  nextTick(() => {
    const windowHeight = window.innerHeight
    const searchSection = document.querySelector('.search-section') as HTMLElement
    const actionSection = document.querySelector('.action-section') as HTMLElement
    const pagination = document.querySelector('.pagination-container') as HTMLElement

    if (searchSection && actionSection && pagination) {
      const searchHeight = searchSection.offsetHeight
      const actionHeight = actionSection.offsetHeight
      const paginationHeight = pagination.offsetHeight
      const margin = 48 // 预留边距

      const height = windowHeight - searchHeight - actionHeight - paginationHeight - margin
      tableHeight.value = `${Math.max(height, 300)}px`
    }
  })
}

onMounted(() => {
  fetchData()
  calculateTableHeight()
  window.addEventListener('resize', calculateTableHeight)
})
</script>

<style scoped lang="scss">
.user-management-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 16px;
  background-color: #f5f7fa;
  box-sizing: border-box;

  .search-section {
    flex-shrink: 0;
    margin-bottom: 16px;

    .search-card {
      :deep(.el-card__body) {
        padding: 20px;
      }
    }
  }

  .action-section {
    flex-shrink: 0;
    margin-bottom: 16px;

    .action-card {
      :deep(.el-card__body) {
        padding: 16px 20px;
      }
    }
  }

  .table-section {
    flex: 1;
    min-height: 0; // 重要：允许flex item收缩

    .table-card {
      height: 100%;
      display: flex;
      flex-direction: column;

      :deep(.el-card__body) {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: 0;

        .el-table {
          flex: 1;
        }

        .pagination-container {
          flex-shrink: 0;
          padding: 16px 20px;
          background-color: #fff;
          border-top: 1px solid #ebeef5;
        }
      }
    }
  }
}

// 响应式调整
@media (max-width: 768px) {
  .user-management-container {
    padding: 8px;

    .search-section,
    .action-section {
      margin-bottom: 12px;
    }
  }
}
</style>
