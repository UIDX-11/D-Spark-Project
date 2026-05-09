#!/usr/bin/env python3
"""
Structural validation for designer-facing Figma agent markdown.

Implements a lightweight subset of `skills/design-spec-figma-agent/reference-checks.md` B6
(Markdown integrity): required headings and canonical library reference in MASTER.

Run: python3 .design-spec/checks/validate_figma_agent_docs.py [--strict]

Exit codes: 0 = OK, 1 = failure or missing paths.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
MASTER_PATH = REPO_ROOT / ".design-spec" / "docs" / "figma-agent" / "MASTER.md"
COMPONENTS_DIR = REPO_ROOT / ".design-spec" / "docs" / "figma-agent" / "components"
SCENARIOS_DIR = REPO_ROOT / ".design-spec" / "docs" / "figma-agent" / "scenarios"

# Canonical library anchor from MASTER / governance (must stay consistent).
CANONICAL_FILE_KEY = "KJfy0GFDs8kLsXTzhTxAjd"

RE_H2 = re.compile(r"^##\s+(.+?)\s*$", re.MULTILINE)

# Each heading text is lowercased for matching.
COMPONENT_REQUIRED_SUBSTRINGS = ("intent", "variant", "token mapping", "figma")


def norm_sections(text: str) -> list[str]:
    return [m.group(1).strip().lower() for m in RE_H2.finditer(text)]


def sections_cover_required(headers: list[str], required: tuple[str, ...]) -> list[str]:
    missing: list[str] = []
    for needle in required:
        if not any(needle in h for h in headers):
            missing.append(needle)
    return missing


def check_master(path: Path) -> list[str]:
    errs: list[str] = []
    if not path.exists():
        return [f"missing {path.relative_to(REPO_ROOT)}"]
    body = path.read_text(encoding="utf-8", errors="replace")
    if CANONICAL_FILE_KEY not in body:
        errs.append(f"{path.relative_to(REPO_ROOT)}: missing canonical fileKey `{CANONICAL_FILE_KEY}`")
    if "figma.com/design/" not in body:
        errs.append(f"{path.relative_to(REPO_ROOT)}: missing Figma design URL")
    return errs


def check_component_md(path: Path, *, strict_pending: bool) -> list[str]:
    errs: list[str] = []
    text = path.read_text(encoding="utf-8", errors="replace")
    headers = norm_sections(text)
    for m in sections_cover_required(headers, COMPONENT_REQUIRED_SUBSTRINGS):
        errs.append(f"{path.relative_to(REPO_ROOT)}: missing heading covering '{m}'")

    if strict_pending and "pending" in text.lower() and "`TBD`" in text:
        # Informative only unless strict_pending — variant tables often keep TBD until Sequence A.
        pass
    return errs


def check_scenario_md(path: Path) -> list[str]:
    text = path.read_text(encoding="utf-8", errors="replace")
    headers = norm_sections(text)
    missing = sections_cover_required(headers, ("intent", "figma frame", "variable"))
    out = [f"{path.relative_to(REPO_ROOT)}: missing heading covering '{m}'" for m in missing]
    return out


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument(
        "--strict-pending",
        action="store_true",
        help="Reserved for future: fail if audit placeholders remain.",
    )
    args = ap.parse_args()

    errors: list[str] = []
    errors.extend(check_master(MASTER_PATH))

    if not COMPONENTS_DIR.exists():
        errors.append(f"missing directory {COMPONENTS_DIR.relative_to(REPO_ROOT)}")
    else:
        for md in sorted(COMPONENTS_DIR.glob("*.md")):
            errors.extend(check_component_md(md, strict_pending=args.strict_pending))

    if SCENARIOS_DIR.exists():
        for md in sorted(SCENARIOS_DIR.glob("*.md")):
            errors.extend(check_scenario_md(md))

    if errors:
        print("FAIL: validate_figma_agent_docs")
        for e in errors:
            print(f"- {e}")
        return 1

    print(
        "PASS: validate_figma_agent_docs (MASTER + "
        f"{len(list(COMPONENTS_DIR.glob('*.md'))) if COMPONENTS_DIR.exists() else 0} components + "
        f"{len(list(SCENARIOS_DIR.glob('*.md'))) if SCENARIOS_DIR.exists() else 0} scenarios)."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
