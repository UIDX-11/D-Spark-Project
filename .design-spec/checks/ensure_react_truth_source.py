#!/usr/bin/env python3
"""Fail if component docs contain forbidden Arco Vue / Vue-doc references (React baseline)."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
CONFIG_PATH = REPO_ROOT / ".design-spec" / "sources" / "behavior-source.json"


def load_config() -> dict:
    if not CONFIG_PATH.exists():
        raise SystemExit(f"Missing config: {CONFIG_PATH}")
    return json.loads(CONFIG_PATH.read_text(encoding="utf-8"))


def iter_component_docs(scope: str) -> list[Path]:
    docs_root = REPO_ROOT / scope
    if not docs_root.exists():
        raise SystemExit(f"Missing docs scope: {docs_root}")
    out: list[Path] = []
    for md in sorted(docs_root.glob("*.md")):
        if md.name in {"README.md", "intent-index.md", "_template.md"}:
            continue
        out.append(md)
    return out


def scan_forbidden_patterns(docs: list[Path], patterns: list[str]) -> list[str]:
    errors: list[str] = []
    compiled = [re.compile(re.escape(p), re.IGNORECASE) for p in patterns]
    for md in docs:
        text = md.read_text(encoding="utf-8", errors="replace")
        for pattern, regex in zip(patterns, compiled):
            if regex.search(text):
                rel = md.relative_to(REPO_ROOT)
                errors.append(f"{rel}: forbidden pattern {pattern!r}")
    return errors


def main() -> int:
    cfg = load_config()
    if cfg.get("behaviorSource") != "arco-react":
        print("SKIP: behaviorSource is not arco-react")
        return 0

    docs = iter_component_docs(cfg["docsScope"])
    errors = scan_forbidden_patterns(docs, cfg.get("forbiddenPatterns", []))
    if errors:
        print("FAIL: React truth-source guard detected forbidden Vue-era references:")
        for err in errors:
            print(f"- {err}")
        return 1

    print(f"PASS: React truth-source guard checked {len(docs)} component docs.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
