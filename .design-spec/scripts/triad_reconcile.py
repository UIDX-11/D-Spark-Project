#!/usr/bin/env python3
"""
MD–HTML–Figma triad reconciliation.

Reads `.design-spec/config/figma_truth_table.json`, scans component MD + generated HTML,
and writes `.design-spec/docs/reports/MD_HTML_Figma_TRIAD.md`.

Run from repo root:
  python3 .design-spec/scripts/triad_reconcile.py
"""

from __future__ import annotations

import json
import re
from pathlib import Path

FILE_KEY = "KJfy0GFDs8kLsXTzhTxAjd"
RE_NODE = re.compile(r"node-id=(\d+-\d+)")
SKIP_MD = {"README.md", "_template.md", "intent-index.md"}


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[2]


def _norm_node(n: str) -> str:
    return n.replace(":", "-")


def _nodes_in_md(text: str) -> list[str]:
    """node-id values on lines that reference the official design file."""
    out: list[str] = []
    for line in text.splitlines():
        if FILE_KEY not in line and "figma.com/design" not in line:
            continue
        for m in RE_NODE.finditer(line):
            nid = m.group(1)
            if nid not in out:
                out.append(nid)
    return out


def _html_has_slug_meta(html: str, slug: str) -> bool:
    return f'name="ds:component-slug" content="{slug}"' in html


def main() -> int:
    root = _repo_root()
    cfg = root / ".design-spec" / "config" / "figma_truth_table.json"
    if not cfg.exists():
        raise SystemExit(f"Missing {cfg}")

    data = json.loads(cfg.read_text(encoding="utf-8"))
    rows: dict[str, dict] = data.get("rows") or {}

    components_dir = root / ".design-spec" / "docs" / "components"
    demos_dir = root / ".design-spec" / "demos" / "components"
    report_path = root / ".design-spec" / "docs" / "reports" / "MD_HTML_Figma_TRIAD.md"
    report_path.parent.mkdir(parents=True, exist_ok=True)

    md_slugs: set[str] = set()
    for p in components_dir.glob("*.md"):
        if p.name in SKIP_MD:
            continue
        stem = p.stem
        md_slugs.add(stem.replace("_", "-"))

    truth_slugs = set(rows.keys())

    lines: list[str] = [
        "# MD–HTML–Figma 三边对账表（机器生成）",
        "",
        "真源节点列表：`.design-spec/config/figma_truth_table.json`。",
        "生成命令：`python3 .design-spec/scripts/triad_reconcile.py`",
        "",
        "| 组件ID | MD 路径 | HTML 路径 | 真源表 node（canonical） | MD 中出现的 node-id | HTML meta slug | 缺失 / 不一致（摘要） |",
        "|--------|---------|-----------|---------------------------|---------------------|----------------|------------------------|",
    ]

    all_slugs = sorted(md_slugs | truth_slugs)
    for slug in all_slugs:
        md_path = components_dir / f"{slug}.md"
        html_path = demos_dir / f"{slug}.html"
        md_rel = f".design-spec/docs/components/{slug}.md"
        html_rel = f".design-spec/demos/components/{slug}.html"

        truth_nodes = [_norm_node(x) for x in (rows.get(slug) or {}).get("figma_node_ids") or []]
        md_nodes: list[str] = []
        if md_path.exists():
            md_nodes = [_norm_node(x) for x in _nodes_in_md(md_path.read_text(encoding="utf-8", errors="replace"))]

        issues: list[str] = []
        if slug in truth_slugs and slug not in md_slugs:
            issues.append("真源表有行但缺 MD")
        if slug in md_slugs and slug not in truth_slugs:
            issues.append("有 MD 但真源表无行")
        if not md_path.exists():
            issues.append("缺 MD 文件")
        if not html_path.exists():
            issues.append("缺 HTML demo")
        elif truth_nodes:
            html_text = html_path.read_text(encoding="utf-8", errors="replace")
            if not _html_has_slug_meta(html_text, slug):
                issues.append("HTML 缺 meta ds:component-slug（请重跑 HTML 生成器）")
            canon = set(truth_nodes)
            mdset = set(md_nodes)
            if canon and not mdset.intersection(canon):
                issues.append("MD References 未出现任一 canonical node-id")
            elif mdset and canon and mdset != canon:
                extra = sorted(mdset - canon)
                miss = sorted(canon - mdset)
                if extra:
                    issues.append(f"MD 多出 node vs 真源表: {', '.join(extra[:4])}")
                if miss:
                    issues.append(f"MD 未覆盖真源表 node: {', '.join(miss[:4])}")

        truth_cell = ", ".join(truth_nodes[:3]) + ("…" if len(truth_nodes) > 3 else "")
        md_cell = ", ".join(md_nodes[:3]) + ("…" if len(md_nodes) > 3 else "")
        meta_cell = "—"
        if html_path.exists():
            ht = html_path.read_text(encoding="utf-8", errors="replace")
            meta_cell = "OK" if _html_has_slug_meta(ht, slug) else "missing"

        issue_cell = "; ".join(issues) if issues else "—"
        lines.append(
            f"| `{slug}` | {md_rel} | {html_rel} | {truth_cell or '—'} | {md_cell or '—'} | {meta_cell} | {issue_cell} |"
        )

    lines.extend(
        [
            "",
            "## 集合差集",
            "",
            f"- 仅 MD：`{sorted(md_slugs - truth_slugs)}`",
            f"- 仅真源表：`{sorted(truth_slugs - md_slugs)}`",
            "",
        ]
    )

    report_path.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {report_path} ({len(all_slugs)} rows)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
