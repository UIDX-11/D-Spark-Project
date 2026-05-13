<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { reactive } from "vue";

const form = reactive({
  keyword: "",
  region: "",
  range: [] as string[],
  onlyMine: false,
});

function search() {
  Message.info("高级筛选已应用（示例）");
}

function reset() {
  form.keyword = "";
  form.region = "";
  form.range = [];
  form.onlyMine = false;
}
</script>

<template>
  <a-card title="高级筛选">
    <a-form :model="form" layout="inline">
      <a-form-item field="keyword" label="关键词">
        <a-input v-model="form.keyword" allow-clear placeholder="名称 / ID" style="width: 200px" />
      </a-form-item>
      <a-form-item field="region" label="区域">
        <a-select v-model="form.region" allow-clear placeholder="全部" style="width: 160px">
          <a-option value="east">华东</a-option>
          <a-option value="north">华北</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="range" label="时间">
        <a-range-picker v-model="form.range" style="width: 260px" />
      </a-form-item>
      <a-form-item field="onlyMine" label="仅我的">
        <a-switch v-model="form.onlyMine" />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-button type="primary" @click="search">查询</a-button>
          <a-button @click="reset">重置</a-button>
        </a-space>
      </a-form-item>
    </a-form>
    <a-divider />
    <a-empty description="查询结果表格区域 · 可与「标准列表」共用表格组件" />
  </a-card>
</template>
