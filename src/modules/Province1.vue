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
  name: "Province"
})
export default class Province extends Vue {
  // json 数据可直接放在public/static/mapJson/湖南省.json   axios.get可以直接访问
  private initMapEcharts(params: any) {
    //数据信息
    const data = [
      { name: "长沙市", value: 2, code: 430100 },
      { name: "株洲市", value: 3, code: 430200 },
      { name: "湘潭市", value: 4, code: 430300 },
      { name: "衡阳市", value: 5, code: 430400 },
      { name: "邵阳市", value: 6, code: 430500 },
      { name: "岳阳市", value: 7, code: 430600 },
      { name: "常德市", value: 8, code: 430700 },
      { name: "张家界市", value: 9, code: 430800 },
      { name: "益阳市", value: 10, code: 430900 },
      { name: "郴州市", value: 11, code: 431000 },
      { name: "永州市", value: 12, code: 431100 },
      { name: "怀化市", value: 13, code: 431200 },
      { name: "娄底市", value: 14, code: 431300 },
      { name: "湘西州", value: 15, code: 433100 }
    ];
    const mapData: any = [];
    //地理位置信息  center
    const geoCoordMap = {
      长沙市: [112.982279, 28.19409],
      株洲市: [113.351737, 27.535806],
      湘潭市: [112.544052, 27.82973],
      邵阳市: [111.46923, 27.237842],
      岳阳市: [113.132855, 29.37029],
      衡阳市: [112.607693, 26.900358],
      常德市: [111.691347, 29.040225],
      张家界市: [110.479921, 29.127401],
      益阳市: [112.055042, 28.470066],
      永州市: [111.608019, 26.434516],
      郴州市: [113.032067, 25.793589],
      怀化市: [109.97824, 27.550082],
      娄底市: [111.608497, 27.828136],
      湘西土家族苗族自治州: [109.739735, 28.614296]
    };

    const linesData: any = [];
    const mapPointData: any = {
      湘潭市: [
        [112.744052, 27.82973],
        [109.0, 27.82973],
        [50, 160]
      ],
      常德市: [
        [111.691347, 29.340225],
        [109.0, 29.340225],
        [50, 60]
      ],
      天心区: [
        [112.981967, 28.064521],
        [112.981967, 27.9],
        [10, 60]
      ],
      雨花区: [
        [113.08366, 28.063301],
        [113.306337, 27.8],
        [10, 80]
      ],
      开福区: [
        [113.001234, 28.302419],
        [112.80307, 28.6]
      ],
      芙蓉区: [
        [113.049343, 28.198177],
        [113.416337, 28.7]
      ],
      石峰区: [
        [113.141998, 27.928496],
        [112.954675, 27.928496]
      ],
      荷塘区: [
        [113.219503, 27.900997],
        [113.616337, 27.900997]
      ],
      芦淞区: [
        [113.254675, 27.805177],
        [112.804675, 27.305177]
      ],
      天元区: [
        [113.073902, 27.706544],
        [112.873902, 27.606544]
      ],
      石鼓区: [
        [112.604714, 26.962458],
        [112.1, 27.362458]
      ],
      蒸湘区: [
        [112.570608, 26.89087],
        [111.9, 27.2]
      ],
      雁峰区: [
        [112.607659, 26.832587],
        [111.907659, 26.5]
      ],
      珠晖区: [
        [112.671137, 26.876829],
        [113.2, 26.876829]
      ],
      南岳区: [
        [112.696422, 27.257198],
        [112.696422, 27.47198]
      ],
      北塔区: [
        [111.420079, 27.248192],
        [110.25, 27.248192]
      ],
      双清区: [
        [111.546436, 27.241775],
        [110.5, 27.441775]
      ],
      大祥区: [
        [111.485515, 27.159475],
        [110.0, 27.059475]
      ],
      君山区: [
        [112.866822, 29.576796],
        [112.466822, 29.7]
      ],
      岳阳楼区: [
        [113.214548, 29.33568],
        [113.214548, 29.7]
      ],
      云溪区: [
        [113.297716, 29.508639],
        [113.8, 29.508639]
      ],
      津市市: [
        [111.895477, 29.460085],
        [111.895477, 30]
      ],
      鼎城区: [
        [111.856233, 29.178493],
        [111.856233, 28.6]
      ],
      武陵区: [
        [111.705096, 29.014803],
        [110.9, 29.014803]
      ],
      北湖区: [
        [112.889947, 25.656793],
        [113.2, 25.359793]
      ],
      冷水滩区: [
        [111.632415, 26.529754],
        [111.0, 26.8]
      ],
      辰溪县: [
        [110.265855, 27.890091],
        [109.8, 28.6]
      ],
      麻阳苗族自治县: [
        [109.722413, 27.784229],
        [109.0, 28.3]
      ],
      鹤城区: [
        [109.947186, 27.611957],
        [111.35, 28.4]
      ],
      中方县: [
        [110.160324, 27.508841],
        [111.3, 27.6]
      ],
      芷江侗族自治县: [
        [109.603294, 27.395167],
        [108.8, 27.9]
      ],
      洪江市: [
        [110.07934, 27.232457],
        [111.3, 27.232457]
      ],
      溆浦县: [
        [110.650583, 27.831449],
        [111.2, 28.0]
      ],
      吉首市: [
        [109.762507, 28.309997],
        [110.3, 28.309997]
      ]
    };

    data.map(item => {
      const newData = {
        name: item.name,
        value: item.value,
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
              fontSize: 12
            },
            b: {
              fontSize: 12,
              color: "#1058D1",
              backgroundColor: "ffffff",
              padding: [0, 7, 2, 7],
              borderRadius: 7
            }
          }
        }
      };

