<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { ref } from "vue";

const columns = [
  { title: "名称", dataIndex: "name" },
  { title: "状态", dataIndex: "status" },
  { title: "更新时间", dataIndex: "updated" },
];

const allRows = [
  { key: "1", name: "项目 Alpha", status: "运行中", updated: "2026-05-09 10:00" },
  { key: "2", name: "项目 Beta", status: "已暂停", updated: "2026-05-08 16:20" },
  { key: "3", name: "项目 Gamma", status: "运行中", updated: "2026-05-07 09:15" },
];

const page = ref(1);
const pageSize = 2;
const tableData = ref(allRows.slice(0, pageSize));

function refresh() {
  const start = (page.value - 1) * pageSize;
  tableData.value = allRows.slice(start, start + pageSize);
}

function onPageChange(p: number) {
  page.value = p;
  refresh();
}

function onSearch() {
  Message.success("已触发查询（示例）");
}
</script>

<template>
  <a-space direction="vertical" fill size="medium">
    <a-card title="筛选">
      <a-space wrap>
        <a-input-search style="width: 220px" placeholder="关键词" @search="onSearch" />
        <a-select :style="{ width: '160px' }" placeholder="状态" allow-clear>
          <a-option value="on">运行中</a-option>
          <a-option value="off">已暂停</a-option>
        </a-select>
        <a-button type="primary" @click="onSearch">查询</a-button>
      </a-space>
    </a-card>
    <a-card title="列表">
      <a-table row-key="key" :columns="columns" :data="tableData" :pagination="false" />
      <div style="margin-top: 16px; display: flex; justify-content: flex-end">
        <a-pagination
          :total="allRows.length"
          :page-size="pageSize"
          :current="page"
          show-total
          @change="onPageChange"
        />
      </div>
    </a-card>
  </a-space>
</template>
