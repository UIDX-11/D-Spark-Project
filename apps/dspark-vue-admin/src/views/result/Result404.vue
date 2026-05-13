<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="404" title="页面不存在" subtitle="检查链接或返回上一页">
    <template #extra>
      <a-button type="primary" @click="router.push('/dashboard/base')">返回首页</a-button>
    </template>
  </a-result>
</template>
