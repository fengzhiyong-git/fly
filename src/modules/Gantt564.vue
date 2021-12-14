<template>
  <div>
    <gantt-elastic
      v-show="showGantt"
      :options="options"
      :tasks="tasks"
      @tasks-changed="tasksUpdates"
      @options-changed="optionsUpdate"
      @dynamic-style-changed="styleUpdate"
    >
    </gantt-elastic>

    <!-- -->
  </div>
</template>

<style></style>
<script>
import GanttElastic from "gantt-elastic";
import dayjs from "dayjs";
// import GanttHeader from "gantt-elastic-header";

//tasks是数据 真实的项目需要接口赋值数据
let that;
let options = {
  taskMapping: {
    progress: "percent",
  },
  maxRows: 10,
  maxHeight: 500,
  // title: {
  //   label: "Your project title as html (link or whatever...)",
  //   html: false
  // },
  row: {
    height: 12, //设置行高
  },
  times: {
    timeScale: 60 * 1000,
    timeZoom: 20,
  },

  chart: {
    grid: {
      horizontal: {
        gap: 6, //*
      },
    },
    text: {
      offset: 4, //*
      xPadding: 10, //*
      display: true, //*
    },

    expander: {
      type: "chart",
      display: true, //*
      displayIfTaskListHidden: true, //*
      offset: 4, //*
      size: 18,
    },
  },

  taskList: {
    // expander: {
    //   straight: true,
    // },
    columns: [
      {
        id: 1,
        label: "ID",
        value: "id",
        width: 0,
      },
      {
        id: 2,
        label: "项目名称",
        value: "label",
        width: 150,
        expander: true,
        html: true,
        events: {
          click({ data, column }) {
            if (that.flags != "1") {
              that.showDialog(data);
            }
          },
        },
      },
      {
        id: 3,
        label: "状态",
        value: "nums",
        width: 80,
        // expander: true,
        // html: true,
      },
      {
        id: 4,
        label: "负责人",
        value: "user",
        width: 80,
        html: true,
      },
      {
        id: 4,
        label: "开始时间",
        value: (task) => dayjs(task.start).format("YYYY-MM-DD"),
        width: 0,
      },
      {
        id: 5,
        label: "结束时间",
        value: (task) => dayjs(task.end).format("YYYY-MM-DD"),
        width: 78,
      },
    ],
  },

  calendar: {
    workingDays: [1, 2, 3, 4, 5, 6], //*
    gap: 0,
    strokeWidth: 5,
    hour: {
      display: false,
    },
  },

  locale: {
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
export default {
  //   name: "Gantt",
  components: {
    GanttElastic,
    // GanttHeader
  },
  props: {
    gantData: {},
    flags: {
      type: String,
    },
  },
  data() {
    return {
      showGantt: false,
      dialogVisible: false,
      orderModal: false,
      TaskData: [],
      sontaskData: "",
      tasks: [
        {
          id: 1,
          label: "项目一",
          nums: "预计延迟3天",
          user: "无",
          start: this.getTody(new Date(), 4),
          end: this.getTody(new Date(), -30),
          duration: 30 * 24 * 60 * 60 * 1000,
          percent: 85,
          type: "project",
        },
      ],
      options,
      dynamicStyle: {},
      successStyle: {
        base: {
          fill: "#1EBC61",
          stroke: "#0EAC51",
        },
      },
      unfinishedStyle: {
        base: {
          fill: "#dfe6ec",
          stroke: "#dfe6ec",
        },
      },
      comName: "newSelectProdct",
      titles: "新品选品",
      flag: true,
    };
  },
  created() {},
  mounted() {
    that = this;
    if (this.gantData) {
      this.getTaskList(this.gantData.id);
    }
  },
  computed: {},
  watch: {
    gantData: function(news, old) {
      this.getTaskList(news.id);
    },
  },
  methods: {
    // addTask() {
    //   this.tasks.push({
    //     id: this.lastId++,
    //     label:
    //       '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Yeaahh! you have added a task bro!</a>',
    //     user:
    //       '<a href="https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" target="_blank" style="color:#0077c0;">Awesome!</a>',
    //     start: getDate(24 * 3),
    //     duration: 1 * 24 * 60 * 60 * 1000,
    //     percent: 50,
    //     type: "project"
    //   });
    // },
    handleClose() {
      this.dialogVisible = false;
    },
    getTody(n, ds = 0, ys = 0) {
      var now = new Date(n);
      var time = now - 24 * 60 * 60 * 1000 * ds; //获取前N天
      var d = new Date(time);
      var year = d.getFullYear() - ys; //获取前N年的时间
      var mon = d.getMonth() + 1;
      var day = d.getDate();
      var week = d.getDay();
      var hour = d.getHours();
      var secd = d.getMinutes();
      var week = d.getDay();
      var times = "";
      if (mon == 0) {
        times = 12 + "-" + (day < 10 ? "0" + day : day);
      } else if (mon < 10) {
        times =
          (mon < 10 ? "0" + mon : mon) + "-" + (day < 10 ? "0" + day : day);
      } else {
        times = mon + "-" + (day < 10 ? "0" + day : day);
      }
      var today = year + "-" + times;

      return today;
    },
    //计算时间差
    datedifference(date1, date2) {
      //sDate1和sDate2是2006-12-18格式
      var dateSpan, tempDate, iDays;
      var sDate1 = this.getTody(date1);
      sDate1 = Date.parse(sDate1);
      var sDate2 = this.getTody(date2);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays;
    },
    //获取数据-----------------------------------------------------
    getTaskList(id) {
      var that = this;

      var params = {};
      params["projectId"] = id;
      this.$ajax
        .post("/ipm/index.php?a=default.taskList", params)
        .then(function(res) {
          if (res.data.success) {
            // that.showGantt = true;
            that.TaskData.length = [];
            var list = res.data.datas;
            var startTime = list[0].startTime;
            var endTime = list[list.length - 1].endTime;
            var diffTime = that.datedifference(endTime, startTime);
            var temp1 = {
              id: Number(id),
              label: that.gantData.name,
              nums: "",
              user: "无",
              start: startTime,
              end: endTime,
              duration: diffTime * 24 * 60 * 60 * 1000,
              percent: 85,
              type: "project",
            };
            that.TaskData.push(temp1);
            for (var i = 0; i < list.length; i++) {
              var temp = {
                id: Number(list[i].id) + 1,
                code: list[i].code,
                label:
                  '<span style="color:#0077c0;">' + list[i].name + "</span>",
                text: list[i].name,
                nums: list[i].statusText,
                user: list[i].operatePerson,
                parentId: Number(list[i].projectId), //parentId 要跟父级的id对应
                start: list[i].startTime,
                end: list[i].endTime,
                duration:
                  that.datedifference(list[i].endTime, list[i].startTime) *
                  24 *
                  60 *
                  60 *
                  1000, //获取时间差 任务完成的时间段
                percent: 50,
                type: "milestone",
                // collapsed: true,
                style: {
                  base: {
                    fill: "#1EBC61",
                    stroke: "#0EAC51",
                  },
                },
              };
              that.TaskData.push(temp);
            }

            if (that.TaskData.length > 0) {
              that.showGantt = true;
              that.tasksUpdates(that.TaskData, 2);
              that.optionsUpdate(that.options, 2);
            }
          } else {
            that.showGantt = false;
            that.$message.warning(res.data.message);
          }
        });
    },
    //点击弹出-----------------------------------------------------
    showDialog(data) {},

    tasksUpdates(tasks, num) {
      if (num == 2) {
        // this.tasks = [];
        this.tasks = tasks;
      } else {
        return;
      }
    },
    optionsUpdate(options, num) {
      if (num == 2) {
        this.options = options;
      }
    },
    styleUpdate(style) {
      this.dynamicStyle = style;
    },
  },
};
</script>
<style></style>
