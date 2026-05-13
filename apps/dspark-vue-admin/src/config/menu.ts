export interface MenuLeaf {
  key: string;
  title: string;
}

export interface MenuGroup {
  key: string;
  title: string;
  children: MenuLeaf[];
}

/** Side navigation — paths are the route paths; replace titles with your product copy. */
export const appMenu: MenuGroup[] = [
  {
    key: "grp-console",
    title: "控制台",
    children: [
      { key: "/dashboard/base", title: "数据总览" },
      { key: "/dashboard/detail", title: "分析报表" },
    ],
  },
  {
    key: "grp-list",
    title: "列表与检索",
    children: [
      { key: "/list/base", title: "标准列表" },
      { key: "/list/card", title: "卡片列表" },
      { key: "/list/filter", title: "高级筛选" },
      { key: "/list/tree", title: "树状筛选" },
    ],
  },
  {
    key: "grp-form",
    title: "表单",
    children: [
      { key: "/form/base", title: "标准表单" },
      { key: "/form/step", title: "分步表单" },
    ],
  },
  {
    key: "grp-detail",
    title: "详情",
    children: [
      { key: "/detail/base", title: "基础详情" },
      { key: "/detail/advanced", title: "多区块详情" },
      { key: "/detail/deploy", title: "数据详情" },
      { key: "/detail/secondary", title: "下级详情" },
    ],
  },
  {
    key: "grp-result",
    title: "结果页",
    children: [
      { key: "/result/success", title: "成功" },
      { key: "/result/fail", title: "失败" },
      { key: "/result/403", title: "无权限" },
      { key: "/result/404", title: "页面不存在" },
      { key: "/result/500", title: "服务错误" },
      { key: "/result/network-error", title: "网络异常" },
      { key: "/result/browser-incompatible", title: "浏览器不兼容" },
      { key: "/result/maintenance", title: "系统维护" },
    ],
  },
  {
    key: "grp-other",
    title: "其他",
    children: [
      { key: "/user", title: "个人中心" },
      { key: "/nest-menu", title: "多级菜单示例" },
      { key: "/frame/doc", title: "内嵌文档" },
    ],
  },
];

export const defaultOpenMenuKeys: string[] = appMenu.map((g) => g.key);
