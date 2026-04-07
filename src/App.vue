<template>
  <section class="voice-page">
  <h1 class="voice-page__sr-only">心声墙</h1>
 
  <div class="voice-page__layout">
  <aside class="voice-left-rail">
  <nav
  aria-label="心声墙频道"
  class="voice-left-rail__primary"
  >
  <button
  v-for="tab in voiceTabs"
             :key="tab"
             :class="['voice-left-rail__tab', { 'is-active': activeTab === tab }]"
  type="button"
             @click="activeTab = tab"
  >
             {{ tab }}
  </button>
  </nav>
  </aside>
 
  <main class="voice-stream">
  <section class="voice-composer">
  <textarea
  ref="textareaRef"
  v-model="textareaContent"
  aria-label="发布内容"
  class="voice-composer__textarea"
  placeholder="分享你的问题、建议或吐槽，写清楚场景会更容易得到回应。"
  />
 
  <div class="voice-composer__footer">
  <div class="voice-composer__tools">
  <div
  class="voice-composer__tool-item"
                 :class="{ 'is-active': showEmojiPicker }"
  >
  <span
  class="voice-composer__tool-btn"
                   @click="toggleEmojiPicker"
  >
                   🙂 表情
  </span>
  

  </div>
  <span>🖼 图片</span>
  <span>🔗 链接</span>
  <span># 话题</span>
  <span>{ } 代码</span>
  </div>
 
  <div class="voice-composer__actions">
  <div class="voice-composer__types">
  <button
  v-for="type in composerTypes"
                   :key="type"
                   :class="['voice-composer__type', { 'is-active': selectedComposerType === type }]"
  type="button"
                   @click="selectedComposerType = type"
  >
                   {{ type }}
  </button>
  </div>
  <span>{{ textareaContent.length }} / 1000</span>
  <button
  class="voice-composer__submit"
  type="button"
  >
                 发布
  </button>
  </div>
  </div>
  </section>
 
  <nav
  aria-label="内容筛选"
  class="voice-filter-nav"
  >
  <button
  v-for="filter in voiceFilterTabs"
             :key="filter"
             :class="['voice-filter-nav__button', { 'is-active': activeFilter === filter }]"
  type="button"
             @click="activeFilter = filter"
  >
             {{ filter }}
  </button>
  </nav>
 
  <section
  aria-label="心声信息流"
  class="voice-feed"
  role="region"
  >
  <article
  v-for="post in filteredPosts"
             :key="post.id"
  class="pin-card"
  >
  <div class="pin-card__head">
  <img
                 :alt="`${post.author} 头像`"
  class="pin-card__avatar"
                 :src="post.authorAvatar"
  >
 
  <div class="pin-card__meta">
  <strong>{{ post.author }}</strong>
  <span>{{ [post.role, post.team].filter(Boolean).join(' @ ') }}</span>
  <span>{{ post.displayTime }}</span>
  </div>
 
  <span
  v-if="post.status"
  class="pin-card__status"
  >
                 {{ post.status }}
  </span>
  </div>
 
  <p
  v-if="post.topic"
  class="pin-card__topic"
  >
               {{ post.topic }}
  </p>
 
  <h2>{{ post.headline }}</h2>
  <p class="pin-card__body">{{ post.body }}</p>
 
  <a
  v-if="post.linkCard"
  class="pin-card__link-card"
               :href="post.linkCard.url"
               @click.prevent
  >
  <strong>{{ post.linkCard.title }}</strong>
  <span>{{ post.linkCard.description }}</span>
  <em>{{ post.linkCard.domain }}</em>
  </a>
 
  <div
  v-if="post.images?.length"
  class="pin-card__gallery"
  >
  <img
  v-for="image in post.images"
                 :key="image.alt"
                 :alt="image.alt"
  class="pin-card__image"
                 :src="image.src"
  >
  </div>
 
  <div
  v-if="post.club"
  class="pin-card__club"
  >
               {{ post.club }}
  </div>
 
  <div
  v-if="post.likedBy?.length"
  class="pin-card__likes"
  >
  <div class="pin-card__like-avatars">
  <img
  v-for="user in post.likedBy"
                   :key="user.name"
                   :alt="`${user.name} 头像`"
  class="pin-card__like-avatar"
                   :src="user.avatar"
  >
  </div>
  <span>{{ post.likedBy[0].name }} 等 {{ post.likeCount }} 人觉得有帮助</span>
  </div>
 
  <div class="pin-card__actions">
  <button type="button">分享 {{ post.shareCount }}</button>
  <button type="button">评论 {{ post.commentCount }}</button>
  <button type="button">点赞 {{ post.likeCount }}</button>
  </div>
  </article>
  </section>
  </main>
 
  <aside class="voice-right-rail">
  <section class="voice-right-rail__card">
  <h2>精选讨论</h2>
 
  <div class="voice-right-rail__list">
  <a
  v-for="item in voiceSidebar.featuredPosts"
               :key="item.title"
  class="voice-right-rail__link"
  href="#"
               @click.prevent
  >
  <span class="voice-right-rail__headline">{{ item.title }}</span>
  <span>{{ item.stats }}</span>
  </a>
  </div>
  </section>
  </aside>
  </div>
  </section>
 </template>
 
 <script setup lang="ts">
 import { computed, ref } from 'vue'
 
