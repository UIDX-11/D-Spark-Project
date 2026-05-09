# Token / layout violation scan

- **Generated:** 2026-05-09 02:38 UTC
- **Tool:** `.design-spec/checks/scan_token_violations.py`

## Modes

- **Full report** (default): all sections below; process exits **0** (informational + backlog).
- **`--ci`**: exits **1** if **Blocking** is non-empty.

## Scope

| Region | Rule |
| --- | --- |
| **Blocking** | `studio_runtime.js`: `.style.* = ...` containing literal `px` without `var(--` (ripple geometry + `1px solid` excluded) |
| **Advisory** | `.design-spec/generator/studio_runtime.css` from `/* ---- Button…` to EOF: `Npx` without `var(--` / coarse allowlist |
| **Informational** | `.design-spec/generator/generate_component_html_demos.py` `_html_page` template: px in demo page shell |

## Summary

| Severity | Count |
| --- | ---: |
| Blocking | 0 |
| Advisory | 0 |
| Informational | 0 |

## 1. Blocking (CI gate)

_None._

## 2. Advisory: governed `studio_runtime.css`

_None._

## 3. Informational: `_html_page` demo shell

_None._

## Notes

- **Advisory** hits are common until each `ds-*` block is fully tokenized; use with `docs/COMPONENT_RUNTIME_SELF_AUDIT.md` to triage.
- **Informational** rows are expected for the shared HTML wrapper (`.wrap`, `.card`, …).
