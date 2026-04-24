# Product lines (按能力模块覆盖)

这里的 “product-lines” 指 **B 端 SaaS 的能力模块差异化覆盖**（不是某个具体业务线名称）。

## How it works

- 这些文件属于 **Overlay**：只有当用户请求命中对应能力模块关键词时才加载
- 每个模块文件只写“差异化规则/注意事项/Do & Don't”，不要重复 common 规则与 tokens

## Modules

- `iam-rbac.md` — Identity / Access / Roles / Permission patterns
- `billing.md` — Subscription / pricing / invoice / checkout
- `monitoring.md` — Metrics / logs / alerts / dashboards
- `audit-logs.md` — Audit trail / compliance / destructive actions
- `onboarding.md` — First-run / empty states / guided setup
- `data-management.md` — Import/export / bulk edit / schema mapping

