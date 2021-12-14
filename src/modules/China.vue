<template>
  <div class="province">
    <div id="province" ref="province"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import echarts from "echarts";
import axios from "axios";
@Component({
  name: "Province",
})
export default class Province extends Vue {
  private mapData: any = [
    // { name: "长沙市", value: 2, code: 430100 },
    // { name: "株洲市", value: 3, code: 430200 },
    // { name: "湘潭市", value: 4, code: 430300 },
    // { name: "衡阳市", value: 5, code: 430400 },
    // { name: "邵阳市", value: 6, code: 430500 },
    // { name: "岳阳市", value: 7, code: 430600 },
    // { name: "常德市", value: 8, code: 430700 },
    // { name: "张家界市", value: 9, code: 430800 },
    // { name: "益阳市", value: 10, code: 430900 },
    // { name: "郴州市", value: 11, code: 431000 },
    // { name: "永州市", value: 12, code: 431100 },
    // { name: "怀化市", value: 13, code: 431200 },
    // { name: "娄底市", value: 14, code: 431300 },
    { name: "青海省", value: 15, code: 433100 },
  ];
  private mapOptions: any = {
    toolbox: {
      show: false,
    },
    grid: {
      left: "20%",
      top: "20%",
      right: "60%",
      bottom: "30%",
      containLabel: false, // 这个啥？看下面
    },
    tooltip: {
      trigger: "item",
      formatter: function(params: any) {
        if (params.data !== undefined) {
          const data = params.data;
          return (
            data.name + "</br>" + params.marker + "备案项目数量：" + data.value
            // '<div style="background:#002160;width:100%;height:100%"> <div>  </div> </div>'
          );
        }
      },
    },
    visualMap: [
      {
        dimension: 0,
        left: 10,
        bottom: 15,
        // itemWidth: 12,
        min: 0,
        max: 20,
        text: ["20", "0"],
        // textStyle: {
        //     color: '#ddd'
        // },
        inRange: {
          color: ["#2799FB", "#237AEB", "#123B9C"],
        },
      },
    ],
    series: [
      {
        name: "中国",
        type: "map",
        mapType: "china",
        zoom: 2.0,
        aspectScale: 0.95, //长宽比
        roam: true, //是否允许缩放
        label: {
          show: true,
          formatter: function(params: any) {
            return (
              "{a|" +
              params.name +
              "}" +
              "\n" +
              "{b|" +
              (params.value ? params.value : 0) +
              "}"
            );
          },
          rich: {
            a: {
              color: "#ffffff",
              fontSize: 12,
            },
            b: {
              fontSize: 16,
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#14326c",
              padding: [0, 7, 2, 7],
              borderRadius: 7,
              opacity: 0.2,
            },
            c: {
              fontSize: 12,
              color: "#fff",
            },
          },
        },
        itemStyle: {
          normal: {
            // areaColor: '#2798FA',
            areaColor: "#183c82",
            borderColor: "#fff",
          },
          emphasis: {
            //鼠标移入高亮显颜色
            areaColor: "#6094f3",
          },
        },
        data: this.mapData,
        emphasis: {
          shodowoffsetX: 0,
          shodowoffsetY: 0,
          shadowBlur: 0,
          borderWidth: 1,
          shadowColor: "#ff3dd",
          areaColor: "#ff7044",
          lable: {
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
      },
    ],
  };
  // json 数据可直接放在public/static/mapJson/湖南省.json   axios.get可以直接访问
  private initMapEcharts(params: any) {
    const myChart = echarts.init(this.$refs.province);
    axios.get(`/static/${params.name}.json`).then((res: any) => {
      echarts.registerMap(params.name, res.data);
      this.mapOptions.series[0].mapType = params.name;
      // this.mapOptions.series[0].data = d
      (myChart as any).setOption(this.mapOptions);
      setTimeout(() => {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 200);
    });
    // myChart.on('click', (params: any) => {
    //   if (myChart) {
    //     myChart.dispose()
    //   }
    //   this.initMapEcharts({
    //     name: params.name,
    //     code: parseInt(params.data.code)
    //   })
    // })
  }

  // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。
  // 在修改数据之后立即使用它，然后等待 DOM 更新
  mounted() {
    this.$nextTick(() => {
      this.initMapEcharts({
        name: "中国",
      });
    });
  }
}
</script>
<style lang="scss" scoped>
.province {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #province {
    width: 80%;
    height: 80%;
  }
}
.tooltipBox {
  color: red;
}
</style>
