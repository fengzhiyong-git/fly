<template>
  <div class="toDoContent">
    <div class="tableBox">
      <el-table
        :data="items"
        ref="multipleTable"
        height="100%"
        style="position:absolute"
        stripe
        highlight-current-row
        show-overflow-tooltip
        @row-click="rowFun"
        @sort-change="sortChange"
        @selection-change="selectChange"
        @select="select"
        :row-key="rowKey"
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column type="selection" :reserve-selection="true" width="55" v-if="showSelect"> </el-table-column>
        <!-- 设置列 -->
        <el-table-column type="index" width="26" :index="index => (page - 1) * tempPageSize + (index + 1)">
          <template slot="header">
            <el-button v-if="settingIcon" type="text" title="自定义列" @click="defineColumn">
              <svg-icon icon-class="ic-settings-2-line" />
            </el-button>
          </template>
        </el-table-column>
        <el-table-column type="index" v-if="showIndex" label="序号" width="80" align="center" :fixed="indexFixed">
          <template slot-scope="scope">
            <span>{{ (page - 1) * pageSize + scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          v-for="(item, index) in sortHeaders"
          :key="index"
          :label="item.text"
          :prop="item.value"
          :width="item.width !== '-1' ? item.width : ''"
          :min-width="item.width === '-1' ? maxDataLength : ''"
          :fit="true"
          show-overflow-tooltip
          :sortable="item.sortable ? item.sortable : false"
          :align="item.align ? item.align : 'left'"
          :fixed="item.fixed ? item.fixed : false"
        >
          <el-table-column
            v-for="child in item.childs"
            :key="child.index"
            :width="child.width"
            :label="child.text"
            :prop="child.value"
            show-overflow-tooltip
            align="left"
          >
            <el-table-column
              v-for="kid in child.childs"
              :key="kid.index"
              :width="kid.width"
              :label="kid.text"
              :prop="kid.value"
              align="left"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table-column>
          <template slot="header" slot-scope="scope">
            <div class="custom-head">
              <!-- 标题 -->
              <el-tooltip class="item" :content="scope.column.label" placement="top">
                <span class="head-title">{{ scope.column.label }}</span>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="scope">
            <!-- 竣工管理-验收管理 -->
            <span v-if="scope.column.property === 'ysgl'">
              <!-- 编辑 查看 验收 审计 移交 总结 评价-->
              <span style="display:flex;" v-if="scope.row.button && scope.row.button.length">
                <el-button
                  type="text"
                  v-for="(item, index) in scope.row.button"
                  :key="index"
                  @click="btnClick(item, scope.row)"
                >
                  {{ item }}
                </el-button>
              </span>
            </span>
            <!-- 规划库 标签信息 -->
            <span v-else-if="scope.column.property === 'tag'">
              <span class="tag-item" v-for="(item, index) in scope.row.tagArr" :key="index" :class="getTagClass(item)">
                {{ item }}
              </span>
            </span>
            <!-- 实施库 竣工库 项目总库 -->
            <span v-else-if="scope.column.property === 'prjName' && isLinkToPrjBox">
              <el-button @click="toProjectBox(scope.row)" type="text">{{ scope.row.prjName }}</el-button>
            </span>
            <!-- 立项管理 项目名称 -->
            <span v-else-if="scope.column.property === 'prj_name'">
              <el-button @click="toLXDetail(scope.row)" type="text">{{ scope.row.prj_name }}</el-button>
            </span>
            <!-- 实施库 整体进度 -->
            <span v-else-if="isShowProgress(scope.column.property)">
              <el-progress
                :text-inside="true"
                :stroke-width="14"
                :percentage="scope.row[scope.column.property] ? scope.row[scope.column.property] : 0"
                :color="customColor"
                class="max-full"
              ></el-progress>
            </span>
            <!-- 问题管理 -->
            <span v-else-if="scope.column.property === 'problemManage'">
              <el-button type="text" @click="btnClick('查看', scope.row)">查看</el-button>
              <template v-if="scope.row.commitStateName === '未提交' && power">
                <el-button type="text" @click="btnClick('提交', scope.row)">提交</el-button>
                <el-button type="text" @click="btnClick('删除', scope.row)">删除</el-button>
              </template>
              <el-button
                v-if="scope.row.problemStateName === '未解决' && roles.includes('cfjt_zjtld')"
                type="text"
                @click="btnClick('反馈', scope.row)"
              >
                反馈
              </el-button>
            </span>
            <span v-else>{{ scope.row[scope.column.property] }}</span>
            <!-- 搜索高亮 -->
            <!-- <span v-else v-html="highLight(scope.row[scope.column.property])"> </span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="paginationBox" v-if="needPagination">
      <el-pagination
        :current-page.sync="page"
        background
        :page-size="pageSize"
        :page-sizes="[15, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        style="float:right"
        :total="totalItem"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import EventBus from '@/utils/EventBus'
// import TableSort from '@/components/TableSort/index.vue'
// import { UserModule } from '@/store/modules/user'
@Component({
  name: 'TableBox',
  components: {
    // TableSort
  }
})
export default class TableBox extends Vue {
  @Prop() private headers!: any[]
  @Prop() private items!: any[]
  @Prop({ default: 'deptId' }) private rowKey!: any
  @Prop() private totalItem!: number
  @Prop() private pageSize!: number
  @Prop({ default: false }) private showSelect!: boolean // 显示勾选列
  @Prop({ default: false }) private indexFixed!: boolean // 序号默认不 fixed
  @Prop({ default: true }) private showIndex!: boolean // 显示序号
  @Prop({ default: false }) private settingIcon!: boolean // 显示序号
  @Prop({ default: true }) private needPagination!: boolean // 显示分页

  private page = 1
  private maxDataLength = 100 // 记录最大数据长度
  private tempPageSize = this.pageSize
  private searchWord: any = ''

  private customColor = [{ color: '#23f00c' }]

  // 获取用户角色
  // get roles() {
  //   return UserModule.roles
  // }
  private power = false
  private isLinkToPrjBox = false

  // 将头部安装sortIndex排序，序号小的的排在前面
  get sortHeaders() {
    return this.headers.slice().sort((a: any, b: any) => {
      return a.sortIndex - b.sortIndex
    })
  }

  isShowProgress(tagType: string) {
    const progressTypeArray: string[] = ['ztjd', 'tzjd', 'progressPercentage']
    if (progressTypeArray.includes(tagType)) return true
  }

  // 标签信息 类名
  getTagClass(val: string) {
    switch (val) {
      case '在建实施':
        return 'zjss'
      case '前期推进':
        return 'qqtj'
      case '品质提升':
        return 'pzts'
      default:
    }
  }

  // 状态文案展示
  statusText(val: number) {
    switch (val) {
      case 0:
        return '审核中'
      case 1:
        return '已通过'
      case 2:
        return '审核未通过'
      case 4:
        return '已归还'
      default:
    }
  }

  // 需要排序的列
  isSort(str: string) {
    let flag = false
    switch (str) {
      case 'applyTime':
        flag = true
        break
      case 'archiveTypeName':
        flag = true
        break

      default:
        break
    }
    return flag
  }

  // 高亮当前行
  highLight(val: any) {
    if (val) {
      return Vue.prototype.$toolsFunc.highLight(val, this.searchWord)
    }
  }

  //自定义排序
  sortChange(column: any) {
    let asc = null
    switch (column.order) {
      case 'ascending':
        asc = true
        break
      case 'descending':
        asc = false
        break
      default:
        asc = null
    }
    this.$emit('sortChange', asc, column.property)
  }

  // 获取勾选数据
  selectChange(data: any) {
    this.$emit('selectAll', data)
  }

  // 当用户手动勾选数据行的 Checkbox 时触发的事件
  select(data: any) {
    this.$emit('select', data)
  }

  // 点击表格行带参数跳转
  rowFun(row: any) {
    this.$emit('rowFun', row)
  }
  // 跳转到立项详情
  toLXDetail(row: any) {
    this.$emit('toLXDetail', row)
  }
  // 跳转到项目盒
  toProjectBox(row: any) {
    this.$router.push({ path: '/projectManage/projectManage/projectBox', query: { prjId: row.prjId ? row.prjId : '' } })
  }

  // 修改选中状态
  toggleSelection(rows: any) {
    if (rows) {
      rows.forEach((row: any) => {
        ;(this.$refs.multipleTable as any).toggleRowSelection(row)
      })
    } else {
      ;(this.$refs.multipleTable as any).clearSelection()
    }
  }
  // 清除勾选状态
  clearSelection() {
    ;(this.$refs.multipleTable as any).clearSelection()
  }

  handleSizeChange(val: number) {
    this.tempPageSize = val
    this.$emit('handleSizeChange', { pageIndex: this.page, pageSize: val })
  }
  handleCurrentChange(val: number) {
    this.$emit('nextPage', { pageIndex: val, pageSize: this.tempPageSize })
  }
  // 操作按钮点击
  btnClick(type: string, row: any) {
    switch (type) {
      case '查看':
        this.$emit('btnOperate', { type: '查看', ...row })
        break
      case '编辑':
        this.$emit('btnOperate', { type: '编辑', ...row })
        break
      case '提交':
        this.$emit('btnOperate', { type: '提交', ...row })
        break
      case '反馈':
        this.$emit('btnOperate', { type: '反馈', ...row })
        break
      case '删除':
        this.$emit('btnOperate', { type: '删除', ...row })
        break
      case '验收':
        this.$emit('btnOperate', { type: '验收', ...row })
        break
      case '审计':
        this.$emit('btnOperate', { type: '审计', ...row })
        break
      case '移交':
        this.$emit('btnOperate', { type: '移交', ...row })
        break
      case '总结':
        this.$emit('btnOperate', { type: '总结', ...row })
        break
      case '评价':
        this.$emit('btnOperate', { type: '评价', ...row })
        break

      default:
        break
    }
  }
  // 自定义表头
  defineColumn() {}
  created() {
    EventBus.$on('updatePage', (target: number) => {
      // 更新导航列表数据
      this.page = target
    })
    EventBus.$on('updateWord', (target: any) => {
      this.searchWord = target
    })
  }
  //关键--解决表格数据修改导致表头闪动问题
  beforeUpdate() {
    this.$nextTick(() => {
      //在数据加载完，重新渲染表格
      ;(this.$refs['multipleTable'] as any).doLayout()
    })
  }
  beforeDestroy() {
    EventBus.$off('updatePage')
    EventBus.$off('updateWord')
  }
  mounted() {
    // 计算数据的最大长度
    let max = 0
    if (this.items instanceof Array) {
      this.items.forEach(item => {
        Object.entries(item).forEach(it => {
          if (typeof it[1] === 'string') {
            if (it[1].length > max && !it[1].includes('000Z')) {
              max = it[1].length
            }
          }
        })
      })
    }
    this.maxDataLength = max * 16

    // if (this.roles.includes('cfjt_zgsyg') || this.roles.includes('cfjt_zgsfzr')) {
    //   this.power = true
    // }

    if (
      this.$route.path === '/projectManage/projectLibrary/implementationLibrary' ||
      this.$route.path === '/projectManage/projectLibrary/asbuiltLibrary' ||
      this.$route.path === '/projectManage/projectLibrary/projectGeneralLibrary'
    ) {
      this.isLinkToPrjBox = true
    } else {
      this.isLinkToPrjBox = false
    }
  }
}
</script>
<style scoped lang="scss">
.toDoContent {
  height: 100%;
  display: flex;
  flex-direction: column;
  ::v-deep .el-table .cell {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .tableBox {
    flex-grow: 1;
    flex-shrink: 1;
    overflow: auto;
    position: relative;
    .tag-item {
      font-size: 12px !important;
      padding: 6px 8px;
      color: #8c8c8c;
      background: #f3f3f3;
      border-radius: 31px;
      margin-right: 8px;
    }
    .zjss {
      color: #8c8c8c;
      background: #f3f3f3;
    }
    .qqtj {
      color: #15a32b;
      background: #e8f7ea;
    }
    .pzts {
      color: #004ea8;
      background: #e5edf6;
    }
  }
  .type-lamp {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }
  .paginationBox {
    flex-shrink: 0;
    line-height: 40px;
    padding-right: 16px;
  }
  ::v-deep .el-progress-bar__innerText {
    color: #666;
    margin: 0 40px;
  }
  ::v-deep .el-pagination {
    padding-bottom: 0 !important;
  }
  .max-full ::v-deep .el-progress-bar__inner {
    max-width: 100% !important;
  }
}
// 自定义标题样式
.custom-head {
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
  align-items: center;
  .head-title {
    flex-shrink: 1;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-align: center;
    width: 100%;
  }
  .head-btn {
    flex-shrink: 0;
    text-align: center;
  }
}
</style>
