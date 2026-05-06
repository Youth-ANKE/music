#!/bin/bash

# 云音乐 - 一键启动脚本
# 适用于腾讯云CNB云原生开发容器环境

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   云音乐 - 一键启动脚本${NC}"
echo -e "${GREEN}========================================${NC}"

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# 1. 检测并安装 Node.js
echo -e "\n${YELLOW}[1/3] 检测 Node.js 环境...${NC}"
if ! command -v node &> /dev/null; then
    echo "Node.js 未安装，正在安装..."
    
    # 检测系统类型并安装
    if command -v apt-get &> /dev/null; then
        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
        apt-get install -y nodejs
    elif command -v yum &> /dev/null; then
        curl -fsSL https://rpm.nodesource.com/setup_20.x | bash -
        yum install -y nodejs
    elif command -v apk &> /dev/null; then
        apk add --no-cache nodejs npm
    else
        echo -e "${RED}无法自动安装 Node.js，请手动安装后重试${NC}"
        exit 1
    fi
fi

NODE_VERSION=$(node -v)
NPM_VERSION=$(npm -v)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION} 已就绪${NC}"
echo -e "${GREEN}✓ npm ${NPM_VERSION} 已就绪${NC}"

# 2. 安装项目依赖
echo -e "\n${YELLOW}[2/3] 安装项目依赖...${NC}"
if [ ! -d "node_modules" ]; then
    npm install
    echo -e "${GREEN}✓ 依赖安装完成${NC}"
else
    echo -e "${GREEN}✓ 依赖已存在，跳过安装${NC}"
fi

# 3. 启动开发服务器
echo -e "\n${YELLOW}[3/3] 启动开发服务器...${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   服务地址: http://localhost:3000${NC}"
echo -e "${GREEN}   按 Ctrl+C 停止服务${NC}"
echo -e "${GREEN}========================================${NC}\n"

npm run dev
