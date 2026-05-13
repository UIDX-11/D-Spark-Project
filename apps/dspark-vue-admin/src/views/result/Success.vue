<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="success" title="操作成功" subtitle="可替换为你的业务成功文案">
    <template #extra>
      <a-button type="primary" @click="router.push('/dashboard/base')">返回总览</a-button>
    </template>
  </a-result>
</template>
