<template>
  <el-menu
    :default-active="active"
    class="menu"
    :collapse="collapsed"
    background-color="#fff"
    text-color="#333"
    active-text-color="#409eff"
    @select="handleSelect"
  >
    <el-menu-item index="/profile" icon="el-icon-user">个人中心</el-menu-item>
    <el-menu-item index="/records" icon="el-icon-document">使用记录</el-menu-item>
    <el-menu-item index="/models" icon="el-icon-s-operation">模型管理</el-menu-item>
    <el-menu-item index="/settings" icon="el-icon-setting">设置</el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { defineProps, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps<{ collapsed: boolean }>()

const router = useRouter()
const route = useRoute()

const active = ref(route.path) // 当前高亮菜单

// 路由变化时更新高亮
watch(() => route.path, (newPath) => {
  active.value = newPath
})

// 点击菜单跳转路由
const handleSelect = (index: string) => {
  if (index !== route.path) {
    router.push(index)
  }
}
</script>

<style scoped>
.menu {
  height: 100%;
  border-right: none;
}
</style>
