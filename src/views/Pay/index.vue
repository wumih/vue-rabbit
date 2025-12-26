<!-- 
  支付页面组件 (Pay)
  - 功能：展示订单支付信息、提供支付入口、显示支付倒计时
  - 数据：通过API获取订单详情和支付信息
  - 交互：点击支付按钮跳转到支付宝支付页面
-->
<script setup>
// 导入API函数
import { getOrderAPI } from '@/apis/pay'
// 导入Vue组合式API
import { onMounted, ref } from 'vue'
// 导入路由工具
import { useRoute } from 'vue-router'
// 导入自定义的倒计时组合式函数
import { useCountDown } from '@/composables/useCountDown'
// 解构倒计时函数
const { formatTime, start } = useCountDown()

// 订单数据
const route = useRoute() // 获取当前路由信息，用于获取订单ID
const payInfo = ref({}) // 存储订单支付信息

// 获取订单支付信息的异步函数
const getPayInfo = async () => {
  // 调用API获取订单详情，传入路由参数中的订单ID
  const res = await getOrderAPI(route.query.id)
  // 将API返回的结果赋值给payInfo
  payInfo.value = res.result
  // 初始化倒计时秒数，开始倒计时
  start(res.result.countdown)
}

// 组件挂载时调用获取订单支付信息的函数
onMounted(() => getPayInfo())

// 支付跳转相关配置
// 支付地址基础URL
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
// 支付完成后的回调地址
const backURL = 'http://127.0.0.1:5173/paycallback'
// 对回调地址进行URL编码，确保特殊字符正确处理
const redirectUrl = encodeURIComponent(backURL)
// 生成完整的支付宝支付链接，包含订单ID和回调地址
const payUrl = `${baseURL}pay/aliPay?orderId=${route.query.id}&redirect=${redirectUrl}`
</script>


<template>
  <div class="xtx-pay-page">
    <div class="container">
      <!-- 付款信息区域 -->
      <div class="pay-info">
        <span class="icon iconfont icon-queren2"></span> <!-- 确认图标 -->
        <div class="tip">
          <p>订单提交成功！请尽快完成支付。</p>
          <p>支付还剩 <span>{{ formatTime }}</span>, 超时后将取消订单</p> <!-- 显示倒计时 -->
        </div>
        <div class="amount">
          <span>应付总额：</span>
          <span>¥{{ payInfo.payMoney?.toFixed(2) }}</span> <!-- 显示订单金额 -->
        </div>
      </div>
      
      <!-- 付款方式选择区域 -->
      <div class="pay-type">
        <p class="head">选择以下支付方式付款</p>
        <div class="item">
          <p>支付平台</p>
          <a class="btn wx" href="javascript:;"></a> <!-- 微信支付按钮（暂未实现） -->
          <a class="btn alipay" :href="payUrl"></a> <!-- 支付宝支付按钮 -->
        </div>
        <div class="item">
          <p>支付方式</p>
          <a class="btn" href="javascript:;">招商银行</a> <!-- 银行支付按钮（暂未实现） -->
          <a class="btn" href="javascript:;">工商银行</a>
          <a class="btn" href="javascript:;">建设银行</a>
          <a class="btn" href="javascript:;">农业银行</a>
          <a class="btn" href="javascript:;">交通银行</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
/* 支付页面整体样式 */
.xtx-pay-page {
  margin-top: 20px;
}

/* 付款信息区域样式 */
.pay-info {
  background: #fff;
  display: flex;
  align-items: center;
  height: 240px;
  padding: 0 80px;

  /* 确认图标样式 */
  .icon {
    font-size: 80px;
    color: #1dc779;
  }

  /* 提示信息样式 */
  .tip {
    padding-left: 10px;
    flex: 1;

    p {
      &:first-child {
        font-size: 20px;
        margin-bottom: 5px;
      }

      &:last-child {
        color: #999;
        font-size: 16px;
      }
    }
  }

  /* 金额显示样式 */
  .amount {
    span {
      &:first-child {
        font-size: 16px;
        color: #999;
      }

      &:last-child {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}

/* 付款方式选择区域样式 */
.pay-type {
  margin-top: 20px;
  background-color: #fff;
  padding-bottom: 70px;

  /* 标题样式 */
  p {
    line-height: 70px;
    height: 70px;
    padding-left: 30px;
    font-size: 16px;

    &.head {
      border-bottom: 1px solid #f5f5f5;
    }
  }

  /* 支付按钮样式 */
  .btn {
    width: 150px;
    height: 50px;
    border: 1px solid #e4e4e4;
    text-align: center;
    line-height: 48px;
    margin-left: 30px;
    color: #666666;
    display: inline-block;

    /* 按钮选中和悬停样式 */
    &.active,
    &:hover {
      border-color: $xtxColor;
    }

    /* 支付宝按钮样式 */
    &.alipay {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/7b6b02396368c9314528c0bbd85a2e06.png) no-repeat center / contain;
    }

    /* 微信支付按钮样式 */
    &.wx {
      background: url(https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/c66f98cff8649bd5ba722c2e8067c6ca.jpg) no-repeat center / contain;
    }
  }
}
</style>