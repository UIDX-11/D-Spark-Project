<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="warning" title="浏览器版本过低" subtitle="请升级浏览器或使用推荐内核">
    <template #extra>
      <a-button type="primary" @click="router.push('/dashboard/base')">返回首页</a-button>
    </template>
  </a-result>
</template>
