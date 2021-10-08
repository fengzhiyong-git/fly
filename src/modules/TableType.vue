<template>
  <!-- 折叠自定义表单内容 -->
  <div>
    <el-table
      :data="data"
      style="width: 100%"
      default-expand-all
      row-key="deptId"
      :header-cell-style="{ display: 'none' }"
      :tree-props="{ children: 'children', hasChildren: 'children.length>0' }"
    >
      <el-table-column label="商品 ID" prop="deptName">
        <template slot-scope="scope">
          <span v-if="scope.row.children.length || !scope.row.zxm">
            <!-- {{ scope.row.deptName }} -->
            长沙市城市发展集团项目建设有限公司 共计 5 个项目 新建 4 个 总投资
            34.23万元
          </span>
          <div v-else style="display:flex">
            <span>{{ scope.row.areaName }}</span>
            <span>{{ scope.row.areaName }}</span>
            <span>{{ scope.row.areaName }}</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  name: "TableType",
})
export default class TableType extends Vue {
  private data = [
    {
      deptId: "34",
      parentId: "-1",
      deptName: "城发集团",
      unitLevel: 1,
      leader: "aaa",
      phone: "18456545654",
      creditCode: "123456",
      areaCode: "430102",
      areaName: "芙蓉区",
      address: "地址1",
      children: [
        {
          deptId: "35",
          parentId: "34",
          deptName: "城投公司",
          unitLevel: 2,
          leader: "bbb",
          phone: "1854654655",
          creditCode: "45687",
          areaCode: "430102",
          areaName: "芙蓉区",
          address: "地址2",
          children: [
            {
              deptId: "36",
              parentId: "35",
              deptName: "子公司1",
              unitLevel: 3,
              leader: "ccc",
              phone: "18654524544",
              creditCode: "7845122",
              areaCode: "430104",
              areaName: "岳麓区",
              address: "地址3",
              zxm: true,
              children: [],
            },
            {
              deptId: "38",
              parentId: "35",
              deptName: "子公司2",
              unitLevel: 3,
              leader: "ddd",
              zxm: true,
              phone: "18654545121",
              creditCode: "456666",
              areaCode: "430102",
              areaName: "芙蓉区",
              address: "地址4",
              children: [],
            },
          ],
        },
        {
          deptId: "40",
          parentId: "34",
          deptName: "数智科技",
          unitLevel: 2,
          leader: null,
          phone: null,
          creditCode: null,
          areaCode: null,
          areaName: "芙蓉区",
          address: null,
          children: [],
        },
      ],
    },
  ];

  private tableData = [
    {
      id: "12987122",
      name: "好滋好味鸡蛋仔",
      category: "江浙小吃、小吃零食",
      desc: "荷兰优质淡奶，奶香浓而不腻",
      address: "上海市普陀区真北路",
      shop: "王小虎夫妻店",
      shopId: "10333",
    },
    {
      id: "12987123",
      name: "好滋好味鸡蛋仔",
      category: "江浙小吃、小吃零食",
      desc: "荷兰优质淡奶，奶香浓而不腻",
      address: "上海市普陀区真北路",
      shop: "王小虎夫妻店",
      shopId: "10333",
    },
    {
      id: "12987125",
      name: "好滋好味鸡蛋仔",
      category: "江浙小吃、小吃零食",
      desc: "荷兰优质淡奶，奶香浓而不腻",
      address: "上海市普陀区真北路",
      shop: "王小虎夫妻店",
      shopId: "10333",
    },
    {
      id: "12987126",
      name: "好滋好味鸡蛋仔",
      category: "江浙小吃、小吃零食",
      desc: "荷兰优质淡奶，奶香浓而不腻",
      address: "上海市普陀区真北路",
      shop: "王小虎夫妻店",
      shopId: "10333",
    },
  ];
}
</script>

<style lang="scss" scoped>
::v-deep .el-table th {
  background-color: #f5f7f9 !important;
  height: 0px;
}
</style>
