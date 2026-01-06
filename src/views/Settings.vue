<template>
    <!-- 个人信息 -->
    <el-card class="user-card">
      <div class="user-info">
        <el-avatar :size="64" src="https://i.pravatar.cc/100" />
        <div class="info">
          <h3>Xue Yunfan</h3>
          <p>已使用 CoMagic 240 天</p>
        </div>
        <div class="score">积分：100</div>
      </div>
    </el-card>
  
    <!-- 数据统计 -->
    <el-row :gutter="16" class="mt">
      <el-col :span="6" v-for="item in stats" :key="item.label">
        <el-card>
          <div class="stat">
            <div class="value">{{ item.value }}</div>
            <div class="label">{{ item.label }}</div>
            <div class="rate">{{ item.rate }}</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  
    <!-- 图表 -->
    <el-row :gutter="16" class="mt">
      <el-col :span="12">
        <el-card>
          <h4>模型使用分布</h4>
          <Chart :option="modelOption" />
        </el-card>
      </el-col>
  
      <el-col :span="12">
        <el-card>
          <h4>工具使用分布</h4>
          <Chart :option="toolOption" />
        </el-card>
      </el-col>
    </el-row>
  </template>
  
  <script setup lang="ts">
  import Chart from '../components/Chart.vue'
  
  const stats = [
    { label: '累计提问次数', value: 152, rate: '20%' },
    { label: '累计使用次数', value: 586, rate: '40%' },
    { label: '生成字数', value: '100K', rate: '10%' },
    { label: '输入字数', value: '20K', rate: '-' },
  ]
  
  const modelOption = {
    xAxis: { type: 'category', data: ['DeepSeek', 'Claude', 'Gemini', 'Qwen'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [100, 80, 40, 30] }],
  }
  
  const toolOption = {
    xAxis: { type: 'category', data: ['Web', 'VS Code', 'AI IDE', 'CLI'] },
    yAxis: { type: 'value' },
    series: [{ type: 'bar', data: [120, 90, 50, 20] }],
  }
  </script>
  
  <style scoped>
  .mt {
    margin-top: 16px;
  }
  .user-card {
    margin-bottom: 16px;
  }
  .user-info {
    display: flex;
    align-items: center;
  }
  .info {
    margin-left: 16px;
    flex: 1;
  }
  .score {
    font-weight: bold;
  }
  .stat {
    text-align: center;
  }
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
  </style>
  