#!/usr/bin/env python3
"""Deprecated: use `ensure_react_truth_source.py` (Arco Design Web React baseline)."""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
NEW = REPO_ROOT / ".design-spec" / "checks" / "ensure_react_truth_source.py"


def main() -> int:
    print("NOTE: ensure_vue_truth_source.py is deprecated; forwarding to ensure_react_truth_source.py")
    return subprocess.call([sys.executable, str(NEW)])


if __name__ == "__main__":
    raise SystemExit(main())
