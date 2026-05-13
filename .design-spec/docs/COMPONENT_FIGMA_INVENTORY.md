# Component ↔ Figma Inventory

> **Source of truth** for D-Spark component-to-Figma-node mapping. AI tools and contributors should read this file (plus `tokens/dist/tokens.css` and the linked component specs) before generating UI.

- **Figma file**: [D.S. Web Com — Light V2 2026](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026)
- **File key**: `KJfy0GFDs8kLsXTzhTxAjd`
- **Mode**: Light V2 2026
- **Priority levels**: `P0` blocking forms/lists/dashboards, `P1` common business surfaces, `P2` peripheral / domain-specific.
- **Status legend**: `已填链接 (linked)` = Figma node-id captured · `待录入 (pending)` = needs user input or design alignment.
- **Pilot set** for the first end-to-end Figma → token → component md → `design.md` loop: **button, input, select, form, table, modal, datepicker** (see the pilot table below).

This file is the **canonical, human-readable mirror** of the component ↔ Figma-node mapping. The machine-readable counterpart is [`../../config/figma_truth_table.json`](../../config/figma_truth_table.json); both must stay in sync (see [`reports/DESIGN_MD_GOVERNANCE_AUDIT.md` §5](reports/DESIGN_MD_GOVERNANCE_AUDIT.md#5-治理后的标准流程)).

## Pilot components (first batch)

| Component | Spec | Primary Figma node | Additional nodes | Priority |
| --- | --- | --- | --- | --- |
| button | [components/button.md](components/button.md) | [10657:99018](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=10657-99018) | [277087:36652](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=277087-36652) | P0 |
| input | [components/input.md](components/input.md) | [117269:199903](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=117269-199903) | — | P0 |
| select | [components/select.md](components/select.md) | [116529:135291](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116529-135291) | [278324:4612](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=278324-4612) | P0 |
| form | [components/form.md](components/form.md) | _pending — designer to assign canonical form node_ | — | P0 |
| table | [components/table.md](components/table.md) | [116997:186851](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116997-186851) | — | P0 |
| modal | [components/modal.md](components/modal.md) | [119237:106936](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=119237-106936) | [284016:9485](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=284016-9485), [284016:9652](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=284016-9652) | P1 |
| datepicker | [components/datepicker.md](components/datepicker.md) | [117747:171283](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=117747-171283) | [123612:128253](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=123612-128253) | P1 |

## Full inventory

| Component | Primary Figma node | Additional nodes | Priority | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| alert | [124872:121819](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-121819) | — | P2 | 已填链接 | 警告提示、类型、关闭态 |
| badge | [116449:132541](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-132541) | [116449:132801](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-132801), [116449:133206](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-133206), [282874:103643](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=282874-103643) | P2 | 已填链接 | 数字徽标、状态点、溢出规则 |
| breadcrumb | [116476:133550](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116476-133550) | [116476:133367](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116476-133367) | P1 | 已填链接 | 层级导航、分隔符、省略 |
| button | [10657:99018](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=10657-99018) | [277087:36652](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=277087-36652) | P0 | 已填链接 | 基础按钮、图标按钮、状态 |
| card | — | — | P1 | 待录入 | 容器、标题、操作区 |
| cascader | [286613:3654](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=286613-3654) | [286622:1371](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=286622-1371), [286640:41658](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=286640-41658), [275388:6084](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275388-6084), [124009:125572](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124009-125572) | P1 | 已填链接 | 级联选择、面板、加载态 |
| checkbox | [116449:133503](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-133503) | [116449:133385](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-133385) | P0 | 已填链接 | 单选框、复选组、半选态 |
| data-display-number | — | — | P2 | 待录入 | 数字展示、趋势、单位 |
| datepicker | [117747:171283](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=117747-171283) | [123612:128253](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=123612-128253) | P1 | 已填链接 | 触发器、日期面板、范围选择 |
| dropdown | [116479:133907](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116479-133907) | [116479:134191](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116479-134191), [283153:5274](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=283153-5274), [286412:25709](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=286412-25709) | P1 | 已填链接 | 下拉菜单、触发方式、分组 |
| form | — | — | P0 | 待录入 | 表单项、校验、布局 |
| input | [117269:199903](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=117269-199903) | — | P0 | 已填链接 | 文本输入、禁用、错误、前后缀 |
| input-adornment | [280391:33997](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=280391-33997) | [296970:47803](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=296970-47803) | P1 | 已填链接 | 前后缀、组合输入 |
| input-ip | [288620:2128](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=288620-2128) | — | P2 | 已填链接 | IP 输入、分段、校验 |
| input-number | [275397:10688](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275397-10688) | [275588:823](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275588-823) | P1 | 已填链接 | 数字输入、步进器、范围 |
| input-range | [297108:6113](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=297108-6113) | — | P2 | 已填链接 | 区间输入、双值校验 |
| layout | — | — | P0 | 待录入 | 页面框架、Header、Sider、Content |
| list | — | — | P1 | 待录入 | 列表项、操作区、空状态 |
| menu | [118262:164627](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=118262-164627) | — | P0 | 已填链接 | 侧边菜单、顶部菜单、选中态 |
| message | [124872:123064](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-123064) | — | P2 | 已填链接 | 全局消息、反馈类型、持续时间 |
| modal | [119237:106936](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=119237-106936) | [284016:9485](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=284016-9485), [284016:9652](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=284016-9652) | P1 | 已填链接 | 弹窗结构、footer、关闭行为 |
| notification | [123397:114318](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=123397-114318) | — | P2 | 已填链接 | 通知卡片、位置、关闭行为 |
| pageheader | [116510:134301](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116510-134301) | — | P1 | 已填链接 | 页面标题、返回、面包屑、操作区 |
| pagination | [118845:144970](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=118845-144970) | — | P1 | 已填链接 | 页码、跳转、size changer |
| pincode | [286976:20982](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=286976-20982) | [289451:2744](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=289451-2744) | P2 | 已填链接 | 验证码输入、位数、错误态 |
| progress | [124809:124417](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124809-124417) | [124784:123557](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124784-123557), [124809:123629](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124809-123629), [291890:1712](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=291890-1712) | P2 | 已填链接 | 线形、环形、状态色 |
| radio | [275133:160500](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275133-160500) | [116455:132100](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116455-132100), [116449:134996](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-134996) | P0 | 已填链接 | 单选、单选组、按钮型 |
| select | [116529:135291](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116529-135291) | [278324:4612](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=278324-4612) | P0 | 已填链接 | 单选、多选、下拉面板 |
| slider | [124384:142926](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124384-142926) | [124384:142709](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124384-142709) | P2 | 已填链接 | 单滑块、范围、刻度 |
| space | — | — | P1 | 待录入 | 间距容器、方向、对齐 |
| steps | [126138:202845](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=126138-202845) | [283436:2091](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=283436-2091) | P1 | 已填链接 | 步骤条、状态、方向 |
| switch | [116456:132645](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116456-132645) | — | P1 | 已填链接 | 开关、加载、禁用 |
| table | [116997:186851](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116997-186851) | — | P0 | 已填链接 | 表头、筛选、分页、空状态 |
| tabs | [124009:129610](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124009-129610) | [275170:212614](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275170-212614), [124064:145588](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124064-145588), [124247:120271](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124247-120271), [124247:120978](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124247-120978), [124247:122762](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124247-122762), [124247:130964](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124247-130964), [286582:13024](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=286582-13024), [116449:135104](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=116449-135104) | P1 | 已填链接 | 顶部标签、卡片标签、禁用态 |
| tag | [275126:37182](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275126-37182) | [148903:192071](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=148903-192071), [275128:132007](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275128-132007) | P2 | 已填链接 | 标签、颜色、关闭态 |
| timepicker | [284471:9574](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=284471-9574) | [123515:115495](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=123515-115495), [123515:118309](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=123515-118309) | P2 | 已填链接 | 时间选择、面板、范围 |
| tree | [275610:141002](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275610-141002) | [275610:138273](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275610-138273), [275610:132287](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275610-132287), [275610:126301](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275610-126301) | P1 | 已填链接 | 树节点、展开、选中、拖拽 |
| treeselect | [275610:250288](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=275610-250288) | [125951:230932](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=125951-230932) | P1 | 已填链接 | 树选择、下拉面板、多选 |
| upload | [124872:118703](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124872-118703) | [124847:119433](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124847-119433), [124847:119633](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124847-119633), [124847:119755](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124847-119755), [124847:121086](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124847-121086), [124847:119919](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=124847-119919) | P1 | 已填链接 | 上传按钮、文件列表、进度 |

## Pending entries (need designer or PM input)

These components have specs in `components/` but no canonical Figma node assigned. Designers should add the published component node-id to this inventory before the spec is treated as "linked".

- `card`, `data-display-number`, `form`, `layout`, `list`, `space`

## How AI tools should consume this inventory

1. Look up the component slug in the table above.
2. Open the linked `components/<slug>.md` spec for the structured Figma-token bindings, variants, and `atomic` JSON block.
3. If a richer Figma read is needed, call the Figma MCP `get_design_context` / `get_variable_defs` with `fileKey = KJfy0GFDs8kLsXTzhTxAjd` and one of the listed `nodeId` values (use `:` form, e.g. `10657:99018`).
4. For token resolution, consume `tokens/dist/tokens.css` (CSS variables) plus `FIGMA_VARIABLES_TOKEN_BRIDGE.yaml` (Figma var → CSS var bridge).
