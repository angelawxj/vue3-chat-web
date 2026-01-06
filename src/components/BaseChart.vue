<template>
    <div
      ref="chartRef"
      class="base-chart"
      :style="{ width, height }"
    ></div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch, onMounted, onBeforeUnmount, defineExpose } from 'vue'
  import * as echarts from 'echarts'
  
  /**
   * Props 类型
   */
  interface Props {
    option: echarts.EChartsOption
    width?: string
    height?: string
    theme?: string | object
    loading?: boolean
  }
  
  const props = withDefaults(defineProps<Props>(), {
    width: '100%',
    height: '100%',
    loading: false
  })
  
  const chartRef = ref<HTMLDivElement | null>(null)
  let chartInstance: echarts.ECharts | null = null
  
  /**
   * 初始化图表
   */
  const initChart = () => {
    if (!chartRef.value) return
    chartInstance = echarts.init(chartRef.value, props.theme)
    chartInstance.setOption(props.option)
  }
  
  /**
   * 监听 option 变化
   */
  watch(
    () => props.option,
    (newOption) => {
      chartInstance?.setOption(newOption, true)
    },
    { deep: true }
  )
  
  /**
   * loading
   */
  watch(
    () => props.loading,
    (val) => {
      if (!chartInstance) return
      val ? chartInstance.showLoading() : chartInstance.hideLoading()
    }
  )
  
  /**
   * resize
   */
  const resize = () => {
    chartInstance?.resize()
  }
  
  onMounted(() => {
    initChart()
    window.addEventListener('resize', resize)
  })
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resize)
    chartInstance?.dispose()
    chartInstance = null
  })
  
  /**
   * 对外暴露方法
   */
  defineExpose({
    getInstance: () => chartInstance,
    resize,
    setOption: (option: echarts.EChartsOption) => {
      chartInstance?.setOption(option)
    }
  })
  </script>
  
  <style scoped>
  .base-chart {
    min-height: 200px;
  }
  </style>
  