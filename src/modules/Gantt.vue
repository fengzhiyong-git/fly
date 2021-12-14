<template>
  <div class="gantt">
    <div class="table-wrap">
      <el-table stripe :data="tableData" :row-key="'taskId'">
        <el-table-column type="selection" width="55" :reserve-selection="true">
        </el-table-column>
        <el-table-column
          type="index"
          label="序号"
          width="60"
          align="center"
          :fixed="false"
        >
        </el-table-column>
        <el-table-column
          prop="projectName"
          label="所属项目"
          align="left"
          width="240"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          prop="internalTaskStartDate"
          label="计划（内）开始日期"
          align="left"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="internalTaskEndDate"
          label="计划（内）结束日期"
          align="left"
          width="180"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="internalPlanDay"
          label="计划（内）工期（天）"
          align="left"
          width="180"
        ></el-table-column>

        <el-table-column
          prop="stateName"
          label="状态"
          align="left"
          width="120"
        ></el-table-column>
        <el-table-column label="操作" align="left" width="180">
          <!-- 按钮操作 -->
          <template slot-scope="scope">
            <span
              style="display:flex;"
              v-if="scope.row.button && scope.row.button.length"
            >
              <el-button
                type="text"
                v-for="(item, index) in scope.row.button"
                :key="index"
                @click="btnClick(item, scope.row)"
              >
                <span
                  v-if="item !== '提交' && item !== '审核'"
                  :style="{ color: item === '删除' ? 'red' : '' }"
                >
                  {{ item }}
                </span>
              </el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="gantt-table">
      <gantt-elastic
        v-if="showGantt"
        :options="options"
        :tasks="tasks"
        @tasks-changed="tasksUpdate"
        @options-changed="optionsUpdate"
        @dynamic-style-changed="styleUpdate"
      >
        <!-- <gantt-header slot="header" v-if="showGantt"></gantt-header> -->
      </gantt-elastic>
      <!-- <div class="task-totle-time el-color-base" v-if="timeData.endTime">
        {{ timeData.startTime }} ~
        {{ timeData.endTime }}
      </div> -->
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import GanttElastic from "gantt-elastic";
import GanttHeader from "gantt-elastic-header";
import dayjs from "dayjs";
@Component({
  name: "Ganttss",
  components: {
    GanttElastic,
    GanttHeader,
  },
})
export default class Ganttss extends Vue {
  private showGantt = true;
  private tasks: any = [
    {
      id: 1,
      startTime: 1630944000000,
      endTime: 1631203200000,
      start: 1630944000000,
      duration: 259200000,
      type: "task",
      percent: 100,
      collapsed: false,
      style: { base: { fill: "#1491ed", stroke: "#1491ed" } },
      // label: "",
      progress: 100,
      // x: 43835.32147624995,
      // y: 47,
      // width: 347.82218681366004,
      height: 50,
    },
    {
      id: 2,
      startTime: 1630944000000,
      endTime: 1631203200000,
      start: 1630944000000,
      duration: 259200000,
      type: "task",
      percent: 100,
      collapsed: false,
      style: { base: { fill: "#1491ed", stroke: "#1491ed" } },
      // label: "",
      progress: 100,
      // x: 43835.32147624995,
      // y: 47,
      // width: 347.82218681366004,
      // height: 29,
    },
  ];
  private dynamicStyle: any = {};
  private timeData = {
    startTime: "2021-11-10",
    endTime: "2021-11-30",
  };
  private options: any = {};
  private defaultTasks = [
    {
      id: 1,
      label: "",
      startTime: 1630944000000,
      endTime: 1631203200000,
      start: 1630944000000,
      duration: 259900000,
      percent: 60,
      type: "task",
    },
    {
      id: 2,
      label: "",
      startTime: 1630944000000,
      endTime: 1631203200000,
      start: 1630944000000,
      duration: 259200000,
      percent: 100,
      type: "task",
    },
  ];
  private tableData = [
    {
      button: ["查看"],
      createTime: "2021-10-29 14:12:34",
      createUserId: "35",
      createUserName: "test",
      externalPlanDay: 85,
      externalProgressStateId: "rwjdzt_wks",
      externalProgressStateName: "未开始",
      externalTaskEndDate: "2021-11-30  ",
      externalTaskStartDate: "2021-09-06  ",
      internalPlanDay: 85,
      internalProgressStateId: "rwjdzt_wks",
      internalProgressStateName: "未开始",
      internalTaskEndDate: "2021-11-30  ",
      internalTaskStartDate: "2021-09-06  ",
      prjId: "183599290750685184",
      projectName: "1020-1",
      reason: null,
      stateId: "xmjhsh_wj",
      stateName: "已办结",
      taskId: "186843439901937664",
      taskName: null,
    },
    {
      button: ["查看"],
      createTime: "2021-10-29 14:12:34",
      createUserId: "35",
      createUserName: "test",
      externalPlanDay: 85,
      externalProgressStateId: "rwjdzt_wks",
      externalProgressStateName: "未开始",
      externalTaskEndDate: "2021-11-30  ",
      externalTaskStartDate: "2021-09-06  ",
      internalPlanDay: 85,
      internalProgressStateId: "rwjdzt_wks",
      internalProgressStateName: "未开始",
      internalTaskEndDate: "2021-11-30  ",
      internalTaskStartDate: "2021-09-06  ",
      prjId: "183599290750685184",
      projectName: "1020-1",
      reason: null,
      stateId: "xmjhsh_wj",
      stateName: "已办结",
      taskId: "186843429901937664",
      taskName: null,
    },
  ];

