<template>
    <div class="honor-container" v-loading="loading">
      <!-- 积分排行 -->
      <RankTable
        title="积分排行"
        :data="pointsRanking"
        value-key="score"
        value-label="积分"
      />
      
      <!-- 使用天数排行 -->
      <RankTable
        title="使用天数排行"
        :data="usageRanking"
        value-key="days"
        value-label="天数"
      />
      
      <!-- 等级比例 -->
      <RankTable
        title="等级比例"
        :data="levelRanking"
        type="progress"
        value-label="比例"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import RankTable from './RankTable.vue'
  
  /* ---------------- 类型定义 ---------------- */
  interface RankBase {
    rank: number
    name: string
    department: string
  }
  
  interface PointsRank extends RankBase {
    score: number
  }
  
  interface UsageRank extends RankBase {
    days: number
  }
  
  interface LevelRank extends RankBase {
    percent: number
  }
  
  /* ---------------- loading ---------------- */
  const loading = ref(true)
  
  /* ---------------- 数据 ---------------- */
  const pointsRanking = ref<PointsRank[]>([])
  const usageRanking = ref<UsageRank[]>([])
  const levelRanking = ref<LevelRank[]>([])
  
  /* ---------------- 模拟接口 ---------------- */
  function fetchHonorRanking(): Promise<PointsRank[]> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          { rank: 1, name: '王维', department: '平台技术部', score: 500 },
          { rank: 2, name: '李白', department: '业务中台', score: 460 },
          { rank: 3, name: '白居易', department: '数据平台', score: 430 },
          { rank: 4, name: '杜甫', department: '平台技术部', score: 410 },
          { rank: 5, name: '苏轼', department: '业务中台', score: 390 },
          { rank: 6, name: '辛弃疾', department: '数据平台', score: 360 },
          { rank: 7, name: '李清照', department: '平台技术部', score: 340 },
          { rank: 8, name: '陆游', department: '业务中台', score: 320 },
          { rank: 9, name: 'Xue Yunfan', department: 'PaaS 平台部', score: 100 },
          { rank: 10, name: '张若虚', department: '第三方付', score: 98 }
        ])
      }, 1200)
    })
  }
  
  /* ---------------- 初始化 ---------------- */
  onMounted(async () => {
    loading.value = true
  
    const list = await fetchHonorRanking()
    pointsRanking.value = list
  
    usageRanking.value = list.map(item => ({
      rank: item.rank,
      name: item.name,
      department: item.department,
      days: Math.floor(item.score / 2)
    }))
  
    levelRanking.value = list.map(item => ({
      rank: item.rank,
      name: item.name,
      department: item.department,
      percent: Math.round((item.score / 500) * 100)
    }))
  
    loading.value = false
  })
  </script>
  
  <style scoped lang="scss">
  .honor-container {
    display: flex;
    gap: 16px;
  }
  </style>