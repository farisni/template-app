<template>
  <div class="search-area">
    <el-form label-width="70px" >
      <!--5+7+6+6 每个col占据4-->
      <el-row :gutter="10" >
        <el-col :span="5" >
          <el-form-item label="关键字">
            <el-input placeholder="请输入关键字" />
          </el-form-item>
        </el-col>
        <el-col :span="7" >
          <el-form-item label="操作时间">
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
            <el-button type="primary" @click="">
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
      <el-button type="success" >
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
          :data="tableData"
          :header-cell-style="{color: '#54565a'}">
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
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[20, 50, 100, 300]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"/>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";


const currentPage = ref(1)
const pageSize = ref(20)


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
  ...Array.from({ length: 30 }, (_, index) => ({
    date: `2016-05-${String(index + 1).padStart(2, '0')}`,
    name: `User${index + 1}`,
    state: 'California',
    city: 'Los Angeles',
    address: `No. ${index + 1}, Grove St, Los Angeles`,
    zip: 'CA 90036'
  }))
])
</script>

<style lang="less" scoped>
// 如果row多行 不够高度 仅改这里就行
@search-wrapper-height:55px; // 固定高度，可改动 ！！可随意变动（有最低高度后，此高度不生效），table区域自适应
@table-area_operation-height:50px; // 固定高度, 可改动 ！！ 列表操作区域
// table 区域高度 = 父级元素的高-search-wrapper（55+2） - 自身（10+2）- 底部稍微多余点空间
@table-area-height:calc(100% - (@search-wrapper-height + 2px) - 12px - 5px); //

.search-area {
  height: @search-wrapper-height;
  border: 1px solid #EBEEF5;
  display: flex;
  align-items: center;
  // 处理el-row的居中问题
  .el-form {
    flex: 1;
    .el-row{
      padding: 5px 0 5px 0;
      .el-col{
        .el-form-item {
          margin: 0;
        }
      }
    }
    // 搜索按钮的列
    .btn-col {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .el-button:last-child  {
        margin-right: 10px;
      }
    }
  }


}

.table-area {
  display: flex;
  flex-direction: column;
  height: @table-area-height; // 重要
  margin-top: 10px;
  border: 1px solid #EBEEF5;

  /*列表操作区*/
  .table-area_operation {
    height: @table-area_operation-height;
    flex-shrink: 0; /* 禁止高度压缩 */
    padding: 0 10px; // 内边距
    display: flex;
    align-items: center;
    border-bottom: 1px solid #EBEEF5 ;
  }

  /*列表数据区*/
  .table-area_data {
    flex: 1; // 占据上下固定位置的剩余部分
    overflow: hidden; // 主要是限制el-table的自动溢出
    .el-table {
      height: 100%;
    }
  }

  /*分页区*/
  .table-pagination {
    height: 45px;
    line-height: 45px; // 单个行，不使用flex也可以上下居中
    .el-pagination{
      float: right;
    }
  }

}
</style>
