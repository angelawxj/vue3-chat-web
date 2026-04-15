// api/types.ts

// 回复数据类型
export interface Reply {
    id: number
    username: string
    avatar?: string
    replyTo?: string  // 回复的对象用户名
    content: string
    time: string
    likes: number
    isLiked: boolean  // 添加点赞状态
  }
  
  // 评论数据类型
  export interface Comment {
    id: number
    username: string
    avatar?: string
    content: string
    time: string
    likes: number
    isLiked: boolean  // 添加点赞状态
    replyCount: number
    replies: Reply[]  // 默认显示的第一条回复
  }
  
  // 扩展的评论类型（用于前端展示）
  export interface ExtendedComment extends Comment {
    showReplies: boolean
    fullReplies: Reply[]
    currentPage: number
    totalReplies: number
  }
  
  // 评论列表响应
  export interface CommentListResponse {
    code: number
    message: string
    data: {
      list: Comment[]
      total: number
      page: number
      pageSize: number
    }
  }
  
  // 回复列表响应
  export interface ReplyListResponse {
    code: number
    message: string
    data: {
      list: Reply[]
      total: number
      page: number
      pageSize: number
      commentId: number
    }
  }