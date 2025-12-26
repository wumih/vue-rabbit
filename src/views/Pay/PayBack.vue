<!-- 
  支付回调页面组件 (PayBack)
  - 功能：展示支付结果（成功或失败）
  - 数据：通过API获取订单详情
  - 交互：提供查看订单和返回首页的按钮
-->
<script setup>
// 导入API函数
import { getOrderAPI } from '@/apis/pay'
// 导入Vue组合式API
import { onMounted, ref } from 'vue'
// 导入路由工具
import { useRoute } from 'vue-router'
// 路由和订单数据
const route = useRoute() // 获取当前路由信息
const orderInfo = ref({}) // 存储订单详情

// 获取订单详情的异步函数
const getOrderInfo = async () => {
  // 调用API获取订单详情，传入路由参数中的订单ID
  const res = await getOrderAPI(route.query.orderId)
  // 将API返回的结果赋值给orderInfo
  orderInfo.value = res.result
}

// 组件挂载时调用获取订单详情的函数
onMounted(() => getOrderInfo())

</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 支付结果展示区域 -->
      <div class="pay-result">
        <!-- 根据路由参数判断支付结果并显示不同图标 -->
        <!-- 注意：路由参数获取到的是字符串而不是布尔值 -->
        <span class="iconfont icon-queren2 green" v-if="$route.query.payResult === 'true'"></span> <!-- 支付成功图标 -->
        <span class="iconfont icon-shanchu red" v-else></span> <!-- 支付失败图标 -->
        
        <!-- 显示支付结果标题 -->
        <p class="tit">支付{{ $route.query.payResult === 'true' ? '成功' : '失败' }}</p>
        
        <!-- 提示信息 -->
        <p class="tip">我们将尽快为您发货，收货期间请保持手机畅通</p>
        
        <!-- 支付信息 -->
        <p>支付方式：<span>支付宝</span></p> <!-- 支付方式 -->
        <p>支付金额：<span>¥{{ orderInfo.payMoney?.toFixed(2) }}</span></p> <!-- 支付金额 -->
        
        <!-- 操作按钮 -->
        <div class="btn">
          <el-button type="primary" style="margin-right:20px">查看订单</el-button> <!-- 查看订单按钮 -->
          <el-button>进入首页</el-button> <!-- 返回首页按钮 -->
        </div>
        
        <!-- 温馨提示 -->
        <p class="alert">
          <span class="iconfont icon-tip"></span>
          温馨提示：小兔鲜儿不会以订单异常、系统升级为由要求您点击任何网址链接进行退款操作，保护资产、谨慎操作。
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 支付结果展示区域样式 */
.pay-result {
  padding: 100px 0;
  background: #fff;
  text-align: center;
  margin-top: 20px;

  /* 图标样式 */
  >.iconfont {
    font-size: 100px;
  }

  /* 成功图标颜色 */
  .green {
    color: #1dc779;
  }

  /* 失败图标颜色 */
  .red {
    color: $priceColor;
  }

  /* 结果标题样式 */
  .tit {
    font-size: 24px;
  }

  /* 提示信息样式 */
  .tip {
    color: #999;
  }

  /* 文本内容通用样式 */
  p {
    line-height: 40px;
    font-size: 16px;
  }

  /* 按钮区域样式 */
  .btn {
    margin-top: 50px;
  }

  /* 温馨提示样式 */
  .alert {
    font-size: 12px;
    color: #999;
    margin-top: 50px;
  }
}
</style>