import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/utils/directive'

import '@/styles/index.scss' // 全局样式
import './icons' // svg

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Print from 'vue-print-nb'

Vue.use(Print)

// 全局注册highchartsVue
import HighchartsVue from 'highcharts-vue'
Vue.use(HighchartsVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
