#!/usr/bin/env python3
"""Replay generate_component_html_demos.py from a Cursor agent transcript (.jsonl).

Parses ApplyPatch (Add/Update) and StrReplace tool_use blocks in chronological order.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

TARGET = "generate_component_html_demos.py"
DEMO_BODY_SNIPPET = "_new_component_demo_body.py"


def _splice_demo_body(main_text: str, rep: str) -> str:
    """Replace `_component_demo_body` with `rep` and remove `_component_preview_block`.

    The transcript Shell assumed `def _index_body` appeared *before*
    `def _component_preview_block`. After replaying earlier patches, the
    opposite order is common — handle both.
    """
    s1 = main_text.index("def _component_demo_body(")
    i_idx = main_text.index("def _index_body(")
    i_prev = main_text.index("def _component_preview_block(")
    s4 = main_text.index("def main() -> int:")
    tail = rep.strip() + "\n\n"
    if i_idx < i_prev:
        # index → preview → main (original agent file order)
        return main_text[:s1] + tail + main_text[i_idx:i_prev] + main_text[s4:]
    # preview → index → main (replay order)
    return main_text[:s1] + tail + main_text[i_idx:]


def _is_splice_shell(cmd: str) -> bool:
    return (
        "def _component_demo_body(" in cmd
        and "new_text = text[:s1]" in cmd
        and DEMO_BODY_SNIPPET in cmd
    )


def _parse_add_file(patch: str) -> str:
    lines_out: list[str] = []
    in_add = False
    for line in patch.splitlines():
        if line.startswith("*** Add File:") and TARGET in line:
            in_add = True
            continue
        if in_add:
            if line.startswith("*** "):
                break
            if line.startswith("+"):
                lines_out.append(line[1:])
            elif line == "\\ No newline at end of file":
                continue
    return "\n".join(lines_out) + "\n"


def _parse_update_body(patch: str) -> list[str]:
    plines = patch.splitlines()
    start = None
    for i, line in enumerate(plines):
        if line.startswith("*** Update File:") and TARGET in line:
            start = i + 1
            break
    if start is None:
        raise ValueError("No Update File section for target")
    body: list[str] = []
    for line in plines[start:]:
        if line == "*** End Patch":
            break
        body.append(line)
    return body


def _parse_hunks(body: list[str]) -> list[list[tuple[str, str]]]:
    """Split update body on standalone @@ lines into hunks of (op, text).

    op is ' ' (context), '-', or '+'.
    """
    hunks: list[list[tuple[str, str]]] = []
    cur: list[tuple[str, str]] = []
    for line in body:
        if line == "@@":
            if cur:
                hunks.append(cur)
            cur = []
            continue
        if not line:
            continue
        op = line[0]
        rest = line[1:]
        if op not in " +-":
            raise ValueError(f"Bad patch line prefix {line[:80]!r}")
        cur.append((op, rest))
    if cur:
        hunks.append(cur)
    return hunks


def _find_sublist(haystack: list[str], needle: list[str], start: int = 0) -> int:
    if not needle:
        return start
    n = len(needle)
    for i in range(start, len(haystack) - n + 1):
        if haystack[i : i + n] == needle:
            return i
    return -1


def _apply_hunks_to_lines(lines: list[str], hunks: list[list[tuple[str, str]]]) -> None:
    pos = 0
    for hi, hunk in enumerate(hunks):
        has_change = any(op != " " for op, _ in hunk)
        if not has_change:
            seq = [t for op, t in hunk if op == " "]
            idx = _find_sublist(lines, seq, pos)
            if idx < 0:
                raise RuntimeError(
                    f"Hunk #{hi + 1}: context-only block not found (from line {pos}):\n"
                    + "\n".join(seq[:8])
                )
            pos = idx + len(seq)
            continue
        old_l: list[str] = []
        new_l: list[str] = []
        for op, t in hunk:
            if op == " ":
                old_l.append(t)
                new_l.append(t)
            elif op == "-":
                old_l.append(t)
            elif op == "+":
                new_l.append(t)
        idx = _find_sublist(lines, old_l, pos)
        if idx < 0:
            raise RuntimeError(
                f"Hunk #{hi + 1}: change block not found (from line {pos}):\n"
                + "\n".join(old_l[:10])
            )
        lines[idx : idx + len(old_l)] = new_l
        pos = idx + len(new_l)


def _apply_update_patch(content: str, patch: str) -> str:
    body = _parse_update_body(patch)
    hunks = _parse_hunks(body)
    lines = content.splitlines()
    _apply_hunks_to_lines(lines, hunks)
    out = "\n".join(lines)
    if content.endswith("\n"):
        out += "\n"
    return out


_OBSOLETE_MINIMAL = "    # Minimal demo scaffold + helpful token hints."
_OBSOLETE_PREVIEW = "    preview = _component_preview_block(spec.slug)"


def _collapse_preview_blank_line_in_source(content: str) -> str:
    """Later transcript patches were authored before a blank line existed between
    `{preview}` and the filter toolbar inside `_component_demo_body`. Collapse
    that gap so ApplyPatch hunks match.
    """
    a = (
        "            {preview}\n\n"
        '            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">'
    )
    b = (
        "            {preview}\n"
        '            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">'
    )
    if a in content:
        return content.replace(a, b, 1)
    return content


def _is_obsolete_minimal_to_preview_patch(patch: str, content: str) -> bool:
    """True when this Update repeats a change already folded into an earlier patch."""
    if _OBSOLETE_MINIMAL not in patch or _OBSOLETE_PREVIEW not in patch:
        return False
    if _OBSOLETE_MINIMAL in content.splitlines():
        return False
    return _OBSOLETE_PREVIEW in content.splitlines()


def _try_apply_update_patch(content: str, patch: str) -> tuple[str, bool]:
    """Apply an Update patch; return (new_content, applied).

    Skips one known redundant patch in this transcript (minimal-scaffold →
    preview) when the file already reflects the merged result.
    """
    try:
        return _apply_update_patch(content, patch), True
    except RuntimeError:
        if _is_obsolete_minimal_to_preview_patch(patch, content):
            return content, False
        raise


def replay(transcript_path: Path) -> str:
    content: str | None = None
    pending_demo_body: str | None = None
    patch_idx = 0
    str_idx = 0
    skipped_updates = 0
    skipped_str_replace = 0
    text = transcript_path.read_text(encoding="utf-8", errors="replace")
    for lineno, raw in enumerate(text.splitlines(), 1):
        try:
            o = json.loads(raw)
        except json.JSONDecodeError:
            continue
        if o.get("role") != "assistant":
            continue
        parts = (o.get("message") or {}).get("content") or []
        if not isinstance(parts, list):
            continue
        for part in parts:
            if not isinstance(part, dict) or part.get("type") != "tool_use":
                continue
            name = part.get("name")
            inp = part.get("input")
            if name == "ApplyPatch":
                if not isinstance(inp, str) or TARGET not in inp:
                    continue
                patch_idx += 1
                if "*** Add File:" in inp:
                    content = _parse_add_file(inp)
                elif "*** Update File:" in inp:
                    if content is None:
                        raise RuntimeError(f"Update patch #{patch_idx} before Add File")
                    if "+    token_prefix: str" in inp:
                        content = _collapse_preview_blank_line_in_source(content)
                    new_content, applied = _try_apply_update_patch(content, inp)
                    if not applied:
                        skipped_updates += 1
                        print(
                            f"[replay] skipped obsolete Update patch #{patch_idx} "
                            f"(jsonl line {lineno})",
                            file=sys.stderr,
                        )
                    content = new_content
                else:
                    raise RuntimeError(f"Unknown ApplyPatch kind at #{patch_idx}")
            elif name == "StrReplace":
                if not isinstance(inp, dict):
                    continue
                path = str(inp.get("path") or "")
                if TARGET not in path:
                    continue
                if content is None:
                    raise RuntimeError(f"StrReplace before Add File at jsonl ~{lineno}")
                old_s = inp.get("old_string")
                new_s = inp.get("new_string")
                if not isinstance(old_s, str) or not isinstance(new_s, str):
                    continue
                str_idx += 1
                if old_s not in content:
                    skipped_str_replace += 1
                    print(
                        f"[replay] skip StrReplace #{str_idx} (jsonl line {lineno}): "
                        f"old_string not in file ({old_s[:72]!r}…)",
                        file=sys.stderr,
                    )
                    continue
                content = content.replace(old_s, new_s, 1)
            elif name == "Write":
                if not isinstance(inp, dict):
                    continue
                path = str(inp.get("path") or "")
                if not path.endswith(DEMO_BODY_SNIPPET):
                    continue
                body = inp.get("contents")
                if not isinstance(body, str):
                    continue
                pending_demo_body = body
            elif name == "Shell":
                if not isinstance(inp, dict):
                    continue
                cmd = inp.get("command")
                if not isinstance(cmd, str) or not _is_splice_shell(cmd):
                    continue
                if pending_demo_body is None:
                    raise RuntimeError(
                        f"Shell splice at jsonl {lineno} but no pending {DEMO_BODY_SNIPPET} Write"
                    )
                if content is None:
                    raise RuntimeError(f"Shell splice at jsonl {lineno} before generator content")
                content = _splice_demo_body(content, pending_demo_body)
                pending_demo_body = None
                print(f"[replay] spliced studio demo body (jsonl line {lineno})", file=sys.stderr)
    if content is None:
        raise RuntimeError("No Add File for target in transcript")
    return content


def main() -> int:
    if len(sys.argv) < 2:
        print(
            "Usage: replay_generator_from_transcript.py <transcript.jsonl> [out.py]",
            file=sys.stderr,
        )
        return 2
    src = Path(sys.argv[1]).expanduser()
    out = replay(src)
    if len(sys.argv) >= 3:
        Path(sys.argv[2]).write_text(out, encoding="utf-8")
    else:
        sys.stdout.write(out)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
