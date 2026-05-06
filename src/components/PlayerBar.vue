<template>
  <div class="player-container">
    <div class="song-info">
      <img :src="playerStore.currentSong?.cover" alt="歌曲封面" class="song-cover" />
      <div class="song-detail">
        <span class="song-name">{{ playerStore.currentSong?.name || '暂无歌曲' }}</span>
        <span class="singer-name">{{ playerStore.currentSong?.singer || '-' }}</span>
      </div>
      <el-icon class="icon-btn" size="18"><Star /></el-icon>
      <el-icon class="icon-btn" size="18"><Download /></el-icon>
    </div>

    <div class="play-control">
      <div class="control-buttons">
        <el-icon size="20" class="control-btn" @click="playerStore.togglePlayMode">
          <Refresh v-if="playerStore.playMode === playerStore.PlayMode.ORDER" />
          <RefreshRight v-if="playerStore.playMode === playerStore.PlayMode.LOOP" />
          <Shuffle v-if="playerStore.playMode === playerStore.PlayMode.RANDOM" />
        </el-icon>
        <el-icon size="24" class="control-btn" @click="playerStore.prevSong"><DArrowLeft /></el-icon>
        <div class="play-btn" @click="playerStore.togglePlay">
          <el-icon size="28" color="#fff">
            <VideoPlay v-if="!playerStore.isPlaying" />
            <VideoPause v-else />
          </el-icon>
        </div>
        <el-icon size="24" class="control-btn" @click="playerStore.nextSong"><DArrowRight /></el-icon>
        <el-icon size="20" class="control-btn"><List /></el-icon>
      </div>
      <div class="progress-bar">
        <span class="time-text">{{ formatTime(playerStore.currentTime) }}</span>
        <div class="progress-wrap" @mousedown="handleProgressClick">
          <div class="progress-bg">
            <div class="progress-fill" :style="{ width: playerStore.progress + '%' }">
              <div class="progress-dot"></div>
            </div>
          </div>
        </div>
        <span class="time-text">{{ formatTime(playerStore.duration) }}</span>
      </div>
    </div>

    <div class="volume-control">
      <el-icon size="20" class="control-btn">
        <Sound v-if="playerStore.volume > 0.5" />
        <Microphone v-else-if="playerStore.volume > 0" />
        <Mute v-else />
      </el-icon>
      <div class="volume-wrap">
        <div class="volume-bg">
          <div class="volume-fill" :style="{ width: playerStore.volume * 100 + '%' }">
            <div class="volume-dot"></div>
          </div>
        </div>
      </div>
      <router-link to="/player">
        <el-icon size="20" class="control-btn"><FullScreen /></el-icon>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../store/player'

const playerStore = usePlayerStore()

const formatTime = (seconds) => {
  if (isNaN(seconds) || seconds < 0) return '00:00'
  const min = Math.floor(seconds / 60).toString().padStart(2, '0')
  const sec = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${min}:${sec}`
}

const handleProgressClick = (e) => {
  const wrap = e.currentTarget
  const rect = wrap.getBoundingClientRect()
  const percent = ((e.clientX - rect.left) / rect.width) * 100
  playerStore.setProgress(Math.max(0, Math.min(100, percent)))
}
</script>

<style lang="scss" scoped>
.player-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--player-height);
  padding: 0 24px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
}

.song-info {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 240px;

  .song-cover {
    width: 48px;
    height: 48px;
    border-radius: 6px;
    object-fit: cover;
  }

  .song-detail {
    display: flex;
    flex-direction: column;
    gap: 2px;
    max-width: 120px;

    .song-name {
      font-size: 14px;
      color: var(--text-main);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .singer-name {
      font-size: 12px;
      color: var(--text-weak);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .icon-btn {
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }
  }
}

.play-control {
  flex: 1;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  .control-buttons {
    display: flex;
    align-items: center;
    gap: 24px;

    .control-btn {
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary-color);
      }
    }

    .play-btn {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background-color: var(--primary-color);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        transform: scale(1.05);
        background-color: var(--primary-hover);
      }
    }
  }

  .progress-bar {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;

    .time-text {
      font-size: 12px;
      color: var(--text-weak);
      width: 40px;
      text-align: center;
    }

    .progress-wrap {
      flex: 1;
      height: 12px;
      display: flex;
      align-items: center;
      cursor: pointer;

      .progress-bg {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background-color: var(--border-color);
        position: relative;
        overflow: hidden;

        .progress-fill {
          height: 100%;
          background-color: var(--primary-color);
          border-radius: 2px;
          position: relative;
          transition: width 0.1s linear;

          .progress-dot {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background-color: var(--primary-color);
            opacity: 0;
            transition: opacity 0.2s ease;
          }
        }

        &:hover {
          .progress-fill .progress-dot {
            opacity: 1;
          }
        }
      }
    }
  }
}

.volume-control {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 240px;
  justify-content: flex-end;

  .control-btn {
    color: var(--text-secondary);
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: var(--primary-color);
    }
  }

  .volume-wrap {
    width: 100px;
    height: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;

    .volume-bg {
      width: 100%;
      height: 4px;
      border-radius: 2px;
      background-color: var(--border-color);
      position: relative;

      .volume-fill {
        height: 100%;
        background-color: var(--primary-color);
        border-radius: 2px;
        position: relative;
        transition: width 0.1s linear;

        .volume-dot {
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--primary-color);
          opacity: 0;
          transition: opacity 0.2s ease;
        }
      }

      &:hover {
        .volume-fill .volume-dot {
          opacity: 1;
        }
      }
    }
  }
}

// 响应式适配
@media (max-width: 1024px) {
  .player-container {
    padding: 0 16px;
  }

  .song-info {
    width: 180px;

    .song-detail {
      max-width: 90px;
    }
  }

  .play-control {
    max-width: 500px;
  }

  .volume-control {
    width: 160px;
  }
}

@media (max-width: 768px) {
  .player-container {
    height: 60px;
    padding: 0 12px;
  }

  .song-info {
    width: auto;
    min-width: 0;
    flex: 1;
    gap: 8px;

    .icon-btn {
      display: none;
    }

    .song-detail {
      max-width: 100px;

      .song-name {
        font-size: 12px;
      }

      .singer-name {
        display: none;
      }
    }
  }

  .play-control {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 60px;
    max-width: none;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(12px);
    border-top: 1px solid var(--border-color);

    .control-buttons {
      gap: 16px;

      .play-btn {
        width: 36px;
        height: 36px;
      }

      .control-btn:first-child,
      .control-btn:last-child {
        display: none;
      }
    }

    .progress-bar {
      .time-text {
        width: 32px;
        font-size: 11px;
      }
    }
  }

  .volume-control {
    display: none;
  }
}
</style>
