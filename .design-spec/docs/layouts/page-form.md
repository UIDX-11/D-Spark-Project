# Layout: Page Form

## Intent

用于创建/编辑类表单页：分组字段 → 校验 → 提交/取消。

## Skeleton (required sections)

1. **Page header**
   - Title
   - (optional) status / helper
2. **Form body**
   - 分组 sections（Card 或分隔）
3. **Form actions**
   - Primary submit + secondary cancel
4. **Validation summary (optional)**

## Composition rules (hard)

- **Always**:
  - 使用 `Form` 作为布局与校验容器（若技术栈映射到 Arco/Element/Flutter 对应 form）
  - 字段必须有 label（可见或 a11y label），错误信息与字段关联
  - submit 禁用态必须可解释（权限/校验未通过/加载中）
- **Never**:
  - 把必填仅用颜色/星号表达（必须有语义提示）

## Recommended components

- **Field**: `Input`, `Select`, `Checkbox`, `Radio`, `Switch`
- **Layout**: `Form`, `Card`, `Space`
- **Actions**: `Button`

## States

- Default / Error / Disabled / Loading

## Accessibility essentials

- 错误信息需被读屏宣读（aria-describedby 等）
- 键盘顺序与视觉顺序一致

