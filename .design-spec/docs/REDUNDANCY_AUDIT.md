# 仓库冗余审计清单（先审后删）

原则：本表供 **逐项确认** 后再执行删除、归档或 `.gitignore` 调整；**不在未确认前自动删库**。


| 路径 / 模式                                                                                    | 类型       | 是否应提交 | 与真源关系                                          | 建议动作                                                       |
| ------------------------------------------------------------------------------------------ | -------- | ----- | ---------------------------------------------- | ---------------------------------------------------------- |
| `apps/**/node_modules/`**                                                                  | 依赖       | 否     | 安装生成                                           | 加入/强化 `.gitignore`；勿提交                                     |
| `apps/**/dist/`**                                                                          | 构建产物     | 否     | 构建生成                                           | 同上                                                         |
| `**/.DS_Store`                                                                             | 系统文件     | 否     | —                                              | `.gitignore`；清除误跟踪                                         |
| `.design-spec/generator/page_templates.js` vs `.design-spec/demos/pages/page_templates.js` | 脚本 vs 输出 | 视流程而定 | 内容曾一致                                          | **二选一定真源**；另一路径由生成脚本写入                                     |
| `demos/pages/dashboard.html`                                                               | Demo     | 是     | **Canonical Dashboard**（见 `page-dashboard.md`） | **保留**                                                     |
| `demos/pages/archive/dashboard-tdesign-starter-base.html`                                  | Demo     | 是     | TDesign 对稿变体（非 canonical）                      | **已归档**（2026-05）；canonical 仍为 `demos/pages/dashboard.html` |
| `demos/pages/dashboard-starter.js` 等                                                       | JS       | 是     | 依赖特定 HTML                                      | 与上同步审计                                                     |
| `.cursor/skills/`* 多文件                                                                     | Skill    | 是     | 职责拆分                                           | **不删除**（非冗余）                                               |


**Dashboard canonical**：`.design-spec/docs/pages/page-dashboard.md` 将 `demoPath` 固定为 `demos/pages/dashboard.html`。

**下一步**：其余行仍按需逐项确认；归档与生成器路径约定见 [REQUIREMENTS_AND_PLAN.md](REQUIREMENTS_AND_PLAN.md) §2 **P2**。

**相关**：[REQUIREMENTS_AND_PLAN.md](REQUIREMENTS_AND_PLAN.md) · [checks/README.md](../checks/README.md)（Playwright）