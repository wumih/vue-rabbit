<script setup>
// 定义组件属性
// 注意：tppe是拼写错误，应该是type
const props = defineProps({
  goods: {
    type: Object, // 商品数据对象
    default: () => { } // 默认值为空对象
  }
})
</script>


<template>
  <!-- 商品项组件，使用RouterLink实现跳转 -->
  <RouterLink :to="`/detail/${goods.id}`" class="goods-item">
    <!-- 商品图片，使用自定义指令v-img-lazy实现图片懒加载 -->
    <img v-img-lazy="goods.picture" alt="" />
    <!-- 商品名称，使用ellipsis类实现文本溢出省略 -->
    <p class="name ellipsis">{{ goods.name }}</p>
    <!-- 商品描述，使用ellipsis类实现文本溢出省略 -->
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <!-- 商品价格 -->
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
// 商品项样式
.goods-item {
  display: block; // 转换为块级元素
  width: 220px; // 固定宽度
  padding: 20px 30px; // 内边距
  text-align: center; // 文本居中
  transition: all .5s; // 过渡动画效果

  // 鼠标悬停效果
  &:hover {
    transform: translate3d(0, -3px, 0); // 向上平移3px
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%); // 添加阴影
  }

  // 商品图片样式
  img {
    width: 160px;
    height: 160px;
  }

  // 段落通用样式
  p {
    padding-top: 10px;
  }

  // 商品名称样式
  .name {
    font-size: 16px;
  }

  // 商品描述样式
  .desc {
    color: #999;
    height: 29px;
  }

  // 商品价格样式
  .price {
    color: $priceColor; // 使用SCSS变量定义价格颜色
    font-size: 20px;
  }
}
</style>