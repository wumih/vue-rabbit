<div align="center">

# 🛍️ 优选商城 (YouXuan Mall)

> 一个基于 **Vue 3 全家桶**构建的现代化 B2C 电商平台前端应用

[![Vue](https://img.shields.io/badge/Vue-3.2.45-4FC08D?style=flat-square&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.0.0-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Pinia](https://img.shields.io/badge/Pinia-2.0.28-F7D336?style=flat-square)](https://pinia.vuejs.org/)
[![Element Plus](https://img.shields.io/badge/Element_Plus-2.2.28-409EFF?style=flat-square)](https://element-plus.org/)
[![Axios](https://img.shields.io/badge/Axios-1.2.6-5A29E4?style=flat-square&logo=axios)](https://axios-http.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)

</div>

---

## 📖 项目简介

**优选商城**是一个功能完整的 B2C 电商前端项目，基于 Vue 3 Composition API 构建，涵盖商品浏览、分类筛选、搜索、购物车管理、订单结算、支付等完整业务链路。项目采用主流的工程化实践，提供流畅的用户体验与高可维护性的代码结构，适合作为 Vue3 全家桶学习与项目展示使用。

> **说明**：本项目由「小兔鲜」开源教学模板重构而来，已完成品牌视觉与文案层的全面替换，并修复了若干已知 Bug（详见 [CHANGELOG.md](./CHANGELOG.md)）。

---

## 🛠️ 核心技术栈

- **核心框架**：`Vue 3.2` + `Composition API` — 组合式 API，逻辑高度复用
- **构建工具**：`Vite 4` — 毫秒级热更新，开发体验极速
- **状态管理**：`Pinia 2` + `pinia-plugin-persistedstate` — 支持数据持久化（购物车、用户态）
- **路由管理**：`Vue Router 4` — 支持嵌套路由与路由守卫
- **UI 组件库**：`Element Plus 2` — 按需引入 + Sass 主题定制
- **网络请求**：`Axios` — 封装拦截器，统一处理 Token 注入和错误提示
- **CSS 方案**：`Sass (SCSS)` — 变量系统 + 全局样式自动注入
- **工具库**：`VueUse` — 组合式 API 工具集（懒加载、滚动监听等）、`dayjs` 时间处理

---

## 📁 目录结构

```
vue-rabbit/
├── public/              # 静态资源
├── src/
│   ├── apis/            # 接口层：所有 Axios 请求函数（按模块拆分）
│   ├── assets/          # 图片、字体等静态资源
│   ├── components/      # 全局公共组件（如骨架屏、图片懒加载等）
│   ├── composables/     # 封装的可复用逻辑 (Hooks)
│   ├── directives/      # 自定义指令（如图片懒加载 v-lazy）
│   ├── router/          # 路由配置
│   ├── stores/          # Pinia 状态模块（用户、购物车等）
│   ├── styles/          # 全局样式 & Element Plus 主题变量覆盖
│   ├── utils/           # 工具函数（Axios 实例、Token 管理等）
│   ├── views/           # 页面组件
│   │   ├── Home/        # 首页
│   │   ├── Category/    # 一级分类页
│   │   ├── SubCategory/ # 二级分类页
│   │   ├── Detail/      # 商品详情页
│   │   ├── CartList/    # 购物车
│   │   ├── Checkout/    # 订单结算页
│   │   ├── Pay/         # 支付页
│   │   ├── Member/      # 个人中心
│   │   ├── Login/       # 登录页
│   │   └── SearchResult.vue  # 搜索结果页
│   ├── App.vue          # 根组件
│   └── main.js          # 入口文件
├── index.html
├── vite.config.js       # Vite 构建配置（含 Element Plus 按需导入）
└── package.json
```

---

## 🚀 快速启动 (Quick Start)

### 1️⃣ 环境准备

请确保本地已安装以下环境：

| 工具 | 推荐版本 |
|---|---|
| Node.js | `>= 16.0.0` |
| npm | `>= 7.0.0` |

### 2️⃣ 安装项目依赖

```bash
# 克隆项目（如已在本地则跳过）
git clone https://github.com/wumih/vue-rabbit.git

# 进入项目根目录
cd vue-rabbit

# 安装依赖（请使用 npm 以保证 lock 文件的版本一致性）
npm install
```

### 3️⃣ 启动开发服务器

```bash
npm run dev
```

启动成功后，浏览器将自动打开 👉 **[http://localhost:3000](http://localhost:3000)**

### 4️⃣ 登录说明

> 本项目使用**前端 Mock 登录**模式，无需真实账号。

在登录页面，账号和密码随便填写即可（密码需 6-14 位）：

| 字段 | 填写要求 |
|---|---|
| 账号 | 任意手机号格式，如 `18610848230` |
| 密码 | 任意 6-14 位字符，如 `123456` |

### 5️⃣ 其他可用命令

```bash
npm run build    # 打包构建生产版本
npm run preview  # 预览生产构建结果
npm run lint     # ESLint 代码风格检查与自动修复
```

---

## ✨ 核心特性

- **🛒 完整购物链路**：商品浏览 → 加入购物车 → 订单结算 → 支付，全流程贯通
- **🔍 商品搜索**：支持关键词搜索并展示匹配商品列表
- **🗂️ 多级分类**：首页 → 一级分类 → 二级分类，商品体系清晰
- **🖼️ 图片懒加载**：基于 `IntersectionObserver` + 自定义指令 `v-lazy` 实现，优化首屏资源加载
- **💀 骨架屏**：数据请求期间展示占位骨架，提升视觉体验，避免空白闪烁
- **📦 状态持久化**：购物车数据和用户登录状态通过 Pinia 持久化插件写入 `localStorage`，刷新不丢失
- **🎨 主题定制**：通过 Sass 变量深度覆盖 Element Plus 默认主题色（深焙琥珀棕色系）
- **🧩 自动按需导入**：`unplugin-auto-import` + `unplugin-vue-components` 实现零手动 `import`
- **🔢 大整数兼容**：Axios `transformResponse` 层自动处理雪花算法 ID 精度问题，商品详情页全量可访问

---

## 📋 附录

- 更新日志请查看 [CHANGELOG.md](./CHANGELOG.md)
- 本项目基于 **MIT License** 开源，欢迎学习交流与二次开发
