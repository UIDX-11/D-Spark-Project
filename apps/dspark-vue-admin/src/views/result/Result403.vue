<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <a-result status="403" title="无权限" subtitle="联系管理员申请权限">
    <template #extra>
      <a-button type="primary" @click="router.push('/dashboard/base')">返回首页</a-button>
    </template>
  </a-result>
</template>
