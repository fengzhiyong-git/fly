<template>
  <div class="province">
    <div id="province" ref="province"></div>
    <div class="tooltip-wrap">
      <div class="tooltip-top">
        <div class="tooltip-title">湖南省</div>
        <div class="count">156 <span>个</span></div>
      </div>
      <div class="tooltip-body">
        <div class="item">
          <div class="item-left">
            <div class="text">资规产品链</div>
            <div class="count">104<span>个</span></div>
          </div>
          <div class="item-right">
            <div class="text-content">
              <div class="text-wrap">
                <div class="text">智慧应用</div>
                <div class="count">46<span>个</span></div>
              </div>
              <div class="line">
                <div class="inner-line"></div>
              </div>
            </div>
            <div class="text-content">
              <div class="text-wrap">
                <div class="text">业务咨询</div>
                <div class="count">58<span>个</span></div>
              </div>
              <div class="line">
                <div class="inner-line ywzx"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <div class="item-left zjcpl">
            <div class="text">住建产品链</div>
            <div class="count">104<span>个</span></div>
          </div>
          <div class="item-right">
            <div class="text-content">
              <div class="text-wrap">
                <div class="text">智慧应用</div>
                <div class="count">46<span>个</span></div>
              </div>
              <div class="line">
                <div class="inner-line"></div>
              </div>
            </div>
            <div class="text-content">
              <div class="text-wrap">
                <div class="text">业务咨询</div>
                <div class="count">58<span>个</span></div>
              </div>
              <div class="line">
                <div class="inner-line ywzx"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
    { name: "河南省", value: 2, code: 410000 },
    { name: "广东省", value: 3, code: 440000 },
    { name: "内蒙古自治区", value: 4, code: 150000 },
    { name: "黑龙江省", value: 5, code: 230000 },
    { name: "新疆维吾尔自治区", value: 6, code: 650000 },
    { name: "湖北省", value: 7, code: 420000 },
    { name: "辽宁省", value: 8, code: 210000 },
    { name: "山东省", value: 9, code: 370000 },
    { name: "陕西省", value: 10, code: 610000 },
    { name: "上海市", value: 11, code: 310000 },
    { name: "贵州省", value: 12, code: 520000 },
    { name: "重庆市", value: 13, code: 500000 },
    { name: "西藏自治区", value: 14, code: 540000 },
    { name: "安徽省", value: 15, code: 340000 },
    { name: "福建省", value: 15, code: 350000 },
    { name: "湖南省", value: 15, code: 430000 },
    { name: "海南省", value: 15, code: 460000 },
    { name: "江苏省", value: 15, code: 320000 },
    { name: "青海省", value: 15, code: 630000 },
    { name: "江苏省", value: 15, code: 320000 },
    { name: "广西壮族自治区", value: 15, code: 450000 },
    { name: "宁夏回族自治区", value: 15, code: 640000 },
    { name: "浙江省", value: 15, code: 330000 },
    { name: "河北省", value: 15, code: 130000 },
    { name: "香港特别行政区", value: 15, code: 810000 },
    { name: "台湾省", value: 15, code: 710000 },
    { name: "澳门特别行政区", value: 15, code: 820000 },
    { name: "甘肃省", value: 15, code: 620000 },
    { name: "四川省", value: 15, code: 510000 },
    { name: "天津市", value: 15, code: 120000 },
    { name: "江西省", value: 15, code: 360000 },
    { name: "云南省", value: 15, code: 530000 },
    { name: "山西省", value: 15, code: 140000 },
    { name: "北京市", value: 15, code: 110000 },
    { name: "吉林省", value: 15, code: 220000 },
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
            data.name + "</br>" + params.marker + "数量：" + data.value
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
          backgroundColor: "rgba(0,0,0,0.3)",
          // borderColor: '#777',
          // borderWidth: 1,
          padding: [8, 8, 0, 8],
          borderRadius: 4,
          formatter: function(params: any) {
            return (
              "{dot|" +
              "● " +
              "}" +
              "{a|" +
              params.name +
              "}" +
              "\n" +
              "{b|" +
              params.value +
              "}" +
              "{c|个}"
            );
          },
          rich: {
            dot: {
              color: "#e5dfc9",
            },
            a: {
              color: "#fff",
              align: "center",
            },
            b: {
              color: "#fff",
              height: 25,
              align: "left",
              fontSize: 18,
            },
            hr: {
              borderColor: "#777",
              width: "100%",
              borderWidth: 0.5,
              height: 0,
            },
            c: {
              color: "#fff",
              align: "left",
              height: 25,
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
    axios.get(`/static/china/${params.code}.geoJson`).then((res: any) => {
      console.log(JSON.parse(JSON.stringify(res.data.features)));

      const d: any = [];
      for (let i = 0; i < res.data.features.length; i++) {
        d.push({
          name: res.data.features[i].properties.name,
          value: 12,
          code: res.data.features[i].properties.adcode,
        });
      }

      echarts.registerMap(params.name, res.data);
      // debugger;
      // this.mapOptions.series[0].data = d;
      this.mapOptions.series[0].mapType = params.name;
      (myChart as any).setOption(this.mapOptions);
      setTimeout(() => {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 200);
    });
    // myChart.on("click", (params: any) => {
    //   if (myChart) {
    //     myChart.dispose();
    //   }
    //   this.initMapEcharts({
    //     name: params.name,
    //     code: parseInt(params.data.code),
    //   });
    // });
  }

  // this.$nextTick()将回调延迟到下次 DOM 更新循环之后执行。
  // 在修改数据之后立即使用它，然后等待 DOM 更新
  mounted() {
    this.$nextTick(() => {
      this.initMapEcharts({
        name: "中国",
        code: "999999",
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
    width: 60%;
    height: 80%;
    background: #eee;
    // border-radius: 50%;
    // overflow: hidden;
  }
  .tooltip-wrap {
    width: 320px;
    height: 240px;
    background: #002160;
    padding: 16px;
    .tooltip-top {
      display: flex;
      justify-content: space-between;
      .tooltip-title {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
      }
      .count {
        font-size: 20px;
        color: #fff;
        font-weight: bold;
        span {
          color: #fff;
          font-weight: normal;
          font-size: 14px;
        }
      }
    }
    .tooltip-body {
      margin-top: 24px;
      .item {
        display: flex;
        &:first-child {
          margin-bottom: 16px;
        }
        .item-left {
          padding: 8px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-right: 8px;
          background: linear-gradient(
            90deg,
            #0fa 0%,
            rgba(0, 255, 170, 0.5) 100%
          );
          .text {
            font-size: 12px;
            color: #fff;
          }
          .count {
            font-size: 20px;
            font-weight: bold;
            color: #fff;
            span {
              margin-left: 4px;
              font-weight: normal;
              font-size: 14px;
            }
          }
        }
        .zjcpl {
          background: linear-gradient(
            90deg,
            #ffcf40 0%,
            rgba(255, 207, 64, 0.5) 100%
          );
        }
        .item-right {
          flex: 1;
          .text-content {
            &:first-child {
              margin-bottom: 8px;
            }
          }
          .text-wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text {
              color: #fff;
              font-size: 12px;
            }
            .count {
              font-size: 14px;
              color: #fff;
              font-weight: bold;
              span {
                margin-left: 4px;
                font-weight: normal;
              }
            }
          }
          .line {
            width: 100%;
            height: 4px;
            background: #193870;
            margin-top: 5px;
            .inner-line {
              width: 80%;
              height: 4px;
              background: linear-gradient(
                270deg,
                #00eaff 0%,
                #0095ff 50%,
                rgba(0, 149, 255, 0) 100%
              );
            }
            .ywzx {
              width: 89%;
              background: linear-gradient(
                270deg,
                #6dffd6 0%,
                #0fa 50%,
                rgba(0, 255, 170, 0) 100%
              );
            }
          }
        }
      }
    }
  }
}
.tooltipBox {
  color: red;
}
</style>
