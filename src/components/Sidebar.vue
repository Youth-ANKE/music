<template>
  <aside class="sidebar-container">
    <div class="menu-group">
      <div class="menu-item" :class="{ active: route.path === '/' }">
        <el-icon><House /></el-icon>
        <span>首页</span>
      </div>
      <div class="menu-item">
        <el-icon><Calendar /></el-icon>
        <span>每日推荐</span>
      </div>
      <div class="menu-item">
        <el-icon><Connection /></el-icon>
        <span>私人FM</span>
      </div>
      <div class="menu-item">
        <el-icon><Star /></el-icon>
        <span>我的收藏</span>
      </div>
      <div class="menu-item">
        <el-icon><Download /></el-icon>
        <span>下载管理</span>
      </div>
      <div class="menu-item">
        <el-icon><Clock /></el-icon>
        <span>最近播放</span>
      </div>
    </div>

    <div class="divider"></div>

    <div class="playlist-group">
      <div class="group-title">我的歌单</div>
      <div class="menu-item" v-for="item in myPlaylist" :key="item.id">
        <el-icon><List /></el-icon>
        <span class="playlist-name">{{ item.name }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

const myPlaylist = [
  { id: 1, name: '我喜欢的音乐' },
  { id: 2, name: '经典老歌合集' },
  { id: 3, name: '开车必备BGM' },
  { id: 4, name: '学习白噪音' },
  { id: 5, name: '周杰伦全集' }
]
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: var(--sidebar-width);
  height: 100%;
  background-color: var(--bg-side);
  padding: 16px 8px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  flex-shrink: 0;
}

.menu-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 14px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(22, 93, 255, 0.08);
    color: var(--primary-color);
  }

  &.active {
    background-color: var(--primary-color);
    color: #fff;
    font-weight: 500;
  }
}

.divider {
  width: 100%;
  height: 1px;
  background-color: var(--border-color);
  margin: 16px 0;
}

.playlist-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;

  .group-title {
    font-size: 12px;
    color: var(--text-weak);
    padding: 8px 16px;
    font-weight: 500;
  }

  .playlist-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

// 响应式适配
@media (max-width: 1024px) {
  .sidebar-container {
    width: 200px;
  }
}

@media (max-width: 768px) {
  .sidebar-container {
    display: none;
  }
}
</style>
