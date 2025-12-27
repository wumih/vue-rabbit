<script setup>
// 导入所需的API和Vue组合式API
import { getBannerAPI } from '@/apis/home' // 轮播图数据API
import { onMounted, ref } from 'vue' // Vue生命周期钩子和响应式API

// 定义响应式数据，用于存储轮播图列表
const bannerList = ref([])

// 获取轮播图数据的异步函数
const getBanner = async () => {
  const res = await getBannerAPI() // 调用API获取轮播图数据
  console.log(res) // 打印数据，用于调试
  bannerList.value = res.result // 将返回结果赋值给响应式数据
}

// 在组件挂载时调用获取轮播图数据的函数
onMounted(() => getBanner())

</script>



<template>
  <!-- 轮播图容器 -->
  <div class="home-banner">
    <!-- 骨架屏 -->
    <div v-if="bannerList.length === 0" class="skeleton-banner">
      <div class="skeleton-carousel-item"></div>
    </div>
    <!-- 正常内容 -->
    <el-carousel v-else height="500px">
      <!-- 遍历轮播图列表，为每个轮播项创建一个CarouselItem -->
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <!-- 轮播图图片 -->
        <img v-img-lazy="item.imgUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>



<style scoped lang='scss'>
// 轮播图样式
.home-banner {
  width: 1240px; // 轮播图宽度
  height: 500px; // 轮播图高度
  position: absolute; // 绝对定位
  left: 0;
  top: 0;
  z-index: 98; // 设置z-index确保在正确层级

  // 轮播图图片样式
  img {
    width: 100%; // 图片宽度占满容器
    height: 500px; // 图片高度
  }
}
  /* 骨架屏样式 */
  .skeleton-banner {
    width: 1240px;
    height: 500px;
    background: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    animation: skeleton-loading 1.5s infinite;
  }
  
  .skeleton-carousel-item {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
  }
  
  /* 骨架屏加载动画 */
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>