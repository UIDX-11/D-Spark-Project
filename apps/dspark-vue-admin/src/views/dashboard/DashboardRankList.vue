<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { BUY_TEND_LIST, SALE_TEND_LIST } from "./mock-data";
import DashboardTrend from "./DashboardTrend.vue";

const saleColumns = [
  { title: "排名", width: 80, fixed: "left" as const, slotName: "index" },
  {
    title: "客户名称",
    dataIndex: "productName",
    ellipsis: true,
    tooltip: true,
    minWidth: 200,
  },
  { title: "较上周", width: 100, slotName: "growUp" },
  { title: "订单量", dataIndex: "count", width: 100 },
  { title: "合同签订日期", dataIndex: "date", width: 140 },
  { title: "操作", width: 80, fixed: "right" as const, slotName: "operation" },
];

const buyColumns = [
  { title: "排名", width: 80, fixed: "left" as const, slotName: "index" },
  {
    title: "供应商名称",
    dataIndex: "productName",
    ellipsis: true,
    tooltip: true,
    minWidth: 200,
  },
  { title: "较上周", width: 100, slotName: "growUp" },
  { title: "订单量", dataIndex: "count", width: 100 },
  { title: "合同签订日期", dataIndex: "date", width: 140 },
  { title: "操作", width: 80, fixed: "right" as const, slotName: "operation" },
];

function rankClass(index: number) {
  return ["rank-cell", { "rank-cell--top": index < 3 }];
}

function onDetail() {
  Message.info("详情（示例）");
}
</script>

<template>
  <a-row :gutter="[16, 16]">
    <a-col :xs="24" :xl="12">
      <a-card title="销售订单排名" class="rank-card" :bordered="false">
        <template #extra>
          <a-radio-group type="button" default-value="week">
            <a-radio value="week">本周</a-radio>
            <a-radio value="quarter">近三个月</a-radio>
          </a-radio-group>
        </template>
        <a-table :columns="saleColumns" :data="SALE_TEND_LIST" :pagination="false" row-key="productName">
          <template #index="{ rowIndex }">
            <span :class="rankClass(rowIndex)">{{ rowIndex + 1 }}</span>
          </template>
          <template #growUp="{ record }">
            <dashboard-trend
              :type="(record as { growUp?: number }).growUp! > 0 ? 'up' : 'down'"
              :describe="Math.abs((record as { growUp?: number }).growUp ?? 0)"
            />
          </template>
          <template #operation="{ record }">
            <a-button type="text" size="small" @click="onDetail">详情</a-button>
          </template>
        </a-table>
      </a-card>
    </a-col>
    <a-col :xs="24" :xl="12">
      <a-card title="采购订单排名" class="rank-card" :bordered="false">
        <template #extra>
          <a-radio-group type="button" default-value="week">
            <a-radio value="week">本周</a-radio>
            <a-radio value="quarter">近三个月</a-radio>
          </a-radio-group>
        </template>
        <a-table :columns="buyColumns" :data="BUY_TEND_LIST" :pagination="false" row-key="productName">
          <template #index="{ rowIndex }">
            <span :class="rankClass(rowIndex)">{{ rowIndex + 1 }}</span>
          </template>
          <template #growUp="{ record }">
            <dashboard-trend
              :type="(record as { growUp?: number }).growUp! > 0 ? 'up' : 'down'"
              :describe="Math.abs((record as { growUp?: number }).growUp ?? 0)"
            />
          </template>
          <template #operation="{ record }">
            <a-button type="text" size="small" @click="onDetail">详情</a-button>
          </template>
        </a-table>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.rank-card :deep(.arco-card-header) {
  padding-bottom: 24px;
}

.rank-card :deep(.arco-card-title) {
  font-size: 20px;
  font-weight: 500;
}

.rank-cell {
  display: inline-flex;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  background-color: var(--color-fill-4);
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.rank-cell--top {
  background: rgb(var(--primary-6));
}
</style>
