<template>
  <div class="app-container">
    <Header />
    <div class="main-wrapper">
      <Sidebar />
      <div class="main-content">
        <router-view />
      </div>
    </div>
    <PlayerBar />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import PlayerBar from './components/PlayerBar.vue'
</script>

<style lang="scss" scoped>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-main);
  overflow: hidden;
}

.main-wrapper {
  flex: 1;
  display: flex;
  overflow: hidden;
  padding-top: var(--header-height);
  padding-bottom: var(--player-height);
}

.main-content {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  background-color: var(--bg-main);
}
</style>
