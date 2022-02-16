<template>
  <div class="Graph">
    <div id="Graph" ref="GraphEcharts"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import echarts from 'echarts'
@Component({
  name: 'Graph'
})
export default class Graph extends Vue {
  private State = 50
  private myEcharts: any = null
  private dataSource = [
    {
      name: '省厅经办人录入',
      value: 0,
      x: 300,
      y: 300,
      itemStyle: {
        color: '#39af5e'
      }
    },
    {
      name: '省厅分管领导拟办',
      value: 10,
      x: 400,
      y: 300,
      itemStyle: {
        color: '#5470c6'
      }
    },
    {
      name: '省厅经办人转办',
      value: 20,
      x: 500,
      y: 300,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '市局经办人受理',
      value: 30,
      x: 600,
      y: 300,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '市局主管人员拟办',
      value: 40,
      x: 700,
      y: 300,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '市局经办人转办',
      value: 50,
      x: 700,
      y: 400,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '县级经办人受理',
      value: 60,
      x: 700,
      y: 500,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '县级主管人员拟办',
      value: 70,
      x: 700,
      y: 600,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '县级经办人办理',
      value: 80,
      x: 700,
      y: 700,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '县级经办人转办',
      value: 90,
      x: 800,
      y: 700,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '市局经办人办理',
      value: 100,
      x: 800,
      y: 300,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '省厅经办人审核',
      value: 110,
      x: 900,
      y: 300,
      itemStyle: {
        color: '#b2b2b2'
      }
    },
    {
      name: '归档',
      value: 120,
      x: 1000,
      y: 300,
      itemStyle: {
        color: '#b2b2b2'
      }
    }
  ]
  private linkSource = [
    {
      source: '省厅经办人录入',
      value: 0,
      target: '省厅分管领导拟办',
      label: {
        show: false
      },
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '省厅分管领导拟办',
      value: 10,
      target: '省厅经办人转办',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '省厅经办人转办',
      value: 20,
      target: '市局经办人受理',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '市局经办人受理',
      value: 30,
      target: '市局主管人员拟办',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '市局主管人员拟办',
      value: 40,
      target: '市局经办人办理',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '市局主管人员拟办',
      value: 40,
      target: '市局经办人转办',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '市局经办人转办',
      value: 50,
      target: '县级经办人受理',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '县级经办人受理',
      value: 60,
      target: '县级主管人员拟办',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '县级主管人员拟办',
      value: 70,
      target: '县级经办人办理',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '县级经办人办理',
      value: 80,
      target: '县级经办人转办',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '县级经办人转办',
      value: 90,
      target: '市局经办人办理',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '市局经办人办理',
      value: 100,
      target: '省厅经办人审核',
      lineStyle: {
        color: '#39af5e'
      }
    },
    {
      source: '省厅经办人审核',
      value: 110,
      target: '归档',
      lineStyle: {
        color: '#39af5e'
      }
    }
  ]
  private initEcharts() {
    if (this.myEcharts) this.myEcharts.dispose()
    this.myEcharts = echarts.init(this.$refs.GraphEcharts)
    this.dataSource.forEach((item: any) => {
      if (item.value < this.State) {
        item.itemStyle.color = '#39af5e' // 绿色  已通过
      } else if (item.value === this.State) {
        item.itemStyle.color = '#5470c6' // 蓝色  当前阶段
      } else {
        item.itemStyle.color = '#b2b2b2' // 灰色  未通过
      }
    })
    this.linkSource.forEach((item: any) => {
      if (item.value < this.State) {
        item.lineStyle.color = '#39af5e' // 绿色
      } else {
        item.lineStyle.color = '#b2b2b2' // 灰色
      }
    })
    const option = {
      // title: {
      //   text: 'Basic Graph'
      // },
      tooltip: {},
      animationDurationUpdate: 1500,
      animationEasingUpdate: 'quinticInOut',
      series: [
        {
          type: 'graph',
          layout: 'none',
          symbolSize: 50,
          roam: true,
          symbol: 'circle', // rect 正方形   roundRect 长方形 diamond 菱形 circle 圆
          label: {
            show: true,
            color: '#000',
            // fontSize: 16,
            formatter: '{b} : {c} ',
            position: 'bottom' //设置label显示的位置
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            fontSize: 20
          },
          data: this.dataSource,
          links: this.linkSource,
          lineStyle: {
            opacity: 0.9,
            width: 2,
            curveness: 0
          }
        }
      ]
    }
    this.myEcharts.setOption(option)
    const that = this as any
    setTimeout(() => {
      window.onresize = function() {
        that.myEcharts.resize()
      }
    }, 200)
  }
  mounted() {
    this.initEcharts()
  }
}
</script>
<style lang="scss" scoped>
.Graph {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #Graph {
    width: 80%;
    height: 80%;
  }
}
</style>
