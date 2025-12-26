<script setup>
// 导入Home页面所需的所有子组件
import HomeCategory from './components/HomeCategory.vue' // 分类导航组件
import HomeBanner from './components/HomeBanner.vue' // 轮播图组件
import HomeNew from './components/HomeNew.vue' // 新鲜好物组件
import HomeHot from './components/HomeHot.vue' // 人气推荐组件
import HomeProduct from './components/HomeProduct.vue' // 商品展示组件
</script>

<template>
  <!-- 首页布局结构 -->
  <div class="container">
    <!-- 左侧分类导航和右侧轮播图 -->
    <HomeCategory />
    <HomeBanner />
  </div>
  <!-- 新鲜好物区域 -->
  <HomeNew />
  <!-- 人气推荐区域 -->
  <HomeHot />
  <!-- 商品展示区域 -->
  <HomeProduct />
</template>