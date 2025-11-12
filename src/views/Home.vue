<template>
  <!--页面采用el-row和el-col布局-->
  <el-row
      class="home"
      :gutter="20"
  >
    <!--这一个el-col是第一列的内容-->
    <el-col
        class="left-col"
        :span="8"
        style="margin-top:10px"
    >
      <!--第一列有两个卡片，这个是第一个-->
      <el-card shadow="hover">
        <div class="user">
          <!--img的图片在资源中-->
          <img
              src="@/assets/images/1.png"
              alt=""
          >
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>

        <div class="login-info">
          <p>上次登录时间：<span>2022-7-11</span></p>
          <p>上次登录地点：<span>北京</span> </p>
        </div>
      </el-card>
      <!--第二个卡片中有一个表格-->
      <el-card
          style="margin-top:20px"
          shadow="hover"
          height="600px"
      >
        <!--表格的数据和列的数据，等下定义-->
        <el-table :data="tableData">
          <el-table-column
              v-for="(label, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="label"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>

    <!--第二列-->
    <el-col
        :span="16"
        style="margin-top: 10px"
        class="right-col"
    >
      <!--订单销售情况-->
      <div class="orderNum">
        <!--会有多个el-card，countData等下定义-->
        <el-card
            :body-style="{display:'flex',padding:0}"
            v-for="item in countData"
            :key="item.name"
        >
          <component
              class="icons"
              :is="item.icon"
              :style="{'background-color':item.color}"
          ></component>
          <div class="details">
            <p class="num">￥{{item.value }}</p>
            <p class="txt">{{item.name }}</p>
          </div>
        </el-card>
      </div>
      <!--下面是图表数据，每一个el-card都代表一个图表-->
      <el-card class="zigzagLine">
        <!--el-card和里面的div都要有高度-->
        <div class="zigzagLine"  ref="echart">
        </div>
      </el-card>
      <div class="graph" >
        <el-card  class="columnar-pia">
          <div ref="userechart" class="columnar-pia"></div>
        </el-card>
        <el-card  class="columnar-pia">
          <div
              ref="videoechart"
              class="columnar-pia"
          ></div>
        </el-card>
      </div>
    </el-col>
  </el-row>

</template>
<script setup>
import {
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";

import api from '@/api/homeApi.ts'


//引入echarts
import * as echarts from "echarts";
//获取组件实例对象
let {proxy} = getCurrentInstance();
//表格列的数据
const tableLabel = {
  name: "课程",
  todayBuy: "今日购买",
  monthBuy: "本月购买",
  totalBuy: "总购买",
};
//表格的数据和销售的数据，等会请求接口在设置实际数据
let tableData = reactive([]);
let countData = reactive([]);

//下面都是图表的一些配置
let xOptions = reactive({
  // 图例文字颜色
  textStyle: {
    color: "#333",
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
});
let pieOptions = reactive({
  tooltip: {
    trigger: "item",
  },
  color: [
    "#0f78f4",
    "#dd536b",
    "#9462e5",
    "#a6a6a6",
    "#e1bb22",
    "#39c362",
    "#3ed1cf",
  ],
  series: [],
});
let orderData = reactive({
  xData: [],
  series: [],
});
let userData = reactive({
  xData: [],
  series: [],
});
let videoData = reactive({
  series: [],
});



//请求getTableData 接口并赋值
const getTableData = async () => {
  let res = await api.getTableData()
  tableData.push(...res.data.tableData);
};
//请求getCountData  接口并赋值
const getCountData = async () => {
  let res = await api.getCountData();
  countData.push(...res.data.countData);
};
//请求getEchartsData  接口并渲染图表
const getEchartsData = async () => {
  let result = await api.getEchartsData();
  let res = result.data.orderData;
  let userRes = result.data.userData;
  let videoRes = result.data.videoData;
  orderData.xData = res.data.date;
  const keyArray = Object.keys(res.data[0]);
  const series = [];
  keyArray.forEach((key) => {
    series.push({
      name: key,
      data: res.data.map((item) => item[key]),
      type: "line",
    });
  });
  orderData.series = series;
  xOptions.xAxis.data = orderData.xData;
  xOptions.series = orderData.series;
  // userData进行渲染
  let hEcharts = echarts.init(proxy.$refs["echart"]);
  hEcharts.setOption(xOptions);

  // 柱状图进行渲染的过程
  userData.xData = userRes.map((item) => item.date);
  userData.series = [
    {
      name: "新增用户",
      data: userRes.map((item) => item.new),
      type: "bar",
    },
    {
      name: "活跃用户",
      data: userRes.map((item) => item.active),
      type: "bar",
    },
  ];

  xOptions.xAxis.data = userData.xData;
  xOptions.series = userData.series;
  let uEcharts = echarts.init(proxy.$refs["userechart"]);
  uEcharts.setOption(xOptions);
  videoData.series = [
    {
      data: videoRes,
      type: "pie",
    },
  ];
  pieOptions.series = videoData.series;
  let vEcharts = echarts.init(proxy.$refs["videoechart"]);
  vEcharts.setOption(pieOptions);
};
//在mounted中执行这三个方法
onMounted(() => {
  getTableData();
  getCountData();
  getEchartsData();
});
</script>

<style lang="less" scoped>

.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .userinfo {
      line-height: 30px;
    }
  }
  .login-info {
    margin-top: 10px;
    line-height: 30px;
    font-size: 14px;
    color: #999;
    span {
      color: #666;
      margin-left: 70px;
    }
  }
}


.right-col{
  .orderNum {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .el-card {
      // 高度由内容撑开
      width: 32%;
      margin-bottom: 20px;
      border-radius: 5px;
    }

    .details {
      width: 45%; // 故意不填充 68% ，意思就是不想让它居中
      text-align: center;
      .num {
        font-size: 33px;
        font-weight: 450;
        line-height: 50px;
      }
      .txt {
        font-size: 13px;
        color: #999;
      }
    }

    .icons {
      width: 80px;
      height: 80px;
      color: #fff;
      text-align: center;
    }
  }

  .zigzagLine {
    height: 280px;
  }


  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
    }

    .columnar-pia {
      height: 240px;
    }

  }
}
</style>
