// axios基础的封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/userStore'
const httpInstance = axios.create({
  baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
  // 在浏览器解析 JSON 之前，把所有超过 15 位的大数字 ID 转为字符串
  // 目的：解决 JavaScript 大整数精度丢失问题（如雪花算法生成的 19 位 ID 会被截断）
  transformResponse: [
    (data) => {
      // 类型守卫：只处理字符串类型（有时 data 可能是非 JSON 内容）
      if (typeof data !== 'string') return data
      try {
        // 正则说明：
        // :(\s*)    → 冒号后允许有空白
        // (\d{16,}) → 捕获 16 位以上的纯数字
        // \s*       → 数字后允许有空白（兼容格式化 JSON）
        // ([,}\]])  → 数字后必须紧跟 , } ] 三者之一
        const fixed = data.replace(/:(\s*)(\d{16,})\s*([,\}\]])/g, ':"$2"$3')
        return JSON.parse(fixed)
      } catch (e) {
        // 降级处理：如果大数字修复后仍然解析失败，尝试直接解析原始数据
        try { return JSON.parse(data) } catch { return data }
      }
    }
  ]
})

// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 1. 从pinia获取token数据
  const userStore = useUserStore()
  // 2. 按照后端的要求拼接token数据
  const token = userStore.userInfo.token
  // 如果是真实 Token 才发给后端，避免假 Token 导致后端的公共接口也报错 401
  if (token && token !== 'mock-token-for-local-testing') {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})


export default httpInstance
