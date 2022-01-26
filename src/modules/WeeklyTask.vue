<template>
  <div class="weekly">
    <div class="left">
      <div class="title">
        <h1 class="year">{{ showYear }}年</h1>
        <h1 class="month">{{ showMonth }}月</h1>
        <!-- <h2 class="day">第{{ monthWeek }}周</h2> -->
        <!-- <h2 class="digit">元宵</h2> -->
      </div>
      <div class="directionBox" v-show="bigFlag">
        <div @click="preMonth">
          <i class="el-icon-arrow-left"></i>
        </div>
        <div @click="nextMonth">
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <div class="weather">{{ weatherData.temperature }}℃</div>
    </div>
    <div class="right">
      <div class="right-sup" v-show="!bigFlag">
        <el-button type="text" class="week-btn el-info">
          <i class="el-icon-arrow-left el-icon--left" @click="preMonth"> </i>
          <span @click="returnNow" class="text">{{ nowYear }}-{{ nowMonth }}</span>
          <i class="el-icon-arrow-right el-icon--right" @click="nextMonth"> </i>
        </el-button>
      </div>
      <div class="right-center">
        <monthElement :list="dateArr" @openDrawer="openDrawer"></monthElement>
      </div>
      <div class="mask" @click="closeDrawer" :class="{ openPanel: drawerVisible, closePanel: !drawerVisible }">
        <div :class="{ drawerBox: true, closePanel: !drawerVisible }" @click.stop="stopFather">
          <div class="eventBox fill-height">
            <div class="eventTitle">关于召开某某某重要会议的 安排【未召开】</div>
            <div class="eventTime"><i class="el-icon-time"></i><span>时间</span> <span>下午3:00</span></div>
            <div class="eventLine">
              <i class="el-icon-office-building"></i><span>地址</span><span>办公大楼南栋406 第三 会议室</span>
            </div>
          </div>
          <div class="inputLine">
            <el-input></el-input>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import monthElement from '@/components/month.vue'
import axios from 'axios'

