<script setup lang="ts">
const rows = [
  { metric: "吞吐", current: "4.2k rps", prev: "3.9k rps" },
  { metric: "错误率", current: "0.08%", prev: "0.11%" },
];
</script>

<template>
  <a-space direction="vertical" fill size="medium">
    <a-typography-text type="secondary">分析报表页占位：可放多序列图、下钻表格与导出。</a-typography-text>
    <a-table :columns="[
      { title: '指标', dataIndex: 'metric' },
      { title: '本期', dataIndex: 'current' },
      { title: '上期', dataIndex: 'prev' },
    ]" :data="rows" :pagination="false" />
    <a-card title="区域对比（占位）">
      <a-empty description="在此挂载图表组件" />
    </a-card>
  </a-space>
</template>
