#!/usr/bin/env python3
"""
Scan component MD for open alignment markers (TBD / 待补 / 待补充 / FIXME).
Writes `.design-spec/docs/reports/CLOSE_MD_GAPS.md`.
"""

from __future__ import annotations

import re
from pathlib import Path

SKIP = {"README.md", "_template.md", "intent-index.md"}
PATTERNS = [
    re.compile(r"TBD", re.I),
    re.compile(r"待补|待补充|待对齐|待填"),
    re.compile(r"\bFIXME\b|\bTODO\b"),
]


def main() -> int:
    root = Path(__file__).resolve().parents[2]
    comp = root / ".design-spec" / "docs" / "components"
    out = root / ".design-spec" / "docs" / "reports" / "CLOSE_MD_GAPS.md"
    out.parent.mkdir(parents=True, exist_ok=True)
    lines = [
        "# Close-MD-gaps 扫描（机器生成）",
        "",
        "在「MD–HTML–Figma 三边」闭项前，下列文件仍含占位或待办标记。",
        "",
        "| 文件 | 命中示例 |",
        "|------|----------|",
    ]
    for p in sorted(comp.glob("*.md")):
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        hits: list[str] = []
        for pat in PATTERNS:
            for m in pat.finditer(text):
                start = max(0, m.start() - 20)
                end = min(len(text), m.end() + 40)
                snippet = " ".join(text[start:end].split())
                if snippet not in hits:
                    hits.append(snippet[:120])
        if hits:
            rel = str(p.relative_to(root))
            lines.append(f"| `{rel}` | {hits[0]} |")

    lines.append("")
    out.write_text("\n".join(lines), encoding="utf-8")
    print(f"Wrote {out}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
