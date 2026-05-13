<script setup lang="ts">
import { IconArrowFall, IconArrowRise } from "@arco-design/web-vue/es/icon";

defineProps<{
  type: "up" | "down";
  describe: string | number;
  /** On primary (inverted) KPI card */
  reverse?: boolean;
}>();
</script>

<template>
  <span class="trend" :class="[type, { reverse }]">
    <icon-arrow-rise v-if="type === 'up'" />
    <icon-arrow-fall v-else />
    {{ describe }}
  </span>
</template>

<style scoped>
.trend {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-size: 12px;
  color: rgb(var(--green-6));
}

.trend.down {
  color: rgb(var(--red-6));
}

.trend.reverse {
  color: rgba(255, 255, 255, 0.95) !important;
}

.trend.reverse.down {
  color: rgba(255, 255, 255, 0.75) !important;
}
</style>
