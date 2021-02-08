<template>
  <header class="navbar">
    <div class="header-left">
      <img class="site-icon" src="@/assets/header/head-logo.jpg" alt="" />
      <div class="site-name">Mr.Feng's blog</div>
    </div>
    <div class="header-right">
      <!-- <el-input
            placeholder="请输入内容"
            v-model="keyWord">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input> -->
      <div class="toHome">
        <span class="text">首页</span>
      </div>
    </div>
  </header>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({
  name: "Header"
})
export default class Header extends Vue {
  private keyWord = ""; // 搜索关键字
}
</script>
<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  box-sizing: border-box;
  box-shadow: 0 1px 8px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 20;
  .header-left {
    display: flex;
    align-content: center;
    .site-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: block;
    }
    .site-name {
      font-weight: bold;
      font-size: 20px;
      color: #333;
      line-height: 40px;
      margin-left: 24px;
    }
  }
  .header-right {
    display: flex;
    align-items: center;
    .toHome {
      margin-left: 16px;
    }
  }
}
</style>
