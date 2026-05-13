<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="error" title="操作失败" subtitle="可替换为错误原因与处理建议">
    <template #extra>
      <a-button type="outline" @click="router.push('/list/base')">返回列表</a-button>
    </template>
  </a-result>
</template>
