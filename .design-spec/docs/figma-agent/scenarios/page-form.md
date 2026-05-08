# Scenario / 场景：Form page（表单页）

> **Prerequisite**: Component MD for inputs, buttons, and layout exists under `../components/`. Run **Sequence A** after Figma changes.

---

## 1. Intent / 意图

**中文**  
标准 B 端表单页：页头、工具区、主表单区、提交区；校验与错误态可访问。

**English**  
Standard admin form page: header, optional toolbar, main form, submit region; validation and errors are accessible.

---

## 2. Figma frame structure / 画板结构

| Region ZH | Region EN | Typical components |
|-----------|-----------|-------------------|
| 页头 | Page header | PageHeader |
| 主表单 | Main form | Form, Input, Select, Button |
| 空态/错误 | Empty / error | Patterns from component + page-level |

---

## 3. Variable & library mandate / 变量与组件库

Same as [MASTER.md](../MASTER.md): approved collections + published team library only.

---

## 4. Layout & Auto Layout / 布局约定

- ZH: 主列为单栏 Auto Layout；字段组之间使用规范间距变量。
- EN: Single-column auto layout for main stack; vertical gaps from spacing variables.

---

## 5. Do / Don’t

### Do

- ZH: 提交与取消成对出现；主按钮唯一。
- EN: Pair submit and cancel; one primary button.

### Don’t

- ZH: 勿在表单区使用非库表格冒充布局栅格。
- EN: Do not improvise grid with non-library tables.

---

## 6. Reference component docs / 引用组件文档

| Component | MD path |
|-----------|---------|
| Button | [../components/button.md](../components/button.md) |
| Input | [../components/input.md](../components/input.md) |
