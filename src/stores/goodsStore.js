import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGoodsStore = defineStore('goods', () => {
  // 存储所有商品数据
  const allGoods = ref([])

  // 收集商品数据（从各个组件）
  const collectGoods = (goods) => {
    if (Array.isArray(goods)) {
      // 去重处理
      const existingIds = new Set(allGoods.value.map(item => item.id))
      const newGoods = goods.filter(item => !existingIds.has(item.id))
      allGoods.value = [...allGoods.value, ...newGoods]
    } else if (goods && goods.id) {
      // 单个商品的情况
      if (!allGoods.value.find(item => item.id === goods.id)) {
        allGoods.value.push(goods)
      }
    }
  }

  // 搜索商品
  const searchGoods = (keyword) => {
    if (!keyword || keyword.trim() === '') {
      return []
    }
    const lowerKeyword = keyword.toLowerCase()
    return allGoods.value.filter(item => {
      // 搜索名称、标题、描述等字段
      return (
        (item.name && item.name.toLowerCase().includes(lowerKeyword)) ||
        (item.title && item.title.toLowerCase().includes(lowerKeyword)) ||
        (item.desc && item.desc.toLowerCase().includes(lowerKeyword)) ||
        (item.alt && item.alt.toLowerCase().includes(lowerKeyword)) ||
        (item.attrs && JSON.stringify(item.attrs).toLowerCase().includes(lowerKeyword))
      )
    })
  }

  // 清空商品数据
  const clearGoods = () => {
    allGoods.value = []
  }

  return {
    allGoods,
    collectGoods,
    searchGoods,
    clearGoods
  }
})