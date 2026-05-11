#!/usr/bin/env python3
"""Report literal px / raw hex in studio_runtime.css (tokenization backlog)."""

from __future__ import annotations

import re
from pathlib import Path

PX = re.compile(r":\s*(-?[\d.]+)\s*px\b")
REM = re.compile(r":\s*(-?[\d.]+)\s*rem\b")
HEX = re.compile(r":\s*(#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8}))\b")


def main() -> int:
    import argparse

    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--fail-if-px-over",
        type=int,
        metavar="N",
        help="Exit 1 if px literal count exceeds N (CI gate; tighten as tokenization progresses).",
    )
    args = ap.parse_args()

    root = Path(__file__).resolve().parents[2]
    css = root / ".design-spec" / "generator" / "studio_runtime.css"
    if not css.exists():
        raise SystemExit(f"Missing {css}")
    text = css.read_text(encoding="utf-8", errors="replace")
    px_hits = PX.findall(text)
    rem_hits = REM.findall(text)
    hex_hits = HEX.findall(text)
    px_count = len(px_hits)
    print(f"{css}: px literals ≈ {px_count}, rem ≈ {len(rem_hits)}, hex ≈ {len(hex_hits)}")
    # sample lines
    shown = 0
    for i, line in enumerate(text.splitlines(), 1):
        if PX.search(line) or HEX.search(line):
            if shown < 25:
                print(f"  L{i}: {line.strip()[:160]}")
            shown += 1
    if shown > 25:
        print(f"  … {shown - 25} more lines with px/hex matches")
    if args.fail_if_px_over is not None and px_count > args.fail_if_px_over:
        print(f"FAIL: px_count {px_count} > limit {args.fail_if_px_over}", flush=True)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
