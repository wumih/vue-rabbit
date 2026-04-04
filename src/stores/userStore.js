// 管理用户数据相关

import { defineStore } from 'pinia'
import { ref } from 'vue'
import { loginAPI } from '@/apis/user'
import { useCartStore } from './cartStore'
import { mergeCartAPI } from '@/apis/cart'
export const useUserStore = defineStore('user', () => {
  const cartStore = useCartStore()
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async ({ account, password }) => {
    // 屏蔽真实的 API 登录请求
    // const res = await loginAPI({ account, password })
    // userInfo.value = res.result

    // 替换为前端构造的伪造用户信息
    userInfo.value = {
      id: "10001",
      account: account,
      mobile: account || "18610848230",
      token: "mock-token-for-local-testing",
      avatar: "https://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-06/db628d42-88a7-4644-ba33-4752695022e3.png",
      nickname: "尊贵的优选商城会员"
    }

    // 注意：接下来的合并购物车等请求依赖真实后端的鉴权验证
    // 如果带着上面的模拟假 Token 去请求，就会遭到 401（未授权）拦截而报错中断程序
    // 因此在假登录模式中，必须同时将如下的真实后端请求给屏蔽注销掉：
    /*
    await mergeCartAPI(cartStore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartStore.updateNewList()
    */
  }

  // 退出时清除用户信息
  const clearUserInfo = () => {
    userInfo.value = {}
    // 执行清除购物车的action
    cartStore.clearCart()
  }
  // 3. 以对象的格式把state和action return
  return {
    userInfo,
    getUserInfo,
    clearUserInfo
  }
}, {
  persist: true,
})
