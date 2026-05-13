#!/usr/bin/env python3
"""Token layering governance for D-Spark design tokens.

Enforces the layering contract:
- `core.json` leaves must be literals (no `{...}` references).
- `semantic.json` references must resolve to a path that exists in `core.json`.
- `component.json` references must resolve to a path that exists in `semantic.json`
  (component MUST NOT reach into core directly).
- Optional warnings:
  - Bare hex / rgba colors in `semantic.json` and `component.json`.
  - Bare panel-grade shadow strings in `component.json` outside the table.pinned.* allow-list.

Exit code:
- 0: no violations (warnings allowed unless --strict).
- 1: violations found.

Usage:
    python3 .design-spec/checks/scan_token_violations.py [--strict] [--json]
"""
from __future__ import annotations

import argparse
import json
import re
import sys
from pathlib import Path
from typing import Any, Iterable, List, Tuple

ROOT = Path(__file__).resolve().parents[1]  # .design-spec/
SRC = ROOT / "tokens" / "src"

REF_RE = re.compile(r"^\{([^}]+)\}$")
HEX_RE = re.compile(r"#[0-9A-Fa-f]{3,8}\b")
RGBA_RE = re.compile(r"rgba?\(")
SHADOW_HINT_RE = re.compile(r"\d+px\s+\d+px")

# Paths within component.json where bare component-specific values are tolerated
# (still reported as warnings, not errors). Update this list when the design
# intentionally keeps a component-anatomy literal.
COMPONENT_SHADOW_ALLOWLIST_PREFIXES: tuple[tuple[str, ...], ...] = (
    ("table", "pinned"),
)


def load(path: Path) -> dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def iter_leaves(obj: Any, prefix: Tuple[str, ...] = ()) -> Iterable[Tuple[Tuple[str, ...], Any]]:
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from iter_leaves(v, prefix + (k,))
    else:
        yield prefix, obj


def path_exists(scope: dict[str, Any], key: str) -> bool:
    cur: Any = scope
    for part in key.split("."):
        if not isinstance(cur, dict) or part not in cur:
            return False
        cur = cur[part]
    return True


def is_under(prefix: Tuple[str, ...], allow: tuple[tuple[str, ...], ...]) -> bool:
    return any(prefix[: len(p)] == p for p in allow)


def fmt(prefix: Tuple[str, ...]) -> str:
    return ".".join(prefix)


def scan(strict: bool = False) -> Tuple[List[str], List[str]]:
    """Return (errors, warnings)."""
    core = load(SRC / "core.json")["tokens"]
    semantic = load(SRC / "semantic.json")["tokens"]
    component = load(SRC / "component.json")["tokens"]

    errors: List[str] = []
    warnings: List[str] = []

    # 1) core.json: leaves must be literals (no references).
    for path, val in iter_leaves(core):
        if isinstance(val, str) and REF_RE.match(val.strip()):
            errors.append(
                f"core.json: '{fmt(path)}' has reference '{val}' — core leaves must be literals."
            )

    # 2) semantic.json: references must point into core; no cross-semantic refs.
    for path, val in iter_leaves(semantic):
        if not isinstance(val, str):
            continue
        m = REF_RE.match(val.strip())
        if m:
            key = m.group(1)
            if not path_exists(core, key):
                errors.append(
                    f"semantic.json: '{fmt(path)}' references '{{{key}}}' — "
                    f"not found in core.json (semantic may only reference core)."
                )
        else:
            # Non-reference string — likely a literal. Flag colors / shadows.
            if HEX_RE.search(val) or RGBA_RE.search(val):
                warnings.append(
                    f"semantic.json: '{fmt(path)}' holds a bare color literal '{val}' — "
                    f"consider promoting to core."
                )
            elif SHADOW_HINT_RE.search(val):
                warnings.append(
                    f"semantic.json: '{fmt(path)}' holds a bare shadow literal '{val}' — "
                    f"consider promoting to core."
                )

    # 3) component.json: references must resolve in semantic (NOT in core directly).
    for path, val in iter_leaves(component):
        if isinstance(val, str):
            m = REF_RE.match(val.strip())
            if m:
                key = m.group(1)
                if not path_exists(semantic, key):
                    if path_exists(core, key):
                        errors.append(
                            f"component.json: '{fmt(path)}' references '{{{key}}}' "
                            f"that exists only in core.json — component MUST go through semantic."
                        )
                    else:
                        errors.append(
                            f"component.json: '{fmt(path)}' references '{{{key}}}' — "
                            f"not found in semantic.json."
                        )
            else:
                is_shadow_like = bool(SHADOW_HINT_RE.search(val))
                if is_shadow_like and is_under(path, COMPONENT_SHADOW_ALLOWLIST_PREFIXES):
                    # documented component-anatomy exception — skip both checks.
                    continue
                if HEX_RE.search(val) or RGBA_RE.search(val):
                    warnings.append(
                        f"component.json: '{fmt(path)}' has bare color/rgba '{val}' — "
                        f"route through semantic (e.g. {{bg.*}}, {{opacity.*}})."
                    )
                elif is_shadow_like:
                    warnings.append(
                        f"component.json: '{fmt(path)}' has bare shadow '{val}' — "
                        f"route through semantic (e.g. {{shadow.panel}})."
                    )

    if strict:
        errors.extend(warnings)
        warnings = []

    return errors, warnings


def main() -> int:
    parser = argparse.ArgumentParser(description="Scan token reference layering violations.")
    parser.add_argument("--strict", action="store_true", help="Treat warnings as errors.")
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of text.")
    args = parser.parse_args()

    errors, warnings = scan(strict=args.strict)

    if args.json:
        payload = {"errors": errors, "warnings": warnings}
        print(json.dumps(payload, indent=2, ensure_ascii=False))
    else:
        if errors:
            print(f"FAIL — {len(errors)} token violation(s):")
            for e in errors:
                print(f"  - {e}")
        else:
            print("OK — no token layering violations.")
        if warnings:
            print(f"\nWARN — {len(warnings)} note(s):")
            for w in warnings:
                print(f"  - {w}")

    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
