import { createRouter, createWebHistory } from "vue-router";
import BasicLayout from "@/layouts/BasicLayout.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: BlankLayout,
      children: [{ path: "", name: "login", component: () => import("@/views/Login.vue") }],
    },
    {
      path: "/",
      component: BasicLayout,
      children: [
        { path: "", redirect: "/dashboard/base" },
        {
          path: "dashboard/base",
          name: "dashboard-base",
          meta: { title: "数据总览" },
          component: () => import("@/views/dashboard/Base.vue"),
        },
        {
          path: "dashboard/detail",
          name: "dashboard-detail",
          meta: { title: "分析报表" },
          component: () => import("@/views/dashboard/Detail.vue"),
        },
        {
          path: "list/base",
          name: "list-base",
          meta: { title: "标准列表" },
          component: () => import("@/views/list/Base.vue"),
        },
        {
          path: "list/card",
          name: "list-card",
          meta: { title: "卡片列表" },
          component: () => import("@/views/list/Card.vue"),
        },
        {
          path: "list/filter",
          name: "list-filter",
          meta: { title: "高级筛选" },
          component: () => import("@/views/list/Filter.vue"),
        },
        {
          path: "list/tree",
          name: "list-tree",
          meta: { title: "树状筛选" },
          component: () => import("@/views/list/Tree.vue"),
        },
        {
          path: "form/base",
          name: "form-base",
          meta: { title: "标准表单" },
          component: () => import("@/views/form/Base.vue"),
        },
        {
          path: "form/step",
          name: "form-step",
          meta: { title: "分步表单" },
          component: () => import("@/views/form/Step.vue"),
        },
        {
          path: "detail/base",
          name: "detail-base",
          meta: { title: "基础详情" },
          component: () => import("@/views/detail/Base.vue"),
        },
        {
          path: "detail/advanced",
          name: "detail-advanced",
          meta: { title: "多区块详情" },
          component: () => import("@/views/detail/Advanced.vue"),
        },
        {
          path: "detail/deploy",
          name: "detail-deploy",
          meta: { title: "数据详情" },
          component: () => import("@/views/detail/Deploy.vue"),
        },
        {
          path: "detail/secondary",
          name: "detail-secondary",
          meta: { title: "下级详情" },
          component: () => import("@/views/detail/Secondary.vue"),
        },
        {
          path: "result/success",
          name: "result-success",
          meta: { title: "成功" },
          component: () => import("@/views/result/Success.vue"),
        },
        {
          path: "result/fail",
          name: "result-fail",
          meta: { title: "失败" },
          component: () => import("@/views/result/Fail.vue"),
        },
        {
          path: "result/403",
          name: "result-403",
          meta: { title: "无权限" },
          component: () => import("@/views/result/Result403.vue"),
        },
        {
          path: "result/404",
          name: "result-404",
          meta: { title: "页面不存在" },
          component: () => import("@/views/result/Result404.vue"),
        },
        {
          path: "result/500",
          name: "result-500",
          meta: { title: "服务错误" },
          component: () => import("@/views/result/Result500.vue"),
        },
        {
          path: "result/network-error",
          name: "result-network",
          meta: { title: "网络异常" },
          component: () => import("@/views/result/NetworkError.vue"),
        },
        {
          path: "result/browser-incompatible",
          name: "result-browser",
          meta: { title: "浏览器不兼容" },
          component: () => import("@/views/result/BrowserIncompatible.vue"),
        },
        {
          path: "result/maintenance",
          name: "result-maintenance",
          meta: { title: "系统维护" },
          component: () => import("@/views/result/Maintenance.vue"),
        },
        {
          path: "user",
          name: "user",
          meta: { title: "个人中心" },
          component: () => import("@/views/user/Index.vue"),
        },
        {
          path: "nest-menu",
          name: "nest-menu",
          meta: { title: "多级菜单示例" },
          component: () => import("@/views/nest-menu/Index.vue"),
        },
        {
          path: "frame/doc",
          name: "frame-doc",
          meta: { title: "内嵌文档" },
          component: () => import("@/views/frame/Doc.vue"),
        },
      ],
    },
    { path: "/:pathMatch(.*)*", redirect: "/result/404" },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
