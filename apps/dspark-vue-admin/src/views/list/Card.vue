<script setup lang="ts">
const cards = [
  { title: "资源包 A", desc: "适用于标准业务流量", tag: "推荐" },
  { title: "资源包 B", desc: "高可用多活", tag: "企业" },
  { title: "资源包 C", desc: "试用与演示", tag: "试用" },
];
</script>

<template>
  <a-row :gutter="16">
    <a-col v-for="c in cards" :key="c.title" :xs="24" :sm="12" :md="8">
      <a-card :title="c.title" hoverable>
        <template #extra>
          <a-tag>{{ c.tag }}</a-tag>
        </template>
        <p style="margin: 0; color: var(--color-text-2)">{{ c.desc }}</p>
        <template #actions>
          <a-button type="text">详情</a-button>
          <a-button type="text">配置</a-button>
        </template>
      </a-card>
    </a-col>
  </a-row>
</template>
