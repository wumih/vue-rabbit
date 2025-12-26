<script setup>
// 吸顶导航组件 - 隐藏的彩蛋组件
// 功能：页面滚动时的固定导航栏
// 作用：当页面向下滚动，原来的LayoutHeader滚出屏幕后，
//      继续往下拉到一定距离（78px）时，该组件从浏览器顶部滑出并固定
//      方便用户在浏览长页面时不用滚回顶部就能切换分类或去购物车
// 实现逻辑：使用@vueuse/core的useScroll监听滚动距离，当y > 78时显示，否则隐藏
// 特点：LayoutHeader的简化版
import LayoutHeaderUl from './LayoutHeaderUl.vue'
// vueUse
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)


</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->

      <LayoutHeaderUl />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}
</style>
