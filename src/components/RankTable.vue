<template>
  <div class="rank-card">
    <div class="rank-header">{{ title }}</div>

    <div class="rank-table">
      <!-- 表头 -->
      <div class="rank-row header">
        <div
          v-for="col in visibleColumns"
          :key="col.key"
          :class="['col', col.class || '', col.core ? 'core' : '']"
          :style="{ width: col.width || 'auto' }"
        >
          {{ col.label }}
        </div>
      </div>

      <!-- 表体 -->
      <div
        v-for="item in data"
        :key="item.rank"
        class="rank-row"
      >
        <div
          v-for="col in visibleColumns"
          :key="col.key"
          :class="['col', col.class || '', col.core ? 'core' : '']"
          :style="{ width: col.width || 'auto' }"
        >
          <!-- 特殊处理：排名前三显示奖牌 -->
          <template v-if="col.key === 'rank'">
            <img
              v-if="item.rank <= 3"
              :src="rankIcons[item.rank]"
              class="rank-icon"
            />
            <span v-else>{{ item.rank }}</span>
          </template>

          <!-- 特殊处理：百分比显示 -->
          <template v-else-if="col.key === 'percent' && type === 'progress'">
            {{ formatPercent(item) }}
          </template>

          <!-- 默认显示对应字段值 -->
          <template v-else>
            {{ item[col.key] }}
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

interface RankBase {
  rank: number
  name: string
  department: string
  percent?: number
  [key: string]: any
}

interface Column {
  label: string
  key: string
  width?: string
  class?: string
  core?: boolean
}

interface Props {
  title: string
  data: RankBase[]
  type?: 'default' | 'progress'
  columns: Column[]
}

const props = defineProps<Props>()

// 奖牌图标
const rankIcons: Record<number, string> = {
  1: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
  2: 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png',
  3: 'https://cdn-icons-png.flaticon.com/512/2583/2583434.png'
}

// 格式化百分比显示
const formatPercent = (item: RankBase) => `${item.percent || 0}%`

/**
 * 自适应显示列
 */
const visibleColumns = ref<Column[]>(props.columns)

const updateColumns = () => {
  const containerWidth = document.querySelector('.rank-card')?.clientWidth || 0
  let availableWidth = containerWidth - 60 // 排名列固定宽60px
  const newVisible: Column[] = []

  for (const col of props.columns) {
    if (col.key === 'rank' || col.core) {
      newVisible.push(col)
      continue
    }

    const colWidth = col.width ? parseInt(col.width) : 80
    if (availableWidth - colWidth >= 0) {
      newVisible.push(col)
      availableWidth -= colWidth
    } else {
      break
    }
  }

  visibleColumns.value = newVisible
}

onMounted(() => {
  updateColumns()
  window.addEventListener('resize', updateColumns)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateColumns)
})
</script>

<style scoped lang="scss">
.rank-card {
  flex: 1;
  background: #fff;
  border-radius: 6px;
  padding: 12px;

  .rank-header {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 8px;
    padding-left: 8px;
    text-align: center;
  }

  .rank-table {
    border: 1px solid #ebeef5;
    border-radius: 4px;
    overflow: hidden;

    .rank-row {
      display: grid;
      grid-template-columns: 60px repeat(auto-fit, minmax(60px, 1fr));
      align-items: center;
      height: 46px;
      font-size: 12px;
      border-bottom: 1px solid #f5f5f5;
      transition: background 0.3s;

      &.header {
        background: #f5f7fa;
        font-weight: 600;
        color: #666;
      }

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: #f0f4ff;
      }

      .col {
        padding: 0 8px;
        white-space: nowrap;      /* 不换行 */
        overflow: hidden;         /* 超出隐藏 */
        text-overflow: ellipsis;  /* 显示省略号 */

        &.right {
          text-align: right;
        }

        /* 居中排名列 */
        &:first-child {
          text-align: center;
        }

        .rank-icon {
          width: 30px;
          height: 30px;
        }
      }
    }
  }
}
</style>
