// api/comment.ts
import type { Comment, Reply, CommentListResponse, ReplyListResponse } from '../types/comment'

// 模拟主评论数据
const mockComments: Comment[] = [
  {
    id: 1,
    username: '大齐的幸福生活',
    avatar: '',
    content: '来来，冰箱里可乐自己拿',
    time: '2026-04-14 19:56',
    likes: 2,
    isLiked: false,  // 添加点赞状态
    replyCount: 15,
    replies: []
  },
  {
    id: 2,
    username: '大齐的幸福生活',
    avatar: '',
    content: '请了',
    time: '2026-04-14 19:56',
    likes: 1,
    isLiked: false,
    replyCount: 8,
    replies: []
  },
  {
    id: 3,
    username: 'KB菌',
    avatar: '',
    content: '梦中情屋，以后我要是买房子了也想像你这么装，这个灯，这个地毯，真的太有感觉了',
    time: '2026-04-14 21:36',
    likes: 1,
    isLiked: false,
    replyCount: 25,
    replies: []
  },
  {
    id: 4,
    username: '白井黑子',
    avatar: '',
    content: '大爷这一套帅啊👍',
    time: '2026-04-14 22:26',
    likes: 1,
    isLiked: false,
    replyCount: 3,
    replies: []
  },
  {
    id: 5,
    username: '永远的单推',
    avatar: '',
    content: '这房子也太舒服了吧，羡慕了',
    time: '2026-04-14 20:15',
    likes: 5,
    isLiked: false,
    replyCount: 12,
    replies: []
  },
  {
    id: 6,
    username: '林姥姥倒拔垂杨柳',
    avatar: '',
    content: '装修花了多少钱啊？',
    time: '2026-04-14 20:32',
    likes: 3,
    isLiked: false,
    replyCount: 6,
    replies: []
  },
  {
    id: 7,
    username: '林姥姥倒拔垂杨柳',
    avatar: '',
    content: '装修花了多少钱啊？',
    time: '2026-04-14 20:32',
    likes: 3,
    isLiked: false,
    replyCount: 6,
    replies: []
},
{
  id: 8,
  username: '林姥姥倒拔垂杨柳',
  avatar: '',
  content: '装修花了多少钱啊？',
  time: '2026-04-14 20:32',
  likes: 3,
  isLiked: false,
  replyCount: 6,
  replies: []},
  {
    id: 9,
    username: '林姥姥倒拔垂杨柳',
    avatar: '',
    content: '装修花了多少钱啊？',
    time: '2026-04-14 20:32',
    likes: 3,
    isLiked: false,
    replyCount: 6,
    replies: []},
    {
      id: 10,
      username: '林姥姥倒拔垂杨柳',
      avatar: '',
      content: '装修花了多少钱啊？',
      time: '2026-04-14 20:32',
      likes: 3,
      isLiked: false,
      replyCount: 6,
      replies: []},
      {
        id: 11,
        username: '林姥姥倒拔垂杨柳',
        avatar: '',
        content: '装修花了多少钱啊？',
        time: '2026-04-14 20:32',
        likes: 3,
        isLiked: false,
        replyCount: 6,
        replies: []},
        {
          id: 12,
          username: '林姥姥倒拔垂杨柳',
          avatar: '',
          content: '装修花了多少钱啊？',
          time: '2026-04-14 20:32',
          likes: 3,
          isLiked: false,
          replyCount: 6,
          replies: []},
]

