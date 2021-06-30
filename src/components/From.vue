<template>
  <div>
    <!-- <el-form :model="ruleForm.data" :rules="rules" ref="sruleForm" label-width="100px" class="demo-ruleForm">      
      <el-form-item label="哈哈" prop="hh">
        <el-input v-model="ruleForm.data.hh"></el-input>
      </el-form-item>      
    </el-form> -->
    <el-form
      :model="ruleForm.data"
      :rules="rules"
      ref="ruleForms"
      label-width="100px"
      class="demo-ruleForm"
    >
      <table>
        <tr>
          <el-form-item label="哈哈" prop="hh">
            <el-input v-model="ruleForm.data.hh"></el-input>
          </el-form-item>
        </tr>
      </table>

      <!-- <el-form-item label="哈哈" prop="hh">
            <el-input v-model="ruleForm.data.hh"></el-input>
          </el-form-item>   -->
      <el-form-item label="沉淀池" prop="xdc">
        <el-input v-model="ruleForm.data.xdc"></el-input>
      </el-form-item>
      <el-form-item label="工业广场" prop="gygc">
        <el-input v-model="ruleForm.data.gygc"></el-input>
      </el-form-item>
      <el-form-item label="草地" prop="cd">
        <el-input v-model="ruleForm.data.cd"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import rules from "@/utils/rules";
@Component({
  name: "From"
})
export default class From extends Vue {
  @Prop({ default: () => ({}) }) ruleForm!: any;
  // private ruleForm = {
  //   data: {
  //     xdc: '',
  //     gygc: '',
  //     cd: '',
  //     hh: ''
  //   }
  // }
  private rules = rules;

  // 表单校验
  public validateForm() {
    debugger;
    (this.$refs.ruleForms as any).validate((valid: any) => {
      if (valid) {
        console.log("success");
      } else {
        console.log("error");
      }
    });
  }

  mounted() {
    console.log(this.rules, "lsdfkjlsfjdklkls");
  }
}
</script>
<style lang="scss" scoped></style>
