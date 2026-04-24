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
  common:
    always_read:
      - .design-spec/docs/design.md
      - .design-spec/docs/components/intent-index.md
      - .design-spec/docs/components/README.md
      - .design-spec/tokens/dist/tokens.css
  overlays:
    conditional:
      - when_includes_any: [mobile, 移动端, app, flutter]
        read:
          - .design-spec/adapters/flutter/README.md
      - when_includes_any: [case, 案例, best practice, 最佳实践]
        read:
          - .design-spec/docs/content/README.md
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
