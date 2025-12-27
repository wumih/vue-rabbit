<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGoodsStore } from '@/stores/goodsStore'
import GoodsItem from '@/views/Home/components/GoodsItem.vue'

// 获取路由参数
const route = useRoute()
const router = useRouter()
// 获取商品数据仓库
const goodsStore = useGoodsStore()

// 搜索关键词
const keyword = computed(() => route.query.keyword || '')
// 搜索结果
const searchResults = ref([])
// 加载状态
const isLoading = ref(false)
// 搜索输入框的值
const searchInput = ref(keyword.value)

// 执行搜索
const performSearch = () => {
  if (!keyword.value) {
    searchResults.value = []
    return
  }
  
  isLoading.value = true
  // 模拟搜索延迟
  setTimeout(() => {
    searchResults.value = goodsStore.searchGoods(keyword.value)
    isLoading.value = false
  }, 500)
}

// 重新搜索
const handleSearch = () => {
  if (searchInput.value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: searchInput.value.trim() }
    })
  }
}

// 监听关键词变化
watch(keyword, () => {
  searchInput.value = keyword.value
  performSearch()
}, { immediate: true })
</script>

<template>
  <div class="search-result-container">
    <!-- 搜索头部 -->
    <div class="search-header">
      <div class="container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchInput"
            placeholder="请输入搜索关键词"
            @keyup.enter="handleSearch"
          >
          <button class="search-btn" @click="handleSearch">搜索</button>
        </div>
      </div>
    </div>
    
    <!-- 搜索结果区域 -->
    <div class="search-content">
      <div class="container">
        <!-- 搜索统计 -->
        <div v-if="keyword" class="search-stats">
          <span>搜索关键词：{{ keyword }}</span>
          <span v-if="!isLoading">共找到 {{ searchResults.length }} 个相关商品</span>
        </div>
        
        <!-- 骨架屏 -->
        <div v-if="isLoading" class="skeleton-results">
          <div class="skeleton-item" v-for="i in 12" :key="i">
            <div class="skeleton-image"></div>
            <div class="skeleton-info">
              <div class="skeleton-name"></div>
              <div class="skeleton-price"></div>
            </div>
          </div>
        </div>
        
        <!-- 搜索结果列表 -->
        <div v-else-if="searchResults.length > 0" class="results-list">
          <GoodsItem 
            v-for="item in searchResults" 
            :key="item.id" 
            :goods="item" 
          />
        </div>
        
        <!-- 无结果 -->
        <div v-else-if="keyword" class="no-results">
          <div class="no-results-content">
            <i class="iconfont icon-search"></i>
            <h3>未找到相关商品</h3>
            <p>请尝试其他关键词</p>
          </div>
        </div>
        
        <!-- 默认提示 -->
        <div v-else class="default-tip">
          <h3>请输入关键词搜索商品</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.search-result-container {
  background-color: #f5f5f5;
  min-height: calc(100vh - 132px);
}

.search-header {
  background-color: #fff;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  .container {
    display: flex;
    justify-content: center;
  }
  
  .search-box {
    display: flex;
    width: 600px;
    
    input {
      flex: 1;
      height: 40px;
      padding: 0 15px;
      border: 1px solid #ddd;
      border-right: none;
      border-radius: 4px 0 0 4px;
      font-size: 16px;
      
      &:focus {
        outline: none;
        border-color: #27ba9b;
      }
    }
    
    .search-btn {
      width: 80px;
      height: 40px;
      background-color: #27ba9b;
      color: #fff;
      border: none;
      border-radius: 0 4px 4px 0;
      cursor: pointer;
      font-size: 16px;
      
      &:hover {
        background-color: #23a488;
      }
    }
  }
}

.search-content {
  padding: 30px 0;
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .search-stats {
    background-color: #fff;
    padding: 15px 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    span {
      margin-right: 20px;
      color: #666;
    }
  }
  
  // 骨架屏样式
  .skeleton-results {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    
    .skeleton-item {
      background-color: #fff;
      padding: 15px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      
      .skeleton-image {
        width: 100%;
        height: 200px;
        background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
        background-size: 200% 100%;
        animation: skeleton-loading 1.5s infinite;
        border-radius: 4px;
        margin-bottom: 15px;
      }
      
      .skeleton-info {
        display: flex;
        flex-direction: column;
        gap: 10px;
        
        .skeleton-name {
          width: 80%;
          height: 20px;
          background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite 0.2s;
          border-radius: 4px;
        }
        
        .skeleton-price {
          width: 60%;
          height: 20px;
          background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 50%, #f2f2f2 75%);
          background-size: 200% 100%;
          animation: skeleton-loading 1.5s infinite 0.4s;
          border-radius: 4px;
        }
      }
    }
  }
  
  // 搜索结果列表
  .results-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
  }
  
  // 无结果样式
  .no-results {
    text-align: center;
    padding: 100px 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    .no-results-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      
      i {
        font-size: 64px;
        color: #ccc;
        margin-bottom: 20px;
      }
      
      h3 {
        font-size: 20px;
        color: #999;
        margin-bottom: 10px;
      }
      
      p {
        color: #ccc;
        font-size: 14px;
      }
    }
  }
  
  // 默认提示
  .default-tip {
    text-align: center;
    padding: 100px 0;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    h3 {
      font-size: 20px;
      color: #999;
    }
  }
}

// 骨架屏动画
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>