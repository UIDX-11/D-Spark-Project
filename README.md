# D-Spark Project

> **Start here.** 本仓库是 D-Spark 设计系统 + Playground 应用。文档体系采用 **L0–L4 分层 + 一事一真源**，详见
> [`docs/DOCUMENTATION_MAP.md`](docs/DOCUMENTATION_MAP.md)。

## 从哪里开始（2 跳到达真源）

| 你是… | 入口 | 接下来 |
| --- | --- | --- |
| **AI / 生成 UI 的工具** | [`.design-spec/docs/design.md`](.design-spec/docs/design.md) | 按 design.md 的「Read order」消费 token / 组件 / 页面规范 |
| **新人 / 想看全局地图** | [`docs/DOCUMENTATION_MAP.md`](docs/DOCUMENTATION_MAP.md) | 按 L0–L4 找到对应主题 |
| **要在本仓库写页面/组件代码** | [`docs/components.md`](docs/components.md) | 回到 `.design-spec/docs/components/*.md` 查规范 |
| **要发布外部 / 镜像规范包** | [`.design-spec/PORTABLE_SPEC_README.md`](.design-spec/PORTABLE_SPEC_README.md) | 含外部 AI prompt template 与打包规则 |

**只读这一行就够：** 规范真源全部在 [`.design-spec/`](.design-spec/)；`docs/` 仅承载执行说明 / QA / 操作；`design-system/` 是 GitHub 门面，不是规范主体。

## Playground 启动（React + Vite）

在仓库根目录执行：

```bash
npm install
npm run dev
```

终端打印 `Local: http://localhost:5173/` 后再用浏览器打开（端口可能被替换为 5174 等，**以终端输出为准**）。

- `/` — Dashboard 示例
- `/login` — 登录页

路由见 [`src/app/App.tsx`](src/app/App.tsx)。Vue 管理壳（独立 npm 工程）见 [`apps/dspark-vue-admin/README.md`](apps/dspark-vue-admin/README.md)。

## 常见故障

1. 确认命令在**本仓库根目录**执行，而不是 `apps/` 子项目。
2. 若 `npm run dev` 一闪退出，把红色报错完整贴出。
3. 防火墙 / VPN 拦截时，可尝试 `Network:` 局域网地址。
4. 仅看构建产物：`npm run build && npm run preview`（默认 `http://localhost:4173/`）。

---

> 维护规则：本 README **只做路由**。规范内容请落到 `.design-spec/`，执行说明落到 `docs/`，不要在这里复述规范正文。文档治理基线见 [`.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md`](.design-spec/docs/reports/DESIGN_MD_GOVERNANCE_AUDIT.md)。
