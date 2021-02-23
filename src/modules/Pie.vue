<template>
  <div class="Pie">
    <div id="Pie" ref="PieEcharts"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import echarts from "echarts";
@Component({
  name: "Pie",
})
export default class Pie extends Vue {
  private myEcharts: any = null;
  private initEcharts() {
    if (this.myEcharts) this.myEcharts.dispose()
    this.myEcharts = echarts.init(this.$refs.PieEcharts);
    const option = {
      title: {
        text: "某站点用户访问来源",
        subtext: "纯属虚构",
        x: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)",
      },
      legend: {
        orient: "horizontal",
        // left: "100px",
        top: "80px",
        data: ["企业", "个体", "社会组织", "事业单位", "机关单位", "其他"],
      },
      // 设置饼状图的颜色
      color: ["red", "orange", "yellow", "green", "blue", "indigo", "purple"],
      series: [
        {
          name: "占比情况",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 10, name: "企业" },
            { value: 10, name: "个体" },
            { value: 15, name: "社会组织" },
            { value: 25, name: "事业单位" },
            { value: 20, name: "机关单位" },
            { value: 20, name: "其他" },
          ],
          /*在series中添加itemStyle即可直观显示饼型数值*/
          itemStyle: {
            normal: {
              label: {
                show: true,
                formatter: "{b} : {c} ",
              },
              labelLine: { show: true },
            },
          },
        },
      ],
    };
    this.myEcharts.setOption(option);
    const that = this as any
    setTimeout(() => {
      window.onresize = function() {
        that.myEcharts.resize();
      };
    }, 200);
  }
  mounted(){
    this.initEcharts()
  }
}
</script>
<style lang="scss" scoped>
.Pie {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #Pie {
    width: 80%;
    height: 80%;
  }
}
</style>
