<template>
  <div>
    <From ref="detailForm" :ruleForm="ruleForm"></From>
    <el-button @click="test">测试</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import From from "@/components/From.vue";
@Component({
  name: "TestTabel",
  components: {
    From
  }
})
export default class TestTabel extends Vue {
  private ruleForm = {
    data: {
      xdc: "",
      gygc: "",
      cd: "",
      hh: ""
    }
  };
  private test() {
    // console.log('ssssssss')
    (this.$refs.detailForm as any).validateForm();
  }
}
</script>

<style lang="scss" scoped></style>
