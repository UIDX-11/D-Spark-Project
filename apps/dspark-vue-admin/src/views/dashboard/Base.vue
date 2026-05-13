<script setup lang="ts">
import DashboardMiddleChart from "./DashboardMiddleChart.vue";
import DashboardOutputOverview from "./DashboardOutputOverview.vue";
import DashboardRankList from "./DashboardRankList.vue";
import DashboardTopPanel from "./DashboardTopPanel.vue";
</script>

<template>
  <div class="dashboard-base">
    <a-back-top :style="{ position: 'absolute', right: '24px', bottom: '80px' }" />
    <dashboard-top-panel class="row-container" />
    <dashboard-middle-chart class="row-container" />
    <dashboard-rank-list class="row-container" />
    <dashboard-output-overview class="row-container" />
  </div>
</template>

<style scoped>
.dashboard-base {
  position: relative;
}

.row-container {
  margin-bottom: 16px;
}

.row-container :deep(.arco-card-body) {
  padding-top: 0;
}
</style>
