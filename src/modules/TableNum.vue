<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column label="" width="180">
        <template slot-scope="scope">
          <span v-if="scope.$index !== tableData.length - 1"
            >第{{ numberArr[scope.$index] }}行</span
          >
          <span v-else>合计</span>
        </template>
      </el-table-column>
      <el-table-column label="第一列" width="180">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.value1"
            :disabled="scope.$index === tableData.length - 1"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="第二列" width="180">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.value2"
            :disabled="scope.$index === tableData.length - 1"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="第三列" width="180">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.value3"
            :disabled="scope.$index === tableData.length - 1"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="合计" width="180">
        <template slot-scope="scope">
          <el-input disabled v-model="scope.row.value4"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  name: "TableNum"
})
export default class TableNum extends Vue {
  get numberArr() {
    return ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  }
  private tableData = [
    {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    },
    {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    },
    {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    },
    {
      value1: "",
      value2: "",
      value3: "",
      value4: ""
    }
  ];
  @Watch("tableData", { deep: true })
  tableDataChange(newVal: any) {
    const RowLen = 4;
    const colArr = [0, 0, 0];
    for (let i = 0, l = newVal.length - 1; i < l; i++) {
      const item = newVal[i];
      for (let m = 0, n = RowLen - 1; m < n; m++) {
        colArr[m] = colArr[m] + Number(item[`value${m + 1}`] || 0);
      }
      item.value4 =
        Number(item.value1) + Number(item.value2) + Number(item.value3);
    }
    // const lastItem = JSON.parse(JSON.stringify(newVal[RowLen - 1]))
    const lastItem = newVal[RowLen - 1];
    lastItem.value1 = colArr[0];
    lastItem.value2 = colArr[1];
    lastItem.value3 = colArr[2];
    lastItem.value4 = colArr.reduce((pre, cur) => pre + cur, 0);
  }
}
</script>

<style lang="scss" scoped></style>
