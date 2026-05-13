<script setup lang="ts">
import { Message } from "@arco-design/web-vue";
import { reactive, ref } from "vue";

const step = ref(0);

const s1 = reactive({ appName: "", env: "" });
const s2 = reactive({ owner: "", notify: true });
const s3 = reactive({ agreed: false });

function next() {
  if (step.value < 2) {
    step.value += 1;
  }
}

function prev() {
  if (step.value > 0) {
    step.value -= 1;
  }
}

function done() {
  if (!s3.agreed) {
    Message.warning("请勾选确认项");
    return;
  }
  Message.success("分步表单已提交（示例）");
}
</script>

<template>
  <a-card title="分步表单">
    <a-steps :current="step" style="max-width: 640px; margin-bottom: 24px">
      <a-step title="基础信息" description="应用与环境" />
      <a-step title="协作设置" description="负责人与通知" />
      <a-step title="确认提交" description="核对并确认" />
    </a-steps>

    <div v-show="step === 0" style="max-width: 480px">
      <a-form :model="s1" layout="vertical">
        <a-form-item label="应用名称" field="appName" :rules="[{ required: true, message: '必填' }]">
          <a-input v-model="s1.appName" allow-clear />
        </a-form-item>
        <a-form-item label="环境" field="env">
          <a-radio-group v-model="s1.env">
            <a-radio value="prod">生产</a-radio>
            <a-radio value="staging">预发</a-radio>
          </a-radio-group>
        </a-form-item>
      </a-form>
    </div>

    <div v-show="step === 1" style="max-width: 480px">
      <a-form :model="s2" layout="vertical">
        <a-form-item label="负责人">
          <a-input v-model="s2.owner" allow-clear />
        </a-form-item>
        <a-form-item label="邮件通知">
          <a-switch v-model="s2.notify" />
        </a-form-item>
      </a-form>
    </div>

    <div v-show="step === 2" style="max-width: 480px">
      <a-descriptions :column="1" bordered style="margin-bottom: 16px">
        <a-descriptions-item label="应用名称">{{ s1.appName || "—" }}</a-descriptions-item>
        <a-descriptions-item label="环境">{{ s1.env || "—" }}</a-descriptions-item>
        <a-descriptions-item label="负责人">{{ s2.owner || "—" }}</a-descriptions-item>
        <a-descriptions-item label="邮件通知">{{ s2.notify ? "开" : "关" }}</a-descriptions-item>
      </a-descriptions>
      <a-checkbox v-model="s3.agreed">确认信息无误</a-checkbox>
    </div>

    <a-divider />
    <a-space>
      <a-button :disabled="step === 0" @click="prev">上一步</a-button>
      <a-button v-if="step < 2" type="primary" @click="next">下一步</a-button>
      <a-button v-else type="primary" @click="done">提交</a-button>
    </a-space>
  </a-card>
</template>
