#!/usr/bin/env bash
# Revert ONLY paths that are exclusive to InputNumber (docs + single generated demo page).
# Does NOT run `git restore` on shared generator sources or tokens — those affect every component demo.
#
# Usage (from repo root):
#   bash .design-spec/generator/revert-input-number-only.sh
#
# Shared files (require manual / scoped edit, not this script):
#   - .design-spec/generator/studio_runtime.js   (mountInputNumber + all other mounts)
#   - .design-spec/generator/studio_runtime.css  (input-number + other component rules)
#   - .design-spec/generator/generate_component_html_demos.py (input-number aside + all pages)

set -euo pipefail
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

DOC=".design-spec/docs/components/input-number.md"
DEMO=".design-spec/demos/components/input-number.html"

if git ls-files --error-unmatch "$DOC" >/dev/null 2>&1; then
  if git diff --quiet -- "$DOC" 2>/dev/null; then
    echo "OK: $DOC matches HEAD (nothing to restore)."
  else
    git restore -- "$DOC"
    echo "Restored tracked file: $DOC"
  fi
else
  echo "Skip: $DOC is not tracked by git."
fi

if [[ -f "$DEMO" ]]; then
  rm -f "$DEMO"
  echo "Removed generated demo: $DEMO"
  echo "Tip: regenerate all demos with your generator when ready."
else
  echo "No file at $DEMO (already absent)."
fi

echo
echo "Done. Other modified md/token files were not touched by this script."
