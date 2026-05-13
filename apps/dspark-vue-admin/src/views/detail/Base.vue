<script setup lang="ts">
const data = [
  { label: "编号", value: "PRJ-2026-001" },
  { label: "名称", value: "示例项目" },
  { label: "负责人", value: "张三" },
  { label: "创建时间", value: "2026-05-01 12:00" },
];
</script>

<template>
  <a-space direction="vertical" fill size="medium">
    <a-breadcrumb>
      <a-breadcrumb-item>列表</a-breadcrumb-item>
      <a-breadcrumb-item>详情</a-breadcrumb-item>
    </a-breadcrumb>
    <a-card title="基础详情">
      <a-descriptions :column="2" bordered>
        <a-descriptions-item v-for="row in data" :key="row.label" :label="row.label">
          {{ row.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-space>
</template>
