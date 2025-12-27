<script setup>
// 导入所需组件和API
import HomePanel from './HomePanel.vue' // 面板容器组件
import { getHotAPI } from '@/apis/home' // 人气推荐数据API
import { onMounted, ref } from 'vue' // Vue生命周期钩子和响应式API
import { useGoodsStore } from '@/stores/goodsStore' // 导入商品数据仓库

// 定义响应式数据，用于存储人气推荐商品列表
const hotList = ref([])

// 获取商品数据仓库实例
const goodsStore = useGoodsStore()

// 获取人气推荐商品数据的异步函数
const getHotList = async () => {
  const res = await getHotAPI() // 调用API获取人气推荐数据
  hotList.value = res.result // 将返回结果赋值给响应式数据
  goodsStore.collectGoods(res.result) // 收集商品数据用于搜索
}

// 在组件挂载时调用获取人气推荐数据的函数
onMounted(() => getHotList())

</script>

<template>
  <!-- 使用HomePanel组件作为容器，传入标题和副标题 -->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <!-- 骨架屏 -->
    <div v-if="hotList.length === 0" class="skeleton-goods-list">
      <div class="skeleton-goods-item" v-for="i in 4" :key="i">
        <div class="skeleton-image"></div>
        <div class="skeleton-name"></div>
        <div class="skeleton-desc"></div>
      </div>
    </div>
    <!-- 人气推荐商品列表 -->
    <ul v-else class="goods-list">
      <!-- 遍历人气推荐商品列表，为每个商品创建一个列表项 -->
      <li v-for="item in hotList" :key="item.id">
        <RouterLink to="/">
          <!-- 商品图片，使用自定义指令v-img-lazy实现图片懒加载 -->
          <img v-img-lazy="item.picture" alt="">
          <!-- 商品标题 -->
          <p class="name">{{ item.title }}</p>
          <!-- 商品描述 -->
          <p class="desc">{{ item.alt }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>

<style scoped lang='scss'>
// 人气推荐商品列表样式
.goods-list {
  display: flex; // 弹性布局
  justify-content: space-between; // 两端对齐，商品之间有相同间距
  height: 426px; // 列表容器高度

  li {
    width: 306px; // 商品项宽度
    height: 406px; // 商品项高度
    transition: all .5s; // 过渡动画效果

    // 鼠标悬停效果
    &:hover {
      transform: translate3d(0, -3px, 0); // 向上平移3px
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%); // 添加阴影
    }

    // 商品图片样式
    img {
      width: 306px;
      height: 306px;
    }

    // 段落通用样式
    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    // 商品描述样式
    .desc {
      color: #999; // 灰色文字
      font-size: 18px;
    }
  }
}

// 骨架屏样式
.skeleton-goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;
  
  .skeleton-goods-item {
    width: 306px;
    height: 406px;
    padding: 20px;
    box-sizing: border-box;
    
    .skeleton-image {
      width: 100%;
      height: 306px;
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 8px;
    }
    
    .skeleton-name {
      width: 90%;
      height: 22px;
      margin-top: 12px;
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
    }
    
    .skeleton-desc {
      width: 80%;
      height: 18px;
      margin-top: 12px;
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
  /* 骨架屏样式 */
  .skeleton-goods-list {
    display: flex;
    justify-content: space-between;
    height: 406px;
    
    .skeleton-goods-item {
      width: 306px;
      height: 406px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
      
      .skeleton-image {
        width: 266px;
        height: 266px;
        background: #f2f2f2;
        border-radius: 4px;
        margin-bottom: 20px;
        animation: skeleton-loading 1.5s infinite;
      }
      
      .skeleton-name {
        width: 90%;
        height: 22px;
        background: #f2f2f2;
        border-radius: 4px;
        margin-bottom: 10px;
        animation: skeleton-loading 1.5s infinite 0.2s;
      }
      
      .skeleton-desc {
        width: 80%;
        height: 18px;
        background: #f2f2f2;
        border-radius: 4px;
        animation: skeleton-loading 1.5s infinite 0.4s;
      }
    }
  }
  
  /* 骨架屏加载动画 */
  @keyframes skeleton-loading {
    0% { background: #f2f2f2; }
    50% { background: #e6e6e6; }
    100% { background: #f2f2f2; }
  }
</style>