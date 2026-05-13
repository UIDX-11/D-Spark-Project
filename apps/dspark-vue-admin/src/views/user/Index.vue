<script setup lang="ts">
import { reactive } from "vue";

const profile = reactive({
  displayName: "演示用户",
  email: "you@example.com",
  locale: "zh-CN",
});
</script>

<template>
  <a-card title="个人中心">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="基本资料">
        <a-form :model="profile" layout="vertical" style="max-width: 400px">
          <a-form-item label="显示名">
            <a-input v-model="profile.displayName" />
          </a-form-item>
          <a-form-item label="邮箱">
            <a-input v-model="profile.email" />
          </a-form-item>
          <a-form-item label="语言">
            <a-select v-model="profile.locale">
              <a-option value="zh-CN">简体中文</a-option>
              <a-option value="en-US">English</a-option>
            </a-select>
          </a-form-item>
          <a-button type="primary">保存</a-button>
        </a-form>
      </a-tab-pane>
      <a-tab-pane key="2" title="安全">
        <a-empty description="二次验证、会话管理等占位" />
      </a-tab-pane>
    </a-tabs>
  </a-card>
</template>
