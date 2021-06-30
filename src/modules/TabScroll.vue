<template>
  <div class="tab-scroll">
    <el-tabs v-model="activeName" @tab-click="tabClick">
      <el-tab-pane label="矿山基本信息" name="1"></el-tab-pane>
      <el-tab-pane label="矿山生态问题" name="2"></el-tab-pane>
      <el-tab-pane label="年度基金提取" name="3"></el-tab-pane>
      <el-tab-pane label="年度矿山生态问题修复情况" name="4"></el-tab-pane>
      <el-tab-pane label="年度生态修复计划" name="5"></el-tab-pane>
    </el-tabs>
    <div class="wrap">
      <div class="main-wrap">
        <div class="form-title" id="form_1">
          矿山基本信息
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_2">
          矿山生态问题
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_3">
          年度基金提取
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_4">
          年度矿山生态问题修复情况
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
        <div class="form-title" id="form_5">
          年度生态修复计划
        </div>
        <div class="div" style="width:100%;height:400px;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabScroll",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      activeName: "1"
    };
  },
  methods: {
    tabClick(tab, event) {
      document
        .querySelector(`#form_${tab.name}`)
        .scrollIntoView({ behavior: "smooth" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.active {
  color: red;
}
.tab-scroll {
  .wrap {
    height: 780px;
    overflow-y: auto;
    .main-wrap {
      width: 100%;
    }
  }
}
</style>
