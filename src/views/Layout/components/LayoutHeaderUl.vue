<script setup>
// 头部导航菜单组件 - 中间的分类导航菜单
// 功能：循环展示一级分类列表（首页、居家、美食...）
// 作用：将导航菜单渲染逻辑从LayoutHeader.vue中抽离，减少主组件代码臃肿
// 数据来源：从categoryStore (Pinia) 获取分类列表数据
import { useCategoryStore } from '@/stores/categoryStore'
const categoryStore = useCategoryStore()
</script>


<template>
  <ul class="app-header-nav">
    <li class="home">
      <RouterLink to="/">首页</RouterLink>
    </li>
    <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
      <RouterLink active-class="active" :to="`/category/${item.id}`">
        {{ item.name }}
      </RouterLink>
    </li>
  </ul>
</template>


<style lang="scss">
.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>