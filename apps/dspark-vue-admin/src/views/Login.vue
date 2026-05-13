<script setup lang="ts">
import { useRouter } from "vue-router";
import { reactive } from "vue";

const router = useRouter();
const form = reactive({ account: "", password: "" });

function submit() {
  router.push("/dashboard/base");
}
</script>

<template>
  <a-card title="登录" style="width: 360px">
    <a-form :model="form" layout="vertical" @submit-success="submit">
      <a-form-item field="account" label="账号" :rules="[{ required: true, message: '请输入账号' }]">
        <a-input v-model="form.account" allow-clear placeholder="账号" />
      </a-form-item>
      <a-form-item field="password" label="密码" :rules="[{ required: true, message: '请输入密码' }]">
        <a-input-password v-model="form.password" placeholder="密码" />
      </a-form-item>
      <a-button type="primary" html-type="submit" long>进入控制台</a-button>
    </a-form>
  </a-card>
</template>
