<template>
  <a-space direction="vertical" fill size="medium">
    <a-card title="发布元数据">
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="版本">v2.4.1</a-descriptions-item>
        <a-descriptions-item label="构建号">#8842</a-descriptions-item>
        <a-descriptions-item label="提交">a1b2c3d</a-descriptions-item>
        <a-descriptions-item label="构建人">CI</a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="阶段时间线">
      <a-timeline>
        <a-timeline-item label="2026-05-09 10:00" dot-color="green">构建成功</a-timeline-item>
        <a-timeline-item label="2026-05-09 10:05">灰度 5%</a-timeline-item>
        <a-timeline-item label="2026-05-09 10:20">全量</a-timeline-item>
      </a-timeline>
    </a-card>
  </a-space>
</template>
