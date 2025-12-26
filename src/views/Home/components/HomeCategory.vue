<script setup>
// 导入分类数据相关的Pinia Store
import { useCategoryStore } from '@/stores/categoryStore'

// 获取分类数据Store实例
const categoryStore = useCategoryStore()
// categoryStore.categoryList 会自动从Pinia中获取分类数据，无需手动调用API
</script>

<template>
  <!-- 分类导航容器 -->
  <div class="home-category">
    <!-- 分类菜单列表 -->
    <ul class="menu">
      <!-- 遍历分类列表数据 -->
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <!-- 分类主标题链接 -->
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <!-- 显示前两个子分类链接 -->
        <RouterLink v-for="i in item.children.slice(0, 2)" :key="i" to="/">{{ i.name }}</RouterLink>
        <!-- 分类hover弹层 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <!-- 分类推荐商品列表 -->
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img v-img-lazy="i.picture" alt="" />
                <div class="info">
                  <p class="name ellipsis-2">
                    {{ i.name }}
                  </p>
                  <p class="desc ellipsis">{{ i.desc }}</p>
                  <p class="price"><i>¥</i>{{ i.price }}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
// 分类导航整体样式
.home-category {
  width: 250px; // 分类导航宽度
  height: 500px; // 分类导航高度
  background: rgba(0, 0, 0, 0.8); // 半透明黑色背景
  position: relative; // 相对定位，用于弹层定位
  z-index: 99; // 设置层级，确保在轮播图之上

  // 菜单样式
  .menu {
    li {
      padding-left: 40px; // 左侧内边距
      height: 55px; // 菜单项高度
      line-height: 55px; // 文字垂直居中

      // 鼠标悬停时背景变色
      &:hover {
        background: $xtxColor; // 使用SCSS变量定义品牌色
      }

      // 链接样式
      a {
        margin-right: 4px; // 链接之间的间距
        color: #fff; // 文字颜色为白色

        // 第一个链接（主分类）的特殊样式
        &:first-child {
          font-size: 16px;
        }
      }

      // 分类弹层样式
      .layer {
        width: 990px; // 弹层宽度
        height: 500px; // 弹层高度
        background: rgba(255, 255, 255, 0.8); // 半透明白色背景
        position: absolute; // 绝对定位
        left: 250px; // 弹层显示在分类导航右侧
        top: 0;
        display: none; // 默认隐藏弹层
        padding: 0 15px;

        // 弹层标题样式
        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        // 弹层商品列表样式
        ul {
          display: flex;
          flex-wrap: wrap; // 弹性布局，允许换行

          li {
            width: 310px; // 商品项宽度
            height: 120px; // 商品项高度
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            // 每3个商品项清除右侧外边距
            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              // 鼠标悬停效果
              &:hover {
                background: #e3f9f4;
              }

              // 商品图片样式
              img {
                width: 95px;
                height: 95px;
              }

              // 商品信息样式
              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                // 商品名称样式
                .name {
                  font-size: 16px;
                  color: #666;
                }

                // 商品描述样式
                .desc {
                  color: #999;
                }

                // 商品价格样式
                .price {
                  font-size: 22px;
                  color: $priceColor; // 使用SCSS变量定义价格颜色

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式：鼠标悬停时显示弹层
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>