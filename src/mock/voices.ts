import { reactive } from 'vue'

export type VoiceType = '问题' | '建议' | '吐槽'

export type VoiceTab = '最新' | '热门' | '待回应' | '已回复' | '吐槽榜'

export type VoiceFilterTab = '全部' | VoiceType

export type VoiceLikePreview = {
 name: string
 avatar: string
}

export type VoiceImage = {
 src: string
 alt: string
}

export type VoiceLinkCard = {
 title: string
 description: string
 domain: string
 url: string
}

export type VoicePost = {
 id: string
 type: VoiceType
 headline: string
 body: string
 author: string
 authorAvatar: string
 team: string
 role?: string
 createdAt: string
 displayTime: string
 topic?: string
 club?: string
 status?: string
 likeCount: number
 commentCount: number
 shareCount: number
 images?: VoiceImage[]
 linkCard?: VoiceLinkCard
 likedBy?: VoiceLikePreview[]
 following?: boolean
 joined?: boolean
 recommended?: boolean
 visibilityStatus: 'visible' | 'hidden' | 'archived'
 featured: boolean
 handledAt?: string
 handledNote?: string
}

const svgDataUri = (svg: string) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`

const createAvatar = (label: string, primary: string, secondary: string) => {
 const shortLabel = label.slice(0, 2)

 return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <defs>
        <linearGradient id="avatarGradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="96" height="96" rx="48" fill="url(#avatarGradient)" />
      <text x="48" y="56" fill="#ffffff" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="30" font-weight="700" text-anchor="middle">${shortLabel}</text>
    </svg>
  `)
}

