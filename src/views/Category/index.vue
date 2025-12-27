<script setup>

import GoodsItem from '../Home/components/GoodsItem.vue'
import { useBanner } from './composables/useBanner'
import { useCategory } from './composables/useCategory'
const { bannerList } = useBanner()
const { categoryData } = useCategory()


</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name || '分类' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <!-- 轮播图骨架屏 -->
        <div v-if="bannerList.length === 0" class="banner-skeleton">
          <div class="skeleton-carousel"></div>
        </div>
        <!-- 真实轮播图 -->
        <el-carousel v-else height="500px">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img v-img-lazy="item.imgUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类列表 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <!-- 分类列表骨架屏 -->
        <div v-if="categoryData.children && categoryData.children.length === 0" class="skeleton-container">
          <div class="skeleton-sub-item" v-for="i in 8" :key="i">
            <div class="skeleton-sub-image"></div>
            <div class="skeleton-sub-name"></div>
          </div>
        </div>
        <!-- 真实分类列表 -->
        <ul v-else>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink :to="`/category/sub/${i.id}`">
              <img v-img-lazy="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 推荐商品 -->
      <!-- 推荐商品骨架屏 -->
      <div v-if="categoryData.children && categoryData.children.length === 0" class="ref-goods skeleton-ref-goods">
        <div class="head">
          <h3>- 分类推荐 -</h3>
        </div>
        <div class="body">
          <div class="skeleton-goods-item" v-for="i in 6" :key="i"></div>
        </div>
      </div>
      <!-- 真实推荐商品 -->
      <div v-else class="ref-goods" v-for="item in categoryData.children" :key="item.id">
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }

  /* 骨架屏样式 */
  .banner-skeleton {
    width: 1240px;
    height: 500px;
    margin: 0 auto;
    .skeleton-carousel {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
    }
  }

  .skeleton-container {
    display: flex;
    padding: 0 32px;
    flex-wrap: wrap;
  }

  .skeleton-sub-item {
    width: 168px;
    height: 160px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .skeleton-sub-image {
    width: 100px;
    height: 100px;
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 8px;
  }

  .skeleton-sub-name {
    width: 80px;
    height: 20px;
    margin-top: 10px;
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 4px;
  }

  .skeleton-ref-goods .body {
    display: flex;
    flex-wrap: wrap;
  }

  .skeleton-goods-item {
    width: 220px;
    height: 300px;
    margin: 0 10px 20px;
    background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
    border-radius: 8px;
  }

  /* 骨架屏动画 */
  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
}

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;


  img {
    width: 100%;
    height: 500px;
  }
}
</style>
