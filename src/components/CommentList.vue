<template>
  <div class="bili-comments">
    <div class="comment-list">
      <div v-for="item in list" :key="item.id" class="comment-item" :ref="el => setCommentRef(el, item.id)">
        
        <!-- 主评论区域 -->
        <div class="comment-main">
          <div class="comment-avatar"></div>
          
          <div class="comment-content-wrap">
            <div class="comment-username">{{ item.username }}</div>
            <div class="comment-text">{{ item.content }}</div>
            
            <div class="comment-meta">
              <span class="comment-time">{{ item.time }}</span>
              <span 
                class="comment-action like-action" 
                :class="{ 'liked': item.isLiked }"
                @click="handleLike(item.id, item.isLiked)"
              >
                <el-icon><Pointer /></el-icon>
                <span>{{ item.likes }}</span>
              </span>
              <span class="comment-action reply-action" @click="openReply(item.id, item.username)">
                <el-icon><ChatDotRound /></el-icon>
                <span>回复</span>
              </span>
            </div>
          </div>
        </div>

        <!-- 子回复区域 -->
        <div v-if="item.replyCount > 0" class="sub-reply-area">
          
          <!-- 默认显示第一条回复 - 添加头像 -->
          <div v-if="item.replies && item.replies.length" class="sub-reply-item">
            <div class="sub-reply-avatar"></div>
            <div class="sub-reply-content-wrap">
              <div class="sub-reply-content">
                <span class="sub-reply-name">{{ item.replies[0].username }}</span>
                <template v-if="item.replies[0].replyTo">
                  <span class="sub-reply-at">回复</span>
                  <span class="sub-reply-target">@{{ item.replies[0].replyTo }}</span>
                </template>
                <span class="sub-reply-text">：{{ item.replies[0].content }}</span>
              </div>
              <div class="sub-reply-meta">
                <span>{{ item.replies[0].time }}</span>
                <span 
                  class="sub-reply-like" 
                  :class="{ 'liked': item.replies[0].isLiked }"
                  @click="handleReplyLike(item.id, item.replies[0].id, item.replies[0].isLiked)"
                >
                  <el-icon><Pointer /></el-icon>
                  <span>{{ item.replies[0].likes || 0 }}</span>
                </span>
                <span class="sub-reply-btn" @click="openReply(item.id, item.replies[0].username)">
                  回复
                </span>
              </div>
            </div>
          </div>

          <!-- 查看更多按钮 -->
          <div 
            v-if="item.replyCount > 1 && !item.showReplies" 
            class="view-more-reply"
            @click="loadMoreReplies(item)"
          >
            共{{ item.replyCount }}条回复，点击查看
          </div>

          <!-- 完整回复列表 - 每条回复都添加头像 -->
          <div v-if="item.showReplies" class="full-replies">
            <div 
              v-for="reply in item.fullReplies" 
              :key="reply.id"
              class="sub-reply-item"
            >
              <div class="sub-reply-avatar"></div>
              <div class="sub-reply-content-wrap">
                <div class="sub-reply-content">
                  <span class="sub-reply-name">{{ reply.username }}</span>
                  <template v-if="reply.replyTo">
                    <span class="sub-reply-at">回复</span>
                    <span class="sub-reply-target">@{{ reply.replyTo }}</span>
                  </template>
                  <span class="sub-reply-text">：{{ reply.content }}</span>
                </div>
                <div class="sub-reply-meta">
                  <span>{{ reply.time }}</span>
                  <span 
                    class="sub-reply-like" 
                    :class="{ 'liked': reply.isLiked }"
                    @click="handleReplyLike(item.id, reply.id, reply.isLiked)"
                  >
                    <el-icon><Pointer /></el-icon>
                    <span>{{ reply.likes || 0 }}</span>
                  </span>
                  <span class="sub-reply-btn" @click="openReply(item.id, reply.username)">
                    回复
                  </span>
                </div>
              </div>
            </div>

            <!-- 分页组件 -->
            <div class="reply-pagination" v-if="item.replyCount > pageSize">
              <el-pagination
                small
                layout="prev, pager, next"
                :total="item.replyCount"
                :page-size="pageSize"
                :current-page="item.currentPage || 1"
                @current-change="(page) => handlePageChange(item, page)"
              />
            </div>

            <!-- 收起按钮 -->
            <div class="collapse-replies" @click="collapseReplies(item)">
              收起
            </div>
          </div>
        </div>

        <!-- 回复输入框 -->
        <div v-if="replyId === item.id" class="reply-input-area" :ref="`replyInput-${item.id}`">
          <div class="reply-avatar small"></div>
          <div class="reply-input-wrap">
            <el-input
              v-model="replyText"
              :placeholder="replyPlaceholder"
              type="textarea"
              :rows="2"
              resize="none"
              ref="inputRef"
            />
            <div class="reply-actions">
              <el-button size="small" @click="cancelReply">取消</el-button>
              <el-button size="small" type="primary" @click="submitReply(item.id)" :loading="submitting">
                发布
              </el-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 评论列表底部分页 -->
    <div class="comment-pagination" v-if="totalComments > 10">
      <el-pagination
        layout="prev, pager, next"
        :total="totalComments"
        :page-size="10"
        :current-page="currentPage"
        @current-change="handleCommentPageChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { Pointer, ChatDotRound } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getCommentList, getReplyList, submitReply, likeComment, likeReply } from '@/api/comment'
