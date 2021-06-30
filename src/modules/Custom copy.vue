<template>
  <div class="Custom">
    <div class="main">
      <div id="customCharts" ref="customCharts"></div>
    </div>
    <el-button @click="test">测试</el-button>
    <el-button @click="lodash">lodash</el-button>
    <el-input
      v-model="value"
      style="width:200px;"
      @input="change"
      placeholder="请输入"
    ></el-input>
  </div>
</template>

<script>
import echarts from "echarts";
import axios from "axios";
import $ from "jquery";
// import { throttle } from '@/utils/throttle.js'
// import { Debounce } from '../utils/Debounces.js'

const _ = require("lodash");
export default {
  // 自定义图形
  name: "Custom",
  data() {
    return {
      value: "",
      data: [],
      myCharts: null
    };
  },
  // private myCharts: any = null
  // @Prop() datas!: any
  // @Watch('datas', { deep: true, immediate: true })
  // getData(newVal: Array<any>) {
  //   if (newVal.length > 0) {
  //     this.data = []
  //     this.data = Object.freeze(newVal.map((item: any) => [item['横坐标'], item['纵坐标']]))
  //     this.$nextTick(() => {
  //       this.loading = true
  //       this.initEcharts()
  //     })
  //   }
  // }
  methods: {
    renderItem(params, api) {
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
    },
    initEcharts(data) {
      const that = this;
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
    },
    // 测试节流
    // test(){
    //   console.log(1111)
    //   throttle(()=>{
    //     console.log(2323)
    //   },2000,true)
    // },
    // 测试防抖
    // change(){
    //   console.log(1111)
    //   Debounce(()=>{
    //     console.log(2323)
    //   },1000)
    // },
    fff() {
      console.log("ssss");
    },
    lodash() {
      console.log("hhh");
      const users = [
        { user: "barney", active: false },
        { user: "fred", active: false },
        { user: "pebbles", active: true }
      ];
      //   const i = _.findIndex(users, function(item) { return item.user == 'barney'; });
      //   console.log(i,'sssss')
    }
  },
  mounted() {
    const dataCount = 7;
    for (let i = 0; i < dataCount; i++) {
      const val = Math.random() * 1000;
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
