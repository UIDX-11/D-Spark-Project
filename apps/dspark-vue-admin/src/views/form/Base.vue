<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { reactive } from "vue";

const form = reactive({
  name: "",
  region: "",
  remark: "",
});

function handleSubmit() {
  Message.success("已保存（示例）");
}
</script>

<template>
  <a-card title="标准表单">
    <a-form :model="form" layout="vertical" style="max-width: 560px" @submit-success="handleSubmit">
      <a-form-item field="name" label="名称" :rules="[{ required: true, message: '必填' }]">
        <a-input v-model="form.name" allow-clear placeholder="项目名称" />
      </a-form-item>
      <a-form-item field="region" label="区域">
        <a-select v-model="form.region" allow-clear placeholder="选择区域">
          <a-option value="east">华东</a-option>
          <a-option value="north">华北</a-option>
        </a-select>
      </a-form-item>
      <a-form-item field="remark" label="备注">
        <a-textarea v-model="form.remark" allow-clear placeholder="说明" />
      </a-form-item>
      <a-space>
        <a-button type="primary" html-type="submit">保存</a-button>
        <a-button type="outline">取消</a-button>
      </a-space>
    </a-form>
  </a-card>
</template>
