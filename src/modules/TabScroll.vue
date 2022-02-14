<template>
  <div class="tab-scroll">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="矿山基本信息" name="1"></el-tab-pane>
      <el-tab-pane label="矿山生态问题" name="2"></el-tab-pane>
      <el-tab-pane label="年度基金提取" name="3"></el-tab-pane>
      <el-tab-pane label="年度矿山生态问题修复情况" name="4"></el-tab-pane>
      <el-tab-pane label="年度生态修复计划" name="5"></el-tab-pane>
    </el-tabs>
    <div class="wrap" id="wrap" ref="wrap">
      <div class="main-wrap">
        <div class="form-title" id="form_1">
          矿山基本信息
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_2">
          矿山生态问题
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_3">
          年度基金提取
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_4">
          年度矿山生态问题修复情况
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_5">
          年度生态修复计划
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'TabScroll'
})
export default class Province extends Vue {
  msg = 'Welcome to Your Vue.js App'
  activeName = '1'

  tabClick(tab: any, event: any) {
    ;(document.querySelector(`#form_${tab.name}`) as any).scrollIntoView({ behavior: 'smooth' })
  }

  tabAnchors: number[] = []
  watchTab(event: any) {
    const tabs: any[] = [...document.getElementsByClassName('el-tabs__item')]
    const scrollTop: number = event.target?.scrollTop
    const indexs: number[] = []
    this.tabAnchors.forEach((item, index) => {
      if (scrollTop + 50 >= item) {
        indexs.push(index)
      }
    })
    const largest: number = Math.max(...indexs)
    tabs.forEach(item => {
      item?.classList.remove('is-active')
    })
    tabs?.[largest]?.classList.add('is-active')
    ;(document.querySelector('.el-tabs__active-bar') as any).style.transform = `translateX(${tabs?.[largest]
      ?.offsetLeft + 20}px)`
  }

  mounted() {
    const ele = this.$refs.wrap as any
    ele.addEventListener('scroll', () => {
      const current_offset_top = ele.scrollTop
      console.log(current_offset_top, '滚动距离')
      if (current_offset_top >= 0 && current_offset_top < 421) {
        this.$nextTick(() => {
          this.activeName = '1'
        })
      } else if (current_offset_top >= 421 && current_offset_top < 842) {
        this.$nextTick(() => {
          this.activeName = '2'
        })
      } else if (current_offset_top >= 842 && current_offset_top < 1263) {
        this.$nextTick(() => {
          this.activeName = '3'
        })
      } else if (current_offset_top >= 1263 && current_offset_top < 1325) {
        this.$nextTick(() => {
          this.activeName = '4'
        })
      } else {
        this.$nextTick(() => {
          this.activeName = '5'
        })
      }
    })

    this.$nextTick(() => {
      this.tabAnchors.push((document as any).querySelector(`#form_1`).offsetTop)
      this.tabAnchors.push((document as any).querySelector(`#form_2`).offsetTop)
      this.tabAnchors.push((document as any).querySelector(`#form_3`).offsetTop)
      this.tabAnchors.push((document as any).querySelector(`#form_4`).offsetTop)
      this.tabAnchors.push((document as any).querySelector(`#form_5`).offsetTop)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  color: red;
}
.tab-scroll {
  .wrap {
    height: 780px;
    overflow-y: auto;
    .main-wrap {
      width: 100%;
    }
  }
}
</style>
