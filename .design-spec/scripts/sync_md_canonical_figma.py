#!/usr/bin/env python3
"""
Ensure each component MD under docs/components includes at least one Figma URL
whose node-id matches figma_truth_table.json (official file key).

Idempotent: skips MD that already reference any canonical node-id for that slug.

Run from repo root:
  python3 .design-spec/scripts/sync_md_canonical_figma.py
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


def _nodes_in_md(text: str) -> set[str]:
    out: set[str] = set()
    for line in text.splitlines():
        if FILE_KEY not in line and "figma.com/design" not in line:
            continue
        for m in RE_NODE.finditer(line):
            out.add(m.group(1))
    return out


def main() -> int:
    root = _repo_root()
    cfg = root / ".design-spec" / "config" / "figma_truth_table.json"
    data = json.loads(cfg.read_text(encoding="utf-8"))
    rows: dict[str, dict] = data.get("rows") or {}
    components_dir = root / ".design-spec" / "docs" / "components"

    updated = 0
    for slug, row in sorted(rows.items()):
        urls = row.get("figma_urls") or []
        nodes = [_norm_node(x) for x in (row.get("figma_node_ids") or [])]
        if not urls or not nodes:
            continue
        md_path = components_dir / f"{slug}.md"
        if not md_path.exists() or md_path.name in SKIP_MD:
            continue
        text = md_path.read_text(encoding="utf-8")
        md_nodes = _nodes_in_md(text)
        canon = set(nodes)
        if md_nodes & canon:
            continue
        primary = urls[0]
        bullet = (
            f"- Figma（Light，真源表 canonical / `figma_truth_table.json`）: "
            f"[Primary node]({primary})\n"
        )
        m = re.search(r"^## References\s*\n", text, re.MULTILINE)
        if not m:
            print(f"skip {slug}: no ## References heading")
            continue
        insert_at = m.end()
        new_text = text[:insert_at] + bullet + text[insert_at:]
        md_path.write_text(new_text, encoding="utf-8")
        updated += 1
        print(f"updated {slug}.md")

    print(f"Done. Patched {updated} files.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
