<template>
  <div>
    <gantt
      ref="ganttChart"
      :start-date="ganntStartDate"
      :end-date="ganntEndDate"
      date-type="yearAndMonth"
      :data="tableData"
      :props="ganttProps"
      :rowKey="'prjId'"
      :stripe="true"
      :auto-gantt-date-type="false"
      :height="'100%'"
    >
      <template slot="prv">
        <el-table-column type="selection" width="55" :reserve-selection="true"> </el-table-column>
        <el-table-column type="index" label="序号" width="60" align="center"> </el-table-column>
        <el-table-column prop="projectName" label="所属项目" align="left" width="" show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="internalTaskStartDate"
          label="计划（内）开始日期"
          align="left"
          width=""
          :formatter="formatDate"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="internalTaskEndDate"
          label="计划（内）结束日期"
          align="left"
          width=""
          :formatter="formatDate"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="internalPlanDay" label="计划（内）工期（天）" align="left" width=""></el-table-column>

        <el-table-column label="操作" align="left" width="180">
          <template slot-scope="scope">
            <span style="display:flex;" v-if="scope.row.button && scope.row.button.length">
              <el-button type="text" v-for="(item, index) in scope.row.button" :key="index">
                <span v-if="item !== '提交' && item !== '审核'" :style="{ color: item === '删除' ? 'red' : '' }">
                  {{ item }}
                </span>
              </el-button>
            </span>
          </template>
        </el-table-column>
      </template>
    </gantt>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Gantt from '@/components/Gantt/index.vue'
import _max from 'lodash.max'
import _min from 'lodash.min'
import dayjs from 'dayjs'
@Component({
  name: 'Template',
  components: { Gantt }
})
export default class Template extends Vue {
  private tableData: Object[] = [
    {
      button: ['查看'],
      createTime: '2021-11-26 10:56:35',
      createUserId: '35',
      createUserName: 'test',
      externalPlanDay: 34,
      externalProgressStateId: 'rwjdzt_wks',
      externalProgressStateName: '未开始',
      externalTaskEndDate: '2021-12-30 00:00:00',
      externalTaskStartDate: '2021-11-26 00:00:00',
      internalPlanDay: 34,
      internalProgressStateId: 'rwjdzt_wks',
      internalProgressStateName: '未开始',
      internalTaskEndDate: '2021-11-30 00:00:00',
      internalTaskStartDate: '2021-7-26 00:00:00',
      prjId: '196271060842532864',
      projectName: '流程测试005',
      reason: null,
      stateId: 'xmjhsh_wj',
      stateName: '已办结',
      taskId: '196939707923648512',
      taskName: null
    },
    {
      button: ['查看'],
      createTime: '2021-11-26 10:56:35',
      createUserId: '35',
      createUserName: 'ssss',
      externalPlanDay: 34,
      externalProgressStateId: 'rwjdzt_wks',
      externalProgressStateName: '未开始',
      externalTaskEndDate: '2021-12-30 00:00:00',
      externalTaskStartDate: '2021-11-26 00:00:00',
      internalPlanDay: 34,
      internalProgressStateId: 'rwjdzt_wks',
      internalProgressStateName: '未开始',
      internalTaskEndDate: '2021-10-30 00:00:00',
      internalTaskStartDate: '2021-5-26 00:00:00',
      prjId: '196271060842532864',
      projectName: 'sdfsdfs',
      reason: null,
      stateId: 'xmjhsh_wj',
      stateName: '已办结',
      taskId: '196939707923648512',
      taskName: null
    }
  ]
  private ganttProps = {
    startDate: 'internalTaskStartDate',
    endDate: 'internalTaskEndDate'
  }

  private ganntStartDate = ''
  private ganntEndDate = ''

  // 日期格式化
  formatDate(row: any, column: any) {
    return row[column.property] ? row[column.property].substring(0, 10) : ''
  }

  mounted() {
    const startDateArray: number[] = []
    const endDateArray: number[] = []
    this.tableData.forEach((item: any) => {
      startDateArray.push(new Date(item.internalTaskStartDate).getTime())
      endDateArray.push(new Date(item.internalTaskEndDate).getTime())
    })
    this.ganntStartDate = dayjs(_min(startDateArray))
      .subtract(1, 'month')
      .format('YYYY-MM')
    this.ganntEndDate = dayjs(_max(endDateArray))
      .add(1, 'month')
      .format('YYYY-MM')

    this.tableData.map((item: any) => {
      item.createTime = item.createTime ? item.createTime.substring(0, 10) : ''
      item.deadline = item.deadline ? item.deadline.substring(0, 10) : ''
    })
  }
}
</script>
<style lang="scss" scoped></style>
