import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: '首页 - 音乐网站' }
  },
  {
    path: '/playlist',
    name: 'Playlist',
    component: () => import('../views/PlayList.vue'),
    meta: { title: '歌单 - 音乐网站' }
  },
  {
    path: '/player',
    name: 'PlayerDetail',
    component: () => import('../views/PlayerDetail.vue'),
    meta: { title: '播放详情 - 音乐网站' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫修改页面标题
router.beforeEach((to) => {
  document.title = to.meta.title || '音乐网站'
})

export default router
