<template>
  <div class="Aside">
      <div class="title">标题</div>
      <ul class="aside-wrap">
        <li :class="{ 'active':index == activeIndex }" v-for="(item,index) in dataSource" :key="index" @click="toPath(index,item)">
          <!-- <router-link :to="item.path">{{ item.name }}</router-link> -->
          {{ item.name }}
        </li>
      </ul>
  </div>
  
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Aside',
  components:{}
})
export default class Aside extends Vue{
  private activeIndex = 0
  private dataSource = [
    { name: "柱状图" , path: "/column" },
    { name: "饼状图" , path: "/pie" },
  ]
  private toPath(i: any,item: any){
    this.activeIndex = i;
    this.$router.push(item.path)
  }
}
</script>
<style lang="scss" scoped>
.Aside{
  font-size: 16px;
  background-color: white;
  width: 300px;
  position: fixed;
  z-index: 10;
  margin: 0;
  top: 62px;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  border-right: 1px solid #eaecef;
  overflow-y: auto;
  padding-top: 20px;
  a{
    width: 100%;
    height: 100%;
    display: inline-block;
  }
  .title{
    font-size: 18px;
    font-weight: bold;
    padding: 12px 16px;
  }
  .aside-wrap{
    li{
      padding: 12px 32px;
      font-size: 16px;
      cursor: pointer;
      &:hover{
        color: #3489fd;
        background-color: #d6e7ff;
      }
    }
    .active{
      font-weight: 600;
      color: #3489fd;
      background: #d6e7ff;
      border-right: 3px solid #3489fd;
    }
  }
}
</style>
