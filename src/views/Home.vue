<template>
  <div class="home-container">
    <div class="banner-wrap">
      <el-carousel height="320px" :autoplay="true" interval="4000" arrow="hover">
        <el-carousel-item v-for="item in bannerList" :key="item.id">
          <div class="banner-item" :style="{ background: item.bg }">
            <div class="banner-content">
              <h2 class="banner-title">{{ item.title }}</h2>
              <p class="banner-desc">{{ item.desc }}</p>
              <el-button type="primary" size="large">立即收听</el-button>
            </div>
            <img :src="item.cover" alt="banner" class="banner-img" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div class="quick-entry">
      <div class="entry-card card-hover" v-for="item in entryList" :key="item.id">
        <component :is="item.icon" :size="32" :style="{ color: item.color }" />
        <span class="entry-name">{{ item.name }}</span>
      </div>
    </div>

    <div class="section-wrap">
      <div class="section-header">
        <h3 class="section-title">推荐歌单</h3>
        <span class="more-btn">查看更多 ></span>
      </div>
      <div class="playlist-grid">
        <div class="playlist-card card-hover" v-for="item in recommendPlaylist" :key="item.id" @click="playerStore.playSong(0)">
          <div class="playlist-cover">
            <img :src="item.cover" alt="歌单封面" />
            <div class="play-mask">
              <el-icon size="40" color="#fff"><VideoPlay /></el-icon>
            </div>
            <span class="play-count">{{ formatPlayCount(item.playCount) }}</span>
          </div>
          <p class="playlist-name">{{ item.name }}</p>
          <p class="playlist-creator">{{ item.creator }}</p>
        </div>
      </div>
    </div>

    <div class="section-wrap">
      <div class="section-header">
        <h3 class="section-title">官方榜单</h3>
        <span class="more-btn">查看更多 ></span>
      </div>
      <div class="rank-grid">
        <div class="rank-card card-hover" v-for="item in rankList" :key="item.id">
          <div class="rank-header" :style="{ background: item.bg }">
            <h4 class="rank-name">{{ item.name }}</h4>
            <p class="rank-update">{{ item.updateTime }}</p>
          </div>
          <ul class="rank-song-list">
            <li class="rank-song-item" v-for="(song, index) in item.songs" :key="song.id">
              <span class="rank-num" :class="{ top3: index < 3 }">{{ index + 1 }}</span>
              <span class="song-name">{{ song.name }}</span>
              <span class="singer-name">{{ song.singer }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { usePlayerStore } from '../store/player'
import { h } from 'vue'
import {
  Calendar,
  Connection,
  Star,
  Clock,
  TrendCharts,
  User
} from '@element-plus/icons-vue'

const playerStore = usePlayerStore()

const bannerList = [
  {
    id: 1,
    title: '周杰伦全新专辑上线',
    desc: '跨越20年的经典，全新编曲重制',
    bg: 'linear-gradient(135deg, #165DFF 0%, #4080FF 100%)',
    cover: 'https://picsum.photos/seed/banner1/600/320'
  },
  {
    id: 2,
    title: '华语金曲榜更新',
    desc: '本周TOP10新鲜出炉',
    bg: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
    cover: 'https://picsum.photos/seed/banner2/600/320'
  },
  {
    id: 3,
    title: '经典老歌怀旧专场',
    desc: '重温那些年我们一起追过的歌',
    bg: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    cover: 'https://picsum.photos/seed/banner3/600/320'
  }
]

const entryList = [
  { id: 1, name: '每日推荐', icon: h(Calendar), color: '#165DFF' },
  { id: 2, name: '私人FM', icon: h(Connection), color: '#6366F1' },
  { id: 3, name: '经典老歌', icon: h(Clock), color: '#F59E0B' },
  { id: 4, name: '新歌首发', icon: h(TrendCharts), color: '#10B981' },
  { id: 5, name: '热歌榜', icon: h(Star), color: '#EF4444' },
  { id: 6, name: '歌手分类', icon: h(User), color: '#8B5CF6' }
]

const recommendPlaylist = [
  { id: 1, name: '华语流行：治愈你的emo时刻', creator: '音乐小编', playCount: 1285632, cover: 'https://picsum.photos/seed/playlist1/300/300' },
  { id: 2, name: '开车必备：高速不犯困BGM', creator: '老司机歌单', playCount: 896521, cover: 'https://picsum.photos/seed/playlist2/300/300' },
  { id: 3, name: '学习白噪音：沉浸式专注', creator: '学习达人', playCount: 2356987, cover: 'https://picsum.photos/seed/playlist3/300/300' },
  { id: 4, name: '90后青春回忆杀', creator: '怀旧电台', playCount: 1569874, cover: 'https://picsum.photos/seed/playlist4/300/300' },
  { id: 5, name: '民谣在路上：诗和远方', creator: '民谣君', playCount: 785421, cover: 'https://picsum.photos/seed/playlist5/300/300' },
  { id: 6, name: '欧美热单：循环不腻', creator: '欧美音乐控', playCount: 1023654, cover: 'https://picsum.photos/seed/playlist6/300/300' },
  { id: 7, name: '日系治愈：温柔的晚风', creator: '日系音乐社', playCount: 658974, cover: 'https://picsum.photos/seed/playlist7/300/300' },
  { id: 8, name: '粤语经典：港乐黄金时代', creator: '港乐迷', playCount: 985632, cover: 'https://picsum.photos/seed/playlist8/300/300' },
  { id: 9, name: '说唱新世代：炸裂现场', creator: '说唱会馆', playCount: 856974, cover: 'https://picsum.photos/seed/playlist9/300/300' },
  { id: 10, name: '轻音乐：睡前放松必备', creator: '晚安电台', playCount: 3256987, cover: 'https://picsum.photos/seed/playlist10/300/300' }
]

const rankList = [
  {
    id: 1,
    name: '飙升榜',
    updateTime: '每日更新',
    bg: 'linear-gradient(135deg, #F59E0B 0%, #EF4444 100%)',
    songs: [
      { id: 1, name: '歌曲1', singer: '歌手A' },
      { id: 2, name: '歌曲2', singer: '歌手B' },
      { id: 3, name: '歌曲3', singer: '歌手C' }
    ]
  },
  {
    id: 2,
    name: '热歌榜',
    updateTime: '每周更新',
    bg: 'linear-gradient(135deg, #165DFF 0%, #4080FF 100%)',
    songs: [
      { id: 1, name: '歌曲1', singer: '歌手A' },
      { id: 2, name: '歌曲2', singer: '歌手B' },
      { id: 3, name: '歌曲3', singer: '歌手C' }
    ]
  },
  {
    id: 3,
    name: '新歌榜',
    updateTime: '每日更新',
    bg: 'linear-gradient(135deg, #10B981 0%, #34D399 100%)',
    songs: [
      { id: 1, name: '歌曲1', singer: '歌手A' },
      { id: 2, name: '歌曲2', singer: '歌手B' },
      { id: 3, name: '歌曲3', singer: '歌手C' }
    ]
  },
  {
    id: 4,
    name: '原创榜',
    updateTime: '每周更新',
    bg: 'linear-gradient(135deg, #8B5CF6 0%, #A78BFA 100%)',
    songs: [
      { id: 1, name: '歌曲1', singer: '歌手A' },
      { id: 2, name: '歌曲2', singer: '歌手B' },
      { id: 3, name: '歌曲3', singer: '歌手C' }
    ]
  }
]

const formatPlayCount = (count) => {
  if (count >= 10000) {
    return (count / 10000).toFixed(1) + '万'
  }
  return count.toString()
}
</script>

<style lang="scss" scoped>
.home-container {
  padding: 24px;
  width: 100%;
  min-height: 100%;
}

.banner-wrap {
  margin-bottom: 32px;
  border-radius: 12px;
  overflow: hidden;

  .banner-item {
    width: 100%;
    height: 100%;
    padding: 40px 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .banner-content {
      color: #fff;
      display: flex;
      flex-direction: column;
      gap: 16px;
      align-items: flex-start;

      .banner-title {
        font-size: 36px;
        font-weight: 700;
      }

      .banner-desc {
        font-size: 16px;
        opacity: 0.9;
      }
    }

    .banner-img {
      width: 320px;
      height: 240px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}

.quick-entry {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  margin-bottom: 40px;

  .entry-card {
    padding: 20px;
    border-radius: 12px;
    background-color: var(--bg-side);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;

    .entry-name {
      font-size: 14px;
      color: var(--text-main);
      font-weight: 500;
    }
  }
}

.section-wrap {
  margin-bottom: 40px;

  .section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;

    .section-title {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-main);
    }

    .more-btn {
      font-size: 14px;
      color: var(--text-secondary);
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: var(--primary-color);
      }
    }
  }
}

