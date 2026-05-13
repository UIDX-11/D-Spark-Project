---
name: design-spec-tokens-ci
description: >-
  D-Spark design tokens: .design-spec/tokens/src JSON, tokens/dist/tokens.css,
  and token governance script scan_token_violations.py. Use when the user mentions
  token、语义色、component token、regenerate tokens、scan_token_violations、
  CI 扫描、裸 hex、或编辑 .design-spec/tokens/ or .design-spec/checks/.
disable-model-invocation: false
---

# Design-spec · Token 与扫描

## 路径

- **源**：`.design-spec/tokens/src/`（如 `component.json`、`semantic.json`）
- **产物**：`.design-spec/tokens/dist/tokens.css`（若由构建生成，改源后需重新跑项目约定命令）
- **扫描**：`.design-spec/checks/scan_token_violations.py`  
  说明见：`.design-spec/checks/README.md`

## 常用命令

```bash
python3 .design-spec/checks/scan_token_violations.py
python3 .design-spec/checks/scan_token_violations.py --ci
```

## 原则

1. **单一真源**：业务与 demo 引用的变量名须能在 **`tokens.css`** 中找到（或文档明确写「待入库」）。
2. **改 component token** 时同步检查 **`docs/components/<slug>.md`** 的绑定表与「数值比对」行。
3. **CI**：`--ci` 失败视为阻塞项，优先修 **源 JSON / CSS** 或 **违规文件**，避免在扫描脚本里随意降级规则除非产品同意。
