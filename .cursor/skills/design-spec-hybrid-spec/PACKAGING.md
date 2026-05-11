# 对外镜像（任意 AI 工具）

1. 复制 **`SKILL.md`** → 目标仓库根或 `skills/design-spec-hybrid-spec/SKILL.md`。
2. 复制 **`.design-spec/schemas/`** 整个目录（至少 `spec-block.schema.json` + `examples/`）。
3. 约定消费者通过 **git submodule** 或 **sparse checkout** 挂载本仓库的 **`.design-spec/`**（含 `tokens/dist/tokens.css`、`docs/foundations`、`assets/icons`）。
4. **版本**：与 `spec-block.schema.json` 中 **`schemaVersion: 0.1.0`** 对齐；破坏性变更时递增并在此文件记录迁移摘要。
5. **许可**：Figma 文件访问权限、Arco Design、导出 SVG 的版权由使用方自行合规。
