// 定义懒加载插件
import { useIntersectionObserver } from '@vueuse/core'
import defaultImg from '@/assets/images/loading.gif'
import errorImg from '@/assets/images/none.png'

export const lazyPlugin = {
  install (app) {
    // 懒加载指令逻辑
    app.directive('img-lazy', {
      mounted (el, binding) {
        el.src = defaultImg
        if (el._lazyStop) el._lazyStop()
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if (isIntersecting) {
              el.src = binding.value
              el.onerror = () => {
                el.src = errorImg
                el.onerror = null
              }
              stop()
            }
          },
          { rootMargin: '200px', threshold: 0 }
        )
        el._lazyStop = stop
      },

      updated (el, binding) {
        if (binding.value !== binding.oldValue) {
          if (el._lazyStop) el._lazyStop()
          el.src = defaultImg
          const { stop } = useIntersectionObserver(
            el,
            ([{ isIntersecting }]) => {
              if (isIntersecting) {
                el.src = binding.value
                el.onerror = () => {
                  el.src = errorImg
                  el.onerror = null
                }
                stop()
              }
            },
            { rootMargin: '200px', threshold: 0 }
          )
          el._lazyStop = stop
        }
      },
      unmounted (el) {
        if (el._lazyStop) el._lazyStop()
        el.onerror = null
      }
    })
  }
}
