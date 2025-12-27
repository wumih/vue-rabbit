<script setup>
// 导入所需组件和API
import HomePanel from './HomePanel.vue' // 面板容器组件
import { findNewAPI } from '@/apis/home' // 新鲜好物数据API
import { onMounted, ref } from 'vue' // Vue生命周期钩子和响应式API
import { useGoodsStore } from '@/stores/goodsStore' // 导入商品数据仓库

// 获取新鲜好物商品数据
const newList = ref([]) // 定义响应式数据，用于存储新鲜好物商品列表

// 获取商品数据仓库实例
const goodsStore = useGoodsStore()

// 获取新鲜好物商品数据的异步函数
const getNewList = async () => {
  const res = await findNewAPI() // 调用API获取新鲜好物数据
  newList.value = res.result // 将返回结果赋值给响应式数据
  goodsStore.collectGoods(res.result) // 收集商品数据用于搜索
}

// 在组件挂载时调用获取新鲜好物数据的函数
onMounted(() => getNewList())

</script>

<template>
  <!-- 使用HomePanel组件作为容器，传入标题和副标题 -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <!-- 骨架屏 -->
    <div v-if="newList.length === 0" class="skeleton-goods-list">
      <div class="skeleton-goods-item" v-for="i in 4" :key="i">
        <div class="skeleton-image"></div>
        <div class="skeleton-name"></div>
        <div class="skeleton-price"></div>
      </div>
    </div>
    <!-- 新鲜好物商品列表 -->
    <ul v-else class="goods-list">
      <!-- 遍历新鲜好物商品列表，为每个商品创建一个列表项 -->
      <li v-for="item in newList" :key="item.id">
        <!-- 使用动态路由链接到商品详情页 -->
        <RouterLink :to="`/detail/${item.id}`">
          <!-- 商品图片 -->
          <img v-img-lazy="item.picture" alt="" />
          <!-- 商品名称 -->
          <p class="name">{{ item.name }}</p>
          <!-- 商品价格 -->
          <p class="price">&yen;{{ item.price }}</p>
        </RouterLink>
      </li>
    </ul>
  </HomePanel>
</template>


<style scoped lang='scss'>
// 新鲜好物商品列表样式
.goods-list {
  display: flex; // 弹性布局
  justify-content: space-between; // 两端对齐，商品之间有相同间距
  height: 406px; // 列表容器高度

  li {
    width: 306px; // 商品项宽度
    height: 406px; // 商品项高度
    background: #f0f9f4; // 浅绿色背景
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
      text-overflow: ellipsis; // 文本溢出显示省略号
      overflow: hidden;
      white-space: nowrap; // 禁止文本换行
    }

    // 商品价格样式
    .price {
      color: $priceColor; // 使用SCSS变量定义价格颜色
    }
  }
}

// 骨架屏样式
.skeleton-goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  
  .skeleton-goods-item {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
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
      width: 80%;
      height: 22px;
      margin-top: 12px;
      background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
      background-size: 200% 100%;
      animation: skeleton-loading 1.5s infinite;
      border-radius: 4px;
    }
    
    .skeleton-price {
      width: 60%;
      height: 22px;
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
      background: #f0f9f4;
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
        width: 80%;
        height: 22px;
        background: #f2f2f2;
        border-radius: 4px;
        margin-bottom: 10px;
        animation: skeleton-loading 1.5s infinite 0.2s;
      }
      
      .skeleton-price {
        width: 60%;
        height: 22px;
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
