<template>
  <div class="cards-container">
    <el-card
      v-for="(card, index) in cards"
      :key="index"
      :class="cardClass(card)"
      shadow="hover"
    >
      <BaseChart
        v-if="card.type === 'chart'"
        :option="card.option"
        class="card-chart"
      />
      <div v-else class="card-content">
        {{ card.content }}
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { Card } from '@/types'
import BaseChart from '@/components/BaseChart.vue'

interface Props {
  cards: Card[]
  [key: string]: any
}

const props = defineProps<Props>()
const cards = props.cards

const cardClass = (card: Card) => (card.width === '100%' ? 'card-full' : 'card-half')
</script>

<style lang="scss" scoped>
.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  .card-full {
    grid-column: span 2;
  }

  .card-half {
    grid-column: span 1;
  }

  .card-chart {
    width: 100%;
    height: 300px;
  }

  .card-content {
    min-height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
  }
}
</style>
