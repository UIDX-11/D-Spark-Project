---
name: D-Spark Design System Skill Router
version: 0.1.0
triggers:
  - design system
  - 设计规范
  - 组件规范
  - tokens
  - token
  - 颜色
  - spacing
  - typography
  - accessibility
  - a11y
  - i18n
  - 国际化
  - layout
  - 表单
  - 列表页
  - 详情页
  - 主从
  - 主从页
  - master detail
  - tree detail
  - 树详情
routes:
  skeleton:
    choose_one:
      - id: page-list
        read:
          - .design-spec/docs/layouts/page-list.md
      - id: page-detail
        read:
          - .design-spec/docs/layouts/page-detail.md
      - id: page-form
        read:
          - .design-spec/docs/layouts/page-form.md
      - id: page-master-detail
        read:
          - .design-spec/docs/layouts/page-master-detail.md

  common:
    always_read:
      - design-system/glossary.md
      - .design-spec/docs/design.md
      - .design-spec/docs/components/intent-index.md
      - .design-spec/docs/components/README.md
      - .design-spec/tokens/dist/tokens.css
  overlays:
    conditional:
      # Overlay selection rule:
      # - If multiple overlays match within the same `group`, load ONLY the highest `priority`.
      # - priority: P0 (highest) > P1 > P2 > P3 (lowest)
      # - Always safe to load multiple overlays if they are in different groups.

      - id: overlay-saas-b2b
        group: overlay
        priority: P2
        when_includes_any: [saas, SaaS, b端, B端, to b, tob, 企业, admin, 控制台]
        read:
          - design-system/overlays/saas-b2b.md
      # Capability modules (at most ONE per request unless explicitly asked)
      - id: module-iam-rbac
        group: capability
        priority: P0
        when_includes_any: [iam, rbac, 权限, permission, role, roles, 用户, user, group]
        read:
          - design-system/product-lines/iam-rbac.md
      - id: module-billing
        group: capability
        priority: P0
        when_includes_any: [billing, 计费, 订阅, subscription, plan, pricing, invoice, 发票, payment, 支付, checkout]
        read:
          - design-system/product-lines/billing.md
      - id: module-monitoring
        group: capability
        priority: P0
        when_includes_any: [monitoring, 监控, metrics, dashboard, 日志, logs, alert, 告警, incident, 事件]
        read:
          - design-system/product-lines/monitoring.md
      - id: module-audit
        group: capability
        priority: P0
        when_includes_any: [audit, 审计, compliance, 合规, 操作日志, 操作记录]
        read:
          - design-system/product-lines/audit-logs.md
      - id: module-onboarding
        group: capability
        priority: P0
        when_includes_any: [onboarding, 新手, 引导, guide, wizard, setup, 首次使用, empty state, 空状态]
        read:
          - design-system/product-lines/onboarding.md
      - id: module-data-management
        group: capability
        priority: P0
        when_includes_any: [import, 导入, export, 导出, bulk, 批量, batch, 数据管理, mapping, 映射, schema, 模板, template]
        read:
          - design-system/product-lines/data-management.md
      # Cross-cutting overlays (load only when explicitly relevant)
      - id: overlay-permissions-tenancy
        group: overlay
        priority: P1
        when_includes_any: [tenant, 多租户, workspace, 组织, org, organization, scope, 权限不足, 无权限, permission denied]
        read:
          - design-system/overlays/permissions-and-tenancy.md
      - id: overlay-data-heavy-table
        group: overlay
        priority: P1
        when_includes_any: [table, 表格, 列, columns, 排序, sort, 筛选, filter, pagination, 分页, selection, 选择, row, rows]
        read:
          - design-system/overlays/data-heavy-table.md
      # Platform overlays
      - id: platform-mobile-flutter
        group: platform
        priority: P0
        when_includes_any: [mobile, 移动端, app, flutter]
        read:
          - .design-spec/adapters/flutter/README.md
      - id: overlay-case-studies
        group: overlay
        priority: P3
        when_includes_any: [case, 案例, best practice, 最佳实践]
        read:
          - design-system/case-studies/README.md
      # Web stack overlay (choose one)
      - id: web-react
        group: web-stack
        priority: P0
        when_includes_any: [react, element, element-plus]
        read:
          - .design-spec/adapters/web/README.md
      - id: web-vue
        group: web-stack
        priority: P0
        when_includes_any: [vue, arco, arco-design]
        read:
          - .design-spec/adapters/web/README.md
hard_rules:
  - always: Use component tokens for component specs (var(--component-*))
  - always: Component tokens reference semantic only; semantic references core only
  - never: Introduce ad-hoc hex colors in component specs
checklist_entry:
  read: design-system/checklist.md
---

This file defines a **3-layer routing strategy** so an agent can read only what it needs.

## Routing model

- **Skeleton layer (choose exactly one)**: page-type specific rules
- **Common layer (always)**: must-read rules & tokens
- **Overlay layer (optional)**: only for specific contexts (mobile, case studies, product lines…)

## How to use

1. Detect triggers from the user request.
2. Pick 1 skeleton route if the request implies a page type.
3. Always read the common set.
4. Add overlays only when explicitly relevant.