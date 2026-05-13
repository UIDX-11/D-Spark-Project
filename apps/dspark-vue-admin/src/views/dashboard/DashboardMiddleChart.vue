<script setup lang="ts">
import * as echarts from "echarts/core";
import { LineChart, PieChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import {
  defaultChartTheme,
  defaultLast7Days,
  getLineChartDataSet,
  getPieChartDataSet,
} from "./echarts-helpers";

echarts.use([TooltipComponent, LegendComponent, GridComponent, PieChart, LineChart, CanvasRenderer]);

const theme = defaultChartTheme();
const rangeValue = ref<(Date | string | number)[]>([...defaultLast7Days()]);
const currentMonthLabel = ref(formatMonthLabel(rangeValue.value));

let pieChart: echarts.ECharts | null = null;
let lineChart: echarts.ECharts | null = null;
const resizeTime = ref(1);

function formatMonthLabel(val: (Date | string | number)[]): string {
  if (!val?.length) {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  }
  const a = new Date(val[0]);
  const b = new Date(val[1]!);
  const m1 = `${a.getMonth() + 1}`.padStart(2, "0");
  const m2 = `${b.getMonth() + 1}`.padStart(2, "0");
  return `${a.getFullYear()}-${m1} 至 ${b.getFullYear()}-${m2}`;
}

function updateContainer() {
  const w = document.documentElement.clientWidth;
  if (w >= 1400 && w < 1920) {
    resizeTime.value = Number((w / 2080).toFixed(2));
  } else if (w < 1080) {
    resizeTime.value = Number((w / 1080).toFixed(2));
  } else {
    resizeTime.value = 1;
  }

  const countEl = document.getElementById("countContainer");
  const monitorEl = document.getElementById("monitorContainer");
  pieChart?.resize({
    width: `${resizeTime.value * 326}px`,
    height: `${resizeTime.value * 326}px`,
  });
  if (monitorEl) {
    lineChart?.resize({
      width: monitorEl.clientWidth,
      height: `${resizeTime.value * 326}px`,
    });
  }
}

function renderCharts() {
  const countEl = document.getElementById("countContainer");
  const monitorEl = document.getElementById("monitorContainer");
  if (countEl) {
    pieChart?.dispose();
    pieChart = echarts.init(countEl);
    pieChart.setOption(getPieChartDataSet(theme));
  }
  if (monitorEl) {
    lineChart?.dispose();
    lineChart = echarts.init(monitorEl);
    const rv = rangeValue.value;
    lineChart.setOption(
      getLineChartDataSet(
        rv.length >= 2 ? [new Date(rv[0]!), new Date(rv[1]!)] : defaultLast7Days(),
        theme,
      ),
    );
  }
}

watch(
  rangeValue,
  () => {
    const v = rangeValue.value;
    if (!lineChart || !v || v.length < 2) {
      return;
    }
    currentMonthLabel.value = formatMonthLabel(v);
    lineChart.setOption(getLineChartDataSet([new Date(v[0]!), new Date(v[1]!)], theme));
  },
  { deep: true },
);

onMounted(() => {
  nextTick(() => {
    renderCharts();
    updateContainer();
  });
  window.addEventListener("resize", updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainer, false);
  pieChart?.dispose();
  lineChart?.dispose();
  pieChart = null;
  lineChart = null;
});
</script>

<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :xl="8">
      <a-card class="dashboard-chart-card" :bordered="false">
        <template #title>
          <span class="h-title">统计数据</span>
          <span class="h-sub">（万元）</span>
        </template>
        <div id="countContainer" class="chart-box" :style="{ height: `${resizeTime * 326}px` }" />
      </a-card>
    </a-col>
    <a-col :xs="24" :xl="16">
      <a-card class="dashboard-chart-card" :bordered="false">
        <template #title>
          <span class="h-title">销售渠道</span>
          <span class="h-sub muted">{{ currentMonthLabel }}</span>
        </template>
        <template #extra>
          <a-range-picker v-model="rangeValue" style="width: 280px" />
        </template>
        <div id="monitorContainer" class="chart-box" :style="{ height: `${resizeTime * 326}px` }" />
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.dashboard-chart-card :deep(.arco-card-header) {
  padding-bottom: 24px;
}

.h-title {
  font-size: 20px;
  font-weight: 500;
}

.h-sub {
  font-size: 14px;
  margin-left: 6px;
  font-weight: 400;
}

.h-sub.muted {
  color: var(--color-text-3);
}

.chart-box {
  width: 100%;
}
</style>
