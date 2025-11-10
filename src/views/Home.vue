<template>
  <el-row>
    <el-col :span="8">
      <!-- user卡片 -->
      <el-card>
        <div class="user">
          <img src="@/assets/images/1.png" alt="">
          <div class="userInfo">
            <p div class="name">Admin</p>
            <p div class="access">超级管理员</p>
          </div>
        </div>
        <div class="loginInfo">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登陆地点：<span>武汉</span></p>
        </div>
      </el-card>
      <!-- table卡片 -->
      <el-card style="margin-top: 20px;">
        <el-table :data="state.tableData" style="width: 100%">
          <!-- 这里的val,key对应的是对象里的 -->
          <el-table-column v-for="(value, key) in state.tableLabel" :prop="key" :label="value">
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!---->
    <el-col :span="16">
      <div class="num">
        <el-card v-for="item in state.countData" :key="item.name" :body-style="{ display: 'flex', padding: 0 }">
          <i class="icon" :class="`el-icon-${item.icon}`" :style="{ backgroundColor: item.color }"></i>
          <div class="details">
            <p class="price">{{ priceFormate(item.value) }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- echarts图表 -->
      <div style="margin-left:20px">
        <!-- 折线图 -->
        <el-card style="height:280px">
          <div ref="echarts1" style="height:280px"></div>
        </el-card>
        <div class="graph">
          <!-- 柱状图 -->
          <el-card style="height:280px">
            <div ref="echarts2" style="height:280px"></div>
          </el-card>
          <!-- 饼状图 -->
          <el-card style="height:320px">
            <div ref="echarts3" style="height:320px"></div>
          </el-card>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script setup>
import {onMounted, reactive, ref} from 'vue'
import * as echarts from 'echarts'
import {getStatisticalData} from '@/api/home'

const {data} = getStatisticalData()

import order from '@/data/order'


import TableData from '@/data/TableData'

const state = ref({
  tableLabel: {
    name: '课程',
    todayBuy: '今日购买',
    monthBuy: '本月购买',
    totalBuy: '总购买'
  },
  tableData: [],
  countData: import('@/data/CountData')
})


const priceFormate = (price) => {
  return "￥" + price
}


const echarts1 = ref(null)
const echarts2 = ref(null)
const echarts3 = ref(null)

onMounted(() => {
  state.value.tableData = data.tableData
  // ✅ DOM 已挂载，可以安全访问 echarts1.value
  const chart1 = echarts.init(echarts1.value)
  var chart1Option = order
  // ES6解构语法
  var {orderData, userData, videoData} = data

  // 获取x轴:要求是一个对象
  const xAxis = Object.keys(orderData.data[0])
  const xAxisData = {
    data: xAxis
  }

  // 配置
  chart1Option.legend = xAxisData
  chart1Option.xAxis = xAxisData
  chart1Option.yAxis = {}
  chart1Option.series = []

  // 配置series
  xAxis.forEach(key => {
    chart1Option.series.push({
      name: key,
      type: 'line',
      // key对应的orderData的所有值
      data: orderData.data.map(item => item[key])
    })
  })

  // 使用刚指定的配置项和数据显示图表。
  chart1.setOption(chart1Option);


  // // 柱状图
  // const chart2 = echarts.init(echarts2.value)
  // const echarts2Option = userData
  //
  // // 配置
  // echarts2Option.xAxis.data = userData.map(item => item.date)
  // echarts2Option.series = [
  //   {
  //     name: '新增用户',
  //     data: userData.map(item => item.new),
  //     // 类型:bar是柱状图
  //     type: 'bar'
  //   }
  //   ,
  //   {
  //     name: '活跃用户',
  //     data: userData.map(item => item.active),
  //     type: 'bar'
  //   }
  // ]
  //
  // chart2.setOption(echarts2Option);
  //
  // // 饼状图
  // const chart3 = echarts.init(echarts3.value)
  // var echarts3Option = videoData
  // echarts3Option.series = {
  //   data: videoData,
  //   type: 'pie'
  // }
  // chart3.setOption(echarts3Option);

})

// 图标数据
let orderData = reactive({
  xData: [],
  series: []
})
let userData = reactive({
  xData: [],
  series: []
})
let videoData = reactive({
  series: []
})

const getChartData = async ()=> {
  let result = await getStatisticalData()
  console.log(result)
  let orderRes = result.data.orderData;
  let userRes  = result.data.userData;
  let videoRes = result.data.videoData;

  orderData.xData = orderRes
}

</script>
<style lang="less" scoped>


</style>
