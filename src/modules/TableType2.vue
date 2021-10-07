<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="items"
      tooltip-effect="dark"
      style="width: 100%"
      stripe
      row-key="deptId"
      highlight-current-row
      @selection-change="selectChange"
      @select="selectTr"
      @select-all="selectAll"
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'children.length>0' }"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="deptName" label="公司名称" show-overflow-tooltip>
      </el-table-column>
      <el-table-column
        prop="creditCode"
        label="统一社会信用代码"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="areaName" label="所在区域" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="address" label="详情地址" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="leader" label="联系人" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="phone" label="联系电话" show-overflow-tooltip>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";

@Component({
  name: "TableType"
})
export default class TableType extends Vue {
  private items = [
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
              children: []
            },
            {
              deptId: "38",
              parentId: "35",
              deptName: "子公司2",
              unitLevel: 3,
              leader: "ddd",
              phone: "18654545121",
              creditCode: "456666",
              areaCode: "430102",
              areaName: "芙蓉区",
              address: "地址4",
              children: []
            }
          ]
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
          areaName: null,
          address: null,
          children: []
        }
      ]
    }
  ];

  // 表格所勾选的数据
  private selectData: any = []
  selectChange(data: any) {
    this.selectData = data
  }

  private isAllSelect = false

  selectAll(selection: any) {
    this.isAllSelect = !this.isAllSelect
    this.toggleSelect(this.items, this.isAllSelect, 'all')
  }
  //选择某行
  selectTr(selection: any, row: any) {
    this.$set(row, 'isChecked', !row.isChecked)    
    this.$nextTick(() => {
      this.isAllSelect = row.isChecked
      this.toggleSelect(row, row.isChecked, 'tr')
    })
    // this.isAllSelect = row.isChecked
    // 点击单行选中
    // if (!row.children.length) {
    //   this.$nextTick(() => {
    //     ;(this.$refs.multipleTable as any).toggleRowSelection(row, row.isChecked)
    //   })
    // }
    // 获取当前行的父级数据 根据子节点勾选状态修改父节点状态
    // const arr = this.familyTree(this.items, row.deptId, row.parentId)
    // if (arr.length) {
    //   const flag = arr[0].children.every((item: any) => {
    //     return item.isChecked
    //   })
    //   this.$set(arr[0], 'isChecked', flag)
    //   this.$nextTick(() => {
    //     ;(this.$refs.multipleTable as any).toggleRowSelection(arr[0], flag)
    //   })
    // }
  }
  // 递归数据 获取当前节点的所有父级数据
  familyTree(data2: any, nodeId2: any, parentId: any) {
    let arrRes: any = []
    const rev = (data: any, nodeId: any) => {
      for (let i = 0, length = data.length; i < length; i++) {
        const node = data[i]
        if (node.deptId == nodeId) {
          arrRes.unshift(node)
          rev(data2, node.parentId)
          break
        } else {
          if (node.children) {
            rev(node.children, nodeId)
          }
        }
      }
      return arrRes
    }
    arrRes = rev(data2, nodeId2)
    // return arrRes
    return this.getArr(arrRes, parentId)
  }
  // 过滤出当前节点的父级数据
  getArr(arr: any, id: any) {
    const dd: any = []
    for (let i = 0, length = arr.length; i < length; i++) {
      const node = arr[i]
      if (node.deptId == id) {
        dd.push(node)
      }
    }
    return dd
  }
  // 递归子级
  toggleSelect(data: any, flag: any, type: any) {
    if (type === 'all') {
      if (data.length > 0) {
        data.forEach((item: any) => {
          this.toggleSelection(item, flag)
          if (item.children && item.children.length > 0) {
            this.toggleSelect(item.children, flag, type)
          }
        })
      }
    } else {
      if (data.children && data.children.length > 0) {
        data.children.forEach((item: any) => {
          item.isChecked = !item.isChecked
          ;(this.$refs.multipleTable as any).toggleRowSelection(item, flag)
          this.toggleSelect(item, flag, type)
        })
      }
    }
  }
  // 改变选中
  toggleSelection(row: any, flag: any) {
    this.$set(row, 'isChecked', flag)
    this.$nextTick(() => {
      if (flag) {
        ;(this.$refs.multipleTable as any).toggleRowSelection(row, flag)
      } else {
        ;(this.$refs.multipleTable as any).clearSelection()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
