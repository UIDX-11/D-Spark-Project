#!/usr/bin/env python3
"""Extract fenced JSON `Spec block (atomic)` from component markdown and
validate against `.design-spec/schemas/spec-block.schema.json`.

Lightweight check: enforces `schemaVersion`, `kind: atomic`, and required
`bindings` shape without pulling in heavy JSON-Schema deps.

Usage:
    python3 .design-spec/checks/validate_spec_blocks.py [--components <slug>...]
Exit code 0 if all pass, 1 otherwise.
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
COMPONENTS_DIR = ROOT / "docs" / "components"
SPEC_BLOCK_RE = re.compile(r"^## Spec block \(atomic\)\s*\n+```json\n(.+?)\n```", re.DOTALL | re.MULTILINE)


def validate_atomic(block: dict[str, Any], path: Path) -> list[str]:
    errors: list[str] = []
    if block.get("schemaVersion") != "0.1.0":
        errors.append(f"{path.name}: schemaVersion must be '0.1.0' (got {block.get('schemaVersion')!r})")
    if block.get("kind") != "atomic":
        errors.append(f"{path.name}: kind must be 'atomic' (got {block.get('kind')!r})")
    bindings = block.get("bindings")
    if not isinstance(bindings, list) or not bindings:
        errors.append(f"{path.name}: bindings must be a non-empty array")
    else:
        for i, b in enumerate(bindings):
            if not isinstance(b, dict):
                errors.append(f"{path.name}: bindings[{i}] must be object")
                continue
            if "figmaPath" not in b:
                errors.append(f"{path.name}: bindings[{i}] missing 'figmaPath'")
            if "cssVar" not in b:
                errors.append(f"{path.name}: bindings[{i}] missing 'cssVar'")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--components", nargs="*", default=None,
                        help="Optional component slugs to limit validation")
    args = parser.parse_args()

    md_files = sorted(COMPONENTS_DIR.glob("*.md"))
    if args.components:
        wanted = set(args.components)
        md_files = [p for p in md_files if p.stem in wanted]

    seen, all_errors = 0, []
    for md in md_files:
        text = md.read_text(encoding="utf-8")
        m = SPEC_BLOCK_RE.search(text)
        if not m:
            continue
        seen += 1
        try:
            block = json.loads(m.group(1))
        except json.JSONDecodeError as e:
            all_errors.append(f"{md.name}: invalid JSON — {e}")
            continue
        all_errors.extend(validate_atomic(block, md))

    if all_errors:
        print(f"FAIL — {len(all_errors)} validation error(s) across {seen} block(s):")
        for e in all_errors:
            print(f"  - {e}")
        return 1
    print(f"OK — {seen} atomic spec block(s) validated against schema 0.1.0.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
