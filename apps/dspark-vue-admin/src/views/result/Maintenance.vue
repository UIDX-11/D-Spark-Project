<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="info" title="系统维护中" subtitle="维护窗口结束后自动恢复">
    <template #extra>
      <a-button type="outline" @click="router.push('/dashboard/base')">返回首页</a-button>
    </template>
  </a-result>
</template>