      for (const key in mapPointData) {
        if (item.name == key) {
          newData.label.show = false;
          linesData.push({
            name: item.name,
            value: item.value,
            coords: mapPointData[item.name]
          });
        }
      }
      mapData.push(newData);
    });

    const myChart = echarts.init(this.$refs.province);
    axios.get(`/static/mapJson/${params.name}.json`).then((res: any) => {
      echarts.registerMap("hunan", res.data);
      // debugger
      let option = null;
      option = {
        grid: {
          containLabel: true
        },
        geo: {
          map: "hunan",
          show: true,
          aspectScale: 0.95
        },
        series: [
          {
            name: "hunan map",
            type: "map",
            label: {
              show: true,
              normal: {
                show: true,
                color: "#fff"
              }
            },
            symbolSize: 1,
            //roam: true,
            map: "hunan",
            emphasis: {
              label: {
                show: true
              }
            },
            aspectScale: 0.95,
            itemStyle: {
              borderColor: "rgba(60,128,247,0.8)",
              areaColor: "#A5C1F1",
              borderWidth: 1
            },
            zoom: 1.0,
            data: mapData
          },
          {
            name: "区域",
            type: "lines",
            zlevel: 0,
            symbol: ["circle", "none"],
            symbolSize: ["5", "none"],
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
                  fontSize: 12
                },
                b: {
                  fontSize: 12,
                  color: "#1058D1",
                  backgroundColor: "ffffff",
                  padding: [0, 7, 2, 7],
                  borderRadius: 7
                }
              }
            },
            lineStyle: {
              type: "solid",
              opacity: 1,
              width: 1,
              color: "#ffffff"
            },
            data: linesData
          }
        ]
      };

      (myChart as any).setOption(option);
      setTimeout(() => {
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      }, 200);
    });
  }

  mounted() {
    this.$nextTick(() => {
      this.initMapEcharts({
        name: "湖南省",
        code: 430000
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
  background: linear-gradient(180deg, rgba(60, 128, 247, 0.8) 0%, #1058d1 100%);
  #province {
    width: 80%;
    height: 80%;
  }
}
</style>
