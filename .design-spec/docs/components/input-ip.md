# Component: Input-IP

## Level

Molecular

## Aliases

- IPv4 input
- segmented IP field
- IP 输入框

## Figma

[D.S-Web-Com · input IP（288620:2128）](https://www.figma.com/design/KJfy0GFDs8kLsXTzhTxAjd/D.S-Web-Com_Light_V2_2026?node-id=288620-2128)

## Best practices

- **Use for**: **IPv4** addresses only; for hostnames or IPv6 use a plain **Input** with appropriate validation.
- **Composition**: four octet fields separated by literal `**.`** (decorative separators, not editable); one outer chrome (`ds-input-ip`) aligned to **Input** tokens (`--component-input-`*).
- **Errors (Figma)**: when one octet is invalid, show the **red border only on that segment** — not on the whole row. Optional error text below the control.
- **Keyboard**: `←` / `→` between octets; auto-advance after three digits where helpful; **Backspace** on an empty octet moves focus to the previous field.
- **Accessibility**: label the whole control (e.g. “IP address”); each octet has `aria-label` (“First octet” … “Fourth octet”); link `aria-describedby` to helper/error when present.

## Anatomy

```
┌─────────────────────────────────────────────┐
│  [octet]  .  [octet]  .  [octet]  .  [octet]  │
└─────────────────────────────────────────────┘
  Error message (optional)
```


| Part                      | Description                                                                                                                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Outer (`ds-input-ip`)     | Rounded container; `data-size`, optional `data-disabled`; hover/focus-within uses Input border tokens.                                                                                                                                                                                 |
| Octet (`ds-input-ip-seg`) | `maxlength="3"`, numeric entry; **row `padding: 0`** so the active border meets the shell inner edge. **Corners when active (Figma pixel):** octet 1 — **TL/BL** = `var(--ds-ip-r)`; octets 2–3 — **0**; octet 4 — **TR/BR** = `var(--ds-ip-r)` (same token as shell `border-radius`). |
| Dot (`ds-input-ip-dot`)   | Literal `.`; `aria-hidden="true"`. 行容器 **Grid** + `**align-items: stretch`**：分隔列拉满行高，列内 `**place-items: center**`；相对数字输入作 **光学居中** 使用 `**transform: translateY(-4px)`**（累计上移）。                                                                                                         |


## Sizes

Align with **Input** studio sizes: `mini` / `small` / `medium` / `large` (Figma references **M·32** and **L·36** as primary densities).

## Interactive demo

静态 / 交互页面路径：`**.design-spec/demos/components/input-ip.html`**（不是 `input.html`）。  
与 `studio_runtime.css` / `studio_runtime.js` 同步：在仓库根目录执行：

`python3 .design-spec/generator/generate_component_html_demos.py`

`[input-ip.html](../../demos/components/input-ip.html)`

## Relationship to Input

Documented separately from the multi-variant `[input.html](../../demos/components/input.html)` page; shares the same component token prefix `**input**` in generated token snapshots.