.playlist-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;

  .playlist-card {
    display: flex;
    flex-direction: column;
    gap: 8px;

    .playlist-cover {
      position: relative;
      width: 100%;
      aspect-ratio: 1/1;
      border-radius: 12px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      .play-mask {
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .play-count {
        position: absolute;
        top: 8px;
        right: 8px;
        font-size: 12px;
        color: #fff;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      }

      &:hover {
        img {
          transform: scale(1.05);
        }

        .play-mask {
          opacity: 1;
        }
      }
    }

    .playlist-name {
      font-size: 14px;
      color: var(--text-main);
      font-weight: 500;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .playlist-creator {
      font-size: 12px;
      color: var(--text-weak);
    }
  }
}

.rank-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  .rank-card {
    border-radius: 12px;
    overflow: hidden;
    background-color: var(--bg-card);
    border: 1px solid var(--border-color);

    .rank-header {
      padding: 20px;
      color: #fff;

      .rank-name {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 4px;
      }

      .rank-update {
        font-size: 12px;
        opacity: 0.9;
      }
    }

    .rank-song-list {
      padding: 12px;

      .rank-song-item {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 6px;
        transition: background-color 0.2s ease;
        cursor: pointer;

        &:hover {
          background-color: var(--bg-side);
        }

        .rank-num {
          width: 24px;
          font-size: 16px;
          font-weight: 700;
          color: var(--text-weak);
          text-align: center;

          &.top3 {
            color: var(--primary-color);
          }
        }

        .song-name {
          flex: 1;
          font-size: 14px;
          color: var(--text-main);
          margin-left: 12px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .singer-name {
          font-size: 12px;
          color: var(--text-weak);
          max-width: 80px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
