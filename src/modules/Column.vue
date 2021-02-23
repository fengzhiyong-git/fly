<template>
  <div class="Column">
    <div id="Column" ref="ColumnEcharts"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import echarts from "echarts";
@Component({
  name: "Column",
})
export default class Column extends Vue {
  private myEcharts:any = null
  private charts() {
    if (this.myEcharts) this.myEcharts.dispose()
    //初始化echarts实例
    this.myEcharts = echarts.init(this.$refs.ColumnEcharts);
    //对echarts做基础配置
    const option = {
      title: {
        // 主标题文本
        text: "echarts 柱状图",
        textStyle: {
          color: "red",
          fontSize: "20",
        },
      },
      // 鼠标移入的提示框
      tooltip: {
        show: true, // 是否显示
        // 鼠标移入柱状图的阴影
        trigger: "axis", // 触发类型  axis 坐标轴触发   item  散点图 数据触发
        axisPointer: {
          type: "shadow", // 指示器类型  shadow 阴影  line 直线  cross 十字准星
          // shadowStyle: {
          //   // color: '#999'
          // }
        },
      },
      // 工具栏  按钮
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false }, // 数据视图
          magicType: { show: true, type: ["line", "bar"] }, // 动态类型切换  type  折线  柱状
          restore: { show: true }, // 配置项还原
          saveAsImage: { show: true }, // 保存为图片
        },
      },
      // 图例组件
      legend: {
        data: ["销量", "价格", "温度"],
        orient: "horizontal", //图例列表的布局朝向。 horizontal 水平   vertical 垂直
        right: "300px", // 组件位置的调整
        top: "0px",
        icon: "circle", // 前面的图标设置为圆形
      },
      // 表格组件
      grid: {
        right: "30%", // 位置的调整   top  left  ...
      },
      //x轴的文本
      xAxis: {
        type: "category",
        data: ["新疆", "西藏", "云南", "广西", "广东", "四川"],
        axisLabel: {
          // 左边轴文字倾斜  ##
          interval: 0,
          rotate: 45, // 角度
        },
      },
      // xAxis: [
      //   {
      //     type: "category",
      //     data: [
      //       "新疆新疆新疆",
      //       "西藏",
      //       "云南云南云南云南云南",
      //       "广西广西广西",
      //       "广东",
      //       "四川"
      //     ],

      //     axisLabel: {
      //       show: true,
      //       interval: 0,
      //       rotate: 35,
      //       bottom: 30,
      //       formatter: function(params) {
      //         let newParamsName = ""; // 最终拼接成的字符串
      //         let paramsNameNumber = params.length; // 实际标签的个数
      //         let provideNumber = 4; // 每行能显示的字的个数
      //         let rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
      //         /**
      //          * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
      //          */
      //         // 条件等同于rowNumber>1
      //         if (paramsNameNumber > provideNumber) {
      //           /** 循环每一行,p表示行 */
      //           for (let p = 0; p < rowNumber; p++) {
      //             let tempStr = ""; // 表示每一次截取的字符串
      //             let start = p * provideNumber; // 开始截取的位置
      //             let end = start + provideNumber; // 结束截取的位置
      //             // 此处特殊处理最后一行的索引值
      //             if (p == rowNumber - 1) {
      //               // 最后一次不换行
      //               tempStr = params.substring(start, paramsNameNumber);
      //             } else {
      //               // 每一次拼接字符串并换行
      //               tempStr = params.substring(start, end) + "\n";
      //             }
      //             newParamsName += tempStr; // 最终拼成的字符串
      //           }
      //         } else {
      //           // 将旧标签的值赋给新标签
      //           newParamsName = params;
      //         }
      //         //将最终的字符串返回
      //         return newParamsName;
      //       },
      //       textStyle: {
      //         color: "rgba(0,0,0,0.65)"
      //       }
      //     },
      //     axisLine: {
      //       show: true,
      //       lineStyle: {
      //         color: "rgba(0,0,0,0.65)"
      //       }
      //     },
      //     axisTick: {
      //       // 坐标轴 轴线
      //       show: true,
      //       lineStyle: {
      //         color: "rgba(0,0,0,0.65)"
      //       }
      //     }
      //   }
      // ],
      //y轴的文本
      yAxis: [
        {
          type: "value",
          name: "销量",
          min: 0,
          max: 50,
          interval: 10,
          // minInterval: 4,  // Y轴设置刻度最小间隔
          axisLabel: {
            formatter: "{value} 件",
          },

          axisLine: {
            // 单独隐藏坐标轴
            show: false,
          },
          axisTick: {
            // 单独隐藏刻度线
            show: false,
          },
        },
        {
          type: "value",
          name: "价格",
          min: 0,
          max: 50,
          interval: 10,
          axisLabel: {
            formatter: "{value} 元",
          },
          axisLine: {
            // 单独隐藏坐标轴
            show: false,
          },
          axisTick: {
            // 单独隐藏刻度线
            show: false,
          },
        },
      ],
      // 数据的配置
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 40, 30],
          barGap: "20%", // 柱形图之间的距离
          // barWidth: 25, //柱图宽度
          // itemStyle: { normal: { color: "green" } }, // 修改柱形图的颜色
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: "top", // 控制文字在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 16,
                },
              },
            },
          },
        },
        {
          name: "价格",
          type: "bar",
          data: [10, 22, 5, 19, 50, 20],
          barGap: "20%",
          // barWidth: 25, //柱图宽度
          // itemStyle: { normal: { color: "skyblue" } }, // 修改柱形图的颜色
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: "top", //在上方显示
                textStyle: {
                  //数值样式
                  color: "black",
                  fontSize: 16,
                },
              },
            },
          },
        },
        {
          name: "温度",
          type: "line",
          symbol: "none", //取消折点圆圈
          data: [17, 20, 31, 25, 8, 20],
          barGap: 0,
          // barWidth: 25, //柱图宽度
          itemStyle: {
            normal: {
              color: "red", // 设置折线点的颜色
              lineStyle: {
                color: "#00FF00", // 修改折线图线的颜色
              },
            },
          },
        },
      ],
      dataZoom: [
        //实现缩放功能
        // show: true,//显示缩放条
        // realtime: true,
        // start: 0,
        // end: 40
        {
          show: true, //显示缩放条
          type: "inside",
          start: 1,
          end: 100,
        },
      ],
    };
    this.myEcharts.setOption(option);
    // $(window).resize(function() {
    //   (this as any).myEcharts.resize();
    // });

    window.addEventListener('resize', () => {
      this.myEcharts.resize()
    })
  }
  mounted() {
    this.charts();
  }
}
</script>
<style lang="scss" scoped>
.Column {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  #Column {
    width: 80%;
    height: 80%;
  }
}
</style>
