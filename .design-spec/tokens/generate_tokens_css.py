#!/usr/bin/env python3
from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, Iterable, Tuple


ROOT = Path(__file__).resolve().parents[1]  # .design-spec/
SRC = ROOT / "tokens" / "src"
DIST = ROOT / "tokens" / "dist"


REF_RE = re.compile(r"^\{([^}]+)\}$")


def load_json(path: Path) -> Dict[str, Any]:
    return json.loads(path.read_text(encoding="utf-8"))


def iter_leaf_tokens(obj: Any, prefix: Tuple[str, ...] = ()) -> Iterable[Tuple[Tuple[str, ...], Any]]:
    if isinstance(obj, dict):
        for k, v in obj.items():
            yield from iter_leaf_tokens(v, prefix + (k,))
    else:
        yield prefix, obj


def camel_to_kebab(s: str) -> str:
    # bgDefault -> bg-default, deepBlue -> deep-blue
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1-\2", s)
    return s.replace("_", "-").lower()


def css_var_name(kind: str, path: Tuple[str, ...]) -> str:
    # kind: core|semantic|component
    # path excludes leading "tokens"
    parts = [camel_to_kebab(p) for p in path]
    return f"--{kind}-" + "-".join(parts)


def resolve_ref(value: Any, scope: Dict[str, Any], visited: set[str]) -> Any:
    if not isinstance(value, str):
        return value
    m = REF_RE.match(value.strip())
    if not m:
        return value
    key = m.group(1)
    if key in visited:
        raise ValueError(f"Cyclic token reference detected: {' -> '.join(list(visited) + [key])}")
    visited.add(key)
    cur: Any = scope
    for part in key.split("."):
        if not isinstance(cur, dict) or part not in cur:
            raise KeyError(f"Missing referenced token '{key}'")
        cur = cur[part]
    return resolve_ref(cur, scope, visited)


def resolve_key(key: str, scope: Dict[str, Any], *, resolver) -> Any:
    cur: Any = scope
    for part in key.split("."):
        if not isinstance(cur, dict) or part not in cur:
            raise KeyError(f"Missing referenced token '{key}'")
        cur = cur[part]
    return resolver(cur)


def main() -> None:
    core = load_json(SRC / "core.json")["tokens"]
    semantic = load_json(SRC / "semantic.json")["tokens"]
    component = load_json(SRC / "component.json")["tokens"]

    # Resolve semantic refs against core, then component refs against semantic.
    semantic_resolved: Dict[Tuple[str, ...], Any] = {}
    for path, val in iter_leaf_tokens(semantic):
        semantic_resolved[path] = resolve_ref(val, core, visited=set())

    def resolve_semantic_value(v: Any) -> Any:
        # semantic leaf may reference core
        return resolve_ref(v, core, visited=set())

    component_resolved: Dict[Tuple[str, ...], Any] = {}
    for path, val in iter_leaf_tokens(component):
        # component leaf references semantic; semantic may reference core
        if isinstance(val, str):
            m = REF_RE.match(val.strip())
            if m:
                key = m.group(1)
                resolved = resolve_key(key, semantic, resolver=resolve_semantic_value)
                component_resolved[path] = resolved
                continue
        component_resolved[path] = val

    DIST.mkdir(parents=True, exist_ok=True)
    out = DIST / "tokens.css"

    lines = []
    lines.append(":root {")
    lines.append("  /* Primitive (core) */")
    for path, val in sorted(iter_leaf_tokens(core), key=lambda x: x[0]):
        # Only output leaf primitives as-is.
        if isinstance(val, (dict, list)):
            continue
        name = css_var_name("core", path)
        lines.append(f"  {name}: {val};")

    lines.append("")
    lines.append("  /* Semantic (resolved) */")
    for path, val in sorted(semantic_resolved.items(), key=lambda x: x[0]):
        name = css_var_name("semantic", path)
        lines.append(f"  {name}: {val};")

    lines.append("")
    lines.append("  /* Component (resolved) */")
    for path, val in sorted(component_resolved.items(), key=lambda x: x[0]):
        name = css_var_name("component", path)
        lines.append(f"  {name}: {val};")

    lines.append("}")
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"Wrote {out}")


if __name__ == "__main__":
    main()

