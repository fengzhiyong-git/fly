<template>
  <!-- 折叠自定义表单内容 -->
  <div class="com-list-body">
    <el-table
      :data="tableData"
      row-key="deptId"
      :expand-row-keys="expands"
      :header-cell-style="{ display: 'none' }"
      :tree-props="{ children: 'children', hasChildren: 'children.length>0' }"
    >
      <el-table-column label="公司名称" prop="deptName">
        <template slot-scope="scope">
          <div v-if="!scope.row.projects" class="column-wrap">
            <div class="text">{{ scope.row.deptName }}</div>
            <div class="small-text">
              共计 <span class="count">{{ scope.row.projectNumber }}</span> 个项目（新建项目
              <span class="count">{{ scope.row.xjProjectNumber }}</span> 个，续建项目
              <span class="count">{{ scope.row.xujProjectNumber }}</span> 个 ）<span class="line">|</span>总投资：
              <span class="count">{{ scope.row.totalMoney }}</span> 万元<span class="line">|</span
              >{{ scope.row.totalMoney }}年计划投资：<span class="count">{{ scope.row.planMoney }}</span>
              万元
            </div>
          </div>
          <div v-else class="project-wrap">
            <div class="project-item" v-for="(item, index) in scope.row.projects" :key="index">
              <div class="top-wrap">
                <el-checkbox v-model="item.isChecked"></el-checkbox>
                <div class="title-text">
                  <span class="index">{{ index + 1 }}</span> {{ item.prjName }}
                </div>

                <el-button type="text">
                  审核
                </el-button>
              </div>
              <div class="content">
                <el-row>
                  <el-col :span="8">
                    <span class="text">项目类型：</span>
                    <span class="value">{{ item.prjTypeName }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">项目区域：</span>
                    <span class="value">{{ item.prjAreaName }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">建设性质：</span>
                    <span class="value">{{ item.planConstructionNatureName }}</span>
                  </el-col>

                  <el-col :span="8">
                    <span class="text">建设内容和规模：</span>
                    <span class="value">{{ item.planConstructionContent }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">总投资（万）：</span>
                    <span class="value">{{ item.planTotalMoney }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">本年度计划投资（万）：</span>
                    <span class="value">{{ item.planPlanMoney }}</span>
                  </el-col>

                  <el-col :span="8">
                    <span class="text">办理状态：</span>
                    <span class="value">
                      {{
                        item.planHandleStateId === 'blzt_blz'
                          ? '办理中'
                          : item.planHandleStateId === 'blzt_ybj'
                          ? '已办结'
                          : '--'
                      }}
                    </span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">计划拆迁投资金额（万）：</span>
                    <span class="value">{{ item.planDemolitionMoney }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">计划工程投资金额（万）：</span>
                    <span class="value">{{ item.planProjectMoney }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">当前状态：</span>
                    <span class="value">{{ item.curStateName }}</span>
                  </el-col>
                  <el-col :span="8">
                    <span class="text">审批意见：</span>
                    <span class="value">{{ item.lastOpinion }}</span>
                  </el-col>

                  <el-col :span="8">
                    <span class="text">审批历史：</span>
                    <span class="value green" @click="openRecord(item)"
                      >查看
                      <!-- <el-button type="text" @click="openRecord(item)">查看</el-button> -->
                    </span>
                  </el-col>

                  <el-col :span="24">
                    <span class="text">申报附件：</span>
                    <!-- <div v-if="item.fileList.length" class="file-wrap">
                      <div class="value" v-for="(tt, ind) in item.fileList" :key="ind" @click="flieView(tt)">
                        <img src="@/assets/filetype/icon_ppt.png" alt="文件类型图标" />
                        <el-tooltip class="item" effect="dark" content="点击预览" placement="top">
                          <span class="file-text">
                            {{ tt.materialCaption }}
                          </span>
                        </el-tooltip>
                      </div>
                    </div> -->
                    <div class="value" v-if="!item.fileList.length">--</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

import axios from 'axios'
@Component({
  name: 'TableType'
})
export default class TableType extends Vue {
  private tableData = [
    {
      address: '地址1',
      areaCode: '430102',
      areaName: '芙蓉区',
      children: [
        {
          address: '地址2',
          areaCode: '430102',
          areaName: '芙蓉区',
          children: [
            {
              address: '地址3',
              areaCode: '430104',
              areaName: '岳麓区',
              children: [
                {
                  address: '地址3',
                  areaCode: '430104',
                  areaName: '岳麓区',
                  children: null,
                  creditCode: '7845122',
                  deptId: '211526463319179264',
                  deptName: '项目公司',
                  leader: 'ccc',
                  parentId: '35',
                  phone: '18654524544',
                  planMoney: 11,
                  projectNumber: 1,
                  projects: [
                    {
                      actionUserId: '35',
                      actionUserName: 'test',
                      capitalSourceId: 'zjly_gy',
                      capitalSourceName: '国有控股项目',
                      constructionContent: 'dddddd',
                      constructionNatureId: 'jsxz_xj',
                      constructionNatureName: '新建',
                      constructionUnit: 'dd',
                      constructionYearEnd: 2022,
                      constructionYearStart: 2021,
                      contactMan: '',
                      contactPhone: '',
                      contributeCount: null,
                      contributeFrequency: '',
                      contributeType: '',
                      contributeWarningTime: '',
                      createTime: '2021-12-07 16:34:17',
                      curStateId: 'xmsh_shtg',
                      curStateName: '审核通过',
                      editTime: '2021-12-07 16:34:32',
                      editUserId: '35',
                      editUserName: 'test',
                      fileList: [],
                      handleStateId: 'blzt_blz',
                      id: '207063973533028352',
                      isChecked: null,
                      lastOpinion: '',
                      latitude: '',
                      longitude: '',
                      placeCode: '430102',
                      placeName: '芙蓉区',
                      planCapitalSourceId: null,
                      planCapitalSourceName: null,
                      planConstructionContent: '111111',
                      planConstructionNatureId: 'jsxz_gj',
                      planConstructionNatureName: '',
                      planContactMan: null,
                      planContactPhone: null,
                      planDemolitionMoney: 2,
                      planHandleStateId: 'blzt_blz',
                      planLandScale: null,
                      planMoney: 1000,
                      planPlanMoney: 11,
                      planProjectMoney: 23,
                      planRemark: null,
                      planStartMonth: null,
                      planStateId: 'xmjhzt_sb',
                      planStateName: '计划申报中',
                      planTotalMoney: 1,
                      prjAreaId: 'pq_gt',
                      prjAreaName: '高铁会展新城会展片区',
                      prjCompanyId: '36',
                      prjCompanyName: '项目公司',
                      prjCompletedTime: null,
                      prjId: '201012391947534336',
                      prjIndexNum: 27,
                      prjIntroduction: '',
                      prjLcation: '',
                      prjName: 'ddddd',
                      prjNatureId: 'xmxz_yb',
                      prjNatureName: '一般项目',
                      prjNumGather: '20211207-LRSM-027',
                      prjPropertyId: 'xmsx_jtn',
                      prjPropertyName: '集团内项目',
                      prjStartTime: null,
                      prjStateId: 'xmzt_gh',
                      prjStateName: '规划',
                      prjStorehouse: 'xmk_ghk',
                      prjTypeId: 'xmlx_aj',
                      prjTypeName: '保护性安居工程',
                      prjYear: 2021,
                      remark: '',
                      responsibilityUnit: 'dd',
                      tag: '',
                      thoseResponsible: 'ddd',
                      totalMoney: 1000
                    }
                  ],
                  totalMoney: 1,
                  unitLevel: 3,
                  xjProjectNumber: 0,
                  xujProjectNumber: 0
                }
              ],
              creditCode: '7845122',
              deptId: '36',
              deptName: '项目公司',
              leader: 'ccc',
              parentId: '35',
              phone: '18654524544',
              planMoney: 11,
              projectNumber: 1,
              projects: null,
              totalMoney: 1,
              unitLevel: 3,
              xjProjectNumber: 0,
              xujProjectNumber: 0
            }
          ],
          creditCode: '45687',
          deptId: '35',
          deptName: '城投集团',
          leader: 'bbb',
          parentId: '34',
          phone: '1854654655',
          planMoney: 11,
          projectNumber: 1,
          projects: null,
          totalMoney: 1,
          unitLevel: 2,
          xjProjectNumber: 0,
          xujProjectNumber: 0
        }
      ],
      creditCode: '123456',
      deptId: '34',
      deptName: '长沙城市发展集团有限公司总部',
      leader: 'aaa',
      parentId: '-1',
      phone: '18456545654',
      planMoney: 11,
      projectNumber: 1,
      projects: null,
      totalMoney: 1,
      unitLevel: 1,
      xjProjectNumber: 0,
      xujProjectNumber: 0
    }
  ]

  private expands: any = [] // 表单默认展开行

  // 勾选触发方法
  getSelectData(item: any) {
    if (item.isChecked) {
      // if (!this.selectData.includes(item.id)) { }
      // this.selectData.push(item.prjId)
    } else {
      // this.selectData = this.selectData.filter((val: string) => {
      //   return val !== item.prjId
      // })
    }
    // debugger
  }
  flieView() {}
  getData() {
    // axios.get(`/static/tableData.json`).then((res: any) => {
    //   this.tableData.push(res.data.data)
    //   //
    // })
  }

  mounted() {
    this.getData()
    this.expands.push(this.tableData[0].deptId)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table th {
  background-color: #f5f7f9 !important;
  height: 0px;
}
.com-list-body ::v-deep {
  height: 100%;
  .el-table {
    width: 100%;
    // height: calc(100% - 60px);
    height: 100%;
    flex: 0;
    overflow-y: auto;
    .el-table__body-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid #ebeef5 !important;
  }
  .el-table th {
    background-color: #f5f7f9 !important;
    height: 0px;
  }
  .el-table__row {
    .cell {
      display: flex;
    }
  }

  // 折叠行样式
  .column-wrap {
    display: flex;
    .small-text {
      font-size: 12px !important;
      color: #8c8c8c;
      margin-left: 16px;
      .count {
        color: #000;
        font-weight: 500;
      }
      .line {
        color: #f0f0f0;
        margin: 0 8px;
      }
    }
  }
  // 折叠项目样式
  .project-wrap {
    // display: flex;
    // background: #fafafa;
    width: 100%;
    .project-item {
      width: 100%;
      .top-wrap {
        display: flex;
        align-items: center;
        padding: 12px;
        // border-bottom: 1px solid #f0f0f0;
        position: relative;
        .el-button {
          position: absolute;
          right: 16px;
        }
        .title-text {
          color: #262626;
          display: flex;
          align-items: center;
          .index {
            display: inline-block;
            margin: 0 8px;
            width: 16px;
            height: 16px;
            border: 1px solid #004ea8;
            color: #004ea8;
            border-radius: 50%;
            text-align: center;
            line-height: 16px;
          }
        }
      }
      .content {
        width: 100%;
        padding-left: 34px;
        .el-col {
          margin-bottom: 8px;
          display: flex;
          // align-items: center;
        }
        .file-wrap {
          display: flex;
          flex-direction: column;
          .value {
            margin-bottom: 8px;
          }
        }
        .green {
          color: #1491ed !important;
          cursor: pointer;
        }
        .text {
          color: #595959;
        }
        .value {
          color: #262626;
          display: flex;
          // align-items: center;

          img {
            width: 24px;
            height: 24px;
            margin-right: 4px;
          }
          .file-text {
            color: #1491ed;
          }
        }
      }
    }
  }
}
</style>
