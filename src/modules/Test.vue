<template>
  <div>
    <div class="title">自定义指令</div>
    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog v-dialogDrag title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <el-button v-debounce="debounceClick">防抖指令</el-button>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Test'
})
export default class Test extends Vue {
  dialogVisible = false
  handleClose() {}
  debounceClick() {
    setTimeout(() => {
      console.log(111)
    }, 1000)
  }
}
</script>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 16px;
}
</style>
