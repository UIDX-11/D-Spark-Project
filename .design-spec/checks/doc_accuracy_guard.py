#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from dataclasses import dataclass
from pathlib import Path


REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_DIR = REPO_ROOT / ".design-spec" / "docs" / "components"
BEHAVIOR_CONFIG = REPO_ROOT / ".design-spec" / "sources" / "behavior-source.json"

REQUIRED_H2 = [
    "Best practices",
    "Layout patterns",
    "Aliases",
    "Anti-patterns",
    "Accessibility essentials",
]
RE_H2 = re.compile(r"^##\s+(.+?)\s*$")


@dataclass(frozen=True)
class FileIssue:
    path: Path
    message: str


def load_behavior_config() -> dict:
    if not BEHAVIOR_CONFIG.exists():
        return {"behaviorSource": "arco-vue", "forbiddenPatterns": []}
    return json.loads(BEHAVIOR_CONFIG.read_text(encoding="utf-8"))


def iter_component_docs() -> list[Path]:
    out: list[Path] = []
    for p in sorted(DOCS_DIR.glob("*.md")):
        if p.name in {"README.md", "intent-index.md", "_template.md"}:
            continue
        out.append(p)
    return out


def parse_h2_sections(text: str) -> set[str]:
    out: set[str] = set()
    for line in text.splitlines():
        m = RE_H2.match(line.strip())
        if m:
            out.add(m.group(1).strip().lower())
    return out


def check_required_sections(md_file: Path, text: str) -> list[FileIssue]:
    issues: list[FileIssue] = []
    sections = parse_h2_sections(text)
    for section in REQUIRED_H2:
        if section.lower() not in sections:
            issues.append(FileIssue(md_file, f"missing section: ## {section}"))
    return issues


def check_source_links(md_file: Path, text: str) -> list[FileIssue]:
    issues: list[FileIssue] = []
    if "Arco Vue" not in text:
        issues.append(FileIssue(md_file, "missing 'Arco Vue' reference"))
    if "arco.design/vue/component/" not in text:
        issues.append(FileIssue(md_file, "missing Arco Vue component URL"))
    if "Figma" not in text:
        issues.append(FileIssue(md_file, "missing Figma reference"))
    return issues


def check_forbidden_patterns(md_file: Path, text: str, patterns: list[str]) -> list[FileIssue]:
    issues: list[FileIssue] = []
    for pat in patterns:
        if re.search(re.escape(pat), text, flags=re.IGNORECASE):
            issues.append(FileIssue(md_file, f"contains forbidden pattern: {pat!r}"))
    return issues


def main() -> int:
    if not DOCS_DIR.exists():
        print(f"FAIL: missing docs dir: {DOCS_DIR}")
        return 1

    cfg = load_behavior_config()
    patterns = cfg.get("forbiddenPatterns", [])
    docs = iter_component_docs()
    strict = "--strict" in sys.argv
    errors: list[FileIssue] = []
    warnings: list[FileIssue] = []

    for md in docs:
        text = md.read_text(encoding="utf-8", errors="replace")
        warnings.extend(check_required_sections(md, text))
        warnings.extend(check_source_links(md, text))
        # Forbidden patterns are always hard errors.
        errors.extend(check_forbidden_patterns(md, text, patterns))

    if strict and warnings:
        errors.extend(warnings)

    if errors:
        print("FAIL: doc accuracy guard found blocking issues:")
        for issue in errors:
            rel = issue.path.relative_to(REPO_ROOT)
            print(f"- {rel}: {issue.message}")
        return 1

    if warnings:
        print(f"WARN: doc accuracy guard found {len(warnings)} non-blocking issues:")
        for issue in warnings:
            rel = issue.path.relative_to(REPO_ROOT)
            print(f"- {rel}: {issue.message}")

    mode = "strict" if strict else "baseline"
    print(f"PASS: doc accuracy guard checked {len(docs)} component docs ({mode} mode).")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
