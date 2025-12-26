<script setup>
// 导入所需组件和API
import HomePanel from './HomePanel.vue' // 面板容器组件
import { getHotAPI } from '@/apis/home' // 人气推荐数据API
import { onMounted, ref } from 'vue' // Vue生命周期钩子和响应式API

// 定义响应式数据，用于存储人气推荐商品列表
const hotList = ref([])

// 获取人气推荐商品数据的异步函数
const getHotList = async () => {
  const res = await getHotAPI() // 调用API获取人气推荐数据
  hotList.value = res.result // 将返回结果赋值给响应式数据
}

// 在组件挂载时调用获取人气推荐数据的函数
onMounted(() => getHotList())

</script>

<template>
  <!-- 使用HomePanel组件作为容器，传入标题和副标题 -->
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <!-- 人气推荐商品列表 -->
    <ul class="goods-list">
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
</style>