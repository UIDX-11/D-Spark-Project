# D-Spark design-spec · JSON blocks

混合 `design.md` 中 fenced JSON/YAML 的校验入口：**`spec-block.schema.json`**（`oneOf` 各 `kind`）。

- 示例：`examples/layout-protocol.example.json`
- 版本：各块顶层 **`schemaVersion`**（当前 **`0.1.0`**）；破坏性变更时递增并更新对外 Skill 的迁移说明。

使用方式：在 CI 或本地用 `ajv-cli` 等工具校验从 Markdown 提取的 JSON 块（本仓库未强制接入 CI，由 `design-spec-hybrid-spec` Skill 描述推荐命令）。
