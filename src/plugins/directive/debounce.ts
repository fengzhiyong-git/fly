/* 
  * 防抖指令 v-debounce
  * 防止按钮在短时间内被多次点击
  * 使用防抖函数限制规定时间内只能点击一次
*/
import Vue from 'vue'
Vue.directive('debounce', {
  inserted: function (el: any, binding: any) {
    let timer: any
    el.addEventListener('keyup', () => {
      if (timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        binding.value()
      }, 1000)
    })
  },
})