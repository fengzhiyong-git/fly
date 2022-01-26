<template>
  <div>
    <highcharts-container :defOptions="options" :styles="sty"></highcharts-container>
    <highcharts-container :defOptions="options1" :styles="sty"></highcharts-container>
  </div>
</template>

<script>
import HighchartsContainer from '@/components/HighCharts/index.vue'
export default {
  components: {
    HighchartsContainer
  },
  data() {
    return {
      sty: {
        width: 1200,
        height: 400
      },
      //   柱形图
      options: {
        title: {
          text: '按时间汇总',
          x: -20 // center
        },
        chart: {
          type: 'column'
        },
        xAxis: {
          categories: [
            '00:00~01:00',
            '01:00~02:00',
            '02:00~03:00',
            '03:00~04:00',
            '04:00~05:00',
            '05:00~06:00',
            '06:00~07:00',
            '07:00~08:00',
            '08:00~09:00',
            '09:00~10:00',
            '10:00~11:00',
            '11:00~12:00',
            '12:00~13:00',
            '13:00~14:00',
            '14:00~15:00',
            '15:00~16:00',
            '16:00~17:00',
            '17:00~18:00',
            '18:00~19:00',
            '19:00~20:00',
            '20:00~21:00',
            '21:00~22:00',
            '22:00~23:00',
            '23:00~24:00'
          ]
        },
        yAxis: {
          title: {
            text: '过车统计'
          },
          // 标示线
          plotLines: [
            {
              value: 0,
              width: 1,
              color: '#808080'
            }
          ]
        },
        tooltip: {
          valueSuffix: '辆' // 提示信息所带单位
        },
        legend: {
          enabled: false //  禁用图例
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        series: [
          {
            name: '过车数量',
            data: [
              7.0,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6,
              7.0,
              6.9,
              9.5,
              14.5,
              18.2,
              21.5,
              25.2,
              26.5,
              23.3,
              18.3,
              13.9,
              9.6
            ]
          }
        ]
      },
      //   饼图
      options1: {
        chart: {
          type: 'pie',
          options3d: {
            enabled: true,
            alpha: 45
          }
        },
        title: {
          text: '简数科技每周水果消耗量'
        },
        subtitle: {
          text: 'Highcharts 中的3D环形图'
        },
        plotOptions: {
          pie: {
            innerSize: 100,
            depth: 45
          }
        },
        series: [
          {
            name: '货物金额',
            data: [
              ['香蕉', 8],
              ['猕猴桃', 3],
              ['桃子', 1],
              ['橘子', 6],
              ['苹果', 8],
              ['梨', 4],
              ['柑橘', 4],
              ['橙子', 1],
              ['葡萄 (串)', 10]
            ]
          }
        ]
      }
    }
  }
}
</script>

<style></style>
