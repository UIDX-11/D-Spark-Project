#!/usr/bin/env python3
"""Emit P0/P1 slug lists from figma_truth_table.json for coding priority."""

from __future__ import annotations

import json
from pathlib import Path


def main() -> int:
    root = Path(__file__).resolve().parents[2]
    cfg = root / ".design-spec" / "config" / "figma_truth_table.json"
    out = root / ".design-spec" / "docs" / "reports" / "FIGMA_SLUG_PRIORITY.md"
    data = json.loads(cfg.read_text(encoding="utf-8"))
    rows = data.get("rows") or {}
    p0: list[str] = []
    p1: list[str] = []
    for slug in sorted(rows.keys()):
        entry = rows[slug] or {}
        urls = entry.get("figma_urls") or []
        if isinstance(urls, list) and len(urls) > 0:
            p0.append(slug)
        else:
            p1.append(slug)
    lines = [
        "# Figma 链接优先序（机器生成）",
        "",
        f"源：[`figma_truth_table.json`](../../config/figma_truth_table.json) · 生成：`python3 .design-spec/scripts/figma_slug_priority.py`",
        "",
        "## P0 — 已填 Figma canonical 链接（应先 coding / 对稿）",
        "",
        "下列 slug 的 `figma_urls` 非空，建议按 [intent-index](../components/intent-index.md) 复杂度穿插推进。",
        "",
        "| slug | display_name |",
        "|------|--------------|",
    ]
    for slug in p0:
        disp = (rows.get(slug) or {}).get("display_name", slug)
        lines.append(f"| `{slug}` | {disp} |")
    lines.extend(
        [
            "",
            "## P1 — 尚未填 Figma 链接（先补真源表再进 P0）",
            "",
            "| slug | display_name |",
            "|------|--------------|",
        ]
    )
    for slug in p1:
        disp = (rows.get(slug) or {}).get("display_name", slug)
        lines.append(f"| `{slug}` | {disp} |")
    lines.extend(
        [
            "",
            "## 与 Arco / HTML 流水线的关系",
            "",
            "- **行为比对**：见 [`ARCO_PR_PRE_CHECKLIST.md`](./ARCO_PR_PRE_CHECKLIST.md) 与 [`demos-react`](../../demos-react/)（`ComponentStateMatrix.tsx`）。",
            "- **静态 HTML**：`.design-spec/demos/components/<slug>.html`（Path B 视觉 + `studio_runtime` 交互子集）。",
            "",
        ]
    )
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out} (P0={len(p0)}, P1={len(p1)})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
