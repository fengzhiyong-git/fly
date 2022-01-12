<template>
  <div class="province">
    <!-- 省份地图 -->
    <div id="province" ref="province"></div>
    <!-- 柱形图 -->
    <div ref="ColumnEcharts" id="Column"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import echarts from 'echarts'
import axios from 'axios'
@Component({
  name: 'Province'
})
export default class Province extends Vue {
  private geoCoordMap = {
    遂平县: [114.015819, 33.150944],
    上蔡县: [114.276256, 33.267906],
    西平县: [114.022143, 33.394355],
    驿城区: [114.006045, 32.978599],
    确山县: [114.033641, 32.810768],
    泌阳县: [113.335694, 32.731107],
    汝南县: [114.375141, 33.016389],
    正阳县: [114.398138, 32.615372],
    平舆县: [114.629254, 32.969876],
    新蔡县: [114.979952, 32.752487]
  }
  private mapData: any = []
  private mapOptions: any = {
    toolbox: {
      show: false
    },
    grid: {
      left: 0,
      right: 0
    },
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        if (params.data !== undefined) {
          const data = params.data
          return data.name + '</br>' + params.marker + '备案项目数量：' + data.value
        }
      }
    },
    visualMap: [
      {
        dimension: 0,
        left: 10,
        bottom: 15,
        // itemWidth: 12,
        min: 0,
        max: 20,
        text: ['20', '0'],
        // textStyle: {
        //     color: '#ddd'
        // },
        inRange: {
          color: ['#2799FB', '#237AEB', '#123B9C']
        }
      }
    ],
    series: [
      {
        name: '湖南省',
        type: 'map',
        mapType: 'hunan',
        zoom: 1.15,
        aspectScale: 0.95, //长宽比
        label: {
          show: true,
          formatter: function(params: any) {
            return '{a|' + params.name + '}' + '\n' + '{b|' + (params.value ? params.value : 0) + '}'
          },
          rich: {
            a: {
              color: '#ffffff',
              fontSize: 12
            },
            b: {
              fontSize: 12,
              color: '#1058D1',
              backgroundColor: 'ffffff',
              padding: [0, 7, 2, 7],
              borderRadius: 7
            }
          }
        },
        itemStyle: {
          normal: {
            // areaColor: '#2798FA',
            areaColor: '#D3DEFF',
            borderColor: '#fff'
          },
          emphasis: {
            //鼠标移入高亮显颜色
            areaColor: '#ff7044'
          }
        },
        data: this.mapData,
        emphasis: {
          shodowoffsetX: 0,
          shodowoffsetY: 0,
          shadowBlur: 0,
          borderWidth: 1,
          shadowColor: '#ff3dd',
          areaColor: '#ff7044',
          lable: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          }
        }
      }
    ]
  }

  private initMapEcharts(params: any) {
    //数据信息
    const data = [
      { name: '长沙市', value: 2, code: 430100 },
      { name: '株洲市', value: 3, code: 430200 },
      { name: '湘潭市', value: 4, code: 430300 },
      { name: '衡阳市', value: 5, code: 430400 },
      { name: '邵阳市', value: 6, code: 430500 },
      { name: '岳阳市', value: 7, code: 430600 },
      { name: '常德市', value: 8, code: 430700 },
      { name: '张家界市', value: 9, code: 430800 },
      { name: '益阳市', value: 10, code: 430900 },
      { name: '郴州市', value: 11, code: 431000 },
      { name: '永州市', value: 12, code: 431100 },
      { name: '怀化市', value: 13, code: 431200 },
      { name: '娄底市', value: 14, code: 431300 },
      { name: '湘西州', value: 15, code: 433100 }
    ]
    // 地理位置信息  经纬度
    const geoCoordMap: any = {
      长沙市: [112.982279, 28.19409],
      株洲市: [113.51737, 27.135806],
      湘潭市: [112.684052, 27.72973],
      衡阳市: [112.607693, 26.900358],
      邵阳市: [110.86923, 26.837842],
      岳阳市: [113.232855, 29.07029],
      常德市: [111.691347, 29.040225],
      张家界市: [110.579921, 29.327401],
      益阳市: [112.055042, 28.470066],
      郴州市: [113.032067, 25.793589],
      永州市: [111.818019, 25.834516],
      怀化市: [109.97824, 27.550082],
      娄底市: [111.708497, 27.728136],
      湘西州: [109.73893, 28.61163]
    }

    const convertData = function(data: any) {
      const res = []
      for (let i = 0; i < data.length; i++) {
        const geoCoord = geoCoordMap[data[i].name]
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value)
          })
        }
      }
      return res
    }

    const myChart = echarts.init(this.$refs.province)
    axios.get(`/static/mapJson/${params.name}.json`).then((res: any) => {
      echarts.registerMap('hunan', res.data)
      let option = null
      option = {
        // backgroundColor: { },
        tooltip: {
          trigger: 'item',
          formatter: function(params: any) {
            if (typeof params.value[2] == 'undefined') {
              return params.name + ' : ' + params.value
            } else {
              return params.name + ' : ' + params.value[2]
            }
          }
        },
        geo: {
          map: 'hunan',
          show: true,
          roam: true,
          center: [111.708497, 27.728136], // 娄底市
          zoom: 1, //当前视角缩放比例
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          itemStyle: {
            normal: {
              // areaColor: '#2798FA',
              areaColor: '#237AEB',
              borderColor: '#fff'
            },
            emphasis: {
              //鼠标移入高亮显颜色
              areaColor: '#ff7044'
            }
          }
        },
        series: [
          // {
          //   name: 'light',
          //   type: 'scatter',
          //   coordinateSystem: 'geo',
          //   data: convertData(data),
          //   // symbolSize: function(val: any) {
          //   //   return val[2] / 10
          //   // },
          //   label: {
          //     normal: {
          //       formatter: '{b}',
          //       position: 'right',
          //       show: false
          //     },
          //     emphasis: {
          //       show: true
          //     }
          //   },
          //   itemStyle: {
          //     normal: {
          //       color: '#F4E925'
          //     }
          //   }
          // },
          {
            type: 'map',
            map: 'hunan',
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: '#D3DEFF',
                borderColor: '#fff'
              },
              emphasis: {
                areaColor: '#ff7044'
              }
            },
            emphasis: {
              shodowoffsetX: 0,
              shodowoffsetY: 0,
              shadowBlur: 0,
              borderWidth: 1,
              shadowColor: '#ff3dd',
              areaColor: '#ff7044',
              lable: {
                show: true,
                textStyle: {
                  color: '#fff'
                }
              }
            },
            animation: false,
            data: data
          },
          {
            name: 'Top 5',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: convertData(
              data
                .sort(function(a, b) {
                  return b.value - a.value
                })
                .slice(0, 5)
              // 动态排序 拿前面5个
            ),
            symbolSize: function(val: any) {
              return 20
            },
            showEffectOn: 'render',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: '{b}',
                position: 'right',
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: '#F4E925',
                shadowBlur: 10,
                shadowColor: '#05C3F9'
              }
            },
            zlevel: 1
          }
        ]
      }
      ;(myChart as any).setOption(option)
    })
  }

  // 柱状图
  private myEcharts: any = null
  private charts() {
    if (this.myEcharts) this.myEcharts.dispose()
    //初始化echarts实例
    this.myEcharts = echarts.init(this.$refs.ColumnEcharts)
    //对echarts做基础配置
    const option = {
      color: ['#00cea4', '#8c92e1'],
      // 鼠标移入的提示框
      tooltip: {
        show: true, // 是否显示
        // 鼠标移入柱状图的阴影
        trigger: 'axis', // 触发类型  axis 坐标轴触发   item  散点图 数据触发
        axisPointer: {
          type: 'shadow' // 指示器类型  shadow 阴影  line 直线  cross 十字准星
          // shadowStyle: {
          //   // color: '#999'
          // }
        }
      },
      // 图例组件
      legend: {
        data: ['国家级园区', '省级园区'],
        orient: 'vertical', //图例列表的布局朝向。 horizontal 水平   vertical 垂直
        right: '10px', // 组件位置的调整
        top: '50%',
        itemHeight: 24,
        icon: 'diamond' // 前面的图标设置为圆形
      },
      // 表格组件
      grid: {
        right: '30%' // 位置的调整   top  left
      },
      //x轴的文本
      xAxis: {
        type: 'category',
        data: ['长株潭地区', '洞庭湖地区', '湘南地区', '大湘西地区'],
        axisLabel: {
          // 左边轴文字倾斜  ##
          interval: 0,
          rotate: 0 // 角度
        }
      },
      //y轴的文本
      yAxis: [
        {
          type: 'value',
          name: '单位(家)',
          min: 0,
          max: 50,
          interval: 10,
          // minInterval: 4,  // Y轴设置刻度最小间隔
          axisLabel: {
            formatter: '{value} '
          },

          axisLine: {
            // 单独隐藏坐标轴
            show: true
          },
          axisTick: {
            // 单独隐藏刻度线
            show: true
          }
        }
      ],
      // 数据的配置
      series: [
        {
          name: '国家级园区',
          type: 'bar',
          data: [5, 20, 36, 10],
          barGap: '20%', // 柱形图之间的距离
          // barWidth: 25, //柱图宽度
          // itemStyle: { normal: { color: "green" } }, // 修改柱形图的颜色
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', // 控制文字在上方显示
                textStyle: {
                  //数值样式
                  color: 'black',
                  fontSize: 16
                }
              }
            }
          }
        },
        {
          name: '省级园区',
          type: 'bar',
          data: [10, 22, 5, 19],
          barGap: '20%',
          // barWidth: 25, //柱图宽度
          // itemStyle: { normal: { color: "skyblue" } }, // 修改柱形图的颜色
          itemStyle: {
            normal: {
              label: {
                show: true, //开启显示
                position: 'top', //在上方显示
                textStyle: {
                  //数值样式
                  color: 'black',
                  fontSize: 16
                }
              }
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true, //显示缩放条
          type: 'inside',
          start: 1,
          end: 100
        }
      ]
    }
    this.myEcharts.setOption(option)

    window.addEventListener('resize', () => {
      this.myEcharts.resize()
    })
  }
  mounted() {
    this.$nextTick(() => {
      this.initMapEcharts({
        name: '湖南省',
        code: 430000
      })
      this.charts()
    })
  }
}
</script>
<style lang="scss" scoped>
.province {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  // justify-content: center;
  #province {
    width: 50%;
    height: 100%;
  }
  #Column {
    width: 50%;
    height: 100%;
  }
}
</style>
