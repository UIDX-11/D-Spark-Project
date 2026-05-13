<script setup lang="ts">
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import { GridComponent, LegendComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { constructInitDataset, defaultChartTheme, defaultLast7Days } from "./echarts-helpers";
import DashboardTrend from "./DashboardTrend.vue";

echarts.use([TooltipComponent, LegendComponent, GridComponent, BarChart, CanvasRenderer]);

const theme = defaultChartTheme();
const stokeRange = ref<(Date | string | number)[]>([...defaultLast7Days()]);

let stokeChart: echarts.ECharts | null = null;

function updateContainer() {
  const el = document.getElementById("stokeContainer");
  if (el && stokeChart) {
    stokeChart.resize({ width: el.clientWidth, height: el.clientHeight });
  }
}

function renderChart() {
  const el = document.getElementById("stokeContainer");
  if (!el) {
    return;
  }
  stokeChart?.dispose();
  stokeChart = echarts.init(el);
  const v = stokeRange.value;
  stokeChart.setOption(
    constructInitDataset(
      v.length >= 2 ? [new Date(v[0]!), new Date(v[1]!)] : defaultLast7Days(),
      theme,
    ),
  );
}

watch(
  stokeRange,
  () => {
    const v = stokeRange.value;
    if (!stokeChart || !v || v.length < 2) {
      return;
    }
    stokeChart.setOption(constructInitDataset([new Date(v[0]!), new Date(v[1]!)], theme));
  },
  { deep: true },
);

onMounted(() => {
  nextTick(() => {
    renderChart();
    updateContainer();
  });
  window.addEventListener("resize", updateContainer, false);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateContainer, false);
  stokeChart?.dispose();
  stokeChart = null;
});
</script>

<template>
  <a-card :bordered="false">
    <a-row :gutter="0">
      <a-col :xs="24" :xl="18">
        <a-card
          :bordered="false"
          class="overview-panel"
          :class="{ 'dashboard-overview-card': true }"
        >
          <template #title>
            <span class="h-title">出入库概览</span>
            <span class="h-sub">（件）</span>
          </template>
          <template #extra>
            <a-range-picker v-model="stokeRange" style="width: 280px" />
          </template>
          <div id="stokeContainer" class="stoke-chart" />
        </a-card>
      </a-col>
      <a-col :xs="24" :xl="6">
        <a-card :bordered="false" class="export-panel dashboard-overview-card">
          <template #extra>
            <a-button size="small">导出数据</a-button>
          </template>
          <a-row>
            <a-col :xs="12" :xl="24">
              <a-card :bordered="false" title="本月出库总计（件）" class="inner-card">
                <div class="inner-title">1726</div>
                <div class="inner-foot">
                  自从上周以来
                  <dashboard-trend class="tag" type="down" describe="20.3%" />
                </div>
              </a-card>
            </a-col>
            <a-col :xs="12" :xl="24">
              <a-card :bordered="false" title="本月入库总计（件）" class="inner-card">
                <div class="inner-title">226</div>
                <div class="inner-foot">
                  自从上周以来
                  <dashboard-trend class="tag" type="down" describe="20.3%" />
                </div>
              </a-card>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<style scoped>
.dashboard-overview-card :deep(.arco-card-header) {
  padding-bottom: 24px;
}

.h-title {
  font-size: 20px;
  font-weight: 500;
}

.h-sub {
  font-size: 14px;
  margin-left: 4px;
  color: var(--color-text-3);
}

.overview-panel {
  border-right: none;
}

.export-panel {
  border-left: none;
}

@media (min-width: 1200px) {
  .overview-panel {
    border-right: 1px solid var(--color-border-2);
  }
}

.stoke-chart {
  width: 100%;
  height: 351px;
}

.inner-card {
  padding: 12px 0;
}

.inner-card :deep(.arco-card-header) {
  padding-bottom: 0;
}

.inner-title {
  font-size: 36px;
  line-height: 44px;
}

.inner-foot {
  display: flex;
  align-items: center;
  margin-top: 8px;
  line-height: 22px;
  color: var(--color-text-3);
  font-size: 12px;
}

.inner-foot .tag {
  margin-left: 4px;
}
</style>
