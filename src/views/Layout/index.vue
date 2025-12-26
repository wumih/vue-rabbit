<!-- 这个文件夹对应的是小兔鲜项目的 “一级路由页面”——Layout（布局容器） 。
你可以把它理解为整个商城的 “画框” 或者 “骨架” 。

在电商网站中，无论你点“首页”、“居家分类”还是“美食分类”，你会发现： 顶部的导航栏和底部的版权信息是永远不动的，只有中间的内容在变。

Layout 文件夹就是为了实现这个效果：它把不变的部分（头和尾）固定好，中间留个坑给子页面变。 -->
<script setup>
// Layout组件整体结构
// +-------------------------------------------------------+
// |  LayoutNav.vue (顶部通栏：登录/注册)                   |
// +-------------------------------------------------------+
// |  LayoutHeader.vue (头部：Logo | 导航菜单 | 搜索 | 购物车) |
// +-------------------------------------------------------+
// |  LayoutFixed.vue (吸顶导航：平时隐藏，滚动下来才出现)     |
// +-------------------------------------------------------+
// |                                                       |
// |           <RouterView />                              |
// |                                                       |
// |      (这里是变魔术的地方！会根据路由变成：)               |
// |      - 首页 (Home/index.vue)                          |
// |      - 分类页 (Category/index.vue)                    |
// |      - ...                                            |
// |                                                       |
// +-------------------------------------------------------+
// |  LayoutFooter.vue (底部：版权信息)                     |
// +-------------------------------------------------------+

import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 触发获取导航列表的action

import { useCategoryStore } from '@/stores/categoryStore'
import { onMounted } from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => categoryStore.getCategory())
</script>
<!-- - 作用 ：当你访问首页 / 或分类页 /category 时，显示的其实都是这个 index.vue 。 它负责保持头尾不动，只在 <RouterView /> 那个位置切换显示 Home 或 Category 组件。
- 代码逻辑 ：通常还会在这里触发获取导航分类数据的 Action（因为导航栏是全局通用的）。 -->
<template>

  <LayoutFixed />

  <LayoutNav />

  <LayoutHeader />
  <!-- 添加key 破坏复用机制 强制销毁重建 -->
  <!-- <RouterView :key="$route.fullPath" /> -->

  <RouterView />

  <LayoutFooter />
</template>
