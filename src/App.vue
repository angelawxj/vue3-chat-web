<template>
  <el-container class="layout">
    <!-- 左侧可折叠 Sidebar -->
    <el-aside :width="collapsed ? '64px' : '280px'" class="aside">
      <Sidebar :collapsed="collapsed" />
    </el-aside>

    <!-- 右侧内容 -->
    <el-container>
      <!-- Header -->
      <el-header class="right-header">
        <el-button
          icon="el-icon-s-fold"
          @click="toggleCollapse"
          circle
          size="small"
        />
        <div class="header-right">
          <el-button size="small">帮助</el-button>
          <el-avatar size="small" />
        </div>
      </el-header>

      <!-- Main 内容根据路由切换 -->
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'

const collapsed = ref(false)

const toggleCollapse = () => {
  collapsed.value = !collapsed.value
}
</script>

<style scoped>
.layout {
  height: 100vh;
}

.aside {
  background: #fff;
  border-right: 1px solid #eee;
  transition: width 0.3s;
}

.right-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #eee;
}

.main {
  padding: 16px;
}
::v-deep .el-card{
  box-shadow:none;
}
</style>
