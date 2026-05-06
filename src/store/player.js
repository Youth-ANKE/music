import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { Howl } from 'howler'

// 模拟歌曲数据（可替换为后端接口数据）
export const mockSongs = [
  {
    id: 1,
    name: '夜曲',
    singer: '周杰伦',
    album: '十一月的萧邦',
    cover: 'https://picsum.photos/seed/zhoujielun1/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    duration: 338,
    lrc: '[00:00.00]夜曲 - 周杰伦\n[00:05.00]作词：方文山\n[00:10.00]作曲：周杰伦\n[00:15.00]一群嗜血的蚂蚁 被腐肉所吸引\n[00:19.00]我面无表情 看孤独的风景'
  },
  {
    id: 2,
    name: '七里香',
    singer: '周杰伦',
    album: '七里香',
    cover: 'https://picsum.photos/seed/zhoujielun2/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    duration: 299,
    lrc: '[00:00.00]七里香 - 周杰伦\n[00:05.00]窗外的麻雀 在电线杆上多嘴\n[00:10.00]你说这一句 很有夏天的感觉'
  },
  {
    id: 3,
    name: '青花瓷',
    singer: '周杰伦',
    album: '我很忙',
    cover: 'https://picsum.photos/seed/zhoujielun3/400/400',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    duration: 239,
    lrc: '[00:00.00]青花瓷 - 周杰伦\n[00:05.00]素胚勾勒出青花笔锋浓转淡\n[00:10.00]瓶身描绘的牡丹一如你初妆'
  }
]

// 播放模式枚举
export const PlayMode = {
  ORDER: 'order',
  LOOP: 'loop',
  RANDOM: 'random'
}

export const usePlayerStore = defineStore('player', () => {
  // 状态定义
  const playList = ref(mockSongs)
  const currentIndex = ref(0)
  const isPlaying = ref(false)
  const currentTime = ref(0)
  const volume = ref(0.7)
  const playMode = ref(PlayMode.ORDER)
  const audioInstance = ref(null)

  // 计算属性
  const currentSong = computed(() => playList.value[currentIndex.value])
  const duration = computed(() => audioInstance.value?.duration() || currentSong.value?.duration || 0)
  const progress = computed(() => {
    if (duration.value === 0) return 0
    return (currentTime.value / duration.value) * 100
  })

  // 初始化音频实例
  const initAudio = (song) => {
    if (audioInstance.value) {
      audioInstance.value.unload()
    }

    audioInstance.value = new Howl({
      src: [song.url],
      html5: true,
      volume: volume.value,
      onload: () => {
        currentTime.value = 0
      },
      onplay: () => {
        isPlaying.value = true
        updateProgress()
      },
      onpause: () => {
        isPlaying.value = false
      },
      onend: () => {
        nextSong()
      },
      onstop: () => {
        isPlaying.value = false
        currentTime.value = 0
      }
    })
  }

  // 进度更新函数
  const updateProgress = () => {
    if (!audioInstance.value) return
    if (isPlaying.value) {
      currentTime.value = audioInstance.value.seek() || 0
      requestAnimationFrame(updateProgress)
    }
  }

  // 播放/暂停
  const togglePlay = () => {
    if (!audioInstance.value) {
      playSong(currentIndex.value)
      return
    }
    if (isPlaying.value) {
      audioInstance.value.pause()
    } else {
      audioInstance.value.play()
    }
  }

  // 播放指定索引的歌曲
  const playSong = (index) => {
    if (index < 0 || index >= playList.value.length) return
    currentIndex.value = index
    const song = playList.value[index]
    initAudio(song)
    audioInstance.value.play()
  }

  // 上一首
  const prevSong = () => {
    let targetIndex
    if (playMode.value === PlayMode.RANDOM) {
      targetIndex = Math.floor(Math.random() * playList.value.length)
    } else {
      targetIndex = currentIndex.value - 1 < 0 ? playList.value.length - 1 : currentIndex.value - 1
    }
    playSong(targetIndex)
  }

  // 下一首
  const nextSong = () => {
    let targetIndex
    if (playMode.value === PlayMode.RANDOM) {
      targetIndex = Math.floor(Math.random() * playList.value.length)
    } else if (playMode.value === PlayMode.LOOP) {
      targetIndex = currentIndex.value
    } else {
      targetIndex = currentIndex.value + 1 >= playList.value.length ? 0 : currentIndex.value + 1
    }
    playSong(targetIndex)
  }

  // 设置播放进度
  const setProgress = (percent) => {
    if (!audioInstance.value || !duration.value) return
    const targetTime = (percent / 100) * duration.value
    audioInstance.value.seek(targetTime)
    currentTime.value = targetTime
  }

  // 设置音量
  const setVolume = (val) => {
    volume.value = val
    if (audioInstance.value) {
      audioInstance.value.volume(val)
    }
  }

  // 切换播放模式
  const togglePlayMode = () => {
    const modes = Object.values(PlayMode)
    const currentModeIndex = modes.indexOf(playMode.value)
    playMode.value = modes[(currentModeIndex + 1) % modes.length]
  }

  // 监听音量变化
  watch(volume, (newVal) => {
    if (audioInstance.value) {
      audioInstance.value.volume(newVal)
    }
  })

  return {
    playList,
    currentIndex,
    isPlaying,
    currentTime,
    volume,
    playMode,
    currentSong,
    duration,
    progress,
    togglePlay,
    playSong,
    prevSong,
    nextSong,
    setProgress,
    setVolume,
    togglePlayMode,
    PlayMode
  }
})
