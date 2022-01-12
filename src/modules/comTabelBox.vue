<template>
  <div class="com-wrap">
    <div class="top-wrap">
      <el-popover placement="bottom" width="200" trigger="click">
        <el-button slot="reference">自定义列</el-button>
        <div>
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">
            全选
          </el-checkbox>
          <el-checkbox-group v-model="checkedColumn" @change="handleCheckedColumnChange">
            <el-checkbox v-for="(item, index) in allHeaders" :label="item.text" :key="index">{{
              item.text
            }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </el-popover>
    </div>
    <com-table
      ref="comTable"
      :headers="headers"
      :items="items"
      :totalItem="totalItem"
      :pageSize="query.pageSize"
      @nextPage="changePage"
      @select="selectAll"
      @handleSizeChange="handleSizeChange"
      :settingIcon="true"
      :showSelect="false"
      :showSortBtn="false"
      :rowKey="'prjId'"
    ></com-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
import ComTable from '@/components/ComTable/index.vue'
import EventBus from '@/utils/EventBus'
@Component({
  name: 'TableNum',
  components: {
    ComTable
  }
})
export default class TableNum extends Vue {
  // 查询参数
  private query: any = {
    pageNum: 1,
    pageSize: 15,
    prjName: '',
    problemTypeId: '',
    problemStateId: '',
    isCoordinate: '',
    isDispatch: ''
  }
  private headers = []
  private allHeaders = [
    {
      text: '项目名称',
      value: 'prj_name',
      width: '',
      num: 1
    },
    {
      text: '项目号',
      value: 'prj_num_gather',
      width: '',
      num: 2
    },
    {
      text: '项目性质',
      value: 'prj_nature_name',
      width: '',
      num: 3
    },
    {
      text: '开始期限',
      value: 'construction_year_start',
      width: '',
      num: 4
    },
    {
      text: '终止期限',
      value: 'construction_year_end',
      width: '',
      num: 5
    },
    {
      text: '资金来源',
      value: 'capital_source_name',
      width: '',
      num: 6
    },
    {
      text: '责任单位',
      value: 'responsibility_unit',
      width: '',
      num: 7
    },
    {
      text: '责任人',
      value: 'those_responsible',
      width: '',
      num: 8
    },
    {
      text: '建设单位',
      value: 'construction_unit',
      width: '',
      num: 9
    },
    {
      text: '项目类型',
      value: 'prj_type_name',
      width: '',
      num: 10
    },
    {
      text: '建设性质',
      value: 'construction_nature_name',
      width: '',
      num: 11
    },
    {
      text: '总投资',
      value: 'total_money',
      width: '',
      num: 12
    },
    {
      text: '所属片区',
      value: 'prj_area_name',
      width: '',
      num: 13
    },
    {
      text: '开工日期',
      value: 'prj_start_time',
      width: '',
      num: 14
    },
    {
      text: '竣工日期',
      value: 'prj_completed_time',
      width: '',
      num: 15
    },
    {
      text: '联系人',
      value: 'contact_man',
      width: '',
      num: 16
    },
    {
      text: '联系方式',
      value: 'contact_phone',
      width: '',
      num: 17
    },
    {
      text: '总承包单位',
      value: 'contractor_unit',
      width: '',
      num: 18
    },
    {
      text: '施工单位',
      value: 'apply_construction_unit',
      width: '',
      num: 19
    },
    {
      text: '监理单位',
      value: 'supervision_unit',
      width: '',
      num: 20
    },
    {
      text: '勘察单位',
      value: 'investigate_unit',
      width: '',
      num: 21
    },
    {
      text: '设计单位',
      value: 'design_unit',
      width: '',
      num: 22
    },
    {
      text: '计划年度',
      value: 'plan_year',
      width: '',
      num: 23
    },
    {
      text: '年计划投资',
      value: 'plan_money',
      width: '',
      num: 24
    },
    {
      text: '年度资金来源',
      value: 'plan_capital_source_name',
      width: '',
      num: 25
    },
    {
      text: '年度用地需求',
      value: 'plan_land_scale',
      width: '',
      num: 26
    },
    {
      text: '计划拆迁投资',
      value: 'plan_demolition_money',
      width: '',
      num: 27
    },
    {
      text: '计划工程投资',
      value: 'plan_project_money',
      width: '',
      num: 28
    },
    {
      text: '批复文号',
      value: '',
      width: '',
      num: 29
    },
    {
      text: '建设地点',
      value: 'prj_lcation',
      width: '',
      num: 30
    },
    {
      text: '累计完成投资额',
      value: 'internal_investment_total_amount',
      width: '',
      num: 31
    },
    {
      text: '累计完成投资百分比',
      value: 'internal_investment_percentage',
      width: '',
      num: 32
    },
    {
      text: '项目状态',
      value: 'prj_state_name',
      width: '',
      num: 33
    },
    {
      text: '施工许可号',
      value: 'construction_permit_number',
      width: '',
      num: 34
    },
    {
      text: '验收日期',
      value: 'acceptance_date',
      width: '',
      num: 35
    }
  ]
  private items: any = []
  private totalItem = 0

  private typeData: any = []

  // 搜索
  handleQuery() {
    this.query.pageNum = 1
    EventBus.$emit('updatePage', 1)
    // this.getData()
  }

  public handleSizeChange(val: any) {
    this.query.pageNum = 1
    this.query.pageSize = val.pageSize
    EventBus.$emit('updatePage', 1)
    // this.getData()
  }
  public changePage(val: any) {
    this.query.pageNum = val.pageIndex
    EventBus.$emit('updatePage', val.pageIndex)
    // this.getData()
  }

  // 表格所勾选的数据
  private selectData: any = []
  public selectAll(data: any) {
    this.selectData = data
  }

  checkedColumn: any = []
  checkAll = true
  isIndeterminate = false
  handleCheckAllChange(val: any) {
    if (val) {
      this.headers = JSON.parse(JSON.stringify(this.allHeaders))
      this.checkedColumn = this.allHeaders.map((item: any) => {
        return item.text
      })
    } else {
      this.checkedColumn = []
      this.headers = []
    }
    this.isIndeterminate = false
  }
  handleCheckedColumnChange(value: any) {
    // debugger
    let checkedCount = value.length
    const arr: any = []
    value.forEach((item: any) => {
      this.allHeaders.forEach((tt: any) => {
        if (item === tt.text) {
          arr.push(tt)
        }
      })
    })
    this.headers = JSON.parse(JSON.stringify(arr))
    this.headers.sort((a: any, b: any) => {
      return a.num - b.num
    })

    this.checkedColumn = []
    this.checkedColumn = this.headers.map((item: any) => {
      return item.text
    })
    this.checkAll = checkedCount === this.allHeaders.length
    this.isIndeterminate = checkedCount > 0 && checkedCount < this.allHeaders.length
    this.$forceUpdate()
    // debugger
  }
  created() {
    this.headers = JSON.parse(JSON.stringify(this.allHeaders))
    // this.checkedColumn = JSON.parse(JSON.stringify(this.headers))
    this.checkedColumn = this.allHeaders.map((item: any) => {
      return item.text
    })
  }
}
</script>

<style lang="scss" scoped>
.com-wrap {
  width: 100%;
  height: 100%;
}
::v-deep {
  .el-checkbox-group {
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
    .el-checkbox {
      margin-bottom: 8px;
    }
  }
}
</style>
