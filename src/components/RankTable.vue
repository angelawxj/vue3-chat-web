<!-- components/RankCard.vue -->
<template>
    <div class="rank-card">
      <div class="rank-header">{{ title }}</div>
      
      <div class="rank-table-header">
        <span>排名</span>
        <span>姓名</span>
        <span>部门</span>
        <span class="right">{{ valueLabel }}</span>
      </div>
      
      <div class="rank-body">
        <div
          v-for="item in data"
          :key="item.rank"
          class="rank-row"
        >
          <div class="rank-index">
            <img
              v-if="item.rank <= 3"
              :src="rankIcons[item.rank]"
              class="rank-icon"
            />
            <span v-else>{{ item.rank }}</span>
          </div>
          
          <div class="rank-name">{{ item.name }}</div>
          <div class="rank-dept">{{ item.department }}</div>
          
          <!-- 根据类型渲染不同的内容 -->
          <template v-if="type === 'progress'">
            <div class="rank-progress">
              <el-progress
                :percentage="item.percent"
                :stroke-width="8"
                :show-text="false"
              />
            </div>
          </template>
          <template v-else>
            <div class="rank-value">{{ getValue(item) }}</div>
          </template>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
  interface RankBase {
    rank: number
    name: string
    department: string
    [key: string]: any
  }
  
  interface Props {
    title: string
    data: RankBase[]
    type?: 'default' | 'progress'
    valueKey?: string
    valueLabel?: string
  }
  
  const props = withDefaults(defineProps<Props>(), {
    type: 'default',
    valueKey: 'value',
    valueLabel: '数值'
  })
  
  // 奖牌图标
  const rankIcons: Record<number, string> = {
    1: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
    2: 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png',
    3: 'https://cdn-icons-png.flaticon.com/512/2583/2583434.png'
  }
  
  // 获取显示的值
  const getValue = (item: RankBase) => {
    return item[props.valueKey] || ''
  }
  </script>
  
  <style scoped lang="scss">
  .rank-card {
    flex: 1;
    background: #fff;
    border-radius: 6px;
    padding: 12px;
  }
  
  .rank-header {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-left: 8px;
    border-left: 3px solid #409eff;
    text-align: center;
  }
  
  .rank-table-header {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 80px;
    font-size: 12px;
    color: #999;
    padding: 6px 0;
    border-bottom: 1px solid #ebeef5;
    
    .right {
      text-align: right;
    }
  }
  
  .rank-row {
    display: grid;
    grid-template-columns: 40px 1fr 1fr 80px;
    align-items: center;
    height: 36px;
    font-size: 12px;
    border-bottom: 1px solid #f5f5f5;
    
    &:last-child {
      border-bottom: none;
    }
  }
  
  .rank-index {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .rank-icon {
    width: 20px;
    height: 20px;
  }
  
  .rank-name {
    color: #333;
  }
  
  .rank-dept {
    color: #999;
  }
  
  .rank-value {
    text-align: right;
    font-weight: 500;
    color: #409eff;
  }
  
  .rank-progress {
    padding-right: 6px;
  }
  </style>