@Component({
  name: 'WeeklyTask',
  components: {
    monthElement
  }
})
export default class WeeklyTask extends Vue {
  @Prop() bigFlag!: any
  private weatherData: any = {}
  private key = 'b37f0563a276b8847a7c7fe3bd387196'
  private dateArr: any = []
  private showYear: any = ''
  private showMonth: any = ''
  private nowMonth: any = ''
  private nowYear: any = ''
  private drawerVisible: any = false
  created() {
    this.showYear = new Date().getFullYear()
    this.nowYear = new Date().getFullYear()
    this.showMonth = new Date().getMonth() + 1
    this.nowMonth = new Date().getMonth() + 1
    this.createMonthDay()
    this.getWeather()
  }
  openDrawer() {
    this.drawerVisible = true
  }
  closeDrawer() {
    this.drawerVisible = false
  }
  stopFather() {
    console.log('阻止冒泡')
  }
  // 获取当前月所有日期
  createMonthDay() {
    let daysOfMonth = []
    let lastDayOfMonth = new Date(this.showYear, this.showMonth, 0).getDate()
    for (var i = 1; i <= lastDayOfMonth; i++) {
      daysOfMonth.push(this.showYear + '-' + this.showMonth + '-' + i)
    }
    const arr = Array.from(daysOfMonth, (item, index) => ({
      dayInt: index + 1,
      dateStr: item
    }))
    const newArr = []
    const num: any = this.getWeek(daysOfMonth[0])
    for (let i = 0; i < num; i++) {
      newArr.push({ dayInt: null, dateStr: null })
    }
    const arr1 = [...newArr, ...arr]
    this.dateArr = Array.from(arr1, (item, index) => Object.assign({}, item, { positionInt: index }))
  }
  //获取每个月第一天是星期几
  getWeek(dateString: any) {
    const dateArray: any = dateString.split('-')
    const num: any = Number(dateArray[1]) - 1
    const date: any = new Date(dateArray[0], num, dateArray[2])
    return date.getDay()
  }
  returnNow() {
    this.showYear = this.nowYear
    this.showMonth = this.nowMonth
    this.createMonthDay()
  }
  preMonth() {
    if (+this.showMonth === 1) {
      this.showMonth = 12
      this.showYear = this.showYear - 1
    } else {
      this.showMonth = this.showMonth - 1
    }
    this.createMonthDay()
  }
  nextMonth() {
    if (+this.showMonth === 12) {
      this.showMonth = 1
      this.showYear = this.showYear + 1
    } else {
      this.showMonth = this.showMonth + 1
    }
    this.createMonthDay()
  }
  getWeather() {
    const that = this
    const url = 'https://restapi.amap.com/v3/weather/weatherInfo'
    axios
      .get(url, {
        params: {
          city: '430100',
          key: that.key
        }
      })
      .then((res: any) => {
        console.log(res.data, 44444444444444)
        if (res && res.data) {
          this.weatherData = res.data.lives[0]
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>
<style lang="scss" scoped>
.weekly {
  //   width: 100%;
  //   height: 100%;
  width: 540px;
  height: 230px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px 1px rgba(#000, 0.1);
  border-radius: 4px;
  overflow: hidden;
  display: flex;
  .left {
    width: 84px;
    height: 100%;
    background: url('~@/assets/home/calendar-bg.png');
    position: relative;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: 0 0;
    overflow: hidden;
    .title {
      width: 100%;
      text-align: left;
      padding: 12px;
      .month {
        font-size: 20px !important;
        line-height: 28px;
        color: #2c905f;
        text-align: left;
        font-weight: 500;
      }
      .year {
        font-size: 14px !important;
        line-height: 28px;
        color: #2c905f;
        text-align: left;
        font-weight: 500;
      }
    }
    .directionBox {
      width: 100%;
      position: absolute;
      bottom: 40px;
      left: 0px;
      display: flex;
      height: 24px;
      justify-content: center;
      align-items: center;
      > div {
        display: flex;
        width: 24px;
        height: 24px;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.7);
      }
    }
    .weather {
      width: 60px;
      height: 24px;
      background: #38b84d;
      border-radius: 4px;
      font-size: 14px;
      line-height: 24px;
      color: #fff;
      text-align: center;
      position: absolute;
      bottom: 12px;
      left: 12px;
    }
  }
  .right {
    width: calc(100% - 84px);
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
    overflow: hidden;
    .right-sup {
      width: 100%;
      height: 44px;
      padding: 10px;
      text-align: center;
      .week-btn {
        background: #ffffff;
        padding: 4px 1px !important;
        .text {
          opacity: 0.4;
        }
      }
    }
    .right-center {
      width: 100%;
      display: flex;
      flex: 1;
    }
    ::v-deep .week-divider.el-divider {
      background-color: #e1e1e1 !important;
    }
    ::v-deep .event-divider.el-divider {
      background-color: #eeeeee !important;
    }
    .mask {
      overflow: hidden;
      display: none;
      position: absolute;
      width: 100%;
      left: 0;
      top: 0;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: flex-end;
      .drawerBox {
        width: 60%;
        background-color: white;
        display: flex;
        flex-direction: column;
        .eventBox {
          display: flex;
          flex-direction: column;
          padding: 12px;
          box-sizing: border-box;
          .eventTitle {
            color: rgba(38, 38, 38, 1);
            font-size: 16px !important;
            font-weight: 500;
          }
          .eventTime,
          .eventLine {
            color: #8c8c8c;
            margin-top: 12px;
            > span {
              font-size: 14px !important;
              &:nth-of-type(1) {
                margin-right: 15px;
                color: #8c8c8c;
              }
              &:nth-of-type(2) {
                color: black;
              }
            }
          }
        }
      }
    }
  }
}
.red {
  background-color: #e62412;
}
.blue {
  background-color: #1fead1;
}
.pink {
  background-color: #c568dc;
}

.inputLine {
  padding: 12px;
}
.openPanel {
  display: block;
  width: 100% !important;
  transition: width 0.3s;
}
.closePanel {
  width: 0 !important;
  transition: width 0.3s;
  display: none;
}
</style>
