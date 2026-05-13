<script setup lang="ts">
import {
  IconFile,
  IconRight,
  IconUserGroup,
} from "@arco-design/web-vue/es/icon";
import * as echarts from "echarts/core";
import { BarChart, LineChart } from "echarts/charts";
import { CanvasRenderer } from "echarts/renderers";
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import {
  constructInitDashboardDataset,
  getChartListColor,
} from "./echarts-helpers";
import { PANE_LIST } from "./mock-data";
import DashboardTrend from "./DashboardTrend.vue";

echarts.use([LineChart, BarChart, CanvasRenderer]);

const panelList = PANE_LIST;
const resizeTime = ref(1);

let moneyChart: echarts.ECharts | null = null;
let refundChart: echarts.ECharts | null = null;

function updateContainer() {
  const w = document.documentElement.clientWidth;
  if (w >= 1400 && w < 1920) {
    resizeTime.value = Number((w / 2080).toFixed(2));
  } else if (w < 1080) {
    resizeTime.value = Number((w / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }

  moneyChart?.resize({
    width: `${resizeTime.value * 120}px`,
    height: `${resizeTime.value * 66}px`,
  });
  refundChart?.resize({
    width: `${resizeTime.value * 120}px`,
    height: `${resizeTime.value * 42}px`,
  });
}

function renderCharts() {
  const moneyEl = document.getElementById("moneyContainer");
  const refundEl = document.getElementById("refundContainer");
  if (moneyEl) {
    moneyChart?.dispose();
    moneyChart = echarts.init(moneyEl);
    moneyChart.setOption(constructInitDashboardDataset("line"));
  }
  if (refundEl) {
    refundChart?.dispose();
    refundChart = echarts.init(refundEl);
    refundChart.setOption(constructInitDashboardDataset("bar", getChartListColor()));
  }
}

onMounted(() => {
  window.addEventListener("resize", updateContainer, false);
  nextTick(() => {
    renderCharts();
    updateContainer();
  });
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainer, false);
  moneyChart?.dispose();
  refundChart?.dispose();
  moneyChart = null;
  refundChart = null;
});
</script>

<template>
  <a-row :gutter="[16, 16]">
    <a-col v-for="(item, index) in panelList" :key="item.title" :xs="12" :xl="6">
      <a-card
        :bordered="false"
        :class="['dashboard-item', { 'dashboard-item--main': index === 0 }]"
        :style="{ height: '168px' }"
      >
        <template #title>
          <span class="card-title">{{ item.title }}</span>
        </template>
        <div class="dashboard-item-top">
          <span :style="{ fontSize: `${resizeTime * 36}px` }">{{ item.number }}</span>
        </div>
        <div class="dashboard-item-left">
          <div
            v-if="index === 0"
            id="moneyContainer"
            class="dashboard-chart-container"
            :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 66}px` }"
          />
          <div
            v-else-if="index === 1"
            id="refundContainer"
            class="dashboard-chart-container"
            :style="{ width: `${resizeTime * 120}px`, height: `${resizeTime * 42}px` }"
          />
          <span v-else-if="index === 2" class="icon-wrap" :style="{ marginTop: '-24px' }">
            <icon-user-group :size="24" />
          </span>
          <span v-else class="icon-wrap" :style="{ marginTop: '-24px' }">
            <icon-file :size="24" />
          </span>
        </div>
        <a-divider :margin="8" />
        <div class="dashboard-item-bottom">
          <div class="dashboard-item-block">
            自从上周以来
            <dashboard-trend
              class="dashboard-item-trend"
              :type="item.upTrend ? 'up' : 'down'"
              :describe="(item.upTrend || item.downTrend) as string"
              :reverse="index === 0"
            />
          </div>
          <icon-right class="chev" />
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.card-title {
  font-size: 14px;
  font-weight: 500;
}

.dashboard-item {
  position: relative;
}

.dashboard-item :deep(.arco-card-body) {
  padding-top: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  position: relative;
}

.dashboard-item-top {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.dashboard-item-top > span {
  color: var(--color-text-1);
  font-size: 36px;
  line-height: 44px;
}

.dashboard-item-left {
  position: absolute;
  top: 0;
  right: 32px;
}

.icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: color-mix(in srgb, rgb(var(--primary-6)) 12%, transparent);
  border-radius: 50%;
  color: rgb(var(--primary-6));
}

.dashboard-item--main .icon-wrap {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.dashboard-item-bottom {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.dashboard-item-block {
  display: flex;
  align-items: center;
  line-height: 22px;
  color: var(--color-text-3);
}

.dashboard-item-trend {
  margin-left: 8px;
}

.chev {
  cursor: pointer;
  color: var(--color-text-3);
}

.dashboard-item--main {
  background: rgb(var(--primary-6));
  color: var(--color-bg-1);
}

.dashboard-item--main :deep(.arco-card-header-title),
.dashboard-item--main .card-title,
.dashboard-item--main .dashboard-item-top > span,
.dashboard-item--main .dashboard-item-bottom,
.dashboard-item--main .dashboard-item-block,
.dashboard-item--main .chev {
  color: #fff !important;
}

.dashboard-item--main .dashboard-item-block {
  opacity: 0.85;
}

.dashboard-chart-container {
  min-height: 1px;
}
</style>