// 模拟回复数据生成器
const generateReplies = (commentId: number, page: number = 1, pageSize: number = 10): Reply[] => {
  const allReplies: Reply[] = []
  
  // 根据评论ID确定回复总数和主要用户名
  let totalReplies = 0
  let mainUsername = ''
  
  switch(commentId) {
    case 1:
      totalReplies = 15
      mainUsername = '大齐的幸福生活'
      break
    case 2:
      totalReplies = 8
      mainUsername = '大齐的幸福生活'
      break
    case 3:
      totalReplies = 25
      mainUsername = 'KB菌'
      break
    case 4:
      totalReplies = 3
      mainUsername = '白井黑子'
      break
    case 5:
      totalReplies = 12
      mainUsername = '永远的单推'
      break
    case 6:
      totalReplies = 6
      mainUsername = '林姥姥倒拔垂杨柳'
      break
    default:
      totalReplies = 10
      mainUsername = '用户'
  }
  
  const usernames = [
    '热心网友', '路人甲', '小明同学', '小李飞刀', '江南皮革厂',
    '追风少年', '月光下的猫', '深海鱼', '咖啡不加糖', '行走的代码',
    '梦想家', '技术宅', '文艺青年', '健身达人', '美食家'
  ]
  
  const replyToNames = [
    mainUsername, 
    ...usernames.slice(0, 5),
    '热心网友',
    '路人甲'
  ]
  
  const contents = [
    '说的太对了！',
    '我也这么觉得 👍',
    '哈哈哈笑死',
    '学到了学到了',
    '感谢分享～',
    '这个问题我也想问',
    '支持一下！',
    '太真实了',
    '+1',
    '确实如此',
    '有道理',
    '不懂就问',
    '厉害了',
    '收藏了',
    '赞一个'
  ]
  
  // 生成所有回复
  for (let i = 1; i <= totalReplies; i++) {
    const username = usernames[i % usernames.length]
    const replyTo = i === 1 ? mainUsername : replyToNames[i % replyToNames.length]
    const content = i <= contents.length 
      ? contents[i - 1] 
      : `这是第${i}条回复内容，用于测试分页效果。${i % 2 === 0 ? '支持博主！' : '学到了很多～'}`
    
    allReplies.push({
      id: commentId * 1000 + i,
      username: username,
      replyTo: replyTo,
      content: content,
      time: `2026-04-${10 + (i % 20)} ${8 + (i % 14)}:${i % 60}`,
      likes: Math.floor(Math.random() * 20),
      isLiked: false  // 添加回复点赞状态
    })
  }
  
  // 分页返回
  const start = (page - 1) * pageSize
  const end = start + pageSize
  return allReplies.slice(start, end)
}

// 模拟获取评论列表（支持分页）
export const getCommentList = (page: number = 1, pageSize: number = 10): Promise<CommentListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const start = (page - 1) * pageSize
      const end = start + pageSize
      const list = mockComments.slice(start, end)
      
      // 为每条评论获取第一条回复（用于默认显示）
      const listWithFirstReply = list.map(comment => {
        if (comment.replyCount > 0) {
          const firstReply = generateReplies(comment.id, 1, 1)[0]
          return {
            ...comment,
            replies: firstReply ? [firstReply] : []
          }
        }
        return {
          ...comment,
          replies: []
        }
      })
      
      resolve({
        code: 0,
        message: 'success',
        data: {
          list: listWithFirstReply,
          total: mockComments.length,
          page,
          pageSize
        }
      })
    }, 300)
  })
}

// 模拟获取回复列表（支持分页）
export const getReplyList = (
  commentId: number, 
  page: number = 1, 
  pageSize: number = 10
): Promise<ReplyListResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const list = generateReplies(commentId, page, pageSize)
      
      // 获取总回复数
      let total = 0
      switch(commentId) {
        case 1: total = 15; break
        case 2: total = 8; break
        case 3: total = 25; break
        case 4: total = 3; break
        case 5: total = 12; break
        case 6: total = 6; break
        default: total = 10
      }
      
      resolve({
        code: 0,
        message: 'success',
        data: {
          list,
          total,
          page,
          pageSize,
          commentId
        }
      })
    }, 300)
  })
}

// 点赞/取消点赞评论
export const likeComment = (commentId: number, isLiked: boolean): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: isLiked ? '取消点赞' : '点赞成功',
        data: {
          isLiked: !isLiked,
          likesChange: isLiked ? -1 : 1
        }
      })
    }, 200)
  })
}

// 点赞/取消点赞回复
export const likeReply = (replyId: number, isLiked: boolean): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: isLiked ? '取消点赞' : '点赞成功',
        data: {
          isLiked: !isLiked,
          likesChange: isLiked ? -1 : 1
        }
      })
    }, 200)
  })
}

// 提交回复（模拟）
export const submitReply = (
  commentId: number, 
  content: string, 
  replyTo?: string
): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        code: 0,
        message: '回复成功',
        data: {
          id: Date.now(),
          username: '当前用户',
          replyTo: replyTo || null,
          content,
          time: new Date().toLocaleString(),
          likes: 0,
          isLiked: false
        }
      })
    }, 500)
  })
}