//  import EmojiPicker from '@/components/EmojiPicker.vue'
 import { voiceFilterTabs, voicePosts, voiceSidebar, voiceTabs } from '@/mock/voices'
 
 const activeTab = ref('最新')
 const activeFilter = ref('全部')
 const composerTypes = ['问题', '建议', '吐槽'] as const
 const selectedComposerType = ref<(typeof composerTypes)[number]>('问题')
 
 const showEmojiPicker = ref(false)
 const emojiPickerPosition = ref({ top: 0, left: 0 })
 const textareaContent = ref('')
 
 const textareaRef = ref<HTMLTextAreaElement | null>(null)
 
 const filteredPosts = computed(() => {
  let result = voicePosts.filter(
     (post) => post.visibilityStatus === 'visible' && (activeFilter.value === '全部' || post.type === activeFilter.value),
   )
 
  if (activeTab.value === '待回应') {
  result = result.filter((post) => !post.status)
   } else if (activeTab.value === '已回复') {
  result = result.filter((post) => Boolean(post.status))
   } else if (activeTab.value === '吐槽榜') {
  result = result.filter((post) => post.type === '吐槽')
   }
 
  if (activeTab.value === '热门' || activeTab.value === '吐槽榜') {
  return [...result].sort((left, right) => right.likeCount - left.likeCount)
   }
 
  return [...result].sort((left, right) => right.createdAt.localeCompare(left.createdAt))
 })
 
 const toggleEmojiPicker = () => {
  showEmojiPicker.value = !showEmojiPicker.value
 }
 
 const insertEmoji = (emoji: string) => {
  const textarea = textareaRef.value
  if (!textarea) return
 
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const text = textareaContent.value
  const before = text.substring(0, start)
  const after = text.substring(end, text.length)
 
  textareaContent.value = before + emoji + after
 
  // 恢复光标位置
  setTimeout(() => {
  textarea.focus()
  const newCursorPos = start + emoji.length
  textarea.setSelectionRange(newCursorPos, newCursorPos)
   }, 0)
 }
 </script>
 
 <style scoped>
 .voice-page {
  padding: 18px 16px 32px;
 }
 
 .voice-page__sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
 }
 
 .voice-page__layout {
  display: grid;
  grid-template-columns: 176px minmax(0, 1fr) 292px;
  gap: 20px;
  align-items: start;
 }
 
 .voice-left-rail,
 .voice-stream,
 .voice-right-rail {
  min-width: 0;
 }
 
 .voice-left-rail {
  position: sticky;
  top: 72px;
  display: grid;
  gap: 4px;
  padding-top: 4px;
 }
 
 .voice-composer,
 .voice-filter-nav,
 .voice-feed,
 .voice-right-rail__card {
  border: 1px solid #f1f4f8;
  border-radius: 8px;
  background: #fff;
 }
 
 .voice-left-rail__primary {
  display: grid;
 }
 
 .voice-left-rail__tab {
  min-height: 36px;
  padding: 0 12px;
  border: 0;
  border-radius: 8px;
  background: transparent;
  color: #4e5969;
  text-align: left;
  font-size: 13px;
  cursor: pointer;
 }
 
 .voice-left-rail__tab.is-active,
 .voice-left-rail__tab:hover {
  background: #edf4ff;
  color: #1d7dfa;
 }
 
 .voice-left-rail__tab.is-active {
  font-weight: 700;
 }
 
 .voice-stream {
  display: grid;
  gap: 16px;
 }
 
 .voice-composer {
  padding: 20px 24px 16px;
 }
 
 .voice-composer__textarea {
  width: 100%;
  min-height: 144px;
  padding: 0;
  border: 0;
  resize: vertical;
  color: #1d2129;
  font-size: 16px;
  line-height: 1.8;
  outline: none;
 }
 
 .voice-composer__types {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
 }
 
 .voice-composer__type {
  min-height: 32px;
  padding: 0 14px;
  border: 1px solid #e5e6eb;
  border-radius: 999px;
  background: #fff;
  color: #4e5969;
  font-size: 13px;
  cursor: pointer;
 }
 
 .voice-composer__type.is-active {
  border-color: #cfe2ff;
  background: #edf4ff;
  color: #1d7dfa;
  font-weight: 700;
 }
 
 .voice-composer__footer,
 .voice-composer__actions,
 .voice-filter-nav,
 .pin-card__head,
 .pin-card__actions,
 .pin-card__likes {
  display: flex;
  align-items: center;
 }
 
 .voice-composer__footer {
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid #f1f4f8;
 }
 
 .voice-composer__tools {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  color: #8a919f;
  font-size: 13px;
 }
 
 .voice-composer__tool-item {
  position: relative;
 }
 
 .voice-composer__tool-btn {
  cursor: pointer;
  transition: color 0.2s;
 }
 
 .voice-composer__tool-btn:hover {
  color: #1d7dfa;
 }
 
 .voice-composer__tool-item.is-active .voice-composer__tool-btn {
  color: #1d7dfa;
 }
 
 .voice-composer__actions {
  gap: 14px;
  color: #8a919f;
  font-size: 12px;
  flex-wrap: wrap;
  justify-content: flex-end;
 }
 
 .voice-composer__submit {
  min-width: 92px;
  min-height: 36px;
  border: 0;
  border-radius: 8px;
  background: #1d7dfa;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
 }
 
 .voice-filter-nav {
  gap: 20px;
  min-height: 42px;
  padding: 0 20px;
  border-radius: 8px 8px 0 0;
 }
 
 .voice-filter-nav__button {
  padding: 0;
  border: 0;
  background: transparent;
  color: #4e5969;
  font-size: 13px;
  cursor: pointer;
 }
 
 .voice-filter-nav__button.is-active {
  color: #1d2129;
  font-weight: 700;
 }
 
 .voice-feed {
  display: grid;
  gap: 0;
  padding: 0 20px;
  border-top: 0;
  border-radius: 0 0 8px 8px;
 }
 
 .pin-card {
  padding: 20px 0 18px;
  border-bottom: 1px solid #f1f4f8;
 }
 
 .pin-card:last-child {
  border-bottom: 0;
 }
 
 .pin-card__head {
  gap: 12px;
 }
 
 .pin-card__avatar,
 .pin-card__like-avatar {
  border-radius: 50%;
 }
 
 .pin-card__avatar {
  width: 46px;
  height: 46px;
 }
 
 .pin-card__meta {
  display: grid;
  gap: 2px;
 }
 
 .pin-card__meta strong,
 .pin-card__link-card strong {
  color: #1d2129;
  font-size: 15px;
 }
 
 .voice-right-rail__headline {
  color: #1d2129;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.5;
 }
 
 .pin-card__meta span,
 .pin-card__status,
 .pin-card__club,
 .pin-card__likes,
 .pin-card__actions button,
 .voice-right-rail__link span,
 .pin-card__link-card span,
 .pin-card__link-card em {
  color: #8a919f;
  font-size: 11px;
 }
 
 .pin-card__status {
  margin-left: auto;
  padding: 6px 10px;
  border-radius: 999px;
  background: #eef6ff;
  color: #1d7dfa;
 }
 
 .pin-card__topic {
  margin: 16px 0 8px;
  color: #1d7dfa;
  font-size: 14px;
  font-weight: 700;
 }
 
 .pin-card h2 {
  margin: 0 0 10px;
  color: #1d2129;
  font-size: 18px;
  line-height: 1.55;
 }
 
 .pin-card__body {
  margin: 0;
  color: #4e5969;
  font-size: 14px;
  line-height: 1.85;
 }
 
 .pin-card__link-card {
  display: grid;
  gap: 6px;
  margin-top: 14px;
  padding: 14px 16px;
  border-radius: 8px;
  background: #f7f8fa;
 }
 
 .pin-card__link-card em {
  font-style: normal;
 }
 
 .pin-card__gallery {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 16px;
 }
 
 .pin-card__image {
  width: 100%;
  height: 140px;
  border-radius: 8px;
  object-fit: cover;
 }
 
 .pin-card__club {
  margin-top: 14px;
 }
 
 .pin-card__likes {
  gap: 12px;
  margin-top: 14px;
 }
 
 .pin-card__like-avatars {
  display: flex;
 }
 
 .pin-card__like-avatar {
  width: 24px;
  height: 24px;
  margin-right: -6px;
  border: 2px solid #fff;
 }
 
 .pin-card__actions {
  justify-content: flex-start;
  gap: 24px;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #f1f2f5;
 }
 
 .pin-card__actions button {
  border: 0;
  background: transparent;
  cursor: pointer;
 }
 
 .voice-right-rail {
  position: sticky;
  top: 72px;
  display: grid;
  gap: 12px;
 }
 
 .voice-right-rail__card {
  display: grid;
  gap: 12px;
  padding: 14px 16px 16px;
 }
 
 .voice-right-rail__card h2 {
  margin: 0;
  color: #1d2129;
  font-size: 15px;
 }
 
 .voice-right-rail__list {
  display: grid;
  gap: 8px;
 }
 
 .voice-right-rail__link {
  display: grid;
  gap: 2px;
 }
 
 @media (max-width: 1280px) {
  .voice-page__layout {
  grid-template-columns: minmax(0, 1fr) 284px;
   }
 
  .voice-left-rail {
  display: none;
   }
 }
 
 @media (max-width: 960px) {
  .voice-page {
  padding: 16px 12px 32px;
   }
 
  .voice-page__layout {
  grid-template-columns: 1fr;
   }
 
  .voice-right-rail {
  position: static;
   }
 }
 
 @media (max-width: 720px) {
  .voice-composer,
  .voice-right-rail__card {
  padding-left: 16px;
  padding-right: 16px;
   }
 
  .voice-feed {
  padding-left: 16px;
  padding-right: 16px;
   }
 
  .voice-composer__footer {
  flex-direction: column;
  align-items: flex-start;
   }
 
  .pin-card__head {
  align-items: flex-start;
   }
 
  .pin-card__status {
  margin-left: 0;
   }
 
  .pin-card__gallery {
  grid-template-columns: repeat(2, minmax(0, 1fr));
   }
 }
 </style>