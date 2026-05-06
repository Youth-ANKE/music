<template>
  <header class="header-container">
    <div class="header-left">
      <div class="logo">
        <el-icon size="28" color="var(--primary-color)"><MusicNote /></el-icon>
        <span class="logo-text">云音乐</span>
      </div>
      <nav class="nav-menu">
        <router-link to="/" class="nav-item" :class="{ active: route.path === '/' }">首页</router-link>
        <router-link to="/playlist" class="nav-item" :class="{ active: route.path === '/playlist' }">歌单</router-link>
        <span class="nav-item">歌手</span>
        <span class="nav-item">排行榜</span>
        <span class="nav-item">我的音乐</span>
      </nav>
      <el-icon class="menu-toggle" size="24" @click="toggleMobileMenu">
        <Expand v-if="!mobileMenuOpen" />
        <Fold v-else />
      </el-icon>
    </div>
    <div class="header-right">
      <div class="search-box">
        <el-icon><Search /></el-icon>
        <input type="text" placeholder="搜索歌曲、歌手、歌单" />
      </div>
      <el-icon class="icon-btn" size="20"><Bell /></el-icon>
      <div class="user-avatar">
        <el-avatar :size="32" src="https://picsum.photos/seed/user/100/100" />
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { Expand, Fold } from '@element-plus/icons-vue'
const route = useRoute()
const mobileMenuOpen = ref(false)
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}
</script>

<style lang="scss" scoped>
.header-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: var(--header-height);
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 40px;

  .logo {
    display: flex;
    align-items: center;
    gap: 8px;

    .logo-text {
      font-size: 20px;
      font-weight: 700;
      color: var(--primary-color);
    }
  }

  .nav-menu {
    display: flex;
    gap: 32px;

    .nav-item {
      font-size: 16px;
      color: var(--text-secondary);
      position: relative;
      transition: color 0.3s ease;

      &:hover {
        color: var(--primary-color);
      }

      &.active {
        color: var(--primary-color);
        font-weight: 500;

        &::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 50%;
          transform: translateX(-50%);
          width: 32px;
          height: 3px;
          border-radius: 2px;
          background-color: var(--primary-color);
        }
      }
    }
  }

  .menu-toggle {
    display: none;
    color: var(--text-secondary);
    cursor: pointer;
  }
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;

  .search-box {
    width: 280px;
    height: 36px;
    padding: 0 12px;
    border-radius: 18px;
    background-color: var(--bg-side);
    display: flex;
    align-items: center;
    gap: 8px;

    input {
      flex: 1;
      height: 100%;
      background: transparent;
      font-size: 14px;
      color: var(--text-main);

      &::placeholder {
        color: var(--text-weak);
      }
    }
  }

  .icon-btn {
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.3s ease;

    &:hover {
      color: var(--primary-color);
    }
  }
}

// 响应式适配
@media (max-width: 1024px) {
  .header-left {
    gap: 24px;

    .nav-menu {
      gap: 20px;

      .nav-item {
        font-size: 14px;
      }
    }
  }

  .header-right {
    gap: 16px;

    .search-box {
      width: 200px;
    }
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
  }

  .header-left {
    gap: 16px;

    .logo {
      .logo-text {
        display: none;
      }
    }

    .nav-menu {
      display: none;
    }

    .menu-toggle {
      display: block;
    }
  }

  .header-right {
    gap: 12px;

    .search-box {
      width: 140px;
      height: 32px;

      input {
        font-size: 12px;

        &::placeholder {
          content: '搜索';
        }
      }
    }

    .icon-btn {
      display: none;
    }
  }
}
</style>
