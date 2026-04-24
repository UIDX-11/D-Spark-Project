# Layout: Master / Detail (Tree → Detail Panel)

## Intent

用于“左侧主列表/树 + 右侧详情面板”的主从布局（常见于组织/资产/资源管理）。

## Skeleton (required sections)

1. **Master panel (left)**
   - `Tree` / `List`
   - (optional) search / filter
2. **Detail panel (right)**
   - Header: title + actions
   - Body: sections / tabs
3. **Empty states**
   - No selection: 引导选择一个条目
   - No data: 提供创建/导入入口（按业务）

## Composition rules (hard)

- **Always**:
  - Master 与 Detail 的信息密度要一致（同一套 size 体系）
  - Detail 面板在“未选择”时必须有可理解的空态
  - Tree 节点过多时必须提供搜索或分组（避免纯滚动）
- **Never**:
  - 选择变化后 detail 直接跳动到页面顶部（保持滚动策略一致：重置或保留需明确）

## Recommended components

- **Master**: `Tree`, `Input`（search）, `Tag`（状态）
- **Detail structure**: `Card`, `Space`, `Layout`, `Tabs`
- **Actions**: `Button`, `Dropdown`（如后续补充）

## States

- Loading / Empty / Error 必须在 master 与 detail 两侧都有明确语义
- 未选择状态（no selection）是该 layout 的强制状态之一

## Accessibility essentials

- Tree 必须可键盘导航与展开/折叠
- 主从切换时焦点策略明确：
  - 从 master 选择项后，焦点可留在 master；detail 更新需可感知（aria-live 或标题更新）

