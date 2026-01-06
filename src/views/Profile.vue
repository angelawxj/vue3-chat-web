<template>
  <!-- 个人信息 -->
  <div class="user-card">
    <div class="user-info">
      <el-avatar :size="64" src="https://i.pravatar.cc/100" />
      <div class="info">
        <h3>Xue Yunfan</h3>
        <p>已使用 CoMagic 240 天</p>
      </div>
      <div class="score">积分：100</div>
    </div>
  </div>

  <!-- tabs -->
  <el-tabs v-model="activeTab" class="user-tabs" type="card">
    <el-tab-pane label="活跃信息" name="active">
      <Chart :cards="cards" />
    </el-tab-pane>
    <el-tab-pane label="等级信息" name="level">
      <PointsHonor />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import Chart from '../components/Chart.vue'
import PointsHonor from '../components/PointsHonor.vue'
import { Card } from '@/types'

let activeTab = 'active'

const stats = [
  { label: '累计提问次数', value: 152 },
  { label: '累计使用次数', value: 586 },
  { label: '生成字数', value: '100K'},
  { label: '输入字数', value: '20K' },
]
 const barOption = {
  title: { 
    text: '柱状图与折线图组合',
    left: 'center' 
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['柱状图数据', '折线图数据'],
    top: 30
  },
  backgroundColor: 'transparent', // 透明背景
  grid: {
    left: '3%',
    right: '4%',
    top: '15%',
    bottom: '3%',
    containLabel: true,
    show: false,
    borderWidth: 0
  },
  xAxis: {
    type: 'category',
    data: ['X', 'Y', 'Z'],
    axisLine: {
      lineStyle: {
        color: '#333'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#333'
      }
    }
  },
  yAxis: [
    {
      type: 'value',
      name: '主数据',
      splitLine: { 
        show: false 
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      }
    },
    {
      type: 'value',
      name: '辅助数据',
      splitLine: { 
        show: false 
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#333'
        }
      }
    }
  ],
  series: [
    {
      name: '柱状图数据',
      type: 'bar',
      data: [5, 15, 25],
      itemStyle: {
        color: '#1890ff'
      }
    },
    {
      name: '折线图数据',
      type: 'line',
      data: [8, 18, 28],
      itemStyle: {
        color: '#f5222d'
      },
      yAxisIndex: 1,
      smooth: true
    }
  ]
}
const cards: Card[] = [
  { width: '100%', type: 'content', content: 'Hello from parent' },
  {
    width: '50%',
    type: 'chart',
    option: barOption
  },
  {
    width: '50%',
    type: 'chart',
    option: barOption
  }
]
</script>

<style lang="scss" scoped>
.mt {
  margin-top: 16px;
}

.user-card {
  margin-bottom: 16px;

  .user-info {
    display: flex;
    align-items: center;

    .info {
      margin-left: 16px;
      flex: 1;

      h3 {
        margin: 0;
      }

      p {
        margin: 0;
      }
    }

    .score {
      font-weight: bold;
    }
  }
}

.stat {
  text-align: center;

  .value {
    font-size: 24px;
    font-weight: bold;
  }

  .label {
    color: #666;
  }

  .rate {
    color: #409eff;
  }
}
</style>
