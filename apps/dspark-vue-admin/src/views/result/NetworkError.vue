<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="warning" title="网络异常" subtitle="请检查网络连接后重试">
    <template #extra>
      <a-button type="primary" @click="router.push('/dashboard/base')">返回首页</a-button>
    </template>
  </a-result>
</template>
