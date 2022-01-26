<template>
  <div class="dateContainer">
    <ul class="weekdays">
      <li>日</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <ul class="dayShow fill-heihgt">
      <li
        @click="openDrawer"
        :style="heightValue"
        v-for="item in list"
        :class="{
          nowDay: item.dateStr === nowStr,
          rightest: (item.positionInt + 1) % 7 === 0,
          needBottom: shouldBorderBottom.includes(item.positionInt)
        }"
        :key="item.positionInt"
      >
        {{ item.dayInt }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component({
  name: 'Calender'
})
export default class Calender extends Vue {
  private drawerVisible = false
  @Watch('list')
  onChange(val: any) {
    console.log(val, 909)
  }
  @Prop() list!: any
  get nowStr() {
    const yy = new Date().getFullYear()
    const mm = new Date().getMonth() + 1
    const dd = new Date().getDate()
    const dateTime = yy + '-' + mm + '-' + dd
    console.log(dateTime, 898989)
    return dateTime
  }
  get heightValue() {
    const num = Math.ceil(this.list.length / 7)
    const num1 = 100 / 7
    return {
      heihgt: num + '%',
      width: num1 + '%'
    }
  }
  //每行七个倒数第一行的个数
  get lastLine() {
    return this.list.length % 7
  }
  get shouldBorderBottom() {
    const num = 7 - this.lastLine
    const arr = []
    for (let i = 0; i < num + 1; i++) {
      arr.push(this.list.length - this.lastLine - i)
    }
    return arr
  }
  openDrawer() {
    this.$emit('openDrawer')
  }
}
</script>

<style lang="scss" scoped>
.dateContainer {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  .weekdays {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    > li {
      display: flex;
      flex: 1;
      height: 26px;
      justify-content: center;
      align-items: center;
    }
  }
  .dayShow {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    > li {
      font-size: 12px !important;
      cursor: pointer;
      border-top: 1px solid #eeeeee;
      border-right: 1px solid #eeeeee;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.rightest {
  border-right: none !important;
}

.needBottom {
  border-bottom: 1px solid #eeeeee !important;
}
.nowDay {
  background-color: #007aff;
  color: white;
}
</style>
