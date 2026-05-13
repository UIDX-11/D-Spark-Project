# Layout: Page Detail

## Intent

用于实体详情页：摘要信息 → 分区信息 →（可选）tabs/折叠 → 相关列表。

## Skeleton (required sections)

1. **Page header**
   - Title + key metadata
   - Primary/secondary actions
2. **Summary card**
   - 关键字段摘要（只展示最重要信息）
3. **Detail sections**
   - 分组展示，避免长滚动无结构
4. **Related data (optional)**
   - `Table` / `List`

## Composition rules (hard)

- **Always**:
  - 信息分组必须有清晰标题（可视或语义）
  - 使用 `Card` / `Space` / `Layout` 控制节奏与间距
- **Never**:
  - 详情信息用无边界长段落堆叠（需要分区/栅格）

## Recommended components

- **Structure**: `Layout`, `Space`, `Card`
- **Navigation within page**: `Tabs`（当 sections 很多且可切换）
- **Data**: `Table`, `List`, `Tag`

## States

- Loading / Empty / Error 与 list 页保持一致的语义与样式

## Accessibility essentials

- 使用语义化 headings（或等价）表示 sections
- actions 必须可键盘操作且有可访问名称

