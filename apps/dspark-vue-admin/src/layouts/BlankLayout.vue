<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="blank-wrap">
    <RouterView />
  </div>
</template>

<style scoped>
.blank-wrap {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--semantic-bg-page, #f7f7f7);
}
</style>