import type { ExtendedComment, Reply } from '@/api/types'
import './CommentList.scss'

const list = ref<ExtendedComment[]>([])
const replyId = ref<number | null>(null)
const replyText = ref('')
const replyPlaceholder = ref('发一条友善的评论')
const submitting = ref(false)
const pageSize = 10
const totalComments = ref(0)
const currentPage = ref(1)
const inputRef = ref<any>(null)

const commentRefs = ref<Map<number, HTMLElement>>(new Map())

const setCommentRef = (el: any, id: number) => {
  if (el) {
    commentRefs.value.set(id, el)
  }
}

const scrollToReplyInput = async (commentId: number) => {
  await nextTick()
  
  const commentElement = commentRefs.value.get(commentId)
  if (commentElement) {
    const replyInputElement = commentElement.querySelector('.reply-input-area')
    if (replyInputElement) {
      replyInputElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center',
        inline: 'nearest'
      })
      
      replyInputElement.classList.add('highlight')
      setTimeout(() => {
        replyInputElement.classList.remove('highlight')
      }, 1000)
    }
  }
  
  if (inputRef.value) {
    const textarea = inputRef.value.$el?.querySelector('textarea')
    if (textarea) {
      textarea.focus()
    }
  }
}

const loadComments = async (page: number = 1) => {
  try {
    const res = await getCommentList(page, 10)
    if (res.code === 0) {
      list.value = res.data.list.map(comment => ({
        ...comment,
        showReplies: false,
        fullReplies: [],
        currentPage: 1,
        totalReplies: comment.replyCount
      }))
      totalComments.value = res.data.total
      currentPage.value = res.data.page
    }
  } catch (error) {
    ElMessage.error('加载评论失败')
  }
}

const loadMoreReplies = async (item: ExtendedComment) => {
  try {
    const res = await getReplyList(item.id, 1, pageSize)
    if (res.code === 0) {
      item.fullReplies = res.data.list
      item.totalReplies = res.data.total
      item.showReplies = true
      item.currentPage = 1
    }
  } catch (error) {
    ElMessage.error('加载回复失败')
  }
}

const handlePageChange = async (item: ExtendedComment, page: number) => {
  try {
    const res = await getReplyList(item.id, page, pageSize)
    if (res.code === 0) {
      item.fullReplies = res.data.list
      item.currentPage = page
    }
  } catch (error) {
    ElMessage.error('加载回复失败')
  }
}

const collapseReplies = (item: ExtendedComment) => {
  item.showReplies = false
  item.fullReplies = []
  item.currentPage = 1
}

const openReply = async (id: number, username?: string) => {
  replyId.value = id
  replyPlaceholder.value = username ? `回复 @${username}` : '发一条友善的评论'
  replyText.value = ''
  
  await scrollToReplyInput(id)
}

const cancelReply = () => {
  replyId.value = null
  replyText.value = ''
  replyPlaceholder.value = '发一条友善的评论'
}

const submitReply = async (commentId: number) => {
  if (!replyText.value.trim()) {
    ElMessage.warning('请输入回复内容')
    return
  }
  
  submitting.value = true
  try {
    const match = replyPlaceholder.value.match(/@(\S+)/)
    const replyTo = match ? match[1] : undefined
    
    const res = await submitReply(commentId, replyText.value, replyTo)
    if (res.code === 0) {
      ElMessage.success('回复成功')
      replyText.value = ''
      replyId.value = null
      replyPlaceholder.value = '发一条友善的评论'
      
      const currentItem = list.value.find(item => item.id === commentId)
      if (currentItem && currentItem.showReplies) {
        await loadMoreReplies(currentItem)
      }
    }
  } catch (error) {
    ElMessage.error('回复失败')
  } finally {
    submitting.value = false
  }
}

const handleLike = async (commentId: number, isLiked: boolean) => {
  try {
    const res = await likeComment(commentId, isLiked)
    if (res.code === 0) {
      const comment = list.value.find(item => item.id === commentId)
      if (comment) {
        comment.isLiked = !isLiked
        comment.likes += res.data.likesChange
      }
      ElMessage.success(res.message)
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleReplyLike = async (commentId: number, replyId: number, isLiked: boolean) => {
  try {
    const res = await likeReply(replyId, isLiked)
    if (res.code === 0) {
      const comment = list.value.find(item => item.id === commentId)
      if (comment) {
        if (comment.replies[0] && comment.replies[0].id === replyId) {
          comment.replies[0].isLiked = !isLiked
          comment.replies[0].likes += res.data.likesChange
        }
        
        if (comment.fullReplies) {
          const reply = comment.fullReplies.find(r => r.id === replyId)
          if (reply) {
            reply.isLiked = !isLiked
            reply.likes += res.data.likesChange
          }
        }
      }
      ElMessage.success(res.message)
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleCommentPageChange = async (page: number) => {
  await loadComments(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadComments()
})
</script>