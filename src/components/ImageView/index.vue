<script setup>
import { ref, watch } from 'vue'
import { useMouseInElement } from '@vueuse/core'

// 图片列表
// ✅ 通过 props 接收父组件传递的图片列表
defineProps({
  imageList: {
    type: Array,
    default: () => []
  }
})
//作用：记录当前选中的是第几张图（默认为第0张）。当鼠标移入底部小图时，更新这个索引，从而切换中间显示的大图。
// 1.小图切换大图显示
const activeIndex = ref(0)

const enterhandler = (i) => {
  activeIndex.value = i
}

// 2. 获取鼠标相对位置
//作用：这是一个 VueUse 库的工具函数。它绑定了中间的大图容器（target），并实时返回鼠标相对于该容器左上角的坐标 (elementX, elementY)，以及鼠标是否离开了容器 (isOutside)。
const target = ref(null)
const { elementX, elementY, isOutside } = useMouseInElement(target)

// 3. 控制滑块跟随鼠标移动（监听elementX/Y变化，一旦变化 重新设置left/top）
const left = ref(0)
const top = ref(0)

const positionX = ref(0)
const positionY = ref(0)
//负责计算“遮罩层”的位置和“放大图”的位置。
watch([elementX, elementY, isOutside], () => {

  // 如果鼠标没有移入到盒子里面 直接不执行后面的逻辑
  // 1. 如果鼠标在外面，就不计算了，节省性能
  if (isOutside.value) return

  // 有效范围内控制滑块距离
  // 横向
  // 2. 计算遮罩层(layer)的位置
  // 逻辑：希望鼠标始终位于遮罩层中心。遮罩层宽200px，所以左上角坐标 = 鼠标坐标 - 100
  if (elementX.value > 100 && elementX.value < 300) {
    left.value = elementX.value - 100
  }
  // 纵向
  if (elementY.value > 100 && elementY.value < 300) {
    top.value = elementY.value - 100
  }

// 3. 边界处理（防止遮罩层移出图片）
  // 如果鼠标太靠左（<100），遮罩层就死死定在0
  // 如果鼠标太靠右（>300），遮罩层就死死定在200（因为大图宽400-遮罩宽200=剩余200）
  if (elementX.value > 300) { left.value = 200 }
  if (elementX.value < 100) { left.value = 0 }

  if (elementY.value > 300) { top.value = 200 }
  if (elementY.value < 100) { top.value = 0 }

// 4. 计算大图背景移动距离
  // 原理：放大图是原图的2倍大小。
  // 当遮罩层向右移动 10px，放大图的背景就需要向左移动 20px，才能展示对应的局部。
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2

})

</script>


<template>
  <div class="goods-image">

    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <!-- ✅ 使用 props 传递的图片 -->
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块   .layer (遮罩层)：这是一个半透明的小方块，只有鼠标移入时显示 (v-show="!isOutside")。它的位置由上面计算出的 left 和 top 动态控制。 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <!-- ✅ 遍历 props 传递的图片列表 -->
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterhandler(i)" :class="{ active: i === activeIndex }">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        // ✅ 正确：显示当前选中的图片
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
