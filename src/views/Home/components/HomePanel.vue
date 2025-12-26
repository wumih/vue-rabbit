<script setup>
// 定义组件属性
const props = defineProps({
  // 面板主标题
  title: {
    type: String
  },
  // 面板副标题
  subTitle: {
    type: String
  }
})

</script>


<template>
  <!-- 面板容器组件 -->
  <div class="home-panel">
    <div class="container">
      <!-- 面板头部，包含标题和副标题 -->
      <div class="head">
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
      </div>
      <!-- 面板主体内容区域，使用slot插槽允许外部传入自定义内容 -->
      <slot />
    </div>
  </div>
</template>

<style scoped lang='scss'>
// 面板容器样式
.home-panel {
  background-color: #fff; // 白色背景

  // 面板头部样式
  .head {
    padding: 40px 0; // 上下内边距
    display: flex;
    align-items: flex-end; // 垂直对齐方式

    // 标题样式
    h3 {
      flex: 1; // 占据剩余空间
      font-size: 32px; // 主标题字体大小
      font-weight: normal; // 正常字重
      margin-left: 6px;
      height: 35px;
      line-height: 35px; // 文字垂直居中

      // 副标题样式
      small {
        font-size: 16px;
        color: #999; // 灰色文字
        margin-left: 20px;
      }
    }
  }
}
</style>