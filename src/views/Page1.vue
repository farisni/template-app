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
              <el-button type="primary" @click="handleSearch">
                <el-icon><Search /></el-icon>
                搜索
              </el-button>
              <el-button @click="handleReset">
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
        <el-col :span="24">
          <!--<div  style="background-color: red;height: 10px" />-->
        </el-col>
      </el-row>
    </div>
    <div id="table_area"></div>
  </div>
</template>
<script>
import { useDefaultPopperOptions } from '@/utils/usePopperOptions'

const popperOptions = useDefaultPopperOptions()

</script>
<style lang="less" scoped>
.app-container {
  display: flex;
  flex-direction: column;// 垂直布局
  height: 100%; /* 继承父元素高度的100% */

  //width: 100%;
  //background-color: red;

  #search_area {
    display: flex;
    align-items: center;
    justify-content: start;
    height: 55px;
    width: 100%;
    flex-shrink: 0;
    margin-top: 5px;
    border: 1px solid #EBEEF5;
    //border: 1px solid #a8abb2;
    //box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.06); /* 轻微阴影 */


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
    height: 30px;
    flex-shrink: 0;
    //background-color: #e4e7ed;
  }

  #table_area {
    //background-color: #a8abb2;
    flex: 1;  /* 占据剩余所有空间 */
    overflow: auto; /* 🔥 内容超出时显示滚动条 */
  }
}
</style>
