<script setup>
// 导入所需组件和API
import HomePanel from './HomePanel.vue' // 面板容器组件
import { getGoodsAPI } from '@/apis/home' // 商品数据API
import { onMounted, ref } from 'vue' // Vue生命周期钩子和响应式API
import GoodsItem from './GoodsItem.vue' // 商品项组件

// 获取商品分类及商品列表数据
const goodsProduct = ref([]) // 定义响应式数据，用于存储商品分类及商品列表

// 获取商品数据的异步函数
const getGoods = async () => {
  const res = await getGoodsAPI() // 调用API获取商品数据
  goodsProduct.value = res.result // 将返回结果赋值给响应式数据
}

// 在组件挂载时调用获取商品数据的函数
onMounted(() => getGoods())
</script>

<template>
  <!-- 商品展示区域容器 -->
  <div class="home-product">
    <!-- 遍历商品分类列表，为每个分类创建一个HomePanel面板 -->
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <!-- 分类封面图 -->
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <!-- 分类标签 -->
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 分类商品列表 -->
        <ul class="goods-list">
          <!-- 遍历分类下的商品列表，使用GoodsItem组件展示每个商品 -->
          <li v-for="goods in cate.goods" :key="goods.id">
            <GoodsItem :goods="goods" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<style scoped lang='scss'>
// 商品展示区域整体样式
.home-product {
  background: #fff; // 白色背景
  margin-top: 20px; // 顶部外边距

  // 分类标签样式（未使用，可能是预留）
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  // 分类商品展示框样式
  .box {
    display: flex; // 弹性布局

    // 分类封面图样式
    .cover {
      width: 240px; // 封面宽度
      height: 610px; // 封面高度
      margin-right: 10px; // 右侧外边距
      position: relative; // 相对定位，用于标签定位

      // 封面图片样式
      img {
        width: 100%;
        height: 100%;
      }

      // 分类标签样式
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute; // 绝对定位
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0); // 垂直居中

        span {
          text-align: center;

          // 第一个标签的样式
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9); // 深黑色背景
          }

          // 第二个标签的样式
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7); // 半透明黑色背景
          }
        }
      }
    }

    // 分类商品列表样式
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap; // 允许换行

      // 商品列表项样式
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        // 最后4个商品项清除底部外边距
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        // 每4个商品项清除右侧外边距
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>