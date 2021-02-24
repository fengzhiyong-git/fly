<template>
  <div class="hunan">
    <el-select
      v-model="value"
      @change="selectVal()"
      style="margin-top:50px;"
      clearable
      placeholder="请选择"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.label"
      >
      </el-option>
    </el-select>
    <div class="main">
      <div id="chart" ref="charts"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import echarts from "echarts";
import axios from "axios";
@Component({
  name: "ChangeSha",
})
export default class ChangeSha extends Vue {
  private data: any = [
    { name: "宁乡市", value: 2, code: 430100 },
    { name: "望城区", value: 3, code: 430200 },
    { name: "岳麓区", value: 4, code: 430300 },
    { name: "开福区", value: 5, code: 430400 },
    { name: "芙蓉区", value: 6, code: 430500 },
    { name: "天心区", value: 7, code: 430600 },
    { name: "雨花区", value: 8, code: 430700 },
    { name: "长沙县", value: 9, code: 430800 },
    { name: "浏阳市", value: 10, code: 430900 },
  ];
  private options: any = [
    { value: 430100, label: "宁乡市" },
    { value: 430200, label: "望城区" },
    { value: 430300, label: "岳麓区" },
    { value: 430400, label: "开福区" },
    { value: 430500, label: "芙蓉区" },
    { value: 430600, label: "天心区" },
    { value: 430700, label: "雨花区" },
    { value: 430800, label: "长沙县" },
    { value: 430900, label: "浏阳市" },
  ];
  private value = "";

  private initEcharts(name: any) {
    const myChart = echarts.init(this.$refs.charts);
    axios.get(`/static/mapJson/长沙市.json`).then((res: any) => {
      echarts.registerMap("changsha", res.data);
      const option = {
        tooltip: {
          trigger: "item",
          formatter: function(val: any) {
            // debugger
            if (val.data !== undefined) {
              return (
                val.data.name +
                "</br>" +
                '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#149cef;"></span>' +
                "任务完成率：" +
                val.data.value
              );
            }
          },
        },

        geo: {
          map: "changsha",
          roam: false, //不开启缩放和平移
          zoom: 1.23, //视角缩放比例
          regions: [
            {
              name: name,   // 动态改变颜色
              itemStyle: {
                areaColor: "#ff7044",
                // color: "red",
                borderColor: "black", // 边框颜色
              },
            },
          ],
          label: {
            show: true,
            normal: {
              show: true,
              color: "#fff",
            },
            emphasis: {
              show: true,
              fontSize: 16, // 鼠标移入的字体大小
              color: "#fff",
            },
            align: "center",
          },
          itemStyle: {
            normal: {
              areaColor: "#2798FA", // 地图板块颜色
              borderColor: "#fff", // 边框颜色
            },
            emphasis: {
              //鼠标移入高亮显颜色
              areaColor: "#ff7044",
            },
          },
        },
        series: [
          {
            name: "长沙市",
            type: "map",
            geoIndex: 0,
            data: this.data,
          },
        ],
      };
      myChart.setOption(option);
    });
  }

  private selectVal() {
    console.log(this.value, "ssssssssss");
    this.initEcharts(this.value);
    // this.MapOption.geo.regions[0].name = this.value
  }

  mounted() {
    this.initEcharts("");
  }
}
</script>
<style lang="scss" scoped>
.hunan {
  .main {
    width: 60%;
    height: 400px;
  }
  #chart {
    width: 100%;
    height: 100%;
  }
}
</style>
