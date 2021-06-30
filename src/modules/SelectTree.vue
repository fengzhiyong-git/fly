<template>
  <div class="BaseTreeSelect">
    <treeselect
      v-model="value"
      placeholder="请选择"
      :options="options"
      :normalizer="normalizer"
      :default-expand-level="1"
      @select="select"
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

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  components: { Treeselect },
  data() {
    return {
      // 默认选中
      // id集合
      value: null, // 初始值必须设置为null 不然会默认显示 unknown
      // 自定义键名
      // 默认 id label children
      // label 替换为name
      normalizer(node) {
        return {
          ...node,
          // id: node.key,
          label: node.name
          // children: node.subOptions,
        };
      },
      // 树状结构
      options: [
        {
          id: "1",
          name: "湖南省",
          children: [
            {
              id: "4",
              name: "长沙市",
              isDisabled: true
            },
            {
              id: "5",
              name: "永州市",
              // 默认展开
              isDefaultExpanded: true,
              children: [
                {
                  id: "6",
                  name: "零陵区"
                },
                {
                  id: "7",
                  name: "宁远县",
                  isNew: true
                }
              ]
            }
          ]
        },
        {
          id: "2",
          name: "湖北省",
          children: [
            {
              id: "8",
              name: "武汉市"
            }
          ]
        }
      ]
    };
  },
  methods: {
    select(node) {
      console.log("node=", node);
    }
  }
};
</script>
