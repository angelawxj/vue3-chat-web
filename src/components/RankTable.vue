<template>
    <div class="rank-card">
      <div class="rank-header">{{ title }}</div>
  
      <el-table
        :data="data"
        show-overflow-tooltip
        style="width: 100%"
        :header-cell-class-name="headerCellClass"
        :cell-class-name="cellClass"
      >
        <el-table-column
          v-for="col in columns"
          :key="col.key"
          :prop="col.key"
          :label="col.label"
          :width="col.width || ''"
        >
          <template v-slot="scope">
            <!-- 排名列奖牌 -->
            <template v-if="col.key === 'rank'">
              <img
                v-if="scope.row.rank <= 3"
                :src="rankIcons[scope.row.rank]"
                class="rank-icon"
              />
              <span v-else>{{ scope.row.rank }}</span>
            </template>
  
            <!-- 百分比列 -->
            <template v-else-if="col.key === 'percent' && type === 'progress'">
              {{ formatPercent(scope.row) }}
            </template>
  
            <!-- 默认显示 -->
            <template v-else>
              {{ scope.row[col.key] }}
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  
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
  
  // 给排名列增加宽度
  const columns = props.columns
  
  const rankIcons: Record<number, string> = {
    1: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
    2: 'https://cdn-icons-png.flaticon.com/512/2583/2583319.png',
    3: 'https://cdn-icons-png.flaticon.com/512/2583/2583434.png'
  }
  
  const formatPercent = (item: RankBase) => `${item.percent || 0}%`
  
  // 表头样式
  const headerCellClass = ({ column }: any) => {
    if (column.property === 'rank') return 'rank-header-cell'
    return ''
  }
  
  // 单元格样式
  const cellClass = ({ column }: any) => {
    if (column.property === 'rank') return 'rank-cell'
    return 'ellipsis-cell'
  }
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
      text-align: center;
    }
  
    /* 全局覆盖表格内部样式 */
    ::v-deep(.el-table) {
      border: 1px solid #ebeef5;
      border-radius: 4px;
  
      .el-table__header-wrapper {
        background: #f5f7fa;
        font-weight: 600;
        color: #666;
      }
  
      .el-table__row {
        height: 46px;
        font-size: 12px;
        transition: background 0.3s;
  
        &:hover {
          background-color: #f0f4ff;
        }
      }
  
      /* 排名列表头 */
      .rank-header-cell {
        text-align: center !important;
      }
  
      /* 排名列单元格 */
      .rank-cell {
        text-align: center !important;
  
        .rank-icon {
          width: 30px !important;
          height: 30px !important;
          display: inline-block;
          vertical-align: middle;
        }
      }
  
      /* 其他列文本超出省略 */
      .ellipsis-cell {
        white-space: nowrap !important;
        overflow: hidden !important;
        text-overflow: ellipsis !important;
      }
    }
  }
  </style>
  