const createPreview = (title: string, caption: string, primary: string, secondary: string) => {
 return svgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220">
      <defs>
        <linearGradient id="previewGradient" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${primary}" />
          <stop offset="100%" stop-color="${secondary}" />
        </linearGradient>
      </defs>
      <rect width="320" height="220" rx="22" fill="#f8fbff" />
      <circle cx="262" cy="52" r="58" fill="url(#previewGradient)" opacity="0.18" />
      <rect x="24" y="28" width="108" height="22" rx="11" fill="url(#previewGradient)" opacity="0.22" />
      <rect x="24" y="70" width="272" height="82" rx="18" fill="#ffffff" />
      <text x="40" y="108" fill="#163153" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="20" font-weight="700">${title}</text>
      <text x="40" y="140" fill="#6b7f99" font-family="PingFang SC, Microsoft YaHei, sans-serif" font-size="14">${caption}</text>
      <rect x="24" y="170" width="170" height="18" rx="9" fill="#dbeafe" />
    </svg>
  `)
}

const seedVoiceChannelRecords: VoiceTab[] = ['最新', '热门', '待回应', '已回复', '吐槽榜']
const seedVoiceTopicRecords = [
  { label: '#挑战每日一条心声#', heat: '8.2k' },
  { label: '#AI 协作规范#', heat: '5.4k' },
  { label: '#产品反馈优先级#', heat: '4.1k' },
  { label: '#知识沉淀闭环#', heat: '3.8k' },
  { label: '#新人上手路径#', heat: '2.7k' },
  { label: '#Token治理#', heat: '2.4k' },
  { label: '#FAQ维护#', heat: '2.1k' },
  { label: '#审批流程#', heat: '1.8k' },
]

export const voiceChannelRecords = reactive(seedVoiceChannelRecords.map((label) => ({ label })))
export const voiceTopicRecords = reactive(seedVoiceTopicRecords.map((item) => ({ ...item })))
export const voiceTabs = reactive<VoiceTab[]>([])

export const voiceFilterTabs: VoiceFilterTab[] = ['全部', '问题', '建议', '吐槽']

export const voiceClubLinks = ['AI 编码交流', '销售运营圈', '客户成功圈', '门店运营圈', '更多']

export const voiceComposerTopic = '#协作反馈#'

const seedVoicePosts: Omit<VoicePost, 'visibilityStatus' | 'featured' | 'handledAt' | 'handledNote'>[] = [
  {
 id: 'post-export-source',
 type: '问题',
 headline: '希望导出会话记录时能直接带上客户来源字段',
 body: '现在导出的表格只有基础会话信息，我们复盘投放效果时还得再去 CRM 手动补来源，链路特别碎。如果能在导出时一起带上来源字段，日常复盘会方便很多。',
 author: '小语',
 authorAvatar: createAvatar('小语', '#2563eb', '#38bdf8'),
 team: '市场团队',
 role: '增长运营',
 createdAt: '2026-04-05T21:10:00',
 displayTime: '35 分钟前',
 topic: '#字段联动#',
 club: '销售运营圈',
 likeCount: 26,
 commentCount: 12,
 shareCount: 5,
 images: [
      {
 src: createPreview('字段导出', '补齐客户来源与渠道字段', '#bfdbfe', '#60a5fa'),
 alt: '客户来源字段导出预览',
      },
      {
 src: createPreview('CRM 对齐', '复盘报表自动关联', '#dbeafe', '#818cf8'),
 alt: 'CRM 复盘对齐预览',
      },
      {
 src: createPreview('线索回看', '减少二次人工整理', '#bfdbfe', '#3b82f6'),
 alt: '线索回看预览',
      },
    ],
 likedBy: [
      { name: '刘晨曦', avatar: createAvatar('刘晨曦', '#2563eb', '#60a5fa') },
      { name: 'Mina', avatar: createAvatar('Mina', '#f59e0b', '#fb7185') },
      { name: '周行简', avatar: createAvatar('周行简', '#0ea5e9', '#3b82f6') },
    ],
 following: true,
 joined: true,
 recommended: true,
  },
  {
 id: 'post-store-notify',
 type: '建议',
 headline: '移动端消息提醒能不能支持按门店单独开关？',
 body: '我们集团账号下面有很多门店，部分门店值班时间不同。如果消息提醒支持按门店细分开关，就不用所有人都被夜间消息打扰了。',
 author: 'Mina',
 authorAvatar: createAvatar('Mina', '#fb7185', '#f59e0b'),
 team: '门店运营',
 role: '区域运营',
 createdAt: '2026-04-05T20:38:00',
 displayTime: '1 小时前',
 topic: '#消息治理#',
 club: '门店运营圈',
 status: '官方已回复',
 likeCount: 18,
 commentCount: 8,
 shareCount: 3,
 images: [
      {
 src: createPreview('门店提醒', '按门店与时段设置提醒', '#fde68a', '#fb7185'),
 alt: '门店消息提醒原型',
      },
    ],
 likedBy: [
      { name: '林知夏', avatar: createAvatar('林知夏', '#f97316', '#f59e0b') },
      { name: '顾远山', avatar: createAvatar('顾远山', '#0f766e', '#22c55e') },
    ],
 following: false,
 joined: true,
 recommended: true,
  },
  {
 id: 'post-search-quality',
 type: '吐槽',
 headline: '知识库搜索结果相关性有点低，常搜不到配置说明',
 body: '同一个关键词搜出来经常是运营文章排在前面，真正的配置说明得往下翻很多。建议把产品帮助文档和 FAQ 的权重再往前提一些。',
 author: 'Mina',
 authorAvatar: createAvatar('Mina', '#fb7185', '#f59e0b'),
 team: '知识库维护者',
 role: '内容运营',
 createdAt: '2026-04-05T20:08:00',
 displayTime: '1 小时前',
 club: '客户成功圈',
 status: '最后回复于 8 分钟前',
 likeCount: 31,
 commentCount: 19,
 shareCount: 6,
 images: [
      {
 src: createPreview('搜索结果', '配置说明被运营文章挤压', '#cbd5e1', '#94a3b8'),
 alt: '知识库搜索结果预览',
      },
    ],
 likedBy: [
      { name: '张雨桐', avatar: createAvatar('张雨桐', '#0f766e', '#38bdf8') },
      { name: '小语', avatar: createAvatar('小语', '#2563eb', '#38bdf8') },
      { name: '陈予安', avatar: createAvatar('陈予安', '#8b5cf6', '#c084fc') },
    ],
 following: true,
 joined: true,
 recommended: false,
  },
  {
 id: 'post-review-template',
 type: '建议',
 headline: '建议把高频代码评审意见做成统一模板，减少反复沟通',
 body: '最近几周大家都在讨论 AI 生成代码的接入规范，如果能把安全、边界、回归检查抽成统一的评审模板，团队协作会顺很多。',
 author: '周行简',
 authorAvatar: createAvatar('周行简', '#0ea5e9', '#3b82f6'),
 team: '工程效能组',
 role: '治理负责人',
 createdAt: '2026-04-05T19:18:00',
 displayTime: '2 小时前',
 topic: '#评审规范#',
 club: 'AI 编码交流',
 likeCount: 24,
 commentCount: 9,
 shareCount: 4,
 linkCard: {
 title: 'CoMagic 评审清单试运行版',
 description: '包含需求澄清、风险检查、回归范围和知识沉淀四类条目。',
 domain: 'portal.comagic.local',
 url: '#',
    },
 likedBy: [
      { name: '顾远山', avatar: createAvatar('顾远山', '#0f766e', '#22c55e') },
      { name: '刘晨曦', avatar: createAvatar('刘晨曦', '#2563eb', '#60a5fa') },
    ],
 following: true,
 joined: false,
 recommended: true,
  },
  {
 id: 'post-onboarding-question',
 type: '问题',
 headline: '新人第一次进入 CoMagic，最先应该看模型还是技能？',
 body: '最近在做新人上手路径，发现很多同学一进来就先点模型页，但真正能帮他们快速产出的往往是技能和优秀案例。想听听大家都是怎么安排第一周学习顺序的。',
 author: '林知夏',
 authorAvatar: createAvatar('林知夏', '#f97316', '#f59e0b'),
 team: '平台赋能组',
 role: 'Enablement',
 createdAt: '2026-04-05T18:42:00',
 displayTime: '2 小时前',
 topic: '#新人上手#',
 club: '客户成功圈',
 likeCount: 16,
 commentCount: 7,
 shareCount: 2,
 likedBy: [
      { name: '陈予安', avatar: createAvatar('陈予安', '#8b5cf6', '#c084fc') },
      { name: '张雨桐', avatar: createAvatar('张雨桐', '#0f766e', '#38bdf8') },
    ],
 following: false,
 joined: true,
 recommended: true,
  },
  {
 id: 'post-skill-maintenance',
 type: '吐槽',
 headline: '技能文档更新频率还是不够，最怕拿旧流程教新人',
 body: '最近翻到两份去年留下来的技能文档，里面的流程和页面入口都已经变了。希望技能资产在推广之前，至少有一个明确的维护责任人和更新时间。',
 author: '顾远山',
 authorAvatar: createAvatar('顾远山', '#0f766e', '#22c55e'),
 team: 'AIOS部门',
 role: 'Agent 资产化',
 createdAt: '2026-04-05T17:36:00',
 displayTime: '3 小时前',
 topic: '#技能维护#',
 club: 'AI 编码交流',
 likeCount: 14,
 commentCount: 5,
 shareCount: 2,
 following: true,
 joined: false,
 recommended: false,
  },
  {
 id: 'post-token-report',
 type: '建议',
 headline: '能不能给管理者一个按团队看的 Token 周报？',
 body: '现在团队复盘时只能看个人消耗和总量，缺少按团队拆分后的结构化周报。对管理者来说，谁在高频用、谁在低效重试，都很难一眼看出来。',
 author: '陈予安',
 authorAvatar: createAvatar('陈予安', '#8b5cf6', '#c084fc'),
 team: '平台治理组',
 role: '产品运营',
 createdAt: '2026-04-05T16:48:00',
 displayTime: '4 小时前',
 topic: '#Token治理#',
 club: 'AI 编码交流',
 status: '官方已记录',
 likeCount: 22,
 commentCount: 11,
 shareCount: 4,
 following: true,
 joined: true,
 recommended: true,
  },
  {
 id: 'post-skill-reuse-gap',
 type: '吐槽',
 headline: '同一个 Skill 在两个团队里复用效果差异太大了',
 body: 'A 团队用了之后效率明显提升，B 团队照着接入却觉得没价值，问题大概率不在 Skill 本身，而是缺少场景说明和边界示例。希望技能页能多一些“适用条件”。',
 author: '张雨桐',
 authorAvatar: createAvatar('张雨桐', '#0f766e', '#38bdf8'),
 team: '客户成功',
 role: '知识运营',
 createdAt: '2026-04-05T16:10:00',
 displayTime: '5 小时前',
 topic: '#技能复用#',
 club: '客户成功圈',
 likeCount: 19,
 commentCount: 13,
 shareCount: 3,
 following: false,
 joined: true,
 recommended: true,
  },
  {
 id: 'post-faq-maintenance-window',
 type: '问题',
 headline: 'FAQ 有没有固定维护窗口？感觉很多说明更新不够同步',
 body: '我们内部做培训时经常会引用 FAQ，但有些入口已经变了，FAQ 还没改。想知道有没有固定维护节奏，或者能不能至少看到更新时间和责任人。',
 author: '刘晨曦',
 authorAvatar: createAvatar('刘晨曦', '#2563eb', '#60a5fa'),
 team: 'Enablement',
 role: '培训运营',
 createdAt: '2026-04-05T15:36:00',
 displayTime: '5 小时前',
 topic: '#FAQ维护#',
 club: 'AI 编码交流',
 likeCount: 17,
 commentCount: 6,
 shareCount: 2,
 following: true,
 joined: false,
 recommended: false,
  },
  {
 id: 'post-approval-speed',
 type: '吐槽',
 headline: '模型权限审批还是有点慢，尤其跨部门申请时',
 body: '普通模型还好，一旦涉及白名单或者多部门共享，审批链路就会拉长。希望审批页至少能显示当前卡在哪个环节，不然大家只能不停追问。',
 author: '周行简',
 authorAvatar: createAvatar('周行简', '#0ea5e9', '#3b82f6'),
 team: '工程效能组',
 role: '治理负责人',
 createdAt: '2026-04-05T14:58:00',
 displayTime: '6 小时前',
 topic: '#审批流程#',
 club: '销售运营圈',
 status: '待回应',
 likeCount: 28,
 commentCount: 15,
 shareCount: 5,
 following: true,
 joined: true,
 recommended: true,
  },
]

const normalizeVoicePost = (
 post: Omit<VoicePost, 'visibilityStatus' | 'featured' | 'handledAt' | 'handledNote'>,
): VoicePost => ({
 ...post,
 visibilityStatus: 'visible',
 featured: Boolean(post.recommended),
})

export const voicePosts = reactive<VoicePost[]>(seedVoicePosts.map((item) => normalizeVoicePost(item)))

const refreshVoiceCollections = () => {
 voiceTabs.splice(0, voiceTabs.length, ...(voiceChannelRecords.map((item) => item.label) as VoiceTab[]))
}

export const setVoicePostVisibility = (id: string, visibilityStatus: VoicePost['visibilityStatus']) => {
 const post = voicePosts.find((item) => item.id === id)

 if (!post) {
 return null
  }

 post.visibilityStatus = visibilityStatus
 post.handledAt = new Date().toISOString()
 return post
}

export const toggleVoiceFeatured = (id: string, featured: boolean) => {
 const post = voicePosts.find((item) => item.id === id)

 if (!post) {
 return null
  }

 post.featured = featured
 post.handledAt = new Date().toISOString()
 return post
}

export const resetVoicePosts = () => {
 voicePosts.splice(0, voicePosts.length, ...seedVoicePosts.map((item) => normalizeVoicePost(item)))
 voiceChannelRecords.splice(0, voiceChannelRecords.length, ...seedVoiceChannelRecords.map((label) => ({ label })))
 voiceTopicRecords.splice(0, voiceTopicRecords.length, ...seedVoiceTopicRecords.map((item) => ({ ...item })))
 refreshVoiceCollections()
}

export const getVoiceChannelReferenceCount = (_label: string) => 0

export const createVoiceChannelRecord = (label: string) => {
 const normalizedLabel = label.trim() as VoiceTab

 if (!normalizedLabel || voiceChannelRecords.find((item) => item.label === normalizedLabel)) {
 return null
  }

 voiceChannelRecords.push({ label: normalizedLabel })
 refreshVoiceCollections()
 return normalizedLabel
}

export const renameVoiceChannelRecord = (previousLabel: string, nextLabel: string) => {
 const record = voiceChannelRecords.find((item) => item.label === previousLabel)
 const normalizedLabel = nextLabel.trim() as VoiceTab

 if (!record || !normalizedLabel || voiceChannelRecords.find((item) => item.label === normalizedLabel && item !== record)) {
 return null
  }

 record.label = normalizedLabel
 refreshVoiceCollections()
 return normalizedLabel
}

export const deleteVoiceChannelRecord = (label: string) => {
 if (getVoiceChannelReferenceCount(label) > 0) {
 return false
  }

 const index = voiceChannelRecords.findIndex((item) => item.label === label)

 if (index === -1) {
 return false
  }

 voiceChannelRecords.splice(index, 1)
 refreshVoiceCollections()
 return true
}

export const getVoiceTopicReferenceCount = (label: string) => voicePosts.filter((item) => item.topic === label).length

export const createVoiceTopicRecord = (label: string, heat = '0') => {
 const normalizedLabel = label.trim()

 if (!normalizedLabel || voiceTopicRecords.find((item) => item.label === normalizedLabel)) {
 return null
  }

 voiceTopicRecords.push({ label: normalizedLabel, heat })
 return normalizedLabel
}

export const renameVoiceTopicRecord = (previousLabel: string, nextLabel: string) => {
 const record = voiceTopicRecords.find((item) => item.label === previousLabel)
 const normalizedLabel = nextLabel.trim()

 if (!record || !normalizedLabel || voiceTopicRecords.find((item) => item.label === normalizedLabel && item !== record)) {
 return null
  }

 record.label = normalizedLabel
 voicePosts.forEach((item) => {
 if (item.topic === previousLabel) {
 item.topic = normalizedLabel
    }
  })
 return normalizedLabel
}

export const deleteVoiceTopicRecord = (label: string) => {
 if (getVoiceTopicReferenceCount(label) > 0) {
 return false
  }

 const index = voiceTopicRecords.findIndex((item) => item.label === label)

 if (index === -1) {
 return false
  }

 voiceTopicRecords.splice(index, 1)
 return true
}

export const voiceSidebar = {
 profile: {
 name: '王小维',
 avatar: createAvatar('王小维', '#2563eb', '#6366f1'),
 stats: [
      { label: '沸点', value: '24' },
      { label: '圈子', value: '6' },
      { label: '关注', value: '58' },
      { label: '关注者', value: '17' },
    ],
  },
 get featuredPosts() {
 return voicePosts
      .filter((item) => item.visibilityStatus === 'visible' && item.featured)
      .sort((left, right) => right.likeCount - left.likeCount)
      .slice(0, 4)
      .map((item) => ({
 title: item.headline,
 stats: `${item.likeCount} 赞 · ${item.commentCount} 评论`,
      }))
  },
 get topics() {
 return voiceTopicRecords
  },
}

refreshVoiceCollections()