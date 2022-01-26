import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/Layout/index.vue'
import Home from '@/Layout/index.vue'
Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Layout,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: Home
      },
      {
        path: '/',
        redirect: '/Column'
      },
      {
        path: 'Column',
        name: 'Column',
        component: () => import('@/modules/Column.vue')
      },
      {
        path: 'Pie',
        name: 'Pie',
        component: () => import('@/modules/Pie.vue')
      },
      {
        path: 'Province',
        name: 'Province',
        component: () => import('@/modules/Province.vue')
      },
      {
        path: 'Province1',
        name: 'Province1',
        component: () => import('@/modules/Province1.vue')
      },
      {
        path: 'Bubble',
        name: 'Bubble',
        component: () => import('@/modules/Bubble.vue')
      },
      {
        path: 'ChangeSha',
        name: 'ChangeSha',
        component: () => import('@/modules/ChangSha.vue')
      },
      {
        path: 'BaiduMap',
        name: 'BaiduMap',
        component: () => import('@/modules/BaiduMap.vue')
      },
      {
        path: 'TableNum',
        name: 'TableNum',
        component: () => import('@/modules/TableNum.vue')
      },
      {
        path: 'TestTable',
        name: 'TestTable',
        component: () => import('@/modules/TestTabel.vue')
      },
      {
        path: 'Crypto',
        name: 'Crypto',
        component: () => import('@/modules/Crypto.vue')
        // component: () => import("@/modules/SelectTree.vue")
      },
      {
        path: 'scroll',
        name: 'TabScroll',
        component: () => import('@/modules/TabScroll.vue')
      },
      {
        path: 'custom',
        name: 'Custom',
        component: () => import('@/modules/Custom.vue')
      },
      {
        path: 'Autograph',
        name: 'Autograph',
        component: () => import('@/modules/Autograph.vue')
      },
      {
        path: 'TableType',
        name: 'TableType',
        component: () => import('@/modules/TableType.vue')
      },
      {
        path: 'Print',
        name: 'Print',
        component: () => import('@/modules/Print.vue')
      },
      {
        path: 'Gantt',
        name: 'Gantt',
        component: () => import('@/modules/Gantt.vue')
      },
      {
        path: 'Gantt2',
        name: 'Gantt2',
        component: () => import('@/modules/Gantt2.vue')
      },
      {
        path: 'China',
        name: 'China',
        component: () => import('@/modules/China.vue')
      },
      {
        path: 'Test',
        name: 'Test',
        component: () => import('@/modules/Test.vue')
      },
      {
        path: 'Dot',
        name: 'Dot',
        component: () => import('@/modules/Dot.vue')
      },
      {
        path: 'comTabelBox',
        name: 'comTabelBox',
        component: () => import('@/modules/comTabelBox.vue')
      },
      {
        path: 'Swiper',
        name: 'Swiper',
        component: () => import('@/modules/Swiper.vue')
      },
      {
        path: 'WeeklyTask',
        name: 'WeeklyTask',
        component: () => import('@/modules/WeeklyTask.vue')
      },
      {
        path: 'HighChartsDemo',
        name: 'HighChartsDemo',
        component: () => import('@/modules/HighChartsDemo.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 修复路由返回一个promise没有catch接收而报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  return (originalPush.call(this, location) as any).catch((err: any) => err)
}
export default router
