<template>
  <!-- select树 -->
  <div class="BaseTreeSelect">
    <treeselect
      v-model="value"
      placeholder="请选择"
      :options="treeData"
      :normalizer="normalizer"
      :default-expand-level="1"
      @select="select"
      :noOptionsText="'无匹配数据'"
      noResultsText="无匹配数据"
    >
      <!-- <label
        slot="option-label"
        slot-scope="{
          node,
          shouldShowCount,
          count,
          labelClassName,
          countClassName,
        }"
        :class="labelClassName"
      >
        {{ node.isBranch ? "Branch" : "Leaf" }}: {{ node.label }}
        <span v-if="shouldShowCount" :class="countClassName">
          ({{ count }})
        </span>
      </label> -->

      <!-- :multiple="false"
      :flat="false"
      :show-count="true" -->
    </treeselect>
    <p>{{ value }}</p>
  </div>
</template>
<script lang="ts">
import { Vue, Prop, Component } from "vue-property-decorator";
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

@Component({
  name: "SelectTree",
  components: { Treeselect },
})
export default class SelectTree extends Vue {
  @Prop() private treeData!: any[];
  @Prop({ default: true }) private showOperating!: boolean;

  private value = null; // 初始值必须设置为null 不然会默认显示 unknown
  private normalizer(node: any) {
    return {
      ...node,
      // id: node.key,
      label: node.name,
      // children: node.subOptions,
    };
  }
  // 树状结构
  private options = [
    {
      id: "1",
      name: "湖南省",
      children: [
        {
          id: "4",
          name: "长沙市",
          isDisabled: true,
        },
        {
          id: "5",
          name: "永州市",
          // 默认展开
          isDefaultExpanded: true,
          children: [
            {
              id: "6",
              name: "零陵区",
            },
            {
              id: "7",
              name: "宁远县",
              isNew: true,
            },
          ],
        },
      ],
    },
    {
      id: "2",
      name: "湖北省",
      children: [
        {
          id: "8",
          name: "武汉市",
        },
      ],
    },
  ];

  private select(node: any) {
    console.log("node=", node);
  }
}
</script>
<style lang="scss" scoped>
.BaseTreeSelect::v-deep {
  width: 150px;
  .vue-treeselect__control {
    height: 32px;
    line-height: 30.5px;
    font-size: 14px;
    .vue-treeselect__value-container {
      font-size: 14px;
      .vue-treeselect__single-value {
        line-height: 30px;
      }
    }
  }
  .vue-treeselect__menu-container {
    font-size: 14px;
    .vue-treeselect__menu {
      font-size: 14px;
    }
  }
  .vue-treeselect__placeholder {
    line-height: 30px;
  }
}
</style>
