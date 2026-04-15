<template>
  <div class="app">
    <div class="comment-wrapper">
      <!-- 评论框区域 -->
      <div class="comment-input-area">
        <div class="comment-input-avatar"></div>
        <div class="comment-input-container">
          <el-input
            v-model="newComment"
            type="textarea"
            :rows="3"
            placeholder="发一条友善的评论"
            resize="none"
            class="comment-textarea"
          />
          <div class="comment-input-actions">
            <div class="input-tools">
              <el-icon class="tool-icon"><Picture /></el-icon>
              <el-icon class="tool-icon"><Link /></el-icon>
              
            </div>
            <el-button 
              type="primary" 
              :disabled="!newComment.trim()"
              :loading="submitting"
              @click="submitComment"
            >
              发布评论
            </el-button>
          </div>
        </div>
      </div>

      <!-- 评论列表 -->
      <CommentList ref="commentListRef" @update-count="handleUpdateCount" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { Picture, Link } from '@element-plus/icons-vue'
import CommentList from '@/components/CommentList.vue'


const newComment = ref('')
const submitting = ref(false)
const totalComments = ref(0)
const commentListRef = ref()

// 提交评论
const submitComment = async () => {
  if (!newComment.value.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }

  submitting.value = true

}

// 更新评论总数
const handleUpdateCount = (count: number) => {
  totalComments.value = count
}
</script>

<style scoped>
.app {
  padding: 40px;
  background: #f4f5f7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.comment-wrapper {
  width: 760px;
  margin: 0 auto;
}

/* 评论输入区域 */
.comment-input-area {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.comment-input-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #c0ccda;
  flex-shrink: 0;
}

.comment-input-container {
  flex: 1;
}

.comment-textarea {
  :deep(.el-textarea__inner) {
    border-radius: 8px;
    border-color: #e5e9ef;
    font-size: 14px;
    padding: 10px 12px;
    
    &:focus {
      border-color: #00a1d6;
      box-shadow: 0 0 0 2px rgba(0, 161, 214, 0.1);
    }
  }
}

.comment-input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
}

.input-tools {
  display: flex;
  gap: 16px;
}

.tool-icon {
  font-size: 20px;
  color: #99a2aa;
  cursor: pointer;
  transition: color 0.2s;
  
  &:hover {
    color: #00a1d6;
  }
}

/* 评论区标题 */
.comment-header {
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e5e9ef;
}

.comment-title {
  font-size: 18px;
  font-weight: 600;
  color: #222;
}

.comment-count {
  font-size: 14px;
  color: #99a2aa;
}
</style>