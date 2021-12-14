<template>
  <!-- 折叠自定义表单内容 -->
  <div class="com-list-body">
    <el-table
      :data="tableData"
      row-key="deptId"
      :header-cell-style="{ display: 'none' }"
      :tree-props="{ children: 'children', hasChildren: 'children.length>0' }"
    >
      <el-table-column label="公司名称" prop="deptName">
        <template slot-scope="scope">
          <!-- v-if="!scope.row.projects.length" !scope.row.zxm-->
          <div v-if="!scope.row.projects" class="column-wrap">
            <div class="text">{{ scope.row.deptName }}</div>
            <div class="small-text">
              共计
              <span class="count">{{ scope.row.projectNumber }}</span>
              个项目（新建项目
              <span class="count">{{ scope.row.xjProjectNumber }}</span>
              个，续建项目
              <span class="count">{{ scope.row.xujProjectNumber }}</span> 个
              ）<span class="line">|</span>总投资：
              <span class="count">{{ scope.row.totalMoney }}</span> 万元<span
                class="line"
                >|</span
              >{{ $route.query.planYear }}年计划投资：<span class="count">{{
                scope.row.planMoney
              }}</span>
              万元
            </div>
          </div>
          <div v-else class="project-wrap">
            <div
              class="project-item"
              v-for="(item, index) in scope.row.projects"
              :key="index"
            >
              <div class="top-wrap">
                <el-checkbox
                  v-model="item.isChecked"
                  @change="getSelectData(item)"
                ></el-checkbox>
                <div class="title-text">
                  <span class="index">{{ index + 1 }}</span> {{ item.prjName }}
                </div>

                <el-button type="text" @click="btnClick('审核', item)">
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
                    <span class="value">{{
                      item.planConstructionNatureName
                    }}</span>
                  </el-col>

                  <el-col :span="8">
                    <span class="text">建设内容和规模：</span>
                    <span class="value">{{
                      item.planConstructionContent
                    }}</span>
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
                        item.planHandleStateId === "blzt_blz"
                          ? "办理中"
                          : item.planHandleStateId === "blzt_ybj"
                          ? "已办结"
                          : "--"
                      }}
                    </span>
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
                    <span class="value">
                      <el-button type="text" @click="openRecord(item)"
                        >查看</el-button
                      >
                    </span>
                  </el-col>

                  <el-col :span="24">
                    <span class="text">申报附件：</span>
                    <span class="value">
                      --
                      <!-- <img src="@/assets/filetype/icon_ppt.png" alt="文件类型图标" />
                                <span class="file-text">附件1</span> -->
                    </span>
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
import { Vue, Component, Watch } from "vue-property-decorator";

import axios from "axios";
@Component({
  name: "TableType",
})
export default class TableType extends Vue {
  private tableData = [
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

  getData() {
    axios.get(`/static/tableData.json`).then((res: any) => {
      this.tableData.push(res.data.data);
      debugger;
    });
  }

  mounted() {
    // debugger;
    this.getData();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table th {
  background-color: #f5f7f9 !important;
  height: 0px;
}
.com-list-body {
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
          align-items: center;
        }
        .text {
          color: #595959;
        }
        .value {
          color: #262626;
          display: flex;
          align-items: center;
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
