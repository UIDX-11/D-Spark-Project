<script setup lang="ts">
import type { TreeNodeData } from "@arco-design/web-vue";
import { computed, ref } from "vue";

const treeData: TreeNodeData[] = [
  {
    key: "org-1",
    title: "总部",
    children: [
      { key: "dept-tech", title: "技术部" },
      { key: "dept-ops", title: "运维部" },
      { key: "dept-biz", title: "业务部" },
    ],
  },
];

const rows = [
  { key: "1", dept: "dept-tech", name: "结算服务", owner: "张三" },
  { key: "2", dept: "dept-tech", name: "网关", owner: "李四" },
  { key: "3", dept: "dept-ops", name: "监控", owner: "王五" },
  { key: "4", dept: "dept-biz", name: "订单", owner: "赵六" },
];

const selectedKeys = ref<string[]>([]);

const columns = [
  { title: "系统", dataIndex: "name" },
  { title: "负责人", dataIndex: "owner" },
];

const tableData = computed(() => {
  const key = selectedKeys.value[0];
  if (!key || key === "org-1") {
    return rows;
  }
  return rows.filter((r) => r.dept === key);
});

function onSelect(keys: (string | number)[]) {
  selectedKeys.value = keys.map(String);
}
</script>

<template>
  <a-row :gutter="16">
    <a-col :xs="24" :md="6">
      <a-card title="组织">
        <a-tree :data="treeData" block-node @select="onSelect" />
        <a-typography-text type="secondary" style="font-size: 12px; display: block; margin-top: 8px">
          点击树节点筛选右侧表格（示例数据）。
        </a-typography-text>
      </a-card>
    </a-col>
    <a-col :xs="24" :md="18">
      <a-card title="资源列表">
        <a-table row-key="key" :columns="columns" :data="tableData" :pagination="false" />
      </a-card>
    </a-col>
  </a-row>
</template>
