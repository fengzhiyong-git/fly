<template>
  <div class="Aside">
    <div class="title">标题</div>
    <ul class="aside-wrap">
      <li
        :class="{ active: index == activeIndex }"
        v-for="(item, index) in dataSource"
        :key="index"
        @click="toPath(index, item)"
      >
        <!-- <router-link :to="item.path">{{ item.name }}</router-link> -->
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import { AppModule } from '@/store/modules/app'
@Component({
  name: 'Aside',
  components: {}
})
export default class Aside extends Vue {
  private activeIndex = 0
  private dataSource = [
    { name: '柱状图', path: '/Column' },
    { name: '饼状图', path: '/Pie' },
    { name: '自定义图形', path: '/custom' },
    { name: '省份地图', path: '/Province' },
    { name: '气泡效果', path: '/Bubble' },
    { name: '长沙市', path: '/ChangeSha' },
    { name: '表格合计', path: '/TableNum' },
    // { name: "百度地图", path: "/BaiduMap" },
    { name: '测试表单验证', path: '/TestTable' },
    { name: '前端加密', path: '/Crypto' },
    { name: 'tab切换滚动效果', path: '/Scroll' },
    { name: '签名', path: '/Autograph' },
    { name: '折叠表单', path: '/TableType' },
    { name: '打印', path: '/Print' },
    { name: '甘特图', path: '/Gantt' },
    { name: '甘特图2', path: '/Gantt2' },
    { name: '中国地图', path: '/China' },
    { name: '测试页面', path: '/Test' }
  ]
  private toPath(i: any, item: any) {
    this.activeIndex = i
    this.$router.push(item.path)
  }

  get CurrentPath() {
    return AppModule.CurrentRoutePath
  }

  @Watch('$route', { deep: true, immediate: true })
  getRoute(val: any) {
    if (!val) return false
    this.dataSource.map((item: any, i: any) => {
      if (item.path === val.fullPath) {
        this.activeIndex = i
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.Aside {
  font-size: 16px;
  // background-color: white;
  width: 300px;
  position: fixed;
  z-index: 10;
  margin: 0;
  top: 60px;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  padding-top: 20px;
  a {
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 12px 16px;
  }
  .aside-wrap {
    li {
      padding: 12px 32px;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        color: #3489fd;
        background-color: #d6e7ff;
      }
    }
    .active {
      font-weight: 600;
      color: #3489fd;
      background: #d6e7ff;
      border-right: 3px solid #3489fd;
    }
  }
}
</style>
