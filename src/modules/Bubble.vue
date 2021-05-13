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
  private geoCoordMap = {
    '遂平县': [114.015819, 33.150944],
    '上蔡县': [114.276256, 33.267906],
    '西平县': [114.022143, 33.394355],
    '驿城区': [114.006045, 32.978599],
    '确山县': [114.033641, 32.810768],
    '泌阳县': [113.335694, 32.731107],
    '汝南县': [114.375141, 33.016389],
    '正阳县': [114.398138, 32.615372],
    '平舆县': [114.629254, 32.969876],
    '新蔡县': [114.979952, 32.752487]
  }
  private mapData:any = [ ]
  private mapOptions:any = {
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
        if(params.data !== undefined){
          const data = params.data
          return (
            data.name +
            '</br>' +
            params.marker +
            '备案项目数量：' +
            data.value 
          )
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
        // label: {
        //   show: true,
        //   normal: {
        //     show: true,
        //     color: '#fff'
        //   },
        //   emphasis: {
        //     show: true,
        //     fontSize: 16,
        //     color: '#fff'
        //   },
        //   align: 'center'
        // },
        label: {
          show: true,
          formatter: function (params:any) {
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
              fontSize: 12,
              color: "#1058D1",
              backgroundColor: "ffffff",
              padding: [0, 7, 2, 7],
              borderRadius: 7,
            },
          },
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
      },      
    ]
  }

  private initMapEcharts(params: any) {
     //数据信息 s
      const data = [
        { name: '长沙市', value: 2, code: 430100 },
        { name: '株洲市', value: 3, code: 430200 },
        { name: '湘潭市', value: 4, code: 430300 },
        { name: '衡阳市', value: 5, code: 430400 },
        { name: '邵阳市', value: 6, code: 430500 },
        { name: '岳阳市', value: 7, code: 430600 },
        { name: '常德市', value: 8, code: 430700 },
        { name: '张家界市', value: 9, code: 430800 },
        { name: '益阳市', value: 10, code: 430900},
        { name: '郴州市', value: 11, code: 431000 },
        { name: '永州市', value: 12, code: 431100 },
        { name: '怀化市', value: 13, code: 431200 },
        { name: '娄底市', value: 14, code: 431300 },
        { name: '湘西州', value: 15, code: 433100 }
      ];
      // 地理位置信息  经纬度
      const geoCoordMap:any = {
          '长沙市': [112.982279, 28.19409],
          '株洲市': [113.51737, 27.135806],
          '湘潭市': [112.684052, 27.72973],
          '衡阳市': [112.607693, 26.900358],
          '邵阳市': [110.86923, 26.837842],
          '岳阳市': [113.232855, 29.07029],
          '常德市': [111.691347, 29.040225],
          '张家界市': [110.579921, 29.327401],
          '益阳市': [112.055042, 28.470066],
          '郴州市': [113.032067, 25.793589],
          '永州市': [111.818019, 25.834516],
          '怀化市': [109.97824, 27.550082],
          '娄底市': [111.708497, 27.728136],
          '湘西州': [109.73893, 28.61163],
      };

      const convertData = function(data:any) {
        const res = [];
        for (let i = 0; i < data.length; i++) {
          const geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

    const myChart = echarts.init(this.$refs.province)
    axios.get(`/static/mapJson/${params.name}.json`).then((res:any) => {
      echarts.registerMap("hunan", res.data)   
      let option = null
      option = {
        // backgroundColor: {
        //   type: "linear",
        //   x: 0,
        //   y: 0,
        //   x2: 1,
        //   y2: 1,
        //   colorStops: [
        //     {
        //       offset: 0,
        //       color: "#0f378f" // 0% 处的颜色
        //     },
        //     {
        //       offset: 1,
        //       color: "#00091a" // 100% 处的颜色
        //     }
        //   ],
        //   globalCoord: false
        // },
        tooltip: {
          trigger: "item",
          formatter: function(params:any) {
            if (typeof params.value[2] == "undefined") {
              return params.name + " : " + params.value;
            } else {
              return params.name + " : " + params.value[2];
            }
          }
        },
        // legend: {
        //   orient: "vertical",
        //   y: "bottom",
        //   x: "right",
        //   data: ["pm2.5"],
        //   textStyle: {
        //     color: "#fff"
        //   }
        // },
        // visualMap: {
        //   show: false,
        //   min: 0,
        //   max: 500,
        //   left: "left",
        //   top: "bottom",
        //   text: ["高", "低"], // 文本，默认为数值文本
        //   calculable: true,
        //   seriesIndex: [1],
        //   inRange: {}
        // },
        geo: {
          map: "hunan",
          show: true,
          roam: true,
          // center: [114.006045, 32.978599],  // 驿城区
          center: [111.708497, 27.728136],  // 娄底市
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
            // normal: {
            //   areaColor: "#3a7fd5",
            //   borderColor: "#0a53e9", //线
            //   shadowColor: "#092f8f", //外发光
            //   shadowBlur: 20
            // },
            // emphasis: {
            //   areaColor: "#0a2dae" //悬浮区背景
            // }
          }
        },
        series: [
          {
            symbolSize: 5,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            },
            name: "light",
            type: "scatter", // 气泡效果
            coordinateSystem: "geo",
            data: convertData(data)
          },
          {
            type: "map",
            map: "hunan",
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
                  color: "#fff"
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
            name: "Top 5",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: [50, 50],
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                },
                formatter(value:any) {
                  return value.data.value[2];
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#D8BC37" //标志颜色
              }
            },
            data: convertData(data),
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            zlevel: 1
          }
        ]
      }; 
      ;(myChart as any).setOption(option)      
    })
  }
  mounted() {
    this.$nextTick(() => { 
      this.initMapEcharts({
        name: '湖南省',
        code: 430000
      })
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
  justify-content: center;
  #province {
    width: 80%;
    height: 80%;
  }
}
</style>
