<script setup lang="ts">
import { appMenu, defaultOpenMenuKeys } from "@/config/menu";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const collapsed = ref(false);
const openKeys = ref([...defaultOpenMenuKeys]);
const selectedKeys = computed(() => [route.path]);

watch(
  () => route.path,
  () => {
    openKeys.value = [...defaultOpenMenuKeys];
  },
);

function onMenuItemClick(key: string) {
  if (key.startsWith("/")) {
    router.push(key);
  }
}

function goLogin() {
  router.push("/login");
}
</script>

<template>
  <a-layout style="min-height: 100%">
    <a-layout-sider
      v-model:collapsed="collapsed"
      :width="232"
      breakpoint="lg"
      collapsible
      class="ds-admin-sider"
      hide-trigger
    >
      <div class="brand">D.Spark</div>
      <a-menu
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        @update:open-keys="openKeys = $event as string[]"
        @menu-item-click="onMenuItemClick"
      >
        <a-sub-menu v-for="group in appMenu" :key="group.key">
          <template #title>{{ group.title }}</template>
          <a-menu-item v-for="item in group.children" :key="item.key">
            {{ item.title }}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="ds-header">
        <a-space>
          <span class="ds-header-title">{{ (route.meta.title as string) || "控制台" }}</span>
        </a-space>
        <a-space>
          <a-button type="text" @click="goLogin">登录页</a-button>
        </a-space>
      </a-layout-header>
      <a-layout-content class="ds-admin-content">
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.brand {
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-weight: 600;
  font-size: 15px;
  border-bottom: 1px solid var(--semantic-border-subtle, #e8e8e8);
}

.ds-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 52px;
  background: var(--color-bg-2);
  border-bottom: 1px solid var(--semantic-border-subtle, #e8e8e8);
}

.ds-header-title {
  font-size: 15px;
  font-weight: 500;
}
</style>
