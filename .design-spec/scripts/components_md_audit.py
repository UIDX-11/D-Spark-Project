#!/usr/bin/env python3
"""
Lightweight audit of `.design-spec/docs/components/*.md`:
required headings, References, Figma file key presence.

Appends summary to `.design-spec/docs/reports/COMPONENTS_MD_AUDIT.md`.
"""

from __future__ import annotations

import re
from pathlib import Path

SKIP = {"README.md", "_template.md", "intent-index.md"}
FILE_KEY = "KJfy0GFDs8kLsXTzhTxAjd"
H2_REQUIRED = {"references", "level"}


def main() -> int:
    root = Path(__file__).resolve().parents[2]
    comp = root / ".design-spec" / "docs" / "components"
    out = root / ".design-spec" / "docs" / "reports" / "COMPONENTS_MD_AUDIT.md"
    out.parent.mkdir(parents=True, exist_ok=True)

    rows: list[str] = []
    for p in sorted(comp.glob("*.md")):
        if p.name in SKIP:
            continue
        text = p.read_text(encoding="utf-8", errors="replace")
        lower = {m.group(1).strip().lower() for m in re.finditer(r"^##\s+(.+)$", text, re.M)}
        missing = sorted(H2_REQUIRED - lower)
        has_figma = FILE_KEY in text or "figma.com/design" in text
        title_ok = bool(re.search(r"^#\s*Component:", text, re.M))
        flags: list[str] = []
        if not title_ok:
            flags.append("missing `# Component:` title")
        if missing:
            flags.append("missing H2: " + ", ".join(missing))
        if not has_figma:
            flags.append("no Figma URL detected")
        if len(text) < 400:
            flags.append("very short doc (zombie?)")

        rel = str(p.relative_to(root))
        rows.append(
            f"| `{rel}` | {'; '.join(flags) if flags else 'OK'} |"
        )

    body = "\n".join(
        [
            "# Components MD 审计（机器生成）",
            "",
            f"检查项：`# Component:` 标题、## Level、## References、Figma `{FILE_KEY}` 或 figma 链接、异常短文。",
            "",
            "| 文件 | 结果 |",
            "|------|------|",
            *rows,
            "",
        ]
    )
    out.write_text(body, encoding="utf-8")
    print(f"Wrote {out} ({len(rows)} files)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
