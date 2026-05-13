<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="500" title="服务暂时不可用" subtitle="请稍后重试或联系运维">
    <template #extra>
      <a-button type="primary" @click="router.push('/dashboard/base')">返回首页</a-button>
    </template>
  </a-result>
</template>
