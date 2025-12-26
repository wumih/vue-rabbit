//二级分类页 （如“居家”下的“四件套”），通常包含筛选和排序功能。
<script setup>
// 二级分类页面组件 - SubCategory/index.vue
// 功能：展示特定分类下的商品列表，包括面包屑导航、排序标签页和商品列表展示

// 1. 导入依赖与组件
import { getCategoryFilterAPI, getSubCategoryAPI } from '@/apis/category'  // 导入分类相关API
import { onMounted, ref } from 'vue'  // Vue 3组合式API
import { useRoute } from 'vue-router'  // 路由工具
import GoodsItem from '../Home/components/GoodsItem.vue'  // 复用商品卡片组件

// 2. 面包屑导航功能
// 获取面包屑导航数据
const categoryData = ref({})  // 存储面包屑数据的响应式变量
const route = useRoute()  // 获取路由实例

// 请求面包屑导航数据的函数
const getCategoryData = async () => {
  const res = await getCategoryFilterAPI(route.params.id)  // 通过路由参数获取分类ID
  categoryData.value = res.result  // 保存返回结果
}

onMounted(() => getCategoryData())  // 组件挂载时调用函数

// 3. 商品列表数据获取与渲染
// 获取基础列表数据渲染
const goodList = ref([])  // 存储商品列表数据

// 请求参数配置
const reqData = ref({
  categoryId: route.params.id,  // 当前分类ID
  page: 1,  // 当前页码
  pageSize: 20,  // 每页显示数量
  sortField: 'publishTime'  // 默认排序字段：发布时间
})

// 请求商品列表数据的函数
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)  // 调用API获取商品数据
  console.log(res)  // 调试日志
  goodList.value = res.result.items  // 保存商品列表
}

onMounted(() => getGoodList())  // 组件挂载时调用函数

// 4. 排序标签页功能
// tab切换回调
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)  // 调试日志
  reqData.value.page = 1  // 切换排序条件时重置页码为1
  getGoodList()  // 重新请求数据
}

// 5. 加载更多功能
// 无限滚动加载更多
const disabled = ref(false)  // 是否禁用无限滚动，默认不禁用

// 加载更多数据的异步函数
const load = async () => {
  console.log('加载更多数据咯')  // 打印日志，用于调试
  
  // 获取下一页的数据
  reqData.value.page++  // 页码加1
  const res = await getSubCategoryAPI(reqData.value)  // 调用API获取下一页数据
  
  // 将新获取的数据追加到现有商品列表中
  goodList.value = [...goodList.value, ...res.result.items]
  
  // 如果返回的数据为空，表示没有更多数据了，禁用无限滚动
  if (res.result.items.length === 0) {
    disabled.value = true
  }
}
</script>

<template>
  <div class="container">
    <!-- 1. 面包屑导航区域 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 2. 商品列表主区域 -->
    <!-- 商品列表区域 -->
    <div class="sub-container">
      <!-- 排序标签 -->
      <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane> <!-- 按发布时间排序 -->
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane> <!-- 按销量排序 -->
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane> <!-- 按评论数量排序 -->
      </el-tabs>
      
      <!-- 商品列表区域（带无限滚动） -->
      <div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <!-- 使用GoodsItem组件渲染每个商品 -->
        <GoodsItem v-for="goods in goodList" :goods="goods" :key="goods.id" />
      </div>
    </div>
  </div>
</template>



<style lang="scss" scoped>
/* 面包屑导航样式 */
.bread-container {
  padding: 25px 0;
  color: #666;
}

/* 商品列表容器样式 */
.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  /* 商品列表内容区域 */
  .body {
    display: flex;
    flex-wrap: wrap; /* 商品项换行显示 */
    padding: 0 10px;
  }

  /* 商品项样式 */
  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    /* 商品图片样式 */
    img {
      width: 160px;
      height: 160px;
    }

    /* 商品文本内容样式 */
    p {
      padding-top: 10px;
    }

    /* 商品名称样式 */
    .name {
      font-size: 16px;
    }

    /* 商品描述样式 */
    .desc {
      color: #999;
      height: 29px;
    }

    /* 商品价格样式 */
    .price {
      color: $priceColor; /* 使用全局价格颜色变量 */
      font-size: 20px;
    }
  }

  /* 分页容器样式（目前未使用，保留备用） */
  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}
</style>