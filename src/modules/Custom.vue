<template>
  <div class="Custom">
    <div class="main">
      <div id="customCharts" ref="customCharts"></div>
    </div>
    <!-- <el-button @click="test">测试</el-button>
    <el-button @click="lodash">lodash</el-button>
    <el-input v-model="value" style="width:200px;" @input="change" placeholder="请输入"></el-input> -->
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import echarts from "echarts";
import axios from "axios";
@Component({
  name: "Custom"
})
export default class Custom extends Vue {
  private value = "";
  private data: any = [];
  private myCharts: any = null;

  private renderItem(params: any, api: any) {
    if (params && params.context && params.context.rendered) {
      return;
    }
    params.context.rendered = true;
    const points = [];
    for (let i = 0; i < this.data.length; i++) {
      points.push(api.coord(this.data[i]));
    }
    const color = api.visual("color");
    return {
      type: "polygon",
      shape: {
        points: echarts.graphic.clipPointsByRect(points, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
        })
      },
      style: api.style({
        fill: color,
        stroke: echarts.color.lift(color)
      })
    };
  }

  private initEcharts(data: any) {
    const that = this as any;
    if (that.myCharts) {
      that.myCharts.dispose();
    }
    that.myCharts = echarts.init(this.$refs.customCharts);
    const option = {
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["bar", "error"]
      },
      grid: {
        top: "5%",
        left: "8%",
        right: "3%"
      },
      xAxis: {
        // type: 'value',
        // min: function(value) {
        //   return Math.ceil(value.min - 10)
        // },
        // max: function(value) {
        //   return Math.ceil(value.max + 10)
        // }
      },
      yAxis: {
        // type: 'value',
        // min: function(value) {
        //   return Math.ceil(value.min - 20)
        // },
        // max: function(value) {
        //   return Math.ceil(value.max + 20)
        // }
      },
      series: [
        {
          type: "custom",
          renderItem: that.renderItem,
          data: data
        }
      ]
    };
    that.myCharts.setOption(option);
    window.addEventListener("resize", function() {
      that.myCharts.resize();
    });
  }

  mounted() {
    const dataCount = 7;
    for (let i = 0; i < dataCount; i++) {
      // const val = Math.random() * 1000;
      this.data.push([
        echarts.number.round(Math.random() * 100),
        echarts.number.round(Math.random() * 400)
      ]);
    }
    this.initEcharts(this.data);

    // 窗口变化事件添加防抖
    // $(window).resize(_.debounce(() => {
    //   console.log('resize')
    // },2000));
  }
}
</script>
<style lang="scss" scoped>
.Custom {
  .main {
    width: 60%;
    height: 400px;
  }
  #customCharts {
    width: 500px;
    height: 600px;
  }
}
</style>
