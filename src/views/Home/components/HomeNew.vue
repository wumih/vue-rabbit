<script setup>
// 导入所需组件和API
import HomePanel from './HomePanel.vue' // 面板容器组件
import { findNewAPI } from '@/apis/home' // 新鲜好物数据API
import { onMounted, ref } from 'vue' // Vue生命周期钩子和响应式API

// 获取新鲜好物商品数据
const newList = ref([]) // 定义响应式数据，用于存储新鲜好物商品列表

// 获取新鲜好物商品数据的异步函数
const getNewList = async () => {
  const res = await findNewAPI() // 调用API获取新鲜好物数据
  newList.value = res.result // 将返回结果赋值给响应式数据
}

// 在组件挂载时调用获取新鲜好物数据的函数
onMounted(() => getNewList())

</script>

<template>
  <!-- 使用HomePanel组件作为容器，传入标题和副标题 -->
  <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
    <!-- 新鲜好物商品列表 -->
    <ul class="goods-list">
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
  <!-- 下面是插槽主体内容模版（已注释掉）
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
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
</style>
