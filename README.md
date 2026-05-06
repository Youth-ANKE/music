# 云音乐 - Vue3 音乐网站

基于 Vue3 + Vite 构建的音乐网站，集成全局音频播放、响应式布局、完整的界面模块。

## 功能特性

- 全局音频播放：全页面常驻播放控制栏，切换页面不中断播放
- 播放控制：播放/暂停、上下首切歌、进度拖拽、音量调节
- 播放模式：支持顺序播放、单曲循环、随机播放
- 完整首页：轮播 Banner、快捷入口、推荐歌单、官方榜单
- 全屏播放详情页：黑胶唱片旋转动效、实时歌词高亮滚动
- 响应式布局：适配 PC 端不同屏幕尺寸

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

访问 http://localhost:3000 查看网站

## 项目结构

```
music-web/
├── public/
├── src/
│   ├── assets/           # 资源文件
│   │   ├── css/          # 样式文件
│   │   └── images/       # 图片资源
│   ├── components/       # 公共组件
│   │   ├── Header.vue    # 顶部导航栏
│   │   ├── Sidebar.vue   # 左侧侧边栏
│   │   └── PlayerBar.vue # 底部播放栏
│   ├── router/          # 路由配置
│   ├── store/           # 状态管理
│   ├── views/           # 页面组件
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
└── package.json
```

## 技术栈

- Vue 3.4+
- Vite 5+
- Vue Router 4
- Pinia
- Element Plus
- Howler.js (音频播放)
- SCSS