  optionsFun() {
    this.options = {
      taskMapping: {
        progress: "percent",
      },
      maxRows: 100,
      maxHeight: 0,
      title: {
        label: "",
        html: false,
      },
      row: {
        height: 55,
      },
      calendar: {
        hour: {
          display: false,
        },
      },
      chart: {
        progress: {
          bar: false,
        },
        expander: {
          display: false,
        },
      },
      taskList: {
        expander: {
          straight: false,
        },
        columns: [],
      },
      locale: {
        name: "en",
        Now: "Now",
        "X-Scale": "zoom-X",
        "Y-Scale": "zoom-Y",
        "Task list width": "Task list",
        "Before/After": "Expand",
        "Display task list": "Task list",
        weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        months: [
          "一月",
          "二月",
          "三月",
          "四月",
          "五月",
          "六月",
          "七月",
          "八月",
          "九月",
          "十月",
          "十一月",
          "十二月",
        ],
      },
    };
  }

  tasksUpdate(tasks: any) {
    this.tasks = tasks;
  }
  optionsUpdate(options: any) {
    this.options = options;
  }
  styleUpdate(style: any) {
    this.dynamicStyle = style;
  }
  mounted() {
    this.optionsFun();
    // this.tasks = this.defaultTasks;
    const a1 = "2021-09-06";
    const a2 = "2021-11-30";
    console.log(Date.parse(a1), "1111");
    console.log(Date.parse(a2), "2222");
    console.log(Date.parse(a2) - Date.parse(a1), "3333");
  }
}
</script>
<style lang="scss" scoped>
.gantt ::v-deep {
  width: 100%;
  height: 100%;
  display: flex;
  .table-wrap {
    width: 60%;
  }
  .gantt-table {
    width: 40%;
    position: relative;
    .task-totle-time {
      position: absolute;
      left: 0;
      top: 10px;
      width: 100%;
      text-align: center;
    }
    .gantt-elastic__chart-calendar-container {
      height: 52px !important;
      margin-bottom: 0 !important;
    }
  }
}
::v-deep .gantt-elastic__main-view {
  .gantt-elastic__chart-row-progress-bar-wrapper {
    display: none !important;
  }
  .gantt-elastic__calendar-row-text {
    font-size: 12px !important;
  }
  .gantt-elastic__grid-line-horizontal {
    stroke-width: 1 !important;
    opacity: 0.5;
  }
  .gantt-elastic__calendar-row-rect-child--day {
    border-right-width: 0 !important;
  }

  .gantt-elastic__calendar {
    background: white !important;
  }
  .gantt-elastic__chart-row-task {
    height: 20px !important;
  }
  // .gantt-elastic__chart-row-task-polygon {
  //   fill: #6cb1ec !important;
  //   stroke: #6cb1ec !important;
  // }
  .gantt-elastic__grid-line-time {
    stroke: #3d93f5 !important;
    opacity: 0.4;
  }
}
::v-deep .gantt-elastic__header {
  .gantt-elastic__header-task-list-switch--wrapper {
    display: none;
  }
  .gantt-elastic__header-label,
  .gantt-elastic__header-title--text,
  .gantt-elastic__header-btn-recenter {
    display: none;
  }
  .gantt-elastic__header-label:nth-of-type(1) {
    display: block !important;
    color: white;
  }
}
::v-deep .gantt-elastic__chart-days-highlight-rect {
  fill: rgba(#666666, 0.1) !important;
}
</style>
