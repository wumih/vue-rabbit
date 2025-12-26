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
    <!-- 使用Element Plus的Carousel组件实现轮播效果 -->
    <el-carousel height="500px">
      <!-- 遍历轮播图列表，为每个轮播项创建一个CarouselItem -->
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <!-- 轮播图图片 -->
        <img :src="item.imgUrl" alt="">
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
</style>