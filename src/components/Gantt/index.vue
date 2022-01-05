<template>
  <div class="wl-gantt" id="wl-gantt">
    <!-- 甘特图区 -->
    <!-- @contextmenu.native="handleContextmenu" -->
    <el-table
      ref="wl-gantt"
      class="wl-gantt-table"
      :fit="fit"
      :size="size"
      :load="load"
      :lazy="lazy"
      :border="border"
      :data="selfData"
      :stripe="stripe"
      :height="height"
      :row-key="rowKey"
      :row-style="rowStyle"
      :class="dateTypeClass"
      :cell-style="cellStyle"
      :max-height="maxHeight"
      :tree-props="selfProps"
      :current-row-key="currentRowKey"
      :row-class-name="rowClassName"
      :cell-class-name="cellClassName"
      :expand-row-keys="expandRowKeys"
      :header-row-style="headerRowStyle"
      :header-cell-style="headerCellStyle"
      :default-expand-all="defaultExpandAll"
      :header-row-class-name="headerRowClassName"
      :highlight-current-row="highlightCurrentRow"
      :header-cell-class-name="headerCellClassName"
      @header-contextmenu="handleHeaderContextMenu"
      @selection-change="handleSelectionChange"
      @current-change="handleCurrentChange"
      @cell-mouse-enter="handleMouseEnter"
      @cell-mouse-leave="handleMouseLeave"
      @expand-change="handleExpandChange"
      @filter-change="handleFilterChange"
      @cell-dblclick="handleCellDbClick"
      @header-click="handleHeaderClick"
      @row-dblclick="handleRowDbClick"
      @sort-change="handleSortChange"
      @cell-click="handleCellClick"
      @select-all="handleSelectAll"
      @row-click="handleRowClick"
      @select="handleSelect"
    >
      <template v-if="!ganttOnly">
        <slot name="prv"></slot>
        <el-table-column v-if="useCheckColumn" fixed type="selection" width="55" align="center"></el-table-column>
        <el-table-column v-if="useIndexColumn" fixed type="index" width="50" label="序号"></el-table-column>
        <!-- <el-table-column
          fixed
          label="名称"
          min-width="200"
          class-name="name-col"
          :prop="selfProps.name"
          :formatter="nameFormatter"
          :show-overflow-tooltip="nameShowTooltip"
        >
          <template slot-scope="scope">
            <el-input
              v-if="selfCellEdit === '_n_m_' + scope.$index"
              v-model="scope.row[selfProps.name]"
              @change="nameChange(scope.row)"
              @blur="nameBlur()"
              size="medium"
              class="u-full"
              ref="wl-name"
              placeholder="请输入名称"
            ></el-input>
            <strong v-else class="h-full">
              <span @click="cellEdit('_n_m_' + scope.$index, 'wl-name')">
                {{
                  nameFormatter
                    ? nameFormatter(scope.row, scope.column, scope.treeNode, scope.$index)
                    : scope.row[selfProps.name]
                }}
              </span>
              <span class="name-col-edit">
                <i class="el-icon-remove-outline name-col-icon task-remove" @click="emitTaskRemove(scope.row)"></i>
                <i class="el-icon-circle-plus-outline name-col-icon task-add" @click="emitTaskAdd(scope.row)"></i>
              </span>
            </strong>
          </template>
        </el-table-column> -->
        <!-- <el-table-column
          :resizable="false"
          fixed
          width="160"
          align="center"
          :prop="selfProps.startDate"
          label="开始日期"
        >
          <template slot-scope="scope">
            <el-date-picker
              v-if="selfCellEdit === '_s_d_' + scope.$index"
              v-model="scope.row[selfProps.startDate]"
              @change="startDateChange(scope.row)"
              @blur="selfCellEdit = null"
              type="date"
              size="medium"
              class="u-full"
              :clearable="false"
              ref="wl-start-date"
              value-format="yyyy-MM-dd"
              placeholder="请选择开始日期"
            ></el-date-picker>
            <div v-else class="h-full" @click="cellEdit('_s_d_' + scope.$index, 'wl-start-date')">
              {{ timeFormat(scope.row[selfProps.startDate]) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column fixed :resizable="false" width="160" align="center" :prop="selfProps.endDate" label="结束日期">
          <template slot-scope="scope">
            <el-date-picker
              v-if="selfCellEdit === '_e_d_' + scope.$index"
              v-model="scope.row[selfProps.endDate]"
              @change="endDateChange(scope.row)"
              @blur="selfCellEdit = null"
              type="date"
              size="medium"
              class="u-full"
              :clearable="false"
              ref="wl-end-date"
              value-format="yyyy-MM-dd"
              placeholder="请选择结束日期"
            ></el-date-picker>
            <div v-else class="h-full" @click="cellEdit('_e_d_' + scope.$index, 'wl-end-date')">
              {{ timeFormat(scope.row[selfProps.endDate]) }}
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          v-if="usePreColumn"
          align="center"
          min-width="140"
          label="前置任务"
          show-overflow-tooltip
          :prop="selfProps.endDate"
        >
          <template slot-scope="scope">
            <!-- @blur="selfCellEdit = null" @blur="preEditBlur" -->
            <el-select
              v-if="selfCellEdit === '_p_t_' + scope.$index"
              @change="preChange"
              v-model="scope.row[selfProps.pre]"
              collapse-tags
              :multiple="preMultiple"
              ref="wl-pre-select"
              placeholder="请选择前置任务"
            >
              <el-option
                v-for="item in preOptions"
                :key="item[selfProps.id]"
                :label="item[selfProps.name]"
                :value="item[selfProps.id]"
              ></el-option>
            </el-select>
            <div v-else class="h-full" @click="preCellEdit(scope.row, '_p_t_' + scope.$index, 'wl-pre-select')">
              {{ preFormat(scope.row) }}
            </div>
          </template>
        </el-table-column>
        <slot></slot>
      </template>
      <!-- year and mouth gantt -->
      <template v-if="selfDateType === 'yearAndMonth'">
        <el-table-column :resizable="false" v-for="year in ganttTitleDate" :label="year.name" :key="year.id">
          <el-table-column
            class-name="wl-gantt-item"
            v-for="month in year.children"
            :resizable="false"
            :key="month.id"
            :label="month.name"
            width="38"
            align="center"
          >
            <template slot-scope="scope">
              <div :class="dayGanttType(scope.row, month.fullDate, 'months')"></div>
              <div v-if="useRealTime" :class="realDayGanttType(scope.row, month.fullDate, 'months')"></div>
            </template>
          </el-table-column>
        </el-table-column>
      </template>
      <!-- year and week gantt -->
      <template v-else-if="selfDateType === 'yearAndWeek'">
        <el-table-column :resizable="false" v-for="i in ganttTitleDate" :label="i.fullDate" :key="i.id">
          <el-table-column class-name="wl-gantt-item" v-for="t in i.children" :resizable="false" :key="t.id" :label="t.name">
            <template slot-scope="scope">
              <div :class="dayGanttType(scope.row, t.fullDate, 'week')"></div>
              <div v-if="useRealTime" :class="realDayGanttType(scope.row, t.fullDate, 'week')"></div>
            </template>
          </el-table-column>
        </el-table-column>
      </template>
      <!-- mouth and day gantt -->
      <template v-else>
        <el-table-column :resizable="false" v-for="i in ganttTitleDate" :label="i.fullDate" :key="i.id">
          <el-table-column class-name="wl-gantt-item" v-for="t in i.children" :resizable="false" :key="t.id" :label="t.name">
            <template slot-scope="scope">
              <div :class="dayGanttType(scope.row, t.fullDate)"></div>
              <div v-if="useRealTime" :class="realDayGanttType(scope.row, t.fullDate)"></div>
            </template>
          </el-table-column>
        </el-table-column>
      </template>
    </el-table>
    <!-- 组件区 -->
    <!-- hover 看板 -->
    <div v-show="infoCard.show" class="wl-info-card" :style="infoCardStyle">
      <slot name="info-card" :row="infoCard.row" :column="infoCard.column" :cell="infoCard.cell" :event="infoCard.event"></slot>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs' // 导入日期js
import { v4 as uuidv4 } from 'uuid' // 导入uuid生成插件
import isBetween from 'dayjs/plugin/isBetween'
dayjs.extend(isBetween)
import Time from '@/utils/time'

function flattenDeep(arr = [], childs = 'Children') {
  return arr.reduce((flat, item) => {
    return flat.concat(item, item[childs] ? flattenDeep(item[childs], childs) : [])
  }, [])
}

function getMax(arr = [], key = null, stamp = false) {
  const _o = !key ? arr : arr.map(i => i[key])
  const _t = !stamp ? _o : _o.map(i => Time.init(i).valueOf())
  return Math.max(..._t)
}

function flattenDeepParents(arr, parent) {
  return arr.reduce((flat, item) => {
    return flat.concat(item[parent] || [], item[parent] ? flattenDeepParents([item[parent]], parent) : [])
  }, [])
}

function regDeepParents(row, parent, reg) {
  if (row[parent]) {
    reg && reg(row[parent])
    regDeepParents(row[parent], parent, reg)
  }
}

export default {
  name: 'Gantt',
  data() {
    return {
      selfStartDate: '', // 项目开始时间
      selfEndDate: '', // 项目结束时间
      selfDataList: [], // 一维化后的gantt数据
      selfDateType: '', // 自身日期类型
      selfId: 1, // 自增id
      selfCellEdit: null, // 正在编辑的单元格
      selfDependentStore: [], // 自身依赖库
      multipleSelection: [], // 多选数据
      currentRow: null, // 单选数据
      preOptions: [], // 可选前置节点
      nameShowTooltip: true, // 名称列是否开启超出隐藏
      update: true, // 更新视图
      selectionList: [], // 多选选中数据
      infoCard: {
        show: false,
        x: 0,
        y: 0,
        row: {},
        column: {},
        cell: null,
        event: {},
        timer: null
      } // 看板信息
    }
  },
  props: {
    useCard: {
      type: Boolean,
      default: false
    }, // 是否使用hover看板
    /**
     * @name 右键扩展菜单
     * @param {String} label 展示名称
     * @param {String} prop 绑定的字段
     * @param {String} icon 可选 字体图标class
     */
    // gantt数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 日期类型
    dateType: {
      type: String,
      default: 'yearAndMonth' // monthAndDay,yearAndMonth,yearAndWeek
    },
    // 树表配置项
    props: Object,
    // 开始日期
    startDate: {
      type: [String, Object],
      required: true
    },
    // 结束时间
    endDate: {
      type: [String, Object],
      required: true
    },
    // 是否使用实际开始时间、实际结束时间
    useRealTime: {
      type: Boolean,
      default: false
    },
    // 是否检查源数据符合规则，默认开启，如果源数据已遵循project规则，可设置为false以提高性能
    checkSource: {
      type: Boolean,
      default: true
    },
    // 废弃：反而会因为频繁的判断而影响性能
    // 是否生成自增id并组成parents来满足树链的查询条件，如果数据本身已有自增id，可设置为false以提高性能
    // 如果设置为false，则数据内必须包含自增id字段：identityId，parents字段必须以`,`分割。
    // 字段名可通过props配置，自增id必须唯一并尽可能的短，如1，2，3...，parents应为祖先自增id通过`,`拼接直至父级
    recordParents: {
      type: Boolean,
      default: true
    },
    // 是否使用id来作为自增id，如果是请保证id本来就简短的数字型而不是较长的字符串或guid
    treatIdAsIdentityId: {
      type: Boolean,
      default: false
    },
    // 自动变化gantt标题日期模式
    autoGanttDateType: {
      type: Boolean,
      default: true
    },
    nameFormatter: Function, // 名称列的格式化内容函数
    // 是否使用内置前置任务列
    usePreColumn: {
      type: Boolean,
      default: false
    },
    // 是否使用复选框列
    useCheckColumn: {
      type: Boolean,
      default: false
    },
    // 是否使用序号列
    useIndexColumn: {
      type: Boolean,
      default: false
    },
    // 是否可编辑
    edit: {
      type: Boolean,
      default: true
    },
    // 复选框是否父子关联
    parentChild: {
      type: Boolean,
      default: true
    },
    // 是否开启前置任务多选 如果开启多选则pre字段必须是Array，否则可以是Number\String
    preMultiple: {
      type: Boolean,
      default: true
    },
    preFormatter: Function, // 前置任务列的格式化内容函数
    // 空单元格占位符
    emptyCellText: {
      type: String,
      default: '-'
    },
    // 多选时，是否可以点击行快速选中复选框
    /* quickCheck: {
      type: Boolean,
      default: false
    }, */
    ganttOnly: {
      type: Boolean,
      default: false
    }, // 是否只显示图形
    // ---------------------------------------------以下为el-table Attributes--------------------------------------------
    defaultExpandAll: {
      type: Boolean,
      default: false
    }, // 是否全部展开
    rowKey: {
      type: [String, Function],
      default: 'id'
    }, // 必须指定key来渲染树形数据
    currentRowKey: {
      type: [String, Number]
    },
    height: [String, Number], // 列表高度
    maxHeight: [String, Number], // 列表最大高度
    stripe: {
      type: Boolean,
      default: false
    }, // 是否为斑马纹
    highlightCurrentRow: {
      type: Boolean,
      default: false
    }, // 是否要高亮当前行
    border: {
      type: Boolean,
      default: true
    }, // 是否带有纵向边框
    fit: {
      type: Boolean,
      default: true
    }, // 列的宽度是否自撑开
    size: String, // Table 的尺寸
    rowClassName: Function, // 行的 className 的回调方法
    rowStyle: Function, // 行的 style 的回调方法
    cellClassName: Function, // 单元格的 className 的回调方法
    cellStyle: Function, // 单元格的 style 的回调方法
    headerRowClassName: {
      type: [Function, String],
      default: 'wl-gantt-header'
    }, // 表头行的 className 的回调方法
    headerRowStyle: [Function, Object], // 表头行的 style 的回调方法
    headerCellClassName: [Function, String], // 表头单元格的 className 的回调方法
    headerCellStyle: [Function, Object], // 表头单元格的 style 的回调方法
    expandRowKeys: Array, // 可以通过该属性设置 Table 目前的展开行
    lazy: {
      type: Boolean,
      default: false
    }, // 是否懒加载子节点数据
    load: Function // 加载子节点数据的函数，lazy 为 true 时生效
    // 是否使用一维数据组成树
    /* arrayToTree: {
      type: Boolean,
      default: false
    } */
  },
  computed: {
    // 甘特图标题日期分配
    ganttTitleDate() {
      // 分解开始和结束日期
      const startDateSpilt = dayjs(this.selfStartDate)
        .format('YYYY-M-D')
        .split('-')
      const endDateSpilt = dayjs(this.selfEndDate)
        .format('YYYY-M-D')
        .split('-')
      const startYear = Number(startDateSpilt[0])
      const startMonth = Number(startDateSpilt[1])
      const endYear = Number(endDateSpilt[0])
      const endMonth = Number(endDateSpilt[1])
      // 自动更新日期类型以适应任务时间范围跨度
      if (this.autoGanttDateType) {
        // 计算日期跨度
        const monthDiff = this.timeDiffTime(this.selfStartDate, this.selfEndDate, 'months')
        if (monthDiff > 12) {
          // 12个月以上的分到yearAndMouth
          this.setDataType('yearAndMonth')
        } else if (monthDiff > 2) {
          // 2个月以上的分到yearAndWeek
          this.setDataType('yearAndWeek')
        } else {
          this.setDataType('monthAndDay')
        }
      }
      // 不自动更新日期类型，以dateType固定展示
      if (this.selfDateType === 'yearAndWeek') {
        return this.yearAndWeekTitleDate(startYear, startMonth, endYear, endMonth)
      } else if (this.selfDateType === 'monthAndDay') {
        return this.mouthAndDayTitleDate(startYear, startMonth, endYear, endMonth)
      } else {
        return this.yearAndMouthTitleDate(startYear, startMonth, endYear, endMonth)
      }
    },
    // 数据
    selfData() {
      const _data = this.data || []
      // 生成一维数据
      this.setListData()
      // 处理源数据合法性
      this.handleData(_data)
      // 处理前置依赖
      this.handleDependentStore()
      return _data
    },
    // 树表配置项
    selfProps() {
      return {
        hasChildren: 'hasChildren', // 字段来指定哪些行是包含子节点
        children: 'children', // children字段来表示有子节点
        name: 'name', // 任务名称字段
        id: 'id', // id字段
        pid: 'pid', // pid字段
        startDate: 'startDate', // 开始时间字段
        realStartDate: 'realStartDate', // 实际开始时间字段
        endDate: 'endDate', // 结束时间字段
        realEndDate: 'realEndDate', // 实际结束时间字段
        identityId: 'identityId',
        parents: 'parents',
        pre: 'pre', // 前置任务字段【注意：如果使用recordParents，则pre值应是目标对象的identityId字段(可配置)】
        ...this.props
      }
    },
    // 根据日期类型改样式
    dateTypeClass() {
      if (this.selfDateType === 'yearAndMonth') {
        return 'year-and-month'
      } else if (this.selfDateType === 'monthAndDay') {
        return 'month-and-day'
      } else if (this.selfDateType === 'yearAndWeek') {
        return 'year-and-week'
      }
      return ''
    },
    // 看板样式
    infoCardStyle() {
      return {
        left: this.infoCard.x + 'px',
        top: this.infoCard.y + 'px'
      }
    }
  },
  methods: {
    // 设置dateType
    setDataType(type) {
      this.selfDateType = type
    },
    // 生成一维数据
    setListData() {
      this.selfDataList = flattenDeep(this.data, this.selfProps.children)
    },
    /**
     * 开始时间改变
     * row: object 当前行数据
     */
    startDateChange(row) {
      // 如果将开始时间后移，结束时间也应后移
      const _delay = this.timeIsBefore(row._oldStartDate, row[this.selfProps.startDate])
      if (_delay) {
        row[this.selfProps.endDate] = this.timeAdd(row[this.selfProps.endDate], row._cycle)
      }
      // 如果开始早于项目开始，则把项目开始提前
      const earlyprojectStart = this.timeIsBefore(row[this.selfProps.startDate], this.selfStartDate)
      if (earlyprojectStart) {
        this.selfStartDate = row[this.selfProps.startDate]
      }
      this.emitTimeChange(row)
    },
    /**
     * 结束时间改变
     * row: object 当前行数据
     */
    endDateChange(row) {
      // 如果开始晚于项目结束，则把项目结束延后
      const earlyProjectEnd = this.timeIsBefore(this.selfEndDate, row[this.selfProps.endDate])
      if (earlyProjectEnd) {
        this.selfEndDate = row[this.selfProps.endDate]
      }
      this.emitTimeChange(row)
      // 如果开始晚于结束，提示
      /* if (
        this.timeIsBefore(
          row[this.selfProps.endDate],
          row[this.selfProps.startDate]
        )
      ) {
        row[this.selfProps.startDate] = row._oldStartDate;
        this.$message({
          showClose: true,
          message: "开始时间不可以晚于结束时间",
          type: "error"
        });
        return;
      } */
    },
    /**
     * 前置任务改变
     * row: object 当前行数据
     */
    preChange(row) {
      this.emitTimeChange(row)
      this.selfCellEdit = null
      // 如果开始晚于结束，提示
      /* if (
        this.timeIsBefore(
          row[this.selfProps.endDate],
          row[this.selfProps.startDate]
        )
      ) {
        row[this.selfProps.startDate] = row._oldStartDate;
        this.$message({
          showClose: true,
          message: "开始时间不可以晚于结束时间",
          type: "error"
        });
        return;
      } */
    },
    /**
     * 前置任务内容格式化函数
     * data：[String, Array] 前置任务
     */
    preFormat(row) {
      // 自定义格式化前置任务列函数
      if (this.preFormatter) {
        return this.preFormatter(row)
      }
      const data = row[this.selfProps.pre]
      if (!data) return this.emptyCellText
      if (Array.isArray(data)) {
        if (data.length === 0) return this.emptyCellText
        let preText = ''
        data.forEach(i => {
          const _act = this.selfDataList.find(t => t[this.selfProps.id] === i)
          if (_act) preText += `${_act[this.selfProps.name]},`
        })
        return preText
      }
      const _act = this.selfDataList.find(t => t[this.selfProps.id] === data)
      return _act ? _act[this.selfProps.name] : this.emptyCellText
    },
    // 前置下拉框失去焦点事件，change会触发blur，如果不延时则chang失效，如果延时则也只是延迟触发，会造成选一次就关闭无法多选
    /* preEditBlur(){
      setTimeout(()=>{
        this.selfCellEdit = null
      },500)
    }, */
    /**
     * 前置任务编辑
     */
    preCellEdit(row, key, ref) {
      /* let _parents = row._parents.split(","); // 父祖节点不可选
      let _children = row.allChildren.map(i => i._identityId); // 子孙节点不可选
      let _self = row[this.selfProps.id]; // 自己不可选
      let parentsAndChildren = _children.concat(_parents, [_self]);
      let filter_options = this.selfDataList.filter(
        i => !parentsAndChildren.some(t => t == i._identityId)
      );
      this.preOptions = filter_options; */
      if (!this.edit) return
      this.preOptions = []
      this.selfDataList.forEach(i => {
        if (i[this.selfProps.id] !== row[this.selfProps.id]) {
          this.preOptions.push({ ...i, [this.selfProps.children]: null })
        }
      })
      // 再剔除所有前置链涉及到的节点
      this.deepFindToSelf(row)
      // 调用单元格编辑
      this.cellEdit(key, ref)
    },
    /**
     * 找出to为当前元素的form，并将form作为to继续查找
     * item: Object 当前元素
     * targets: Array 需要过滤的数据(废弃)
     */
    deepFindToSelf(item) {
      const _parents = item._parents.split(',') // 父祖节点不可选
      const _children = item.allChildren.map(i => i._identityId) // 子孙节点不可选
      const parentsAndChildren = _children.concat(_parents)
      this.preOptions = this.preOptions.filter(i => !parentsAndChildren.some(t => t === i._identityId))
      this.selfDependentStore.forEach(i => {
        const _tag = this.preMultiple
          ? i.to.some(t => t[this.selfProps.id] === item[this.selfProps.id])
          : i.to[this.selfProps.id] === item[this.selfProps.id]
        if (_tag) {
          this.preOptions = this.preOptions.filter(t => t[this.selfProps.id] !== i.form[this.selfProps.id])
          this.deepFindToSelf(i.form)
        }
      })
    },
    /**
     * 单元格编辑
     * key: string 需要操作的单元格key
     * ref：object 需要获取焦点的dom
     */
    cellEdit(key, ref) {
      if (!this.edit) return
      if (ref === 'wl-name') {
        this.nameShowTooltip = false
      }
      this.selfCellEdit = key
      this.$nextTick(() => {
        this.$refs[ref].focus()
      })
    },
    // 名称编辑事件
    nameChange(row) {
      this.selfCellEdit = null
      this.nameShowTooltip = true
      this.emitNameChange(row)
    },
    // 名称列编辑输入框blur事件
    nameBlur() {
      this.selfCellEdit = null
      this.nameShowTooltip = true
    },
    // 以下是表格-日期-gantt生成函数----------------------------------------生成gantt表格-------------------------------------
    /**
     * 年-月模式gantt标题
     * startYear: 起始年
     * startMonth：起始月
     * endYear：结束年
     * endMonth：结束月
     */
    yearAndMouthTitleDate(startYear, startMonth, endYear, endMonth) {
      // 日期数据盒子
      const dates = [
        {
          name: `${startYear}年`,
          date: startYear,
          id: uuidv4(),
          children: []
        }
      ]
      // 处理年份
      const yearDiff = endYear - startYear
      // 年间隔小于一年
      if (yearDiff === 0) {
        const isLeap = this.isLeap(startYear) // 是否闰年
        const mouths = this.generationMonths(startYear, startMonth, endMonth + 1, isLeap, false) // 处理月份
        dates[0].children = mouths
        return dates
      }
      // 处理开始月份
      const startIsLeap = this.isLeap(startYear)
      const startMonths = this.generationMonths(startYear, startMonth, 13, startIsLeap, false)
      // 处理结束月份
      const endIsLeap = this.isLeap(endYear)
      const endMonths = this.generationMonths(endYear, 1, endMonth + 1, endIsLeap, false)
      // 年间隔等于一年
      if (yearDiff === 1) {
        dates[0].children = startMonths
        dates.push({
          name: `${endYear}年`,
          date: endYear,
          children: endMonths,
          id: uuidv4()
        })
        return dates
      }
      // 年间隔大于1年
      if (yearDiff > 1) {
        dates[0].children = startMonths
        for (let i = 1; i < yearDiff; i++) {
          const itemYear = startYear + i
          const isLeap = this.isLeap(itemYear)
          const monthAndDay = this.generationMonths(itemYear, 1, 13, isLeap, false)
          dates.push({
            name: `${itemYear}年`,
            date: itemYear,
            id: uuidv4(),
            children: monthAndDay
          })
        }
        dates.push({
          name: `${endYear}年`,
          date: endYear,
          children: endMonths,
          id: uuidv4()
        })
        return dates
      }
    },
    /**
     * 年-周模式gantt标题
     * startYear: 起始年
     * startMonth：起始月
     * endYear：结束年
     * endMonth：结束月
     */
    yearAndWeekTitleDate(startYear, startMonth, endYear, endMonth) {
      // 处理年份
      const yearDiff = endYear - startYear
      // 只存在同年或前后年的情况
      if (yearDiff === 0) {
        // 年间隔为同一年
        const isLeap = this.isLeap(startYear) // 是否闰年
        const mouths = this.generationMonths(startYear, startMonth, endMonth + 1, isLeap, true, true) // 处理月份
        return mouths
      }
      // 处理开始月份
      const startIsLeap = this.isLeap(startYear)
      const startMonths = this.generationMonths(startYear, startMonth, 13, startIsLeap, true, true)
      // 处理结束月份
      const endIsLeap = this.isLeap(endYear)
      const endMonths = this.generationMonths(endYear, 1, endMonth + 1, endIsLeap, true, true)
      return startMonths.concat(endMonths)
    },
    /**
     * 月-日模式gantt标题
     * startYear: 起始年
     * startMonth：起始月
     * endYear：结束年
     * endMonth：结束月
     */
    mouthAndDayTitleDate(startYear, startMonth, endYear, endMonth) {
      // 处理年份
      const yearDiff = endYear - startYear
      // 只存在同年或前后年的情况
      if (yearDiff === 0) {
        // 年间隔为同一年
        const isLeap = this.isLeap(startYear) // 是否闰年
        const mouths = this.generationMonths(startYear, startMonth, endMonth + 1, isLeap) // 处理月份
        return mouths
      }
      // 处理开始月份
      const startIsLeap = this.isLeap(startYear)
      const startMonths = this.generationMonths(startYear, startMonth, 13, startIsLeap)
      // 处理结束月份
      const endIsLeap = this.isLeap(endYear)
      const endMonths = this.generationMonths(endYear, 1, endMonth + 1, endIsLeap)
      return startMonths.concat(endMonths)
    },
    /**
     * 生成月份函数
     * year: Number 当前年份
     * startNum: Number 开始月分
     * end_num：Number 结束月份
     * isLeap: Boolean 是否闰年
     * insertDays: Boolean 是否需要插入 日
     * week: 是否以周的间隔
     */
    generationMonths(year, startNum = 1, endNum = 13, isLeap = false, insertDays = true, week = false) {
      const months = []
      if (insertDays) {
        // 无需 日 的模式
        for (let i = startNum; i < endNum; i++) {
          // 需要 日 的模式
          const days = this.generationDays(year, i, isLeap, week)
          months.push({
            name: `${i}月`,
            date: i,
            fullDate: `${year}-${i}`,
            children: days,
            id: uuidv4()
          })
        }
        return months
      }
      for (let i = startNum; i < endNum; i++) {
        // 需要 日 的模式
        months.push({
          name: `${i}月`,
          date: i,
          fullDate: `${year}-${i}`,
          id: uuidv4()
        })
      }
      return months
    },
    /**
     * 生成日期函数
     * year: Number 当前年份
     * month: Number 当前月份
     * isLeap: Boolean 是否闰年
     * week: Boolean 是否间隔一周
     */
    generationDays(year, month, isLeap = false, week = false) {
      const bigMonth = [1, 3, 5, 7, 8, 10, 12].includes(month)
      const smallMonth = [4, 6, 9, 11].includes(month)
      const datesNum = bigMonth ? 32 : smallMonth ? 31 : isLeap ? 30 : 29
      const days = []
      if (week) {
        let _day = 1 // 从周日开始
        const _startDayInweek = this.timeInWeek(`${year}-${month}-1`)
        if (_startDayInweek !== 0) {
          _day = 8 - _startDayInweek
        }
        for (let i = _day; i < datesNum; i += 7) {
          days.push({
            date: i,
            name: `${i}日`,
            id: uuidv4(),
            fullDate: `${year}-${month}-${i}`
          })
        }
      } else {
        for (let i = 1; i < datesNum; i++) {
          days.push({
            date: i,
            name: `${i}日`,
            id: uuidv4(),
            fullDate: `${year}-${month}-${i}`
          })
        }
      }
      return days
    },
    /**
     * 是否闰年函数
     * year: Number 当前年份
     */
    isLeap(year) {
      return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0)
    },
    /**
     * 当前日期gantt状态
     * row: object 当前行信息
     * date: string 当前格子日期
     * unit: string 时间单位，以天、月、年计算
     */
    dayGanttType(row, date, unit = 'days') {
      const startDate = row[this.selfProps.startDate]
      const endDate = row[this.selfProps.endDate]
      const between = dayjs(date).isBetween(startDate, endDate, unit)
      if (between) {
        return 'wl-item-on'
      }
      const start = dayjs(startDate).isSame(date, unit)
      const end = dayjs(endDate).isSame(date, unit)
      if (start && end) {
        return 'wl-item-on wl-item-full'
      }
      if (start) {
        return 'wl-item-on wl-item-start'
      }
      if (end) {
        return 'wl-item-on wl-item-end'
      }
    },
    /**
     * 实际日期gantt状态
     * row: object 当前行信息
     * date: string 当前格子日期
     * unit: string 时间单位，以天、月、年计算
     */
    realDayGanttType(row, date, unit = 'days') {
      const startDate = row[this.selfProps.realStartDate]
      const endDate = row[this.selfProps.realEndDate]
      const between = dayjs(date).isBetween(startDate, endDate, unit)
      if (between) {
        return 'wl-real-on'
      }
      const start = dayjs(startDate).isSame(date, unit)
      const end = dayjs(endDate).isSame(date, unit)
      if (start && end) {
        return 'wl-real-on wl-real-full'
      }
      if (start) {
        return 'wl-real-on wl-real-start'
      }
      if (end) {
        return 'wl-real-on wl-real-end'
      }
    },
    // 以下是时间计算类函数 ------------------------------------------------------时间计算---------------------------------------
    /**
     * 计算时差
     * startDate：开始时间
     * endDate：结束时间
     * unit：单位 days、months、yesrs
     */
    timeDiffTime(startDate, endDate, unit = 'days') {
      return dayjs(endDate).diff(startDate, unit)
    },
    /**
     * 比较时间，是否之前
     * startDate：开始时间
     * endDate：结束时间
     * unit：单位 days、months、yesrs
     */
    timeIsBefore(startDate, endDate, unit = 'days') {
      return dayjs(startDate).isBefore(endDate, unit)
    },
    /**
     * 时间加计算函数
     * date：原时间
     * num：需要增加的时间数量
     * nuit：增加时间的单位 day year
     */
    timeAdd(date, num = 1, nuit = 'day', format = 'YYYY-MM-DD') {
      return dayjs(date)
        .add(num, nuit)
        .format(format)
    },
    /**
     * 时间格式化函数
     * date 需要格式化的数据
     * format 格式化的格式
     */
    timeFormat(date, format = 'YYYY-MM-DD') {
      return date ? dayjs(date).format(format) : this.emptyCellText
    },
    /**
     * 查询时间是周几
     */
    timeInWeek(date) {
      return dayjs(date).day()
    },
    // 以下为输出数据函数 --------------------------------------------------------------输出数据------------------------------------
    // 删除任务
    emitTaskRemove(item) {
      this.$emit('taskRemove', item)
    },
    // 添加任务
    emitTaskAdd(item) {
      this.$emit('taskAdd', item)
    },
    // 任务名称更改
    emitNameChange(item) {
      this.$emit('nameChange', item)
    },
    // 任务时间更改
    emitTimeChange(item) {
      this.$emit('timeChange', item)
      this.$nextTick(() => {
        this.$set(item, '_oldStartDate', item[this.selfProps.startDate])
        this.$set(item, '_oldEndDate', item[this.selfProps.endDate])
      })
    },
    /**
     * 前置任务更改
     * item: Object 发生更改的行数据
     * oldval: [String, Array] 修改前数据
     * handle: Boolean true为操作选择框修改 false为源数据不符合规范的修正更改
     */
    emitPreChange(item, oldval, handle = false) {
      this.$emit('preChange', item, oldval, handle)
    },
    // 处理外部数据 ---------------------------------------------------------------原始数据处理-------------------------------------
    handleData(data, parent = null, level = 0) {
      level++
      data.forEach(i => {
        this.$set(i, '_parent', parent) // 添加父级字段
        this.$set(i, '_level', level) // 添加层级字段
        if (!i._oldStartDate) {
          this.$set(i, '_oldStartDate', i[this.selfProps.startDate])
        }
        if (!i._oldEndDate) {
          this.$set(i, '_oldEndDate', i[this.selfProps.endDate])
        }
        // 当结束时间早于开始时间时，自动处理结束时间为开始时间延后一天
        const endEarlyStart = this.timeIsBefore(i[this.selfProps.endDate], i[this.selfProps.startDate])
        if (endEarlyStart) {
          this.$set(i, this.selfProps.endDate, i[this.selfProps.startDate])
          this.$set(i, '_cycle', 1) // 添加工期字段
          this.emitTimeChange(i) // 将发生时间更新的数据输出
        } else {
          const timeDiff = this.timeDiffTime(i[this.selfProps.startDate], i[this.selfProps.endDate])
          this.$set(i, '_cycle', timeDiff + 1) // 添加工期字段
        } // 添加工期字段
        // 添加自增id字段及树链组成的parents字段
        this.recordIdentityIdAndParents(i)
        // 处理前置任务
        // this.handlePreTask(i);
        // 如果当前节点的开始时间早于父节点的开始时间，则将开始时间与父节点相同
        this.parentStartDateToChild(i)
        // 校验结束时间是否晚于子节点，如不则将节点结束时间改为最晚子节点
        this.childEndDateToParent(i)
        if (Array.isArray(i[this.selfProps.children])) {
          this.$set(i, '_isLeaf', false) // 添加是否叶子节点字段
          const allChildren = flattenDeep(i[this.selfProps.children], this.selfProps.children)
          this.$set(i, 'allChildren', allChildren) // 添加全部子节点字段
          this.handleData(i[this.selfProps.children], i, level)
        } else {
          this.$set(i, '_isLeaf', true) // 添加是否叶子节点字段
          this.$set(i, 'allChildren', []) // 添加全部子节点字段
        }
      })
    },
    // 取父节点开始时间给早于父节点开始时间的子节点
    parentStartDateToChild(item) {
      if (!item._parent) return
      // 如果子节点时间早于父节点，则将子节点开始时间后移至父节点开始时间,并将结束时间平移【即工期不变】
      const childEarlyParent = this.timeIsBefore(item[this.selfProps.startDate], item._parent[this.selfProps.startDate])
      if (childEarlyParent) {
        // 修正子节点开始时间
        this.$set(item, this.selfProps.startDate, item._parent[this.selfProps.startDate])
        // 修正子节点结束时间
        const toEndDate = this.timeAdd(item[this.selfProps.startDate], item._cycle)
        this.$set(item, this.selfProps.endDate, toEndDate)
        this.emitTimeChange(item) // 将发生时间更新的数据输出
      }
    },
    // 取数组结束时间最大值，如果最大值比父级结束时间大，更新父级结束时间
    childEndDateToParent(item) {
      if (!Array.isArray(item[this.selfProps.children])) return
      const childMax = getMax(item[this.selfProps.children], this.selfProps.endDate, true) // 取子节点中最晚的结束时间
      const parentEnd = dayjs(item[this.selfProps.endDate]).valueOf()
      if (childMax > parentEnd) {
        // 如果子节点结束时间比父节点晚，则将父节点结束时间退后
        this.$set(item, this.selfProps.endDate, this.timeFormat(childMax))
        this.emitTimeChange(item) // 将发生时间更新的数据输出
      }
    },
    // 处理前置任务节点    /// ---- 此使前置任务校验处理还没开始，因此出错，前置处理后手动调用vue视图更新试试
    handlePreTask(item) {
      // 统一在一维化数据中处理前置任务
      const preTarget = this.selfDependentStore.find(i => i.form[this.selfProps.id] === item[this.selfProps.id])
      if (!preTarget) return
      const preEndDate = this.preMultiple
        ? getMax(preTarget.to, this.selfProps.endDate, true) // 取前置点中最晚的结束时间
        : preTarget.to[this.selfProps.endDate]
      /* 在数据循环中处理前置
      let pres = item[this.selfProps.pre];
      if(!pres) return;
      let preTarget = null, preEndDate = null;
      if(this.preMultiple){
        if(!Array.isArray(pres) || pres.length ===0) return;
        preTarget = this.selfDataList.filter(i => pres.includes(i[this.selfProps.id]));
        preEndDate = getMax(preTarget, this.selfProps.endDate, true);
      }else{
        preTarget = this.selfDataList.find(i => i[this.selfProps.id] === pres);
        if(!preTarget) return;
        preEndDate = preTarget[this.selfProps.endDate]
      } */
      // 查看是否需要根据前置时间，如果不符合规则，更新后置时间
      const startEarlyPrvend = this.timeIsBefore(item[this.selfProps.startDate], preEndDate)
      if (startEarlyPrvend) {
        const _cycle = item._cycle - 1
        const toStartDate = this.timeAdd(preEndDate, 1)
        const toEndDate = this.timeAdd(toStartDate, _cycle)
        this.$set(item, this.selfProps.startDate, toStartDate)
        this.$set(item, this.selfProps.endDate, toEndDate)
      }
    },
    /**
     * 检查前置任务合法性
     * ！！已废弃：改为从一维数据列收集form、to并校验，不再在递归中检查 -> handleDependentStore
     */
    checkPreTaskValidity(item) {
      // 没有前置任务退出
      if (!item[this.selfProps.pre]) return false
      // 多前置任务模式
      if (this.preMultiple) {
        const _pres = item[this.selfProps.pre]
        // 不是数组退出
        if (!Array.isArray(_pres)) {
          this.emitPreChange(item, item[this.selfProps.pre])
          this.$set(item, this.selfProps.pre, [])
          return false
        }
        // 数组为空退出
        if (_pres.length === 0) return false
        // 前置任务有自己时，剔除自己
        const netSelfPres = _pres.filter(i => i !== item[this.selfProps.id])
        if (netSelfPres.length !== _pres.length) {
          this.emitPreChange(item, item[this.selfProps.pre])
          this.$set(item, this.selfProps.pre, netSelfPres)
        }
        // 剔除前置任务找不到目标数据的元素
        const preExist = netSelfPres.filter(i => this.targetInAllData(i))
        if (preExist.length !== netSelfPres.length) {
          this.emitPreChange(item, item[this.selfProps.pre])
          this.$set(item, this.selfProps.pre, preExist)
        }
        const noParChi = [] // 声明非父、祖、子、孙节点的盒子
        for (const i of preExist) {
          const preTarget = this.selfDataList.find(t => t[this.selfProps.id] === i)
          if (!preTarget) continue
          const preParChi = this.targetInParentsOrChildren(item, preTarget)
          preParChi || noParChi.push(i)
        }
        // 前置任务是自己的父祖或子孙节点, 剔除此前置
        if (noParChi.length !== preExist.length) {
          this.emitPreChange(item, item[this.selfProps.pre])
          this.$set(item, this.selfProps.pre, noParChi)
        }
        // 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
        this.targetLinkLoopback(item)
        return true
      }
      // 单前置任务模式
      if (item[this.selfProps.pre] === item[this.selfProps.id]) {
        this.$set(item, this.selfProps.pre, null)
        return false
      } // 前置任务是自己退出
      // 找到前置目标节点
      const preTarget = this.selfDataList.find(i => i[this.selfProps.id] === item[this.selfProps.pre])
      // 没找到前置任务节点数据退出
      if (!preTarget) {
        this.$set(item, this.selfProps.pre, null)
        return false
      }
      // 前置任务是自己的父祖或子孙节点退出
      const isPreStandard = this.targetInParentsOrChildren(item, preTarget)
      if (isPreStandard) {
        this.$set(item, this.selfProps.pre, null)
        return false
      }
      // 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
      this.targetLinkLoopback(item)
      return true
    },
    // 处理数据生成自增id和树链parents
    recordIdentityIdAndParents(item) {
      // if (!this.recordParents) return;
      if (this.treatIdAsIdentityId) {
        const _parents = item._parent ? item._parent._parents + ',' + item._parent[this.selfProps.id] : ''
        this.$set(item, '_parents', _parents)
        this.$set(item, '_identityId', item[this.selfProps.id])
        return
      }
      // 添加自增id
      this.$set(item, '_identityId', this.selfId)
      this.selfId++
      // 添加parents字段
      const _parents = item._parent ? item._parent._parents + ',' + item._parent._identityId : ''
      this.$set(item, '_parents', _parents)
    },
    /**
     * 查询目标是否在父级链或者全部子集中
     * item 当前节点
     * pre 前置节点
     */
    targetInParentsOrChildren(item, pre) {
      const _parents = item._parents.split(',')
      const _children = item.allChildren.map(i => i._identityId)
      return _children.concat(_parents).some(i => i === pre._identityId)
    },
    // 查询目标节点是否在数据中存在,并返回数据
    targetInAllData(targetId) {
      return this.selfDataList.find(i => i[this.selfProps.id] === targetId)
    },
    /**
     * 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
     * item: Object 当前节点数据
     * preTesk: Array 前置链上所有id
     * ！！已废弃：下方尝试改成form to结构收集起来处理，不再循环中反复循环处理 -> terseTargetLinkLoopback
     */
    targetLinkLoopback(item, preTesk = []) {
      preTesk.push(item[this.selfProps.id])
      const _pres = item[this.selfProps.pre]
      const legalPres = _pres.filter(i => !preTesk.includes(i))
      if (this.preMultiple) {
        if (legalPres.length !== _pres.length) {
          this.emitPreChange(item, item[this.selfProps.pre])
          this.$set(item, this.selfProps.pre, legalPres)
        }
        legalPres.forEach(i => {
          const preTarget = this.selfDataList.find(t => t[this.selfProps.id] === i)
          if (preTarget && Array.isArray(preTarget[this.selfProps.pre]) && preTarget[this.selfProps.pre].length > 0) {
            this.targetLinkLoopback(preTarget, preTesk)
          }
        })
      } else {
        if (preTesk.includes(_pres)) {
          this.emitPreChange(item, item[this.selfProps.pre])
          this.$set(item, this.selfProps.pre, legalPres)
        }
        const preTarget = this.selfDataList.find(t => t[this.selfProps.id] === item[this.selfProps.id])
        if (preTarget) {
          this.targetLinkLoopback(preTarget, preTesk)
        }
      }
    },
    /**
     * 处理前置任务链链中产生了回环【A->B,B->C,C->D,D->B】即前置链中形成了相互前置的节点，剔除其错误前置数据
     * item: Object 当前节点数据
     * flowPreTesk: Array 前置链上所有id
     */
    terseTargetLinkLoopback(item, flowPreTesk = []) {
      flowPreTesk.push(item.form[this.selfProps.id])
      if (this.preMultiple) {
        const legalPre = [] // 收集合法数据
        let nextForm = [] // 收集所有前置的前置
        for (const i of item.to) {
          const toId = i[this.selfProps.id]
          if (flowPreTesk.includes(toId)) continue
          legalPre.push(toId)
          flowPreTesk.push(toId)
          const storeNextForm = this.selfDependentStore.filter(t => t.form[this.selfProps.id] === toId)
          nextForm = nextForm.concat(storeNextForm)
        }
        // 剔除不合法前置
        if (legalPre.length !== item.to.length) {
          this.emitPreChange(item.form, item.form[this.selfProps.pre])
          this.$set(item.form, this.selfProps.pre, legalPre)
        }
        // 向前置的前置递归
        nextForm.forEach(t => {
          this.terseTargetLinkLoopback(t, flowPreTesk)
        })
      } else {
        const toId = item.to[this.selfProps.id]
        if (flowPreTesk.includes(toId)) {
          this.emitPreChange(item.form, item.form[this.selfProps.pre])
          this.$set(item.form, this.selfProps.pre, null)
          return
        }
        const nextForm = this.selfDependentStore.find(t => t.form[this.selfProps.id] === toId)
        if (!nextForm) return
        this.terseTargetLinkLoopback(nextForm, flowPreTesk)
      }
    },
    // 简洁处理数据
    terseHandleData(data, parent = null, level = 0) {
      level++
      data.forEach(i => {
        this.$set(i, '_parent', parent) // 添加父级字段
        this.$set(i, '_level', level) // 添加层级字段
        const timeDiff = this.timeDiffTime(i[this.selfProps.startDate], i[this.selfProps.endDate])
        i._cycle = timeDiff + 1
        if (!i._oldStartDate) {
          // 添加开始时间字段
          this.$set(i, '_oldStartDate', i[this.selfProps.startDate])
        }
        if (!i._oldEndDate) {
          // 添加结束字段时间
          this.$set(i, '_oldEndDate', i[this.selfProps.endDate])
        }
        // 添加自增id字段及树链组成的parents字段
        this.recordIdentityIdAndParents(i)
        if (Array.isArray(i[this.selfProps.children])) {
          this.$set(i, '_isLeaf', false) // 添加是否叶子节点字段
          const allChildren = flattenDeep(i[this.selfProps.children], this.selfProps.children)
          this.$set(i, 'allChildren', allChildren) // 添加全部子节点字段
          this.terseHandleData(i[this.selfProps.children], i, level)
        } else {
          this.$set(i, '_isLeaf', true) // 添加是否叶子节点字段
        }
        // 处理前置任务
        // this.handlePreTask(i);
      })
    },
    // 生成前置依赖库, 校验前置合法性并剔除不合法数据
    handleDependentStore() {
      this.selfDependentStore = []
      // 多选前置模式
      if (this.preMultiple) {
        for (const i of this.selfDataList) {
          const _pres = i[this.selfProps.pre]
          if (!_pres) continue
          // 不是数组退出
          if (!Array.isArray(_pres)) {
            this.emitPreChange(i, i[this.selfProps.pre])
            this.$set(i, this.selfProps.pre, [])
            continue
          }
          // 数组为空退出
          if (_pres.length === 0) continue
          // 查询不到数据的不收集，是父、祖、子、孙节点的不收集
          const preExistNode = [],
            preExistId = []
          for (const t of _pres) {
            const targetNode = this.targetInAllData(t)
            if (!targetNode) continue // 查询不到数据的不收集
            const inPerChi = this.targetInParentsOrChildren(i, targetNode)
            if (inPerChi) continue // 是父、祖、子、孙节点的不收集
            preExistNode.push(targetNode)
            preExistId.push(targetNode[this.selfProps.id])
          }
          if (preExistNode.length !== _pres.length) {
            this.emitPreChange(i, i[this.selfProps.pre])
            this.$set(i, this.selfProps.pre, preExistId)
          }
          this.selfDependentStore.push({
            form: i,
            to: preExistNode
          })
        }
      } else {
        // 单选前置模式
        for (const i of this.selfDataList) {
          if (!i[this.selfProps.pre]) continue
          const preTarget = this.targetInAllData(i[this.selfProps.pre])
          // 处理前置任务找不到的情况
          if (!preTarget) {
            this.emitPreChange(i, i[this.selfProps.pre])
            this.$set(i, this.selfProps.pre, null)
            continue
          }
          // 处理前置任务是父祖子孙节点的情况
          const inPerChi = this.targetInParentsOrChildren(i, preTarget)
          if (inPerChi) {
            this.emitPreChange(i, i[this.selfProps.pre])
            this.$set(i, this.selfProps.pre, null)
            continue
          }
          this.selfDependentStore.push({
            form: i,
            to: preTarget
          })
        }
      }
      // 处理合格前置任务
      this.selfDependentStore.forEach(i => {
        this.terseTargetLinkLoopback(i)
      })
      // 处理前置依赖
      this.selfDataList.forEach(i => {
        this.handlePreTask(i)
      })
      // 暂时强制更新视图
      if (this.update) {
        this.update = false
        this.selfData.sort()
      }
    },
    // 父子关联
    tableSelect(val, row) {
      if (!this.parentChild) return
      // 选中
      if (val.some(item => item[this.selfProps.id] === row[this.selfProps.id])) {
        // 父元素选中全选所有子孙元素
        // for (let item of val) {
        row.allChildren.forEach(i => {
          this.$refs['wl-gantt'].toggleRowSelection(i, true)
        })
        // }
        // 子元素全选向上查找所有满足条件的祖先元素
        regDeepParents(row, '_parent', parents => {
          const reg =
            parents &&
            parents[this.selfProps.children].every(item => {
              return val.some(it => it[this.selfProps.id] === item[this.selfProps.id])
            })
          if (reg) this.$refs['wl-gantt'].toggleRowSelection(parents, true)
        })
      } else {
        // 非选中将所有子孙元素及支线上祖先元素清除
        const cancelData = [...row.allChildren, ...flattenDeepParents([row], '_parent')]
        for (const item of cancelData) {
          this.$refs['wl-gantt'].toggleRowSelection(item, false)
        }
      }
    },
    // el-table事件----------------------------------------------以下为原el-table事件输出------------------------------------------------
    handleSelectionChange(val) {
      this.$emit('selection-change', val)
      this.multipleSelection = val
    }, // 当选择项发生变化时会触发该事件
    handleCurrentChange(val, oldVal) {
      this.$emit('current-change', val, oldVal)
      this.currentRow = val
    }, // 当表格的当前行发生变化的时候会触发该事件
    handleSelectAll(val) {
      const isCheck = val.length > 0
      this.selfDataList.forEach(i => {
        this.$refs['wl-gantt'].toggleRowSelection(i, isCheck)
      })
      this.$emit('select-all', val)
    }, // 当用户手动勾选全选 Checkbox 时触发的事件
    handleSelect(selection, row) {
      this.tableSelect(selection, row)
      const isAdd = selection.some(i => i[this.rowKey] === row[this.rowKey])
      this.selectionList = selection
      this.$emit('select', selection, row, isAdd)
    }, // 当用户手动勾选全选 Checkbox 时触发的事件
    handleMouseEnter(row, column, cell, event) {
      if (this.useCard) {
        this.infoCard.show = true
        this.infoCard.x = event.screenX
        this.infoCard.y = event.screenY
        this.infoCard.row = { ...row }
        this.infoCard.column = column
        this.infoCard.cell = cell
        this.infoCard.event = event
        this.infoCard.timer && clearTimeout(this.infoCard.timer)
      }
      this.$emit('cell-mouse-enter', row, column, cell, event)
    }, // 当单元格 hover 进入时会触发该事件
    handleMouseLeave(row, column, cell, event) {
      if (this.useCard) {
        this.infoCard.timer = setTimeout(() => {
          this.infoCard.show = false
          clearTimeout(this.infoCard.timer)
          this.infoCard.timer = null
        }, 500)
      }
      this.$emit('cell-mouse-leave', row, column, cell, event)
    }, // 当单元格 hover 退出时会触发该事件
    handleCellClick(row, column, cell, event) {
      this.$emit('cell-click', row, column, cell, event)
    }, // 当某个单元格被点击时会触发该事件
    handleCellDbClick(row, column, cell, event) {
      this.$emit('cell-dblclick', row, column, cell, event)
    }, // 当某个单元格被双击击时会触发该事件
    handleRowClick(row, column, event) {
      /* if (this.useCheckColumn && this.quickCheck) {
        let isCheck = this.selectionList.some(
          i => i[this.rowKey] == row[this.rowKey]
        );
        this.$refs["wl-gantt"].toggleRowSelection(row, !isCheck);
        this.$nextTick(() => {
          this.handleSelect(this.selectionList, row, !isCheck);
        });
      } */
      this.$emit('row-click', row, column, event)
    },
    // 右键菜单事件
    handleRowDbClick(row, column, event) {
      this.$emit('row-dblclick', row, column, event)
    }, // 当某一行被双击时会触发该事件
    handleHeaderClick(column, event) {
      this.$emit('header-click', column, event)
    }, // 当某一列的表头被点击时会触发该事件
    handleHeaderContextMenu(column, event) {
      this.$emit('header-contextmenu', column, event)
    }, // 当某一列的表头被鼠标右键点击时触发该事件
    handleSortChange(e) {
      this.$emit('sort-change', e)
    }, // 当表格的排序条件发生变化的时候会触发该事件
    handleFilterChange(filters) {
      this.$emit('filter-change', filters)
    }, // 当表格的筛选条件发生变化的时候会触发该事件
    handleExpandChange(row, expanded) {
      this.$emit('expand-change', row, expanded)
    }, // 当表格的筛选条件发生变化的时候会触发该事件
    // ------------------------------------------- 以下为提供方法 ------------------------------------
    /**
     * 手动调用树表懒加载
     * row 要展开的行信息
     */
    loadTree(row) {
      this.$refs['tableRef'].store.loadOrToggle(row)
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要添加的节点list
     */
    loadTreeAdd(id, list) {
      const _children = this.$refs['wl-gantt'].store.states.lazyTreeNodeMap[id] || []
      this.$set(this.$refs['wl-gantt'].store.states.lazyTreeNodeMap, id, list.concat(_children))
    },
    /**
     * 更新树表懒加载后的子节点
     * 要更新的节点id
     * 要删掉的字节的rowKey
     */
    loadTreeRemove(id, key) {
      const _children = this.$refs['wl-gantt'].store.states.lazyTreeNodeMap[id]
      const newChildren = _children.filter(i => i[this.rowKey] !== key)
      this.$set(this.$refs['wl-gantt'].store.states.lazyTreeNodeMap, id, newChildren)
    }
  },
  created() {
    this.selfDateType = this.dateType
    this.selfStartDate = this.startDate
    this.selfEndDate = this.endDate
  },
  beforeDestroy() {
    if (this.infoCard.timer) {
      clearTimeout(this.infoCard.timer)
      this.infoCard.timer = null
    }
  },
  watch: {
    startDate: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.selfStartDate = this.startDate
        }
      }
    },
    endDate: {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          this.selfEndDate = this.endDate
        }
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.wl-gantt {
  height: 100%;
}
.wl-gantt .wl-gantt-header > th {
  text-align: center;
}

.wl-gantt .h-full {
  height: 100%;
}

.wl-gantt .wl-gantt-item {
  position: relative;
  transition: all 0.3s;
}

.wl-gantt .wl-gantt-item > .cell {
  padding: 0;
}

.wl-gantt .u-full.el-input {
  width: 100%;
}

.wl-gantt .wl-item-on {
  position: absolute;
  top: 50%;
  left: 0;
  right: -1px;
  margin-top: -8px;
  height: 16px;
  background: #409eff;
  transition: all 0.4s;
}

.wl-gantt .wl-item-start {
  left: 50%;
}

.wl-gantt .wl-item-start:after {
  position: absolute;
  top: 16px;
  left: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: #409eff transparent transparent;
  border-width: 6px 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-item-end {
  right: 50%;
}

.wl-gantt .wl-item-end:after {
  position: absolute;
  top: 16px;
  right: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: transparent #409eff;
  border-width: 0 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-item-full {
  left: 0;
  right: 0;
}

.wl-gantt .wl-item-full:before {
  position: absolute;
  top: 16px;
  left: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: #409eff transparent transparent;
  border-width: 6px 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-item-full:after {
  position: absolute;
  top: 16px;
  right: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: transparent #409eff;
  border-width: 0 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-real-on {
  position: absolute;
  top: 70%;
  left: 0;
  right: -1px;
  margin-top: -8px;
  height: 16px;
  background: #faa792;
  transition: all 0.4s;
}

.wl-gantt .wl-real-start {
  left: 50%;
}

.wl-gantt .wl-real-start:after {
  position: absolute;
  top: 16px;
  left: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: #faa792 transparent transparent;
  border-width: 6px 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-real-end {
  right: 50%;
}

.wl-gantt .wl-real-end:after {
  position: absolute;
  top: 16px;
  right: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: transparent #faa792;
  border-width: 0 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-real-full {
  left: 0;
  right: 0;
}

.wl-gantt .wl-real-full:before {
  position: absolute;
  top: 16px;
  left: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: #faa792 transparent transparent;
  border-width: 6px 6px 6px 0;
  border-style: solid;
}

.wl-gantt .wl-real-full:after {
  position: absolute;
  top: 16px;
  right: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: transparent #faa792;
  border-width: 0 6px 6px 0;
  border-style: solid;
}

.wl-gantt .name-col {
  position: relative;
}

.wl-gantt .name-col:hover .name-col-edit {
  display: inline-block;
}

.wl-gantt .name-col .name-col-edit {
  display: none;
  position: absolute;
  right: 0;
}

.wl-gantt .name-col .name-col-icon {
  padding: 6px 3px;
  cursor: pointer;
  font-size: 16px;
}

.wl-gantt .name-col .task-remove {
  color: #f56c6c;
}

.wl-gantt .name-col .task-add {
  color: #409eff;
}
.wl-gantt ::v-deep {
  th > .cell {
    padding: 0 2px;
    text-align: center;
  }
}

.year-and-month .wl-item-start {
  left: 5%;
}

.year-and-month .wl-item-start:after {
  position: absolute;
  top: 16px;
  left: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: #409eff transparent transparent;
  border-width: 6px 6px 6px 0;
  border-style: solid;
}

.year-and-month .wl-item-end {
  right: 5%;
}

.year-and-month .wl-item-end:after {
  position: absolute;
  top: 16px;
  right: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: transparent #409eff;
  border-width: 0 6px 6px 0;
  border-style: solid;
}

.year-and-month .wl-item-full {
  left: 5%;
  right: 5%;
}

.year-and-month .wl-item-full:before {
  position: absolute;
  top: 16px;
  left: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: #409eff transparent transparent;
  border-width: 6px 6px 6px 0;
  border-style: solid;
}

.year-and-month .wl-item-full:after {
  position: absolute;
  top: 16px;
  right: 0;
  z-index: 1;
  content: '';
  width: 0;
  height: 0;
  border-color: transparent #409eff;
  border-width: 0 6px 6px 0;
  border-style: solid;
}

.wl-info-card {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  padding: 10px;
  width: 360px;
  min-height: 120px;
  transition: all 0.4s ease-out;
  transform: translate(-100%, -120%);
  border-radius: 4px;
  box-shadow: inset 0px 0px 11px 0px #e6e6e6;
  background: #fff;
}
// 修复年下面第一个月份样式问题
::v-deep .wl-gantt-header th:first-child .cell {
  padding-left: 0px;
}
</style>
