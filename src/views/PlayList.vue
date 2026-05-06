<template>
  <div class="playlist-container">
    <div class="empty-tip">
      <el-icon size="64" color="var(--text-weak)"><FolderOpened /></el-icon>
      <p>歌单功能开发中，敬请期待</p>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.playlist-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.empty-tip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  color: var(--text-weak);
  font-size: 16px;
}
</style>
