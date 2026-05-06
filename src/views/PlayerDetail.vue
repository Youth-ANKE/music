<template>
  <div class="player-detail-container">
    <div class="bg-mask" :style="{ backgroundImage: `url(${playerStore.currentSong?.cover})` }"></div>

    <div class="record-wrap">
      <div class="record-disc" :class="{ rotating: playerStore.isPlaying }">
        <img :src="playerStore.currentSong?.cover" alt="专辑封面" class="album-cover" />
      </div>
      <div class="record-arm" :class="{ play: playerStore.isPlaying }"></div>
    </div>

    <div class="lyric-wrap">
      <div class="song-info">
        <h2 class="song-name">{{ playerStore.currentSong?.name }}</h2>
        <p class="singer-album">{{ playerStore.currentSong?.singer }} - {{ playerStore.currentSong?.album }}</p>
      </div>
      <div class="lyric-content" ref="lyricRef">
        <p
          class="lyric-line"
          :class="{ active: currentLineIndex === index }"
          v-for="(line, index) in lyricList"
          :key="index"
        >
          {{ line.text }}
        </p>
      </div>
      <div class="control-buttons">
        <el-button type="primary" :icon="Star" circle></el-button>
        <el-button type="primary" :icon="Download" circle></el-button>
        <el-button type="primary" :icon="ChatDotRound" circle></el-button>
        <el-button type="primary" :icon="Share" circle></el-button>
      </div>
    </div>

    <router-link to="/" class="back-btn">
      <el-icon size="24"><ArrowLeft /></el-icon>
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { usePlayerStore } from '../store/player'

const playerStore = usePlayerStore()
const lyricRef = ref(null)

const lyricList = computed(() => {
  const lrc = playerStore.currentSong?.lrc || ''
  const lines = lrc.split('\n')
  const reg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
  const result = []

  for (const line of lines) {
    if (!line) continue
    const match = line.match(reg)
    if (!match) continue
    const min = parseInt(match[1])
    const sec = parseInt(match[2])
    const time = min * 60 + sec
    const text = line.replace(reg, '').trim()
    if (text) {
      result.push({ time, text })
    }
  }
  return result
})

const currentLineIndex = computed(() => {
  const list = lyricList.value
  const currentTime = playerStore.currentTime
  for (let i = list.length - 1; i >= 0; i--) {
    if (currentTime >= list[i].time) {
      return i
    }
  }
  return 0
})

watch(currentLineIndex, (newIndex) => {
  if (!lyricRef.value) return
  const lineElement = lyricRef.value.children[newIndex]
  if (lineElement) {
    lineElement.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    })
  }
})

onMounted(() => {
  if (!playerStore.isPlaying) {
    playerStore.togglePlay()
  }
})
</script>

<style lang="scss" scoped>
.player-detail-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 80px;
  padding: 40px;
  overflow: hidden;
}

.bg-mask {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  filter: blur(20px) brightness(0.3);
  transform: scale(1.1);
  z-index: 0;
}

.back-btn {
  position: absolute;
  top: 24px;
  left: 24px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  z-index: 10;
  transition: background 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.record-wrap {
  position: relative;
  z-index: 1;

  .record-disc {
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: linear-gradient(135deg, #000 0%, #333 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);

    &::before {
      content: '';
      position: absolute;
      inset: 20px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.1);
    }

    &::after {
      content: '';
      position: absolute;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #000;
      z-index: 2;
    }

    .album-cover {
      width: 200px;
      height: 200px;
      border-radius: 50%;
      object-fit: cover;
      z-index: 1;
    }

    &.rotating {
      animation: rotate 20s linear infinite;
    }
  }

  .record-arm {
    position: absolute;
    top: -60px;
    right: 20px;
    width: 120px;
    height: 200px;
    background: linear-gradient(135deg, #888 0%, #555 100%);
    transform-origin: top center;
    transform: rotate(-30deg);
    transition: transform 0.5s ease;
    border-radius: 0 0 10px 10px;
    z-index: 3;

    &.play {
      transform: rotate(-10deg);
    }
  }
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.lyric-wrap {
  width: 500px;
  height: 80%;
  display: flex;
  flex-direction: column;
  z-index: 1;

  .song-info {
    margin-bottom: 40px;

    .song-name {
      font-size: 36px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 12px;
    }

    .singer-album {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .lyric-content {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 40px;

    &::-webkit-scrollbar {
      width: 0;
    }

    .lyric-line {
      font-size: 18px;
      color: rgba(255, 255, 255, 0.5);
      line-height: 2;
      margin-bottom: 16px;
      transition: all 0.3s ease;

      &.active {
        color: #fff;
        font-size: 22px;
        font-weight: 600;
        transform: scale(1.02);
      }
    }
  }

  .control-buttons {
    display: flex;
    gap: 16px;
  }
}

// 响应式适配
@media (max-width: 1024px) {
  .player-detail-container {
    .player-content {
      gap: 40px;

      .record-disc {
        width: 300px;
        height: 300px;
      }

      .lyric-wrap {
        width: 350px;

        .song-info {
          .song-name {
            font-size: 28px;
          }

          .singer-album {
            font-size: 16px;
          }
        }

        .lyric-content {
          .lyric-line {
            font-size: 16px;

            &.active {
              font-size: 18px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .player-detail-container {
    padding: 20px;

    .close-btn {
      top: 16px;
      right: 16px;
    }

    .player-content {
      flex-direction: column;
      gap: 32px;
      height: calc(100vh - 140px);
      justify-content: flex-start;
      overflow-y: auto;

      .record-disc {
        width: 240px;
        height: 240px;
        margin: 0 auto;

        .record-cover {
          width: 160px;
          height: 160px;
        }
      }

      .lyric-wrap {
        width: 100%;
        height: auto;
        flex: 1;
        text-align: center;

        .song-info {
          margin-bottom: 24px;

          .song-name {
            font-size: 22px;
          }

          .singer-album {
            font-size: 14px;
          }
        }

        .lyric-content {
          margin-bottom: 24px;

          .lyric-line {
            font-size: 15px;
            margin-bottom: 12px;

            &.active {
              font-size: 17px;
            }
          }
        }
      }
    }
  }
}

@media (max-width: 480px) {
  .player-detail-container {
    .player-content {
      .record-disc {
        width: 200px;
        height: 200px;

        .record-cover {
          width: 130px;
          height: 130px;
        }
      }

      .lyric-wrap {
        .song-info {
          .song-name {
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
