#!/usr/bin/env python3
from __future__ import annotations

import html
import importlib.util
import json
import re
from dataclasses import dataclass
from pathlib import Path


RE_TITLE = re.compile(r"^#\s*Component:\s*(.+?)\s*$", re.IGNORECASE)
RE_H2 = re.compile(r"^##\s+(.+?)\s*$")
RE_MD_LINK = re.compile(r"\[([^\]]+)\]\((https?://[^)]+)\)")


@dataclass(frozen=True)
class ComponentSpec:
    slug: str
    title: str
    token_prefix: str
    source_path: Path


def _kebab(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r"[^a-z0-9]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s or "component"


def _read_title(md_path: Path) -> str:
    text = md_path.read_text(encoding="utf-8", errors="replace")
    for line in text.splitlines()[:40]:
        m = RE_TITLE.match(line.strip())
        if m:
            return m.group(1).strip()
    # fallback: filename without extension
    return md_path.stem


def _read_md_sections(md_path: Path) -> dict[str, str]:
    text = md_path.read_text(encoding="utf-8", errors="replace")
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for line in text.splitlines():
        m = RE_H2.match(line.strip())
        if m:
            current = m.group(1).strip().lower()
            sections[current] = []
            continue
        if current is not None:
            sections[current].append(line)
    return {k: "\n".join(v).strip() for k, v in sections.items()}


def _first_non_empty_line(text: str) -> str:
    for line in text.splitlines():
        s = line.strip()
        if s:
            return s
    return ""


def _md_inline_to_plain(text: str) -> str:
    # Keep this lightweight; we only need a readable hint sentence in demo cards.
    text = RE_MD_LINK.sub(r"\1", text)
    text = re.sub(r"[`*_#>|]", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def _collect_components(components_dir: Path) -> list[ComponentSpec]:
    out: list[ComponentSpec] = []
    for md_path in sorted(components_dir.glob("*.md")):
        if md_path.name in {"README.md", "intent-index.md", "_template.md"}:
            continue
        title = _read_title(md_path)
        slug = _kebab(md_path.stem)
        token_prefix = _token_prefix_for_slug(slug)
        out.append(ComponentSpec(slug=slug, title=title, token_prefix=token_prefix, source_path=md_path))
    return out


def _token_prefix_for_slug(slug: str) -> str:
    """
    Map doc slug -> tokens.css component prefix.
    Tokens are generated from component.json keys (camelCase -> kebab-case).
    Some docs use compact names (pageheader/pincode/treeselect) while tokens use hyphenated names.
    """
    overrides = {
        "pageheader": "page-header",
        "pincode": "pin-code",
        "treeselect": "tree-select",
        # Input-Range: own doc/demo slug; shares Input surface tokens until range-specific keys exist.
        "input-range": "input",
        "input-adornment": "input",
        "input-ip": "input",
    }
    return overrides.get(slug, slug)


def _html_page(title: str, body: str, tokens_href: str, *, head_extra: str = "") -> str:
    safe_title = html.escape(title)
    extra = head_extra.strip()
    extra_block = (extra + "\n") if extra else ""
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{safe_title} — D.Spark Design System Demo</title>
{extra_block}    <link rel="stylesheet" href="{html.escape(tokens_href)}" />
    <style>
      :root {{
        color-scheme: light;
      }}
      body {{
        margin: 0;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
          "Segoe UI Emoji";
        background: var(--semantic-bg-page, #f7f7f7);
        color: var(--semantic-text-primary, #222);
      }}
      a {{
        color: var(--semantic-text-link, #506daf);
        text-decoration: none;
      }}
      a:hover {{
        text-decoration: underline;
      }}
      .wrap {{
        max-width: 1100px;
        margin: 24px auto;
        padding: 0 16px;
      }}
      .top {{
        display: flex;
        align-items: baseline;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 16px;
      }}
      .card {{
        background: var(--semantic-bg-surface, #fff);
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        border-radius: 12px;
        box-shadow: 0px 1px 2px rgba(0,0,0,0.06);
      }}
      .card-h {{
        padding: 16px 16px 0 16px;
      }}
      .card-b {{
        padding: 16px;
      }}
      .muted {{
        color: var(--semantic-text-secondary, #666);
        font-size: 12px;
      }}
      pre {{
        margin: 0;
        padding: 12px;
        overflow: auto;
        background: var(--semantic-bg-page, #f7f7f7);
        border-radius: 10px;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        font-size: 12px;
        line-height: 1.5;
      }}
      .pill {{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        border-radius: 999px;
        padding: 6px 10px;
        background: var(--semantic-bg-surface, #fff);
      }}
      .swatch {{
        width: 14px;
        height: 14px;
        border-radius: 4px;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        background: var(--semantic-text-primary, #222);
      }}
      code {{
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
      }}
    </style>
  </head>
  <body>
    {body}
  </body>
</html>
"""


def _build_icons_fragment(repo_root: Path) -> str:
    """
    Inline SVG symbols from `.design-spec/assets/icons/icons.manifest.json`
    when the referenced file exists (Figma-export pipeline).
    """
    manifest_path = repo_root / ".design-spec" / "assets" / "icons" / "icons.manifest.json"
    if not manifest_path.exists():
        return ""
    try:
        raw = json.loads(manifest_path.read_text(encoding="utf-8"))
    except Exception:
        return ""
    items = raw.get("items") or []
    root = manifest_path.parent
    parts: list[str] = []
    for item in items:
        rel = item.get("relativePath")
        iid = item.get("id")
        if not rel or not iid:
            continue
        svg_path = (root / rel).resolve()
        if not str(svg_path).startswith(str(root.resolve())):
            continue
        if not svg_path.exists():
            continue
        svg = svg_path.read_text(encoding="utf-8", errors="replace").strip()
        safe = html.escape(iid.replace(".", "-"))
        parts.append(f'    <template id="ds-icon-{safe}">{svg}</template>')
    if not parts:
        return ""
    return "    <!-- Figma-export icons (icons.manifest.json) -->\n" + "\n".join(parts) + "\n"


def _report_studio_runtime_literals(repo_root: Path) -> None:
    """Non-blocking notice for tokenization backlog (see studio_runtime_literal_audit.py)."""
    css_path = repo_root / ".design-spec" / "generator" / "studio_runtime.css"
    if not css_path.exists():
        return
    text = css_path.read_text(encoding="utf-8", errors="replace")
    px_hits = re.findall(r":\s*-?[\d.]+\s*px\b", text)
    if px_hits:
        print(
            f"NOTICE: studio_runtime.css contains ~{len(px_hits)} px literals "
            "(audit: python3 .design-spec/scripts/studio_runtime_literal_audit.py)"
        )


def _read_behavior_source(repo_root: Path) -> str:
    cfg = repo_root / ".design-spec" / "sources" / "behavior-source.json"
    if not cfg.exists():
        return "unknown"
    try:
        raw = json.loads(cfg.read_text(encoding="utf-8"))
    except Exception:
        return "unknown"
    value = str(raw.get("behaviorSource", "")).strip().lower()
    if value in ("arco-react", "arco-vue"):
        return "Arco Design Web React"
    return value or "unknown"


def _component_size_guide_block(slug: str, md_path: Path) -> str:
    """
    Static Figma dimension hints, bound by slug. Emitted only by the generator — no hand-edited HTML.
    """
    chip = "border:1px dashed var(--semantic-text-muted,#999); background:var(--semantic-border-subtle,#e8e8e8);"
    if slug in ("modal", "dialog"):
        sections = _read_md_sections(md_path)
        figma_section = sections.get("figma", "")
        sizes_section = sections.get("sizes", "")
        figma_line = _md_inline_to_plain(_first_non_empty_line(figma_section))
        sizes_line = _md_inline_to_plain(_first_non_empty_line(sizes_section))
        md_rel = f"docs/components/{md_path.name}"
        figma_link = ""
        m_link = RE_MD_LINK.search(figma_section)
        if m_link:
            label = html.escape(m_link.group(1).strip())
            href = html.escape(m_link.group(2).strip())
            figma_link = f'<div class="muted" style="margin-top:4px; font-size:12px;">Figma: <a href="{href}">{label}</a></div>'
        if not sizes_line:
            sizes_line = "默认宽度 440px；带提示区 464px（`--component-modal-w` / `--component-modal-w-with-tip`）。"
        size_hint_card = f"""
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（来自 {html.escape(md_rel)}）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">{html.escape(sizes_line)}</div>
        {figma_link}
      </div>
      <div style="padding:12px;">
        <div style="height:36px; width:min(440px,100%); border-radius:8px; {chip}" aria-hidden="true"></div>
        <div class="muted" style="margin-top:8px; font-size:12px;">{html.escape(figma_line or "按文档 Figma 标注进行比对。")}</div>
      </div>
    </div>
    """
        static_mdl = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">遮罩 + 面板壳 <code>ds-modal-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <div style="padding:18px;border-radius:10px;background:var(--component-modal-mask);" data-ds-annotate-target="1">
          <div class="ds-modal-panel ds-modal-panel--fig" role="dialog" aria-modal="true" aria-labelledby="mdlFigT" aria-describedby="mdlFigD">
            <header class="ds-modal-h">
              <h2 class="ds-modal-title" id="mdlFigT">Modal title</h2>
              <button type="button" class="ds-modal-x" tabindex="-1" aria-hidden="true">\u00d7</button>
            </header>
            <div class="ds-modal-div" aria-hidden="true"></div>
            <div class="ds-modal-body">
              <p id="mdlFigD" style="margin:0;">Body text for token compare.</p>
            </div>
            <div class="ds-modal-actions">
              <button type="button" class="ds-mini-btn" tabindex="-1">Cancel</button>
              <button type="button" class="ds-mini-btn primary" tabindex="-1">OK</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_mdl

    if slug in ("input", "input-range", "input-adornment", "input-ip", "input-number"):
        return f"""
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（D.S. Web Com）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">
          单行输入参考高度：<strong>24</strong> (S) / <strong>28</strong> (M) / <strong>32</strong> (L) / <strong>36</strong> (XL) px
        </div>
      </div>
      <div style="padding:12px; display:flex; gap:12px; align-items:flex-end; flex-wrap:wrap;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">24</div>
          <div style="height:24px; width:72px; border-radius:4px; {chip}" aria-hidden="true"></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">28</div>
          <div style="height:28px; width:72px; border-radius:4px; {chip}" aria-hidden="true"></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">32</div>
          <div style="height:32px; width:72px; border-radius:6px; {chip}" aria-hidden="true"></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:6px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">36</div>
          <div style="height:36px; width:72px; border-radius:8px; {chip}" aria-hidden="true"></div>
        </div>
      </div>
    </div>
    """

    sections = _read_md_sections(md_path)
    figma_section = sections.get("figma", "")
    sizes_section = sections.get("sizes", "")
    figma_line = _md_inline_to_plain(_first_non_empty_line(figma_section))
    sizes_line = _md_inline_to_plain(_first_non_empty_line(sizes_section))
    md_rel = f"docs/components/{md_path.name}"
    figma_link = ""
    m_link = RE_MD_LINK.search(figma_section)
    if m_link:
        label = html.escape(m_link.group(1).strip())
        href = html.escape(m_link.group(2).strip())
        figma_link = f'<div class="muted" style="margin-top:4px; font-size:12px;">Figma: <a href="{href}">{label}</a></div>'
    if not sizes_line:
        sizes_line = "请参考对应组件文档中的 Sizes 章节。"
    if slug == "dropdown":
        static_dd = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">面板 + 菜单项 default / hover / selected（勾选）/ focus / disabled + 分隔与 danger；类名见 <code>studio_runtime.css</code> 中 <code>ds-dd-*</code>。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-dd ds-dd--fig" data-trigger="m" data-item="md" aria-label="dropdown static compare">
          <div class="ds-dd-panel ds-dd-panel--fig" role="menu" aria-label="menu sample">
            <button type="button" class="ds-dd-item ds-dd-item--static" role="menuitem" data-ds-annotate-target="1"><span>Default</span><span></span></button>
            <button type="button" class="ds-dd-item ds-dd-item--static is-dd-hover" role="menuitem" data-ds-annotate-target="1"><span>Hover</span><span></span></button>
            <button type="button" class="ds-dd-item ds-dd-item--static ds-dd-item--checked" role="menuitem" data-ds-annotate-target="1"><span>Selected</span><span class="ds-dd-check" aria-hidden="true"></span></button>
            <button type="button" class="ds-dd-item ds-dd-item--static is-dd-foc" role="menuitem" data-ds-annotate-target="1"><span>Focus</span><span></span></button>
            <button type="button" class="ds-dd-item ds-dd-item--static" role="menuitem" disabled data-ds-annotate-target="1"><span>Disabled</span><span></span></button>
            <hr class="ds-dd-divider" aria-hidden="true" />
            <button type="button" class="ds-dd-item ds-dd-item--static ds-dd-item--danger" role="menuitem" data-ds-annotate-target="1"><span>Danger</span><span></span></button>
          </div>
        </div>
      </div>
    </div>
    """
        return (
            f"""
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（来自 {html.escape(md_rel)}）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">{html.escape(sizes_line)}</div>
        {figma_link}
      </div>
      <div style="padding:12px;">
        <div style="height:36px; width:min(360px,100%); border-radius:8px; {chip}" aria-hidden="true"></div>
        <div class="muted" style="margin-top:8px; font-size:12px;">{html.escape(figma_line or '按文档 Figma 标注进行比对。')}</div>
      </div>
    </div>
    """
            + static_dd
        )
    size_hint_card = f"""
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（来自 {html.escape(md_rel)}）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">{html.escape(sizes_line)}</div>
        {figma_link}
      </div>
      <div style="padding:12px;">
        <div style="height:36px; width:min(360px,100%); border-radius:8px; {chip}" aria-hidden="true"></div>
        <div class="muted" style="margin-top:8px; font-size:12px;">{html.escape(figma_line or '按文档 Figma 标注进行比对。')}</div>
      </div>
    </div>
    """
    if slug == "message":
        static_msg = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">多 tone 纵向堆叠示意；类名 <code>ds-msg</code> / <code>ds-msg-stack</code>。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-msg-stack" aria-label="message static samples">
          <div class="ds-msg" data-tone="info" role="status" data-ds-annotate-target="1">
            <span class="ds-msg-ic" aria-hidden="true">i</span><span class="ds-msg-txt">Info sample</span>
          </div>
          <div class="ds-msg" data-tone="success" role="status" data-ds-annotate-target="1">
            <span class="ds-msg-ic" aria-hidden="true">\u2713</span><span class="ds-msg-txt">Success sample</span>
          </div>
          <div class="ds-msg" data-tone="error" role="alert" data-ds-annotate-target="1">
            <span class="ds-msg-ic" aria-hidden="true">\u2715</span><span class="ds-msg-txt">Error sample</span>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_msg
    if slug == "notification":
        static_ntf = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">多 tone 卡片 + 关闭 + 底部操作；类名 <code>ds-ntf-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px; display:flex; flex-direction:column; gap:12px;">
        <div class="ds-ntf ds-ntf--fig ds-ntf--has-close" data-tone="info" role="status" aria-label="notification static info" data-ds-annotate-target="1">
          <button type="button" class="ds-ntf-close" tabindex="-1" aria-hidden="true"><span aria-hidden="true">\u00d7</span></button>
          <div class="ds-ntf-head">
            <span class="ds-ntf-ic" aria-hidden="true">i</span>
            <div class="ds-ntf-head-text"><p class="ds-ntf-title">Info</p></div>
          </div>
          <p class="ds-ntf-desc">Static sample description.</p>
        </div>
        <div class="ds-ntf ds-ntf--fig" data-tone="default" role="status" data-ds-annotate-target="1">
          <div class="ds-ntf-head">
            <div class="ds-ntf-head-text"><p class="ds-ntf-title">Default</p></div>
          </div>
          <p class="ds-ntf-desc">No tone icon; optional actions.</p>
          <div class="ds-ntf-actions">
            <button type="button" class="ds-ntf-btn" tabindex="-1">Cancel</button>
            <button type="button" class="ds-ntf-btn ds-ntf-btn--pri" tabindex="-1">OK</button>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_ntf
    if slug == "menu":
        sections = _read_md_sections(md_path)
        figma_section = sections.get("figma", "")
        sizes_section = sections.get("sizes", "")
        figma_line = _md_inline_to_plain(_first_non_empty_line(figma_section))
        sizes_line = _md_inline_to_plain(_first_non_empty_line(sizes_section))
        md_rel = f"docs/components/{md_path.name}"
        figma_link = ""
        m_link = RE_MD_LINK.search(figma_section)
        if m_link:
            label = html.escape(m_link.group(1).strip())
            href = html.escape(m_link.group(2).strip())
            figma_link = f'<div class="muted" style="margin-top:4px; font-size:12px;">Figma: <a href="{href}">{label}</a></div>'
        if not sizes_line:
            sizes_line = (
                "侧栏展开宽 220px / 收起 48px（`--component-menu-container-w-expanded` / `w-collapsed`）；"
                "弹出菜单最小宽 182px（`--component-menu-pop-min-w`）。"
            )
        size_hint_card = f"""
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（来自 {html.escape(md_rel)}）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">{html.escape(sizes_line)}</div>
        {figma_link}
      </div>
      <div style="padding:12px;">
        <div style="height:38px; width:min(220px,100%); border-radius:8px; {chip}" aria-hidden="true"></div>
        <div class="muted" style="margin-top:8px; font-size:12px;">{html.escape(figma_line or "按文档 Figma 标注进行比对。")}</div>
      </div>
    </div>
    """
        static_mu = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">侧栏 + 弹出菜单；类名 <code>ds-mu-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px; display:flex; gap:16px; flex-wrap:wrap; align-items:flex-start;">
        <nav class="ds-mu-nav ds-mu-nav--fig" role="presentation" aria-label="menu static side" data-ds-annotate-target="1">
          <div class="ds-mu-group" aria-hidden="true">Section</div>
          <button type="button" class="ds-mu-item" tabindex="-1" role="presentation">
            <span class="ds-mu-ic" aria-hidden="true"></span><span class="ds-mu-lbl">Item</span><span class="ds-mu-chev" aria-hidden="true"></span>
          </button>
          <button type="button" class="ds-mu-item is-sel" tabindex="-1" role="presentation">
            <span class="ds-mu-ic" aria-hidden="true"></span><span class="ds-mu-lbl">Selected</span><span class="ds-mu-chev" aria-hidden="true"></span>
          </button>
        </nav>
        <div class="ds-mu-pop" role="presentation" aria-label="menu static pop" data-ds-annotate-target="1">
          <button type="button" class="ds-mu-pop-item" tabindex="-1" role="presentation">Pop item</button>
          <button type="button" class="ds-mu-pop-item is-hov" tabindex="-1" role="presentation">Hover</button>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_mu
    if slug == "pincode":
        static_pc = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">单格五态：Default · Active（<code>is-act</code>）· Filled · Error · Disabled；与 Status matrix 同源类名，见 <code>studio_runtime.css</code> 中 <code>ds-pc-*</code>。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-pc ds-pc--matrix" aria-label="pincode static cell states">
          <div class="ds-pc-row"><input class="ds-pc-cell" type="text" readonly tabindex="-1" aria-hidden="true" data-ds-annotate-target="1" /></div>
          <div class="ds-pc-row"><input class="ds-pc-cell is-act" type="text" readonly tabindex="-1" aria-hidden="true" data-ds-annotate-target="1" /></div>
          <div class="ds-pc-row"><input class="ds-pc-cell is-filled" type="text" value="3" readonly tabindex="-1" aria-hidden="true" data-ds-annotate-target="1" /></div>
          <div class="ds-pc-row"><input class="ds-pc-cell is-err" type="text" value="3" readonly tabindex="-1" aria-hidden="true" data-ds-annotate-target="1" /></div>
          <div class="ds-pc-row"><input class="ds-pc-cell is-dis" type="text" disabled aria-hidden="true" data-ds-annotate-target="1" /></div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_pc
    if slug == "steps":
        static_st = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">横向四步：completed → current（含描述）→ pending → disabled；类名 <code>ds-st-*</code>，与 Live 同源（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <nav class="ds-st ds-st--fig" data-size="lg" data-orientation="horizontal" aria-label="steps static sample">
          <ol class="ds-st-list" role="list">
            <li class="ds-st-item" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--completed" aria-hidden="true"><span class="ds-st-icon-glyph">\u2713</span></span>
                <div class="ds-st-body">
                  <p class="ds-st-title">Succeeded</p>
                </div>
              </div>
              <div class="ds-st-connector ds-st-connector--completed" aria-hidden="true"></div>
            </li>
            <li class="ds-st-item" aria-current="step" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--current" aria-hidden="true"><span class="ds-st-icon-glyph">2</span></span>
                <div class="ds-st-body">
                  <p class="ds-st-title ds-st-title--current">Processing</p>
                  <p class="ds-st-desc">This is a description for the current step.</p>
                </div>
              </div>
              <div class="ds-st-connector" aria-hidden="true"></div>
            </li>
            <li class="ds-st-item" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--pending" aria-hidden="true"><span class="ds-st-icon-glyph">3</span></span>
                <div class="ds-st-body">
                  <p class="ds-st-title ds-st-title--pending">Pending</p>
                </div>
              </div>
              <div class="ds-st-connector" aria-hidden="true"></div>
            </li>
            <li class="ds-st-item" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--disabled" aria-hidden="true"><span class="ds-st-icon-glyph">4</span></span>
                <div class="ds-st-body">
                  <p class="ds-st-title ds-st-title--disabled">Disabled</p>
                </div>
              </div>
              <div class="ds-st-connector" aria-hidden="true"></div>
            </li>
          </ol>
        </nav>
      </div>
    </div>
    """
        return size_hint_card + static_st
    if slug == "card":
        static_cd = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">带描边 + 标题/正文/分隔/meta；类名 <code>ds-card-*</code>，与 Live 同源（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-card-live-wrap">
          <section class="ds-card ds-card--fig" data-size="md" data-bordered="true" aria-labelledby="cdFigTitle" data-ds-annotate-target="1">
            <div class="ds-card-stack">
              <h3 class="ds-card-title" id="cdFigTitle">Card title</h3>
              <p class="ds-card-body">Static sample body for token compare.</p>
            </div>
            <div class="ds-card-divider" role="separator" aria-hidden="true"></div>
            <p class="ds-card-body ds-card-body--meta">Footer / meta line</p>
          </section>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_cd
    if slug == "pageheader":
        static_ph = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">Back + 竖线 + 标题/副标题 + 右侧双按钮；类名 <code>ds-ph-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <header class="ds-ph" aria-labelledby="phFigTitle" data-ds-annotate-target="1">
          <div class="ds-ph-row">
            <div class="ds-ph-left">
              <button type="button" class="ds-ph-back" aria-label="Back"><span class="ds-ph-back-ic" aria-hidden="true">\u2190</span></button>
              <div class="ds-ph-vdiv" aria-hidden="true"></div>
              <div class="ds-ph-main">
                <h1 class="ds-ph-title" id="phFigTitle">Page title</h1>
                <p class="ds-ph-desc">Static Figma compare sample.</p>
              </div>
            </div>
            <div class="ds-ph-right">
              <div class="ds-ph-actions">
                <button type="button" class="ds-ph-btn">Secondary</button>
                <button type="button" class="ds-ph-btn ds-ph-btn--pri">Primary</button>
              </div>
            </div>
          </div>
        </header>
      </div>
    </div>
    """
        return size_hint_card + static_ph
    if slug == "select":
        static_compare = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">触发器 default / hover / focus / error / disabled + 下拉项三态；类名见 <code>studio_runtime.css</code> 中 <code>ds-sel--fig</code>。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-sel ds-sel--fig" data-size="lg" aria-label="select static compare">
          <div class="ds-sel-fig-col">
            <div class="ds-sel-trg ds-sel-trg--static" data-ds-annotate-target="1" role="presentation">
              <span class="ds-sel-ph">Default</span><span class="chev" aria-hidden="true"></span>
            </div>
            <div class="ds-sel-trg ds-sel-trg--static ds-sel-trg--demo-hover" data-ds-annotate-target="1" role="presentation">
              <span class="ds-sel-ph">Hover</span><span class="chev" aria-hidden="true"></span>
            </div>
            <div class="ds-sel-trg ds-sel-trg--static ds-sel-trg--demo-focus" data-ds-annotate-target="1" role="presentation">
              <span class="ds-sel-ph">Focus</span><span class="chev" aria-hidden="true"></span>
            </div>
            <div class="ds-sel-trg ds-sel-trg--static ds-sel-trg--err" data-ds-annotate-target="1" role="presentation">
              <span class="ds-sel-ph">Error</span><span class="chev" aria-hidden="true"></span>
            </div>
            <div class="ds-sel-trg ds-sel-trg--static ds-sel-trg--dis" data-ds-annotate-target="1" role="presentation">
              <span class="ds-sel-ph">Disabled</span><span class="chev" aria-hidden="true"></span>
            </div>
          </div>
          <div class="ds-sel-list ds-sel-list--fig" role="listbox" aria-label="dropdown sample">
            <div class="ds-sel-item" data-ds-annotate-target="1">Default</div>
            <div class="ds-sel-item is-hover" data-ds-annotate-target="1">Hover</div>
            <div class="ds-sel-item is-active" data-ds-annotate-target="1">Selected</div>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_compare
    if slug == "tabs":
        static_tb = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">underline + pill 两行示意；类名 <code>ds-tabs-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px; display:flex; flex-direction:column; gap:16px;">
        <div class="ds-tabs ds-tabs--underline" data-size="lg" aria-label="tabs underline static" data-ds-annotate-target="1">
          <div class="ds-tabs-bar">
            <div role="tablist" class="ds-tabs-list" aria-label="Static underline">
              <button type="button" role="tab" id="tbFigT0" class="ds-tabs-tab" aria-selected="true" aria-controls="tbFigP0" tabindex="0">One</button>
              <button type="button" role="tab" id="tbFigT1" class="ds-tabs-tab" aria-selected="false" aria-controls="tbFigP1" tabindex="-1">Two</button>
            </div>
          </div>
          <div class="ds-tabs-panels">
            <section id="tbFigP0" class="ds-tabs-panel" role="tabpanel" aria-labelledby="tbFigT0">Panel A</section>
            <section id="tbFigP1" class="ds-tabs-panel" role="tabpanel" aria-labelledby="tbFigT1" hidden>Panel B</section>
          </div>
        </div>
        <div class="ds-tabs ds-tabs--pill" aria-label="tabs pill static" data-ds-annotate-target="1">
          <div class="ds-tabs-bar">
            <div role="tablist" class="ds-tabs-list" aria-label="Static pill">
              <button type="button" role="tab" class="ds-tabs-tab" aria-selected="true" tabindex="0">Alpha</button>
              <button type="button" role="tab" class="ds-tabs-tab" aria-selected="false" tabindex="-1">Beta</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_tb
    if slug == "tree":
        static_tr = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">两级缩进 + 选中行；类名 <code>ds-tree-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-tree ds-tree--fig" data-size="md" data-variant="simple" aria-label="tree static compare" data-ds-annotate-target="1">
          <ul class="ds-tree-list" role="presentation">
            <li class="ds-tree-node" role="presentation">
              <div class="ds-tree-row" role="presentation">
                <button type="button" class="ds-tree-toggle" tabindex="-1" aria-hidden="true"><span class="ds-tree-toggle-ic" aria-hidden="true">\u25bc</span></button>
                <span class="ds-tree-label">Project</span>
              </div>
              <ul class="ds-tree-list" role="presentation">
                <li class="ds-tree-node" role="presentation">
                  <div class="ds-tree-row is-hov" role="presentation" data-ds-annotate-target="1">
                    <span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>
                    <span class="ds-tree-label">Hover child</span>
                  </div>
                </li>
                <li class="ds-tree-node" role="presentation">
                  <div class="ds-tree-row is-sel" role="presentation" data-ds-annotate-target="1">
                    <span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>
                    <span class="ds-tree-label">Selected child</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_tr
    if slug == "cascader":
        static_cs = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">三列路径 + 多选勾选示意；类名 <code>ds-casc-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-casc" data-size="lg" aria-label="cascader static compare" data-ds-annotate-target="1">
          <div class="ds-casc-panel" role="region" aria-label="Static cascader columns">
            <div class="ds-casc-cols">
              <div class="ds-casc-col">
                <ul class="ds-casc-ul" role="listbox" aria-label="Level 1">
                  <li role="presentation">
                    <button type="button" class="ds-casc-item is-act" role="option" aria-selected="true">
                      <span class="ds-casc-cb is-ind" aria-hidden="true"></span>
                      <span class="ds-casc-item-lbl">Zhejiang</span>
                      <span class="ds-casc-item-chev" aria-hidden="true">\u203a</span>
                    </button>
                  </li>
                  <li role="presentation">
                    <button type="button" class="ds-casc-item" role="option">
                      <span class="ds-casc-cb" aria-hidden="true"></span>
                      <span class="ds-casc-item-lbl">Guangdong</span>
                      <span class="ds-casc-item-chev" aria-hidden="true">\u203a</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="ds-casc-col">
                <ul class="ds-casc-ul" role="listbox" aria-label="Level 2">
                  <li role="presentation">
                    <button type="button" class="ds-casc-item is-act" role="option" aria-selected="true">
                      <span class="ds-casc-cb is-ind" aria-hidden="true"></span>
                      <span class="ds-casc-item-lbl">Hangzhou</span>
                      <span class="ds-casc-item-chev" aria-hidden="true">\u203a</span>
                    </button>
                  </li>
                </ul>
              </div>
              <div class="ds-casc-col">
                <ul class="ds-casc-ul" role="listbox" aria-label="Level 3">
                  <li role="presentation">
                    <button type="button" class="ds-casc-item is-act" role="option" aria-selected="true">
                      <span class="ds-casc-cb is-on" aria-hidden="true"></span>
                      <span class="ds-casc-item-lbl">West Lake</span>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_cs
    if slug == "upload":
        static_upl = """
    <div class="card" style="border-radius:10px; margin-top:8px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 对比（token 静态）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">按钮触发 + 列表一行 + 卡片占位；类名 <code>ds-upl-*</code>（见 <code>studio_runtime.css</code>）。</div>
      </div>
      <div style="padding:12px;">
        <div class="ds-upl" data-size="md" aria-label="upload static compare" data-ds-annotate-target="1">
          <p id="uplFigHint" class="ds-upl-hint">Accepted: PDF, PNG, JPG.</p>
          <button type="button" class="ds-upl-trg ds-upl-trg--btn" aria-describedby="uplFigHint">
            <span class="ds-upl-trg-plus" aria-hidden="true">+</span>
            <span class="ds-upl-trg-stack">
              <span class="ds-upl-trg-tit">Upload</span>
              <span class="ds-upl-trg-desc">Static sample</span>
            </span>
          </button>
          <ul class="ds-upl-list" role="list" aria-label="Static file list">
            <li class="ds-upl-item" role="listitem">
              <span class="ds-upl-item-ic" aria-hidden="true"></span>
              <span class="ds-upl-item-name">sample.pdf</span>
              <span class="ds-upl-item-act">
                <button type="button" class="ds-upl-act" aria-label="Download sample.pdf">Download</button>
              </span>
            </li>
          </ul>
          <div class="ds-upl-cards" role="list" aria-label="Static picture cards">
            <div class="ds-upl-card is-hov" role="listitem" tabindex="-1" aria-label="thumb.png">
              <div class="ds-upl-card-ph" aria-hidden="true"></div>
              <div class="ds-upl-card-mask">
                <button type="button" class="ds-upl-act" aria-label="Delete thumb.png">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    """
        return size_hint_card + static_upl
    return size_hint_card


def _snapshot_component_tokens(tokens_css_text: str, token_prefix: str) -> dict[str, str]:
    """
    Parse tokens.css text for --component-{prefix}-* declarations.
    Inlined into HTML so demos work when document.styleSheets[].cssRules is blocked
    (e.g. file:// + external stylesheet security).
    """
    prefix = f"--component-{token_prefix}-"
    out: dict[str, str] = {}
    for raw in tokens_css_text.splitlines():
        line = raw.strip()
        if not line.startswith(prefix):
            continue
        if line.startswith("/*") or ":" not in line:
            continue
        key, _, rest = line.partition(":")
        key = key.strip()
        if not key.startswith(prefix):
            continue
        val = rest.strip()
        if val.endswith(";"):
            val = val[:-1].strip()
        out[key] = val
    return out


def _component_demo_body(
    spec: ComponentSpec, index_href: str, *, tokens_css_text: str, behavior_source: str
) -> str:
    title = html.escape(spec.title)
    slug_esc = html.escape(spec.slug)
    token_prefix_esc = html.escape(spec.token_prefix)
    gen_dir = Path(__file__).resolve().parent
    studio_css = (gen_dir / "studio_runtime.css").read_text(encoding="utf-8")
    studio_js = (gen_dir / "studio_runtime.js").read_text(encoding="utf-8")
    studio_js = studio_js.replace("__DS_SLUG__", json.dumps(spec.slug))
    studio_js = studio_js.replace("__DS_TOKEN_PREFIX__", json.dumps(spec.token_prefix))
    size_guide = _component_size_guide_block(spec.slug, spec.source_path)
    token_snap = _snapshot_component_tokens(tokens_css_text, spec.token_prefix)
    token_json = json.dumps(token_snap, ensure_ascii=False).replace("</", "<\\/")
    if spec.slug == "alert":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/alert.md</code> 与 Arco Design Web React <code>Alert</code>（<code>type</code> / <code>show-icon</code> / <code>closable</code> / <code>title</code> / <code>banner</code> / <code>center</code> / <code>#action</code> 等）；尺寸与色走 <code>alert.layout.*</code> 与 <code>alert.tone.*</code> token。
          </p>
          <label class="pg-field">
            <span>Type（Arco type）</span>
            <select id="pgVariant" aria-label="Alert type">
              <option value="info" selected>info</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
              <option value="normal">normal</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（Figma LG / MD / AUTO）</span>
            <select id="pgSize" aria-label="Alert size">
              <option value="lg" selected>LG · 默认 padding（见 token）</option>
              <option value="md">MD · min-height + 对称 padding</option>
              <option value="auto">AUTO · 多行/标题用上下 padding</option>
            </select>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alShowIcon" checked /><span>show-icon</span></label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alTitle" /><span>title</span></label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alClosable" /><span>closable</span></label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alCustomClose" /><span>close-element slot</span></label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alAction" /><span>action slot</span></label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alBanner" /><span>banner</span></label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;"><input type="checkbox" id="alCenter" /><span>center</span></label>
        </aside>"""
    elif spec.slug == "breadcrumb":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/breadcrumb.md</code> 与 Arco Design Web React <code>Breadcrumb</code>（<code>routes</code> / <code>separator</code> / 末级 <code>aria-current</code> 等）；样式仅引用 <code>--component-breadcrumb-*</code> 与 <code>--core-*</code>。
          </p>
          <label class="pg-field">
            <span>Depth（演示路径深度）</span>
            <select id="pgSize" aria-label="Breadcrumb demo depth">
              <option value="2">2-level</option>
              <option value="3" selected>3-level</option>
              <option value="4">4-level</option>
              <option value="truncate">长标签截断</option>
              <option value="collapse">4+ 省略号</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Separator（Figma kind）</span>
            <select id="pgVariant" aria-label="Breadcrumb demo separator">
              <option value="slash" selected>slash</option>
              <option value="chevron">chevron</option>
              <option value="chevron-right">chevron-right</option>
              <option value="chevron-down">chevron-down</option>
              <option value="chevron-up">chevron-up</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "badge":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/badge.md</code> 与 Arco Design Web React <code>Badge</code>（<code>count</code> / <code>dot</code> / <code>status</code> 等）；样式仅引用 <code>--component-badge-*</code>。
          </p>
          <label class="pg-field">
            <span>Kind（形态）</span>
            <select id="pgVariant" aria-label="Badge demo kind">
              <option value="count" selected>count</option>
              <option value="dot">dot</option>
              <option value="status">status</option>
            </select>
          </label>
          <label class="pg-field">
            <span>State / tone（状态或语义色）</span>
            <select id="pgSize" aria-label="Badge demo state or tone">
              <option value="default" selected>default</option>
              <option value="disabled">disabled（count / dot）</option>
              <option value="single">count · 单数字宽</option>
              <option value="multi">count · 99+</option>
              <option value="processing">status · processing</option>
              <option value="success">status · success</option>
              <option value="warning">status · warning</option>
              <option value="error">status · error</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "checkbox":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/checkbox.md</code> 与 Arco Design Web React <code>Checkbox</code>（<code>checked</code> / <code>disabled</code> / <code>indeterminate</code>）；样式仅引用 <code>--component-checkbox-*</code>。
          </p>
          <label class="pg-field">
            <span>Value（值）</span>
            <select id="pgVariant" aria-label="Checkbox demo value">
              <option value="unchecked" selected>unchecked</option>
              <option value="checked">checked</option>
              <option value="indeterminate">indeterminate</option>
            </select>
          </label>
          <label class="pg-field">
            <span>State（状态）</span>
            <select id="pgSize" aria-label="Checkbox demo state">
              <option value="default" selected>default</option>
              <option value="disabled">disabled</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "radio":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/radio.md</code> 与 Arco Design Web React <code>Radio</code> / <code>RadioGroup</code>（互斥单选、<code>disabled</code> 等）；样式引用 <code>--component-radio-*</code> 与 <code>--component-radio-button-*</code>（胶囊）。
          </p>
          <label class="pg-field">
            <span>Style（形态）</span>
            <select id="pgVariant" aria-label="Radio demo style">
              <option value="circle" selected>circle（经典圆点）</option>
              <option value="capsule">capsule（Radio Button）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Content / state（内容或状态）</span>
            <select id="pgSize" aria-label="Radio demo content or state">
              <option value="default" selected>default</option>
              <option value="with-helper">with-helper（仅 circle：首项辅助文案）</option>
              <option value="disabled">disabled（整组）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Capsule size（仅 capsule）</span>
            <select id="pgCapsuleSize" aria-label="Radio demo capsule size">
              <option value="lg">L（large）</option>
              <option value="md" selected>M（medium）</option>
              <option value="sm">S（small）</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "tag":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/tag.md</code> 与 Arco Design Web React <code>Tag</code>（<code>color</code> / <code>size</code> / <code>closable</code> 等）；样式仅引用 <code>--component-tag-*</code>。
          </p>
          <label class="pg-field">
            <span>Kind（类型）</span>
            <select id="pgVariant" aria-label="Tag demo kind">
              <option value="status" selected>status</option>
              <option value="selector">selector</option>
              <option value="group">group</option>
              <option value="add">add-button</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Tone / state（语义或状态）</span>
            <select id="pgSize" aria-label="Tag demo tone or state">
              <option value="offline">offline</option>
              <option value="danger">danger</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="info">info</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（status / add-button）</span>
            <select id="pgTagSize" aria-label="Tag demo size">
              <option value="lg">lg</option>
              <option value="md" selected>md</option>
              <option value="sm">sm</option>
              <option value="xs">xs</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "switch":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/switch.md</code> 与 Arco Design Web React <code>Switch</code>（<code>checked</code> / <code>disabled</code> / <code>type</code> 等）；样式仅引用 <code>--component-switch-*</code>。
          </p>
          <label class="pg-field">
            <span>Variant（形态）</span>
            <select id="pgVariant" aria-label="Switch demo variant">
              <option value="round" selected>round</option>
              <option value="linear">linear</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（尺寸）</span>
            <select id="pgSize" aria-label="Switch demo size">
              <option value="md" selected>md</option>
              <option value="lg">lg</option>
            </select>
          </label>
          <label class="pg-field">
            <span>State（状态）</span>
            <select id="pgSwitchState" aria-label="Switch demo state">
              <option value="default" selected>default</option>
              <option value="disabled">disabled</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "tabs":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/tabs.md</code> 与 Arco Design Web React <code>Tabs</code>（<code>type</code> / <code>direction</code> / <code>editable</code> / <code>show-add-button</code> 等）；样式仅 <code>--component-tabs-*</code>（见 <code>studio_runtime.css</code> 中 <code>ds-tabs-*</code>）。
          </p>
          <label class="pg-field">
            <span>Kind（形态）</span>
            <select id="pgVariant" aria-label="Tabs demo kind">
              <option value="underline" selected>underline</option>
              <option value="pill">pill</option>
              <option value="segmented">segmented</option>
              <option value="border">border</option>
              <option value="vertical">vertical</option>
              <option value="scrollable">scrollable（可关闭槽位）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（underline L/M · border S–XL）</span>
            <select id="pgSize" aria-label="Tabs demo size">
              <option value="xl">XL · border 最大档</option>
              <option value="lg" selected>LG · underline L44 / border L</option>
              <option value="md">MD · underline M32 / border M</option>
              <option value="sm">SM · border S</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "slider":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/slider.md</code> 与 Arco Design Web React <code>Slider</code>（<code>range</code> / <code>marks</code> / <code>disabled</code> 等）；样式仅引用 <code>--component-slider-*</code>（见 <code>studio_runtime.css</code>）。
          </p>
          <label class="pg-field">
            <span>Variant（单 / 范围）</span>
            <select id="pgVariant" aria-label="Slider demo variant">
              <option value="single" selected>single</option>
              <option value="range">range</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Marks（刻度与标注）</span>
            <select id="pgSize" aria-label="Slider demo marks">
              <option value="marks-off" selected>off</option>
              <option value="marks-on">on</option>
            </select>
          </label>
          <label class="pg-field">
            <span>State（状态）</span>
            <select id="pgSliderState" aria-label="Slider demo state">
              <option value="default" selected>default</option>
              <option value="disabled">disabled</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "progress":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/progress.md</code> 与 Arco Design Web React <code>Progress</code>（<code>type</code> / <code>percent</code> / <code>status</code> 等）；样式仅 <code>--component-progress-*</code>（见 <code>studio_runtime.css</code>）。
          </p>
          <label class="pg-field">
            <span>Kind（形态）</span>
            <select id="pgVariant" aria-label="Progress demo kind">
              <option value="line" selected>line</option>
              <option value="circle">circle</option>
              <option value="mini">mini</option>
              <option value="step">step</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（line 高度 / circle 直径档）</span>
            <select id="pgSize" aria-label="Progress demo size">
              <option value="sm" selected>SM · line 4px / circle SM</option>
              <option value="md">MD · circle MD</option>
              <option value="lg">LG · line 8px / circle LG</option>
            </select>
          </label>
          <label class="pg-field">
            <span>State（演示态）</span>
            <select id="pgProgState" aria-label="Progress demo state">
              <option value="running" selected>in-progress（66%）</option>
              <option value="zero">not-started（0%）</option>
              <option value="success">success（100%）</option>
              <option value="error">error（100%）</option>
              <option value="busy">indeterminate</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "steps":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/steps.md</code> 与 Arco Design Web React <code>Steps</code>（<code>direction</code> / <code>current</code> / <code>status</code> 等）；图标与文案走 <code>--component-steps-icon-*</code>、<code>--component-steps-title-*</code>，排版走 <code>--component-steps-layout-*</code>。
          </p>
          <label class="pg-field">
            <span>Layout（演示）</span>
            <select id="pgVariant" aria-label="Steps demo layout">
              <option value="h">horizontal · title only</option>
              <option value="h-desc" selected>horizontal · with description</option>
              <option value="v">vertical · with description</option>
              <option value="h-err">horizontal · error on active step</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（LG / MD）</span>
            <select id="pgSize" aria-label="Steps demo size">
              <option value="lg" selected>LG · 28px icon</option>
              <option value="md">MD · 24px icon</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "card":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/card.md</code> 与 Arco Design Web React <code>Card</code>（<code>bordered</code> / <code>hoverable</code> / <code>size</code> 等）；面与分隔走 <code>--component-card-panel-*</code>、<code>--component-card-divider-*</code>，排版走 <code>--component-card-layout-*</code>。
          </p>
          <label class="pg-field">
            <span>Kind（演示）</span>
            <select id="pgVariant" aria-label="Card demo kind">
              <option value="default" selected>default（无描边）</option>
              <option value="bordered">bordered</option>
              <option value="hoverable">hoverable</option>
              <option value="clickable">clickable（可聚焦）</option>
              <option value="disabled">disabled</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（MD / SM）</span>
            <select id="pgSize" aria-label="Card demo size">
              <option value="md" selected>MD · 16px padding</option>
              <option value="sm">SM · 12px padding</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "pageheader":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/pageheader.md</code> 与 Arco Design Web React <code>PageHeader</code>（<code>title</code> / <code>subtitle</code> / <code>back</code> / <code>extra</code> 等）；样式仅 <code>--component-page-header-*</code>（见 <code>studio_runtime.css</code> 中 <code>ds-ph-*</code>）。
          </p>
          <label class="pg-field">
            <span>Layout（演示）</span>
            <select id="pgVariant" aria-label="PageHeader demo layout">
              <option value="default" selected>default</option>
              <option value="breadcrumb">with breadcrumb</option>
              <option value="actions">with actions</option>
              <option value="controls">with controls（分段单选）</option>
              <option value="minimal">minimal（无副标题）</option>
            </select>
          </label>
          <select id="pgSize" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="md" selected>md</option>
          </select>
        </aside>"""
    elif spec.slug == "cascader":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/cascader.md</code> 与 Arco Design Web React <code>Cascader</code>（<code>multiple</code> / <code>check-strictly</code> / <code>error</code> 等）；触发器走 <code>--component-cascader-trigger-*</code> 与 <code>--component-cascader-layout-*</code>，列与项走 <code>--component-cascader-column-*</code> / <code>--component-cascader-item-*</code>，多选勾选外观复用 <code>--component-checkbox-*</code>。
          </p>
          <label class="pg-field">
            <span>Mode（演示）</span>
            <select id="pgVariant" aria-label="Cascader demo mode">
              <option value="single" selected>single（路径文案）</option>
              <option value="multiple">multiple（列内 checkbox）</option>
              <option value="error">error（触发器错误描边）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（LG / SM）</span>
            <select id="pgSize" aria-label="Cascader demo size">
              <option value="lg" selected>LG · 32px 触发器</option>
              <option value="sm">SM · 28px 触发器</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "tree":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/tree.md</code> 与 Arco Design Web React <code>Tree</code>（展开/收起、选中、多选勾选等）；行与开关走 <code>--component-tree-row-*</code>、<code>--component-tree-toggle-*</code>，缩进与行高走 <code>--component-tree-layout-*</code>；勾选外观复用 <code>--component-checkbox-*</code>。表格内嵌树仍使用 <code>--component-table-tree-*</code>。
          </p>
          <label class="pg-field">
            <span>Mode（演示）</span>
            <select id="pgVariant" aria-label="Tree demo mode">
              <option value="simple" selected>simple（仅文本行）</option>
              <option value="checkbox">checkbox（行前勾选示意）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（MD / SM）</span>
            <select id="pgSize" aria-label="Tree demo size">
              <option value="md" selected>MD · 默认行高</option>
              <option value="sm">SM · 紧凑行高</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "upload":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/upload.md</code> 与 Arco Design Web React <code>Upload</code>（<code>list-type</code> / <code>draggable</code> / <code>image-preview</code> / <code>disabled</code> 等）；触发区与列表走 <code>--component-upload-trigger-*</code>、<code>--component-upload-item-*</code>，照片墙走 <code>--component-upload-card-*</code>，排版走 <code>--component-upload-layout-*</code>；进度条示意复用 <code>--component-progress-line-*</code>。
          </p>
          <label class="pg-field">
            <span>Kind（演示）</span>
            <select id="pgVariant" aria-label="Upload demo kind">
              <option value="file-btn" selected>file-list · button 触发</option>
              <option value="file-drag">file-list · drag 触发</option>
              <option value="picture-list">picture-list · 缩略图行</option>
              <option value="picture-card">picture-card · 照片墙</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（MD / SM）</span>
            <select id="pgSize" aria-label="Upload demo size">
              <option value="md" selected>MD · 默认间距与触发高度</option>
              <option value="sm">SM · 紧凑间距</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "input":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/input.md</code> 与 Arco Design Web React <code>Input</code>（<code>size</code>、<code>password</code>、<code>Search</code>、前后缀等）；尺寸与圆角走 <code>--component-input-layout-*</code>，色与环走 <code>--component-input-*</code>。
          </p>
          <label class="pg-field ds-in-tab-row">
            <span>Demo variant</span>
            <select id="inVariantTab" aria-label="Input demo variant">
              <option value="base" selected>Base input</option>
              <option value="password">Password</option>
              <option value="search">Search</option>
              <option value="suffix">Suffix send</option>
              <option value="group">Input group</option>
            </select>
          </label>
          <div id="inVariantPropsHost"></div>
          <label class="pg-field">
            <span>Size（稿面 S / L / XL）</span>
            <select id="pgSize" aria-label="Input demo size">
              <option value="sm">S · 28px</option>
              <option value="md" selected>L · 32px</option>
              <option value="lg">XL · 36px</option>
            </select>
          </label>
          <select id="pgVariant" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="primary" selected>primary</option>
          </select>
        </aside>"""
    elif spec.slug == "input-number":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            Aligns with <code>docs/components/input-number.md</code> (Arco React behavior): four heights, <code>mode</code>,
            <code>hideControl</code>, <code>error</code>, <code>readOnly</code>, blur clamp + <code>outOfRange</code> log.
          </p>
          <label class="pg-field">
            <span>Size (Arco ↔ D.S.)</span>
            <select id="pgSize" aria-label="Preview size">
              <option value="sm">S · mini · 24px</option>
              <option value="ms">M · small · 28px</option>
              <option value="md" selected>L · default · 32px</option>
              <option value="lg">XL · large · 36px</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Mode</span>
            <select id="pgVariant" aria-label="InputNumber mode">
              <option value="embed" selected>embed</option>
              <option value="button">button</option>
              <option value="plain">plain</option>
            </select>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="numHideCtl" />
            <span>hideControl</span>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="numErr" />
            <span>error</span>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="numRo" />
            <span>readOnly</span>
          </label>
        </aside>"""
    elif spec.slug == "input-ip":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/input-ip.md</code>；视觉与边框走 <code>--component-input-*</code>（与 Input 共用 token 前缀 <code>input</code>）。
          </p>
          <label class="pg-field">
            <span>Size（S / L / XL）</span>
            <select id="pgSize" aria-label="Input IP demo size">
              <option value="sm">S</option>
              <option value="md" selected>L</option>
              <option value="lg">XL</option>
            </select>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="pgIpErr" />
            <span>Shell error（整框示意）</span>
          </label>
          <select id="pgVariant" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="primary" selected>primary</option>
          </select>
        </aside>"""
    elif spec.slug == "input-range":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/input-range.md</code> 双字段范围模式；样式仅 <code>--component-input-*</code> 与 <code>--component-form-error-text</code>。
          </p>
          <label class="pg-field">
            <span>Layout</span>
            <select id="pgVariant" aria-label="Input range demo layout">
              <option value="plain" selected>Plain（双框 + em dash）</option>
              <option value="unit">With suffix unit（统一外壳）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（S / L / XL）</span>
            <select id="pgSize" aria-label="Input range demo size">
              <option value="sm">S</option>
              <option value="md" selected>L</option>
              <option value="lg">XL</option>
            </select>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="rangeErr" />
            <span>Error message</span>
          </label>
        </aside>"""
    elif spec.slug == "input-adornment":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/input-adornment.md</code> 与 Arco Design Web React <code>Input</code> 的 <code>addBefore</code> / <code>addAfter</code> 等组合；样式走 <code>--component-input-*</code>。
          </p>
          <label class="pg-field ds-in-tab-row">
            <span>Demo variant</span>
            <select id="adVariantTab" aria-label="Input adornment demo variant">
              <option value="prefix">Prefix addon</option>
              <option value="suffix" selected>Suffix append</option>
              <option value="both">Prefix + suffix</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（S / L / XL）</span>
            <select id="pgSize" aria-label="Input adornment demo size">
              <option value="sm">S</option>
              <option value="md" selected>L</option>
              <option value="lg">XL</option>
            </select>
          </label>
          <select id="pgVariant" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="primary" selected>primary</option>
          </select>
        </aside>"""
    elif spec.slug == "select":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/select.md</code> 与 Arco Design Web React <code>Select</code>（<code>multiple</code> / <code>allow-search</code> 等）；触发器与下拉项尺寸走 <code>select.layout.*</code>，色面走 <code>select.trigger.*</code> / <code>select.item.*</code>。
          </p>
          <label class="pg-field">
            <span>Kind（演示）</span>
            <select id="pgVariant" aria-label="Select demo kind">
              <option value="single" selected>single</option>
              <option value="multiple-tags">multiple · tags</option>
              <option value="multiple-count">multiple · count</option>
              <option value="searchable">searchable</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size（xl / lg / md / sm）</span>
            <select id="pgSize" aria-label="Select demo size">
              <option value="xl">XL · 36px</option>
              <option value="lg" selected>LG · 32px</option>
              <option value="md">MD · 28px</option>
              <option value="sm">SM · 24px</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Trigger state</span>
            <select id="pgSelState" aria-label="Select demo trigger state">
              <option value="default" selected>default</option>
              <option value="error">error</option>
              <option value="disabled">disabled</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "menu":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/menu.md</code> 与 Arco Design Web React <code>Menu</code>（侧栏 / 折叠 / 子菜单弹出等）；容器与行走 <code>--component-menu-container-*</code>、<code>--component-menu-item-*</code>，弹出层走 <code>--component-menu-pop-*</code>。
          </p>
          <label class="pg-field">
            <span>View（演示）</span>
            <select id="pgVariant" aria-label="Menu demo view">
              <option value="inline" selected>inline · 侧栏菜单</option>
              <option value="pop">pop · 弹出菜单面板</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Side width（仅 inline）</span>
            <select id="pgSize" aria-label="Menu demo side width">
              <option value="expanded" selected>expanded · 220px</option>
              <option value="collapsed">collapsed · 48px（仅图标）</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "dropdown":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/dropdown.md</code> 与 Arco Design Web React <code>Dropdown</code>（<code>trigger</code> / <code>popup-visible</code> / <code>position</code> 等）；面板与菜单项走 <code>dropdown.panel.*</code>、<code>dropdown.item.*</code>。
          </p>
          <label class="pg-field">
            <span>Variant（演示）</span>
            <select id="pgVariant" aria-label="Dropdown demo variant">
              <option value="basic" selected>basic（仅操作项）</option>
              <option value="search">search + danger 组</option>
              <option value="danger-group">divider + danger</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Trigger size（M / L）</span>
            <select id="pgSize" aria-label="Dropdown demo trigger size">
              <option value="m" selected>M · 32px</option>
              <option value="l">L · 36px</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Item size（MD / SM）</span>
            <select id="pgDdItem" aria-label="Dropdown demo menu item size">
              <option value="md" selected>MD · 32px 行高</option>
              <option value="sm">SM · 28px 行高</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "pincode":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/pincode.md</code> 与 Arco Design Web React <code>VerificationCode</code> / <code>PinCode</code>（位数、粘贴、键盘）；单元格尺寸走 <code>pinCode.layout.*</code>，态色走 <code>pinCode.cell.*</code>。
          </p>
          <label class="pg-field">
            <span>Length（格数）</span>
            <select id="pgVariant" aria-label="PinCode demo length">
              <option value="4">4</option>
              <option value="6" selected>6</option>
              <option value="8">8</option>
            </select>
          </label>
          <label class="pg-field">
            <span>State</span>
            <select id="pgPinState" aria-label="PinCode demo state">
              <option value="default" selected>default</option>
              <option value="error">error（全格 + 错误文案）</option>
              <option value="disabled">disabled</option>
            </select>
          </label>
          <select id="pgSize" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="md" selected>md</option>
          </select>
        </aside>"""
    elif spec.slug == "message":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/message.md</code> 与 Arco Design Web React <code>Message</code>（<code>type</code> / <code>duration</code> / <code>closable</code> 等）；色面走 <code>message.tone.*</code>，排版走 <code>message.px</code> / <code>message.py</code> / <code>message.gap</code>。
          </p>
          <label class="pg-field">
            <span>Type（tone）</span>
            <select id="pgVariant" aria-label="Message demo type">
              <option value="info" selected>info</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
            </select>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="msgClosable" />
            <span>closable（关闭按钮）</span>
          </label>
          <select id="pgSize" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="md" selected>md</option>
          </select>
        </aside>"""
    elif spec.slug == "notification":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/notification.md</code> 与 Arco Design Web React <code>Notification</code>（<code>type</code> / <code>title</code> / <code>content</code> / <code>closable</code> / <code>btn</code> 等）；色面走 <code>notification.tone.*</code>，卡片壳走 <code>notification.panel.*</code> 与 <code>notification.w</code> / <code>notification.p</code>，操作区间距走 <code>notification.actions.*</code>。
          </p>
          <label class="pg-field">
            <span>Type（tone）</span>
            <select id="pgVariant" aria-label="Notification demo type">
              <option value="info" selected>info</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
              <option value="default">default（无 tone 图标）</option>
            </select>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="ntfClosable" checked />
            <span>closable（关闭按钮）</span>
          </label>
          <label class="pg-field" style="display:flex;align-items:center;gap:8px;">
            <input type="checkbox" id="ntfActions" />
            <span>actions（Cancel / OK）</span>
          </label>
          <select id="pgSize" class="ds-sr-only" aria-hidden="true" tabindex="-1">
            <option value="md" selected>md</option>
          </select>
        </aside>"""
    elif spec.slug == "modal":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/modal.md</code> 与 Arco Design Web React <code>Modal</code>（<code>width</code> / <code>footer</code> / <code>maskClosable</code> / <code>escToExit</code> 等）；遮罩与面板走 <code>--component-modal-mask</code>、<code>--component-modal-panel-*</code>，内边距与宽度走 <code>--component-modal-p</code>、<code>--component-modal-w</code> / <code>--component-modal-w-with-tip</code>。
          </p>
          <label class="pg-field">
            <span>Layout（演示）</span>
            <select id="pgVariant" aria-label="Modal demo layout">
              <option value="standard" selected>standard（正文 only）</option>
              <option value="with-tip">with-tip（顶部提示区）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Width（token）</span>
            <select id="pgSize" aria-label="Modal demo width">
              <option value="md" selected>MD · 440px（<code>--component-modal-w</code>）</option>
              <option value="md-tip">MD + tip · 464px（<code>--component-modal-w-with-tip</code>）</option>
              <option value="sm">SM · 280px（紧凑示意）</option>
              <option value="lg">LG · 520px（宽示意）</option>
            </select>
          </label>
        </aside>"""
    elif spec.slug == "button":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <p class="muted" style="margin:0 0 10px 0;font-size:12px;line-height:1.45;">
            对齐 <code>docs/components/button.md</code> 与 Arco Design Web React <code>Button</code>（<code>type</code>/<code>size</code>/<code>disabled</code> 等）；视觉尺寸走 <code>button.layout.*</code> token。
          </p>
          <label class="pg-field">
            <span>Size（Arco size）</span>
            <select id="pgSize" aria-label="Button demo size">
              <option value="sm">small（sm）</option>
              <option value="md" selected>medium（md）</option>
              <option value="lg">large（lg）</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Variant（映射 Arco type）</span>
            <select id="pgVariant" aria-label="Button demo variant">
              <option value="primary" selected>primary</option>
              <option value="neutral">secondary（demo: neutral）</option>
              <option value="danger">danger</option>
              <option value="ghost">outline（demo: ghost）</option>
            </select>
          </label>
        </aside>"""
    else:
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <label class="pg-field">
            <span>Size</span>
            <select id="pgSize" aria-label="Preview size">
              <option value="sm">Small</option>
              <option value="md" selected>Medium</option>
              <option value="lg">Large</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Variant</span>
            <select id="pgVariant" aria-label="Preview variant">
              <option value="primary" selected>Primary</option>
              <option value="neutral">Neutral</option>
              <option value="danger">Danger</option>
              <option value="ghost">Ghost</option>
            </select>
          </label>
        </aside>"""
    if spec.slug == "alert":
        live_intro_sub = (
            "Live 对齐 Arco Design Web React <code>Alert</code> DOM 与 <code>role=\"alert\"</code>；样式仅引用 "
            "<code>--component-alert-*</code> 与 <code>--semantic-*</code>（见 <code>docs/components/alert.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Default · Multiline · With title · Closable + action · Banner + center；"
            "部分行使用 <code>auto</code> 尺寸以展示多行/标题 padding。"
        )
    elif spec.slug == "breadcrumb":
        live_intro_sub = (
            "Live 为 <code>nav[aria-label=\"Breadcrumb\"] &gt; ol &gt; li</code> 结构，分隔符 <code>aria-hidden</code>；"
            "样式见 <code>docs/components/breadcrumb.md</code> 与 <code>--component-breadcrumb-*</code>。"
        )
        matrix_rows_help = (
            "五行：Depth 2 · Depth 3 · 长标签截断 · 4+ 省略号 · Depth 4（静态示意，分隔符各行不同）。"
        )
    elif spec.slug == "badge":
        live_intro_sub = (
            "Live 为 <code>span.ds-badge</code> 与 Arco 常见结构一致（count / dot / status）；"
            "读屏文案见 <code>aria-label</code> / <code>role=\"status\"</code>（见 <code>docs/components/badge.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Count default · Count disabled · Dot · Status processing · Count 99+（静态示意）。"
        )
    elif spec.slug == "checkbox":
        live_intro_sub = (
            "Live 为 <code>label.ds-cb</code> + 隐藏 <code>input[type=checkbox]</code> + 自定义 <code>.ds-cb-box</code>；"
            "焦点环 <code>--component-checkbox-focus-ring</code>；见 <code>docs/components/checkbox.md</code>。"
        )
        matrix_rows_help = (
            "五行：Unchecked · Hover（示意）· Checked · Indeterminate（脚本设 <code>indeterminate</code>）· Checked disabled。"
        )
    elif spec.slug == "radio":
        live_intro_sub = (
            "Live 为 <code>role=\"radiogroup\"</code> + <code>aria-label</code>；"
            "circle：<code>label.ds-rb</code> + 隐藏 <code>input[type=radio]</code> + <code>.ds-rb-outer</code> / <code>.ds-rb-dot</code>；"
            "capsule：<code>.ds-rg-capsule[data-capsule-size]</code> + <code>label.ds-rbc</code> + <code>.ds-rbc-pill</code>（L/M/S 走 <code>--component-radio-button-*</code>）；"
            "焦点环 <code>--component-radio-focus-ring</code>（见 <code>docs/components/radio.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Unchecked · Hover（示意）· Selected · Focus（示意环）· Selected disabled；"
            "随侧栏 Style 在 circle / capsule 矩阵间切换；capsule 时 **Capsule size** 同步矩阵与 Live。"
        )
    elif spec.slug == "tag":
        live_intro_sub = (
            "Live 为 <code>span.ds-tag.ds-tag--status</code>（<code>data-tone</code> / <code>data-size</code>）、"
            "<code>button.ds-tag--selector</code>、<code>span.ds-tag--group</code> + <code>button.ds-tag__close</code>、"
            "<code>button.ds-tag--add</code>；焦点环 <code>--component-tag-focus-ring</code>；见 <code>docs/components/tag.md</code>。"
        )
        matrix_rows_help = (
            "五行静态示意：Status·xs · Status·md · Selector·selected · Group·close · Add·sm。"
        )
    elif spec.slug == "switch":
        live_intro_sub = (
            "Live 为 <code>button.ds-switch</code>，<code>role=\"switch\"</code> + <code>aria-checked</code> + <code>aria-disabled</code>；"
            "<code>Space</code>/<code>Enter</code> 切换；<code>data-variant</code>（round / linear）与 <code>data-size</code>（md / lg）；"
            "焦点环 <code>--component-switch-focus-ring</code>（见 <code>docs/components/switch.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Off · Hover（轨道 filter 示意）· On · On + Focus（示意环）· Disabled off；"
            "与侧栏 Variant / Size 同步。"
        )
    elif spec.slug == "tabs":
        live_intro_sub = (
            "Live：<code>#tbRoot</code> 根节点为 <code>ds-tabs</code> + 形态类（如 <code>ds-tabs--underline</code> / <code>ds-tabs--pill</code> 等）；"
            "<code>.ds-tabs-bar</code> 内 <code>div[role=\"tablist\"].ds-tabs-list</code> + <code>button[role=\"tab\"].ds-tabs-tab</code>（<strong>scrollable</strong> 为 <code>div[role=\"tab\"]</code> 内含 <code>button.ds-tabs-close</code>）；"
            "<code>.ds-tabs-panels</code> 内 <code>section.ds-tabs-panel[role=\"tabpanel\"]</code>；<code>aria-controls</code> / <code>aria-selected</code> 与 roving <code>tabindex</code>；"
            "键盘 <code>ArrowLeft</code>/<code>ArrowRight</code>（水平）或 <code>ArrowUp</code>/<code>ArrowDown</code>（<code>data-orientation=\"vertical\"</code>）、<code>Home</code>/<code>End</code> 切换选中与面板显隐；样式 <code>--component-tabs-*</code>（见 <code>docs/components/tabs.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Default · Hover（<code>is-hov</code>）· Selected（<code>is-sel</code>）· Disabled · Focus（<code>is-foc</code>）；形态与侧栏 Kind 同步，underline/border 的档位随 Size。"
        )
    elif spec.slug == "slider":
        live_intro_sub = (
            "Live 为 <code>.ds-sl</code>：轨道 <code>.ds-sl-track</code>、激活段 <code>.ds-sl-fill</code>、"
            "<code>button.ds-sl-thumb</code> 且 <code>role=\"slider\"</code> + <code>aria-valuemin/max/now</code> + <code>aria-orientation=\"horizontal\"</code>；"
            "键盘 Arrow / PageUp·PageDown / Home·End；轨道点击与拖拽更新值；"
            "样式仅 <code>--component-slider-*</code>（见 <code>docs/components/slider.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Default · Hover（thumb 示意）· Active（thumb 示意）· Focus（thumb 示意）· Disabled；"
            "静态单滑块示意，与侧栏 Marks 无关。"
        )
    elif spec.slug == "progress":
        live_intro_sub = (
            "Live：<strong>line</strong> 为 <code>role=\"progressbar\"</code> + <code>aria-valuenow</code> 或 <code>aria-valuetext=\"Loading\"</code>（busy）；"
            "<strong>circle</strong> 为 SVG 环 + 中心文案；<strong>mini</strong> / <strong>step</strong> 为示意结构；"
            "样式仅 <code>--component-progress-*</code>（见 <code>docs/components/progress.md</code>）。"
        )
        matrix_rows_help = (
            "五行：静态 line · SM（20% / 40% / 66% / 100% / 0%）与 success 行示意；与侧栏 Kind 无关。"
        )
    elif spec.slug == "steps":
        live_intro_sub = (
            "Live：<code>nav#stNav.ds-st</code> 包裹 <code>ol.ds-st-list</code>（<code>role=\"list\"</code>）+ <code>li.ds-st-item</code>；"
            "当前步 <code>aria-current=\"step\"</code>；<code>data-orientation</code>（horizontal / vertical）与 <code>data-size</code>（lg / md）驱动图标与排版 token；"
            "连接器 <code>.ds-st-connector</code> / <code>.ds-st-connector--completed</code>；样式 <code>--component-steps-*</code>（见 <code>docs/components/steps.md</code>）。"
        )
        matrix_rows_help = (
            "五行：单步静态 · Completed · Current · Pending · Error · Disabled；与侧栏 Layout 无关，尺寸随 Size。"
        )
    elif spec.slug == "card":
        live_intro_sub = (
            "Live：<code>#cdRoot.ds-card</code> 包裹标题 <code>h3.ds-card-title</code>、正文 <code>p.ds-card-body</code>、"
            "<code>div.ds-card-divider</code> 与 meta 行；<code>data-bordered</code> / <code>data-hoverable</code> / <code>data-clickable</code> / <code>data-disabled</code> 与 <code>data-size</code>（md / sm）驱动样式；"
            "可点击时 <code>tabindex=\"0\"</code> + <code>role=\"region\"</code> 与 <code>:focus-visible</code> 环（<code>--component-card-clickable-focus-ring</code>）；见 <code>docs/components/card.md</code>。"
        )
        matrix_rows_help = (
            "五行静态：Default（无描边）· Bordered · Hover（<code>is-cd-hover</code>）· Clickable（<code>is-cd-foc</code> 示意环）· Small（<code>data-size=\"sm\"</code>）；与侧栏 Kind 无关。"
        )
    elif spec.slug == "pageheader":
        live_intro_sub = (
            "Live：<code>header#phRoot.ds-ph</code>；可选 <code>nav.ds-ph-bc</code>（<code>aria-label=\"Breadcrumb\"</code>）；"
            "主行 <code>.ds-ph-row</code> 内左侧 <code>button.ds-ph-back</code>（<code>aria-label=\"Back\"</code>）+ 竖分隔 <code>.ds-ph-vdiv</code> + <code>h1.ds-ph-title</code> / <code>p.ds-ph-desc</code>；"
            "右侧 <code>.ds-ph-actions</code> 或 <code>.ds-ph-controls</code>（<code>role=\"radiogroup\"</code>，<code>#phSeg</code> 点击切换 <code>aria-checked</code>）；样式 <code>--component-page-header-*</code>（见 <code>docs/components/pageheader.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Default · Breadcrumb · Actions · Controls · No description（仅标题）；与侧栏 Layout 无关。"
        )
    elif spec.slug == "cascader":
        live_intro_sub = (
            "Live：<code>#csRoot.ds-casc</code>；<code>button#csTrig.ds-casc-trg</code> 为 <code>role=\"combobox\"</code> + <code>aria-controls=\"csPanel\"</code> / <code>aria-expanded</code>；"
            "<code>#csPanel.ds-casc-panel</code> 内 <code>.ds-casc-cols</code> 三列 <code>ul[role=\"listbox\"]</code> + <code>button.ds-casc-item[role=\"option\"]</code>；"
            "<strong>multiple</strong> 时行前加 <code>span.ds-casc-cb</code>（<code>is-ind</code> / <code>is-on</code>）；<strong>error</strong> 时触发器 <code>ds-casc-trg--err</code> + <code>aria-invalid</code>；"
            "<code>Escape</code> 关闭面板；样式 <code>--component-cascader-*</code>（见 <code>docs/components/cascader.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Default · Hover（<code>is-hov</code>）· Selected（<code>is-act</code>）· Disabled · Checked（<code>ds-casc-cb.is-on</code>）；尺寸随侧栏 Size 的 <code>data-size</code>。"
        )
    elif spec.slug == "tree":
        live_intro_sub = (
            "Live：<code>#trRoot.ds-tree</code> 为 <code>role=\"tree\"</code>；顶层 <code>ul.ds-tree-list</code>（<code>role=\"group\"</code>）内 <code>li.ds-tree-node[role=\"treeitem\"]</code>；"
            "行容器 <code>.ds-tree-row</code>；可展开节点为 <code>button.ds-tree-toggle</code>（<code>aria-expanded</code>）+ 子 <code>ul</code>（收起时 <code>hidden</code>）；叶节点用占位 <code>span.ds-tree-toggle--leaf</code>；"
            "<strong>checkbox</strong> 模式下行前 <code>span.ds-tree-cb</code> + <code>.ds-tree-cb-box</code>；键盘 <code>ArrowUp</code>/<code>ArrowDown</code>/<code>Home</code>/<code>End</code>、<code>ArrowRight</code> 展开、<code>ArrowLeft</code> 收起或回父级；"
            "样式 <code>--component-tree-*</code>（见 <code>docs/components/tree.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Default · Hover（<code>is-hov</code>）· Selected（<code>is-sel</code>）· Disabled（<code>is-dis</code> + <code>aria-disabled</code>）· Focus（<code>is-foc</code>）；叶占位开关，尺寸随 <code>data-size</code>。"
        )
    elif spec.slug == "upload":
        live_intro_sub = (
            "Live：<code>#uplRoot.ds-upl</code>；提示 <code>p#uplHint.ds-upl-hint</code>（<code>aria-describedby</code> 绑定触发区）；"
            "<code>#uplTrig</code> 为 <code>button.ds-upl-trg.ds-upl-trg--btn</code> 或 <code>div[role=\"button\"].ds-upl-trg.ds-upl-trg--drag</code>；"
            "列表 <code>ul.ds-upl-list</code> + <code>li.ds-upl-item</code>，操作 <code>button.ds-upl-act</code>（含 <code>aria-label</code> 带文件名）；"
            "上传中行含 <code>role=\"progressbar\"</code> 与 <code>.ds-upl-prog</code>；照片墙 <code>.ds-upl-cards</code> / <code>.ds-upl-card</code> + <code>.ds-upl-card-mask</code>；样式 <code>--component-upload-*</code>（见 <code>docs/components/upload.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Default · Hover（<code>is-hov</code>）· Disabled · Drag hover（<code>is-drag</code>）· Focus（<code>is-foc</code>）；均为 <code>button.ds-upl-trg--btn</code> 示意，尺寸随 <code>data-size</code>。"
        )
    elif spec.slug == "input":
        live_intro_sub = (
            "Live 为 <code>#inLive.ds-input</code>，外层 <code>.ds-in-row[data-size=s|l|xl]</code>；"
            "变体含 password（<code>#inPwBtn</code> 切换显隐）、search、suffix、group（<code>role=\"group\"</code>）；"
            "焦点环 <code>--component-input-ring-focus</code>；见 <code>docs/components/input.md</code>。"
        )
        matrix_rows_help = (
            "五行：Default · Hover · Active（示意）· Focus（示意环）· Disabled；"
            "尺寸与侧栏 Size 同步（<code>data-size</code>）。"
        )
    elif spec.slug == "input-number":
        live_intro_sub = (
            "Live 为 <code>.ds-num</code>（<code>embed</code> / <code>button</code> / <code>plain</code>）+ "
            "<code>input.ds-num-inp</code>，<code>role=\"spinbutton\"</code> + <code>aria-valuemin/max/now</code>；"
            "加减按钮 <code>aria-label</code>；<code>ArrowUp</code>/<code>ArrowDown</code> 步进、失焦夹取 <code>[0,100]</code>、长按步进；"
            "样式 <code>--component-input-number-*</code>（见 <code>docs/components/input-number.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Default · Hover · Active（本行静态为 <code>mat-num-err</code> 示意）· Focus · Disabled；"
            "尺寸随侧栏 Size 的 <code>data-size</code>（s / l / xl）。"
        )
    elif spec.slug == "input-ip":
        live_intro_sub = (
            "Live 为 <code>div.ds-input-ip</code>，<code>role=\"group\"</code> + <code>aria-label=\"IP address\"</code>；"
            "四段 <code>input.ds-input-ip-seg</code>（<code>maxlength=\"3\"</code>、<code>inputmode=\"numeric\"</code>）与 <code>aria-hidden</code> 的 <code>.</code> 分隔符；"
            "键盘 <code>ArrowLeft</code>/<code>ArrowRight</code> 切换段、空段 <code>Backspace</code> 回退；"
            "样式仅 <code>--component-input-*</code>（见 <code>docs/components/input-ip.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态示意：Default · Hover · 第三行壳 <code>is-error</code> 且末段 <code>is-ip-err</code>（999）· Focus · Disabled（<code>data-disabled</code>）。"
        )
    elif spec.slug == "input-range":
        live_intro_sub = (
            "Live：<strong>Plain</strong> 为双 <code>.ds-in-row</code> + <code>input.ds-input</code> 与 em dash；"
            "<strong>With unit</strong> 为 <code>.ds-ir-unit</code> 统一底 + 双值 + 竖线 + <code>%</code> 后缀；"
            "错误文案色 <code>--component-form-error-text</code>；见 <code>docs/components/input-range.md</code>。"
        )
        matrix_rows_help = (
            "五行静态示意：统一外壳 + 双值 + <code>%</code>；第四行为 <code>is-error</code> 外壳。"
        )
    elif spec.slug == "input-adornment":
        live_intro_sub = (
            "Live 复用 <code>.ds-in-row</code> / <code>.ds-in-addon</code> / <code>.ds-in-affix</code> / <code>.ds-in-sfx</code>；"
            "双缀行使用 <code>.ds-in-joined</code> + <code>.ds-in-addon-tail</code>；"
            "样式 <code>--component-input-*</code>（见 <code>docs/components/input-adornment.md</code>）。"
        )
        matrix_rows_help = (
            "五行：与 Input 相同的 <code>mat-inp-*</code> 静态矩阵（单行 <code>.ds-input</code>）。"
        )
    elif spec.slug == "button":
        live_intro_sub = (
            "Live 对齐 Arco Design Web React <code>Button</code>：无 <code>href</code>、无 <code>loading</code>/<code>icon</code> 时不渲染图标容器；"
            "样式仅引用 <code>--component-button-*</code> 与 <code>--semantic-*</code>（见 <code>docs/components/button.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Default · Hover · Active · Focus · Disabled；尺寸随侧栏 Size token（matrix 使用 <code>layout.matrix*</code>）。"
        )
    elif spec.slug == "select":
        live_intro_sub = (
            "Live：<code>button#stg.ds-sel-trg</code> 为 <code>role=\"combobox\"</code> + <code>aria-controls</code> / <code>aria-expanded</code>，"
            "<code>#stl</code> 为 <code>role=\"listbox\"</code>；<strong>searchable</strong> 时顶部为 <code>input.ds-sel-search</code> 过滤选项；"
            "多选 tags / count 为静态示意；尺寸 <code>data-size</code> 映射 <code>select.layout.*</code>（见 <code>docs/components/select.md</code>）。"
        )
        matrix_rows_help = (
            "五行：下拉项 Default · Hover · Active（选中底）· Focus（内描边示意）· Disabled；"
            "行高与圆角随侧栏 Size 的 <code>data-size</code>。"
        )
    elif spec.slug == "menu":
        live_intro_sub = (
            "Live：<code>#muRoot</code> 在 <strong>inline</strong> 时为 <code>nav.ds-mu-nav[role=\"menu\"]</code>，内含 <code>button.ds-mu-item[role=\"menuitem\"]</code> + <code>span.ds-mu-ic</code> / <code>span.ds-mu-lbl</code> / <code>span.ds-mu-chev</code>；"
            "<strong>collapsed</strong> 时容器 <code>ds-mu-nav--collapsed</code>（48px，文案 <code>sr-only</code>）；"
            "<strong>pop</strong> 时为 <code>div.ds-mu-pop[role=\"menu\"]</code> + <code>button.ds-mu-pop-item</code>；"
            "键盘 <code>ArrowUp</code>/<code>ArrowDown</code> 在可用 <code>menuitem</code> 间移动焦点；样式 <code>--component-menu-*</code>（见 <code>docs/components/menu.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态侧栏行：Default · Hover（<code>is-hov</code>）· Selected（<code>is-sel</code> + <code>aria-selected</code>）· Focus（<code>is-foc</code>）· Disabled；与侧栏 View/Width 无关。"
        )
    elif spec.slug == "dropdown":
        live_intro_sub = (
            "Live：<code>button#ddTrig.ds-dd-trg</code>，<code>aria-haspopup=\"menu\"</code> + <code>aria-controls=\"ddMenu\"</code> / <code>aria-expanded</code>；"
            "<code>#ddMenu.ds-dd-panel</code> 为 <code>role=\"menu\"</code>，子项为 <code>button[role=\"menuitem\"]</code>；"
            "<strong>search</strong> 变体含过滤与面板最小高度（<code>dropdown.panel.searchMinHeight</code> → <code>--component-dropdown-panel-search-min-height</code>）；样式 <code>--component-dropdown-*</code>（见 <code>docs/components/dropdown.md</code>）。"
        )
        matrix_rows_help = (
            "五行：Default · Hover（<code>is-dd-hover</code>）· Selected（勾选）· Focus（<code>is-dd-foc</code>）· Disabled；"
            "触发器 <code>data-trigger</code>（m/l）与菜单 <code>data-item</code>（md/sm）随侧栏。"
        )
    elif spec.slug == "pincode":
        live_intro_sub = (
            "Live：<code>div#pcGroup.ds-pc</code> 为 <code>role=\"group\"</code> + <code>aria-labelledby</code>；"
            "每格 <code>input.ds-pc-cell</code>（<code>inputmode=\"numeric\"</code>、<code>maxlength=\"1\"</code>、<code>autocomplete=\"one-time-code\"</code>）；"
            "组上粘贴整段验证码、<code>ArrowLeft</code>/<code>ArrowRight</code> 与 <code>Backspace</code> 导航；"
            "态色 <code>--component-pin-code-cell-*</code>，布局 <code>--component-pin-code-layout-*</code>（见 <code>docs/components/pincode.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态单格：Default · Active（<code>is-act</code>）· Filled（<code>is-filled</code>）· Error（<code>is-err</code>）· Disabled（<code>is-dis</code>）；与侧栏 State 无关。"
        )
    elif spec.slug == "message":
        live_intro_sub = (
            "Live 为 <code>div.ds-msg[data-tone]</code>：<strong>error</strong> 使用 <code>role=\"alert\"</code>，其余 tone 使用 <code>role=\"status\"</code>；"
            "可选 <code>button.ds-msg-close</code>（<code>aria-label=\"Close message\"</code>）点击移除当前条；"
            "样式仅 <code>--component-message-*</code>（见 <code>docs/components/message.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Info·status · Success·status · Warning·status · Error·alert · Info·closable；与侧栏 Type 无关。"
        )
    elif spec.slug == "modal":
        live_intro_sub = (
            "Live：<code>button#dsmOpen.ds-open-modal</code> 打开 <code>#dsmLayer.ds-modal-layer</code>（去 <code>hidden</code>）；"
            "<code>.ds-modal-backdrop</code> 点击关闭；面板 <code>.ds-modal-panel</code> 为 <code>role=\"dialog\"</code> + <code>aria-modal=\"true\"</code> + <code>aria-labelledby</code> / <code>aria-describedby</code>；"
            "<strong>with-tip</strong> 时在正文顶渲染 <code>.ds-modal-tip</code>；宽度由侧栏 Width 下拉写入内联 <code>min(..., var(--component-modal-w*)...)</code>；"
            "<code>Escape</code> 关闭；样式 <code>--component-modal-*</code>（见 <code>docs/components/modal.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态迷你面板：Default · Hover（<code>is-hov</code>）· Active（<code>is-act</code>）· Focus（<code>is-foc</code>）· Disabled（<code>is-dis</code>）；与侧栏 Layout/Width 无关。"
        )
    elif spec.slug == "notification":
        live_intro_sub = (
            "Live：<code>#ntfRoot.ds-ntf[data-tone]</code>；<strong>error</strong> 为 <code>role=\"alert\"</code>，其余为 <code>role=\"status\"</code>；"
            "头部 <code>.ds-ntf-head</code> 含可选 <code>span.ds-ntf-ic</code>（<code>default</code> 无图标）+ <code>.ds-ntf-title</code>；正文 <code>p.ds-ntf-desc</code>；"
            "可选 <code>button.ds-ntf-close</code>（<code>aria-label=\"Close notification\"</code>）与 <code>.ds-ntf-actions</code> 内 <code>button.ds-ntf-btn</code> / <code>ds-ntf-btn--pri</code>；"
            "样式 <code>--component-notification-*</code>（见 <code>docs/components/notification.md</code>）。"
        )
        matrix_rows_help = (
            "五行静态：Info · Success · Warning（Success 行含 <code>is-hov</code> 示意）· Error+closable+alert · Default+actions；与侧栏 checkbox 无关。"
        )
    else:
        live_intro_sub = (
            "Visuals follow <code>tokens.css</code> (see <code>docs/design.md</code> — tokens first). "
            "Pseudo-states + small JS for ripple, switch, modal, select."
        )
        matrix_rows_help = (
            "Five rows (label left · preview right): Default · Hover · Active · Focus · Disabled"
        )
    return (
        f"""
    <div class="wrap">
      <div class="top">
        <div>
          <h1 style="margin:0; font-size:20px; line-height:1.2;">{title}</h1>
          <div class="muted" style="margin-top:6px;">Slug <code>{slug_esc}</code> · tokens <code>--component-{token_prefix_esc}-*</code> · behavior source <code>{html.escape(behavior_source)}</code></div>
        </div>
        <div class="pill">
          <span class="swatch"></span>
          <a href="{html.escape(index_href)}">Back to index</a>
        </div>
      </div>
      <style>
/* Inlined from .design-spec/generator/studio_runtime.css (+ studio_runtime.js below). Regenerate from repo root:
   python3 .design-spec/generator/generate_component_html_demos.py */
"""
        + studio_css
        + f"""
      </style>

      <div class="studio">
        <div class="studio-main card">
          <div class="card-b">
            {size_guide}
            <section>
              <h2 class="sec-head">Live</h2>
              <p class="sec-sub">{live_intro_sub}</p>
              <div class="live-canvas">
                <div id="liveRoot"></div>
              </div>
            </section>
            <section style="margin-top:8px;">
              <h2 class="sec-head">Status matrix</h2>
              <p class="sec-sub">{matrix_rows_help}</p>
              <div id="matrixRoot" class="matrix-grid"></div>
            </section>
          </div>
        </div>
{aside_block}
      </div>
    </div>
    <script type="application/json" id="ds-component-tokens">{token_json}</script>
    <script>
"""
        + studio_js
        + """
    </script>
    """
    )

def _preview_body(components: list[ComponentSpec], tokens_href: str, behavior_source: str) -> str:
    """
    Aggregated preview page: every component embedded as an iframe over
    `components/<slug>.html` for full-state/full-variant browsing.

    Visual rhythm follows the `getdesign.md` preview reference (scannable
    section flow + light card density) but stays inside D-Spark tokens —
    no new brand palette is introduced.
    """
    quick_nav_items = "\n".join(
        f'      <a class="prv-nav-chip" href="#prv-{html.escape(c.slug)}" data-prv-filter="{html.escape((c.slug + " " + c.title).lower())}">'
        f'<span>{html.escape(c.title)}</span>'
        f'<span class="muted" style="margin-left:6px;"><code>{html.escape(c.slug)}</code></span>'
        f'</a>'
        for c in components
    )

    section_items: list[str] = []
    for c in components:
        slug = html.escape(c.slug)
        title = html.escape(c.title)
        token_prefix = html.escape(c.token_prefix)
        md_rel = html.escape(f"../docs/components/{c.source_path.name}")
        demo_rel = f"components/{slug}.html"
        section_items.append(
            f"""
      <section class="prv-section" id="prv-{slug}" data-prv-filter="{html.escape((c.slug + " " + c.title).lower())}">
        <div class="prv-eyebrow">
          <span class="prv-eyebrow-num">{len(section_items) + 1:02d}</span>
          <span class="prv-eyebrow-text">Component preview</span>
        </div>
        <div class="prv-section-head">
          <div class="prv-section-titles">
            <h2 class="prv-section-title">{title}</h2>
            <p class="prv-section-sub">Slug <code>{slug}</code> · tokens <code>--component-{token_prefix}-*</code></p>
          </div>
          <div class="prv-section-actions">
            <a class="prv-btn" href="{demo_rel}" target="_blank" rel="noreferrer noopener">Open standalone ↗</a>
            <a class="prv-btn prv-btn--ghost" href="{md_rel}" target="_blank" rel="noreferrer noopener">Spec</a>
            <a class="prv-btn prv-btn--ghost" href="#top">Top</a>
          </div>
        </div>
        <div class="prv-frame-wrap">
          <iframe class="prv-frame" src="{demo_rel}" loading="lazy"
                  title="{title} preview"
                  referrerpolicy="no-referrer"></iframe>
        </div>
      </section>
"""
        )

    sections_html = "".join(section_items)
    total = len(components)

    return f"""
    <style>
      .prv-wrap {{
        max-width: 1280px;
        margin: 24px auto 96px auto;
        padding: 0 16px;
        display: flex;
        flex-direction: column;
        gap: 24px;
      }}
      .prv-top {{
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }}
      .prv-top h1 {{
        margin: 0;
        font-size: 28px;
        line-height: 1.15;
        letter-spacing: -0.01em;
        color: var(--semantic-text-primary, #222);
      }}
      .prv-top .prv-sub {{
        margin-top: 8px;
        font-size: 13px;
        color: var(--semantic-text-secondary, #666);
        line-height: 1.45;
        max-width: 720px;
      }}
      .prv-top .prv-pill {{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 12px;
        color: var(--semantic-text-secondary, #666);
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        background: var(--semantic-bg-surface, #fff);
        border-radius: 999px;
        padding: 6px 12px;
      }}
      .prv-toolbar {{
        position: sticky;
        top: 0;
        z-index: 5;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        margin: 0 -16px;
        background: var(--semantic-bg-page, #f7f7f7);
        border-bottom: 1px solid var(--semantic-border-subtle, #e8e8e8);
        flex-wrap: wrap;
      }}
      .prv-toolbar .prv-filter {{
        flex: 1 1 220px;
        min-height: 36px;
        border-radius: 8px;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        background: var(--semantic-bg-surface, #fff);
        color: var(--semantic-text-primary, #222);
        padding: 0 12px;
        font-size: 14px;
      }}
      .prv-toolbar .prv-filter:focus-visible {{
        outline: 2px solid var(--semantic-text-link, #506daf);
        outline-offset: 1px;
      }}
      .prv-toolbar .prv-count {{
        font-size: 12px;
        color: var(--semantic-text-secondary, #666);
      }}
      .prv-nav {{
        display: flex;
        flex-wrap: wrap;
        gap: 6px 8px;
        padding: 12px 14px;
        background: var(--semantic-bg-surface, #fff);
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        border-radius: 12px;
      }}
      .prv-nav-chip {{
        display: inline-flex;
        align-items: baseline;
        padding: 4px 10px;
        border-radius: 999px;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        background: var(--semantic-bg-surface, #fff);
        color: var(--semantic-text-primary, #222);
        font-size: 12px;
        line-height: 1.4;
        text-decoration: none;
      }}
      .prv-nav-chip:hover {{
        background: var(--semantic-bg-page, #f7f7f7);
        text-decoration: none;
      }}
      .prv-section {{
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 20px;
        background: var(--semantic-bg-surface, #fff);
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        border-radius: 16px;
        scroll-margin-top: 80px;
      }}
      .prv-eyebrow {{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--semantic-text-secondary, #666);
      }}
      .prv-eyebrow-num {{
        padding: 2px 6px;
        border-radius: 4px;
        background: var(--semantic-bg-page, #f7f7f7);
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
      }}
      .prv-section-head {{
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
      }}
      .prv-section-title {{
        margin: 0;
        font-size: 20px;
        line-height: 1.2;
        letter-spacing: -0.01em;
        color: var(--semantic-text-primary, #222);
      }}
      .prv-section-sub {{
        margin: 4px 0 0 0;
        font-size: 12px;
        color: var(--semantic-text-secondary, #666);
      }}
      .prv-section-actions {{
        display: inline-flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
      }}
      .prv-btn {{
        display: inline-flex;
        align-items: center;
        padding: 6px 12px;
        font-size: 12px;
        line-height: 1.4;
        border-radius: 999px;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        background: var(--semantic-text-primary, #222);
        color: var(--semantic-bg-surface, #fff);
        text-decoration: none;
      }}
      .prv-btn:hover {{
        text-decoration: none;
        opacity: 0.92;
      }}
      .prv-btn--ghost {{
        background: var(--semantic-bg-surface, #fff);
        color: var(--semantic-text-primary, #222);
      }}
      .prv-frame-wrap {{
        position: relative;
        border: 1px solid var(--semantic-border-subtle, #e8e8e8);
        border-radius: 12px;
        overflow: hidden;
        background: var(--semantic-bg-page, #f7f7f7);
      }}
      .prv-frame {{
        display: block;
        width: 100%;
        height: 880px;
        border: 0;
        background: var(--semantic-bg-page, #f7f7f7);
      }}
      .prv-footer-note {{
        font-size: 12px;
        color: var(--semantic-text-secondary, #666);
        text-align: center;
        margin-top: 8px;
      }}
      .prv-section[hidden] {{ display: none; }}
      @media (max-width: 720px) {{
        .prv-frame {{ height: 720px; }}
        .prv-top h1 {{ font-size: 22px; }}
      }}
    </style>
    <div class="prv-wrap" id="top">
      <header class="prv-top">
        <div>
          <h1>Component previews</h1>
          <p class="prv-sub">
            全量组件的状态 / 变体 / token 变量在此聚合预览。每张卡片嵌入
            <code>components/&lt;slug&gt;.html</code>（Live + Status matrix + Rendered preview + Token snapshot）。
            真源约束见 <a href="../docs/design.md">docs/design.md</a>，tokens 仅取自
            <code>{html.escape(tokens_href)}</code>。
          </p>
        </div>
        <div class="prv-pill">
          <span>{total} components</span>
          <span aria-hidden="true">·</span>
          <span>behavior · <code>{html.escape(behavior_source)}</code></span>
          <span aria-hidden="true">·</span>
          <a href="index.html">Back to index</a>
        </div>
      </header>
      <div class="prv-toolbar" role="region" aria-label="Preview toolbar">
        <input id="prvFilter" class="prv-filter" type="search" placeholder="Filter by component name or slug…" autocomplete="off" aria-label="Filter components" />
        <span class="prv-count" id="prvCount">{total} / {total}</span>
        <a class="prv-btn prv-btn--ghost" href="#top" aria-label="Back to top">Top</a>
      </div>
      <nav class="prv-nav" aria-label="Quick component anchors">
{quick_nav_items}
      </nav>
{sections_html}
      <p class="prv-footer-note">
        Generated by <code>.design-spec/generator/generate_component_html_demos.py</code> · do not hand-edit.
      </p>
    </div>
    <script>
      (function () {{
        var input = document.getElementById("prvFilter");
        var countEl = document.getElementById("prvCount");
        if (!input) return;
        var sections = Array.prototype.slice.call(document.querySelectorAll(".prv-section[data-prv-filter]"));
        var chips = Array.prototype.slice.call(document.querySelectorAll(".prv-nav-chip[data-prv-filter]"));
        var total = sections.length;
        function apply() {{
          var q = (input.value || "").trim().toLowerCase();
          var shown = 0;
          sections.forEach(function (el) {{
            var hit = !q || el.getAttribute("data-prv-filter").indexOf(q) >= 0;
            if (hit) {{ el.removeAttribute("hidden"); shown += 1; }} else {{ el.setAttribute("hidden", ""); }}
          }});
          chips.forEach(function (el) {{
            var hit = !q || el.getAttribute("data-prv-filter").indexOf(q) >= 0;
            el.style.display = hit ? "" : "none";
          }});
          if (countEl) countEl.textContent = shown + " / " + total;
        }}
        input.addEventListener("input", apply);
      }})();
    </script>
    """


def _index_body(components: list[ComponentSpec], tokens_href: str, behavior_source: str) -> str:
    items = "\n".join(
        f'<li style="margin:6px 0;"><a href="components/{html.escape(c.slug)}.html">{html.escape(c.title)}</a>'
        f' <span class="muted">(<code>{html.escape(c.slug)}</code>)</span></li>'
        for c in components
    )
    b_line_links = """
          <li style="margin:6px 0;"><a href="pages/dashboard.html"><strong>仪表盘</strong> 页模版</a>
            <span class="muted">（对稿 Arco Pro / TDesign 式信息架构 · 1:1）</span></li>
          <li style="margin:6px 0;"><a href="pages/archive/dashboard-tdesign-starter-base.html"><strong>TDesign Starter 仪表盘</strong> 静态对稿</a>
            <span class="muted">（token + ECharts CDN · 与线上 base 同构四段）</span></li>
          <li style="margin:6px 0;"><a href="pages/list.html"><strong>列表页</strong> 模版</a>
            <span class="muted">（筛选条 + 数据表 + 分页）</span></li>
          <li style="margin:6px 0;"><a href="pages/form.html"><strong>表单页</strong> 模版</a>
            <span class="muted">（面包屑 + 两列表单 + 操作区）</span></li>
"""
    return f"""
    <div class="wrap">
      <div class="top">
        <div>
          <h1 style="margin:0; font-size:20px; line-height:1.2;">Component demos</h1>
          <div class="muted" style="margin-top:6px;">Live token studio per component · <code>{html.escape(tokens_href)}</code> · behavior source <code>{html.escape(behavior_source)}</code></div>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-b">
          <h2 style="margin:0 0 10px 0; font-size:16px; line-height:1.3;">A 线 · 全量预览（aggregated preview）</h2>
          <p class="muted" style="margin:0 0 10px 0; font-size:12px; line-height:1.5;">
            <a href="preview.html"><strong>preview.html</strong></a> 用 iframe 聚合
            <code>components/&lt;slug&gt;.html</code>，一页直观看完所有组件的 Live / Status matrix /
            Rendered preview / Token snapshot；顶栏支持按名称或 slug 即时过滤。
          </p>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-b">
          <h2 style="margin:0 0 10px 0; font-size:16px; line-height:1.3;">B 线 · 页面对稿模版（MD → HTML · 1:1）</h2>
          <p class="muted" style="margin:0 0 10px 0; font-size:12px; line-height:1.5;">
            整页组合（仪表盘 / 列表 / 表单）仅使用 <code>tokens.css</code> 变量，用于对照 Figma 整屏与多组件间距；
            单组件细部仍以 <code>components/*.html</code> 为准。参考：
            <a href="https://arco.design/pro" rel="noreferrer noopener" target="_blank">Arco Pro</a>、
            <a href="https://tdesign.tencent.com/starter/vue/dashboard/base" rel="noreferrer noopener" target="_blank">TDesign Starter</a>。
          </p>
          <ul style="margin:0; padding-left: 18px;">
            {b_line_links}
          </ul>
        </div>
      </div>
      <div class="card" style="margin-bottom:16px;">
        <div class="card-b">
          <h2 style="margin:0 0 10px 0; font-size:16px; line-height:1.3;">C 线 · Vue 3 真页面（Starter 级 IA）</h2>
          <p class="muted" style="margin:0 0 10px 0; font-size:12px; line-height:1.5;">
            仓库内 <code>apps/dspark-vue-admin</code>：Arco Design Vue + 设计 token，侧栏菜单与路由覆盖仪表盘 / 列表变体（含<strong>树状筛选</strong>）/
            表单变体（含<strong>分步表单</strong>）/ 详情 / 结果 / 登录等。信息架构见
            <a href="../docs/pages/information-architecture.md">docs/pages/information-architecture.md</a>。
          </p>
          <pre style="margin:0;">cd apps/dspark-vue-admin
npm install
npm run dev
# 默认 http://127.0.0.1:5174</pre>
        </div>
      </div>
      <div class="card">
        <div class="card-b">
          <ul style="margin:0; padding-left: 18px;">
            {items}
          </ul>
        </div>
      </div>
    </div>
    """


def _component_preview_block(slug: str) -> str:
    """
    Visual preview for 1:1 comparison.
    Keep it token-driven: ONLY semantic/component CSS vars.
    """
    shared = """
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Rendered preview</div>
        <div class="muted" style="margin-top:6px;">
          Token-driven structure; labels under each block show <strong>computed</strong> colors, border, radius, shadow, padding, gap.
        </div>
      </div>
      <div style="padding:12px;">
    """
    end = """
      </div>
    </div>
    """

    if slug == "menu":
        return (
            shared
            + """
        <div style="display:flex; gap: 16px; align-items:flex-start; flex-wrap:wrap;">
          <nav class="ds-mu-nav ds-mu-nav--fig" role="menu" aria-label="menu preview side">
            <div class="ds-mu-group" aria-hidden="true">Section</div>
            <button type="button" class="ds-mu-item" role="menuitem" tabindex="-1" data-ds-annotate-target="1">
              <span class="ds-mu-ic" aria-hidden="true"></span><span class="ds-mu-lbl">Default</span><span class="ds-mu-chev" aria-hidden="true"></span>
            </button>
            <button type="button" class="ds-mu-item is-hov" role="menuitem" tabindex="-1" data-ds-annotate-target="1">
              <span class="ds-mu-ic" aria-hidden="true"></span><span class="ds-mu-lbl">Hover</span><span class="ds-mu-chev" aria-hidden="true"></span>
            </button>
            <button type="button" class="ds-mu-item is-sel" role="menuitem" tabindex="-1" aria-selected="true" data-ds-annotate-target="1">
              <span class="ds-mu-ic" aria-hidden="true"></span><span class="ds-mu-lbl">Selected</span><span class="ds-mu-chev" aria-hidden="true"></span>
            </button>
            <button type="button" class="ds-mu-item" role="menuitem" tabindex="-1" disabled data-ds-annotate-target="1">
              <span class="ds-mu-ic" aria-hidden="true"></span><span class="ds-mu-lbl">Disabled</span><span class="ds-mu-chev" aria-hidden="true"></span>
            </button>
          </nav>
          <div class="ds-mu-pop" role="menu" aria-label="menu preview pop">
            <button type="button" class="ds-mu-pop-item" role="menuitem" tabindex="-1" data-ds-annotate-target="1">Default</button>
            <button type="button" class="ds-mu-pop-item is-hov" role="menuitem" tabindex="-1" data-ds-annotate-target="1">Hover</button>
            <button type="button" class="ds-mu-pop-item" role="menuitem" tabindex="-1" disabled data-ds-annotate-target="1">Disabled</button>
          </div>
        </div>
        """
            + end
        )

    if slug == "steps":
        return (
            shared
            + """
        <nav class="ds-st" data-size="lg" data-orientation="horizontal" aria-label="steps preview">
          <ol class="ds-st-list" role="list">
            <li class="ds-st-item" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--completed" aria-hidden="true"><span class="ds-st-icon-glyph">\u2713</span></span>
                <div class="ds-st-body"><p class="ds-st-title">Succeeded</p></div>
              </div>
              <div class="ds-st-connector ds-st-connector--completed" aria-hidden="true"></div>
            </li>
            <li class="ds-st-item" aria-current="step" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--current" aria-hidden="true"><span class="ds-st-icon-glyph">2</span></span>
                <div class="ds-st-body">
                  <p class="ds-st-title ds-st-title--current">Processing</p>
                  <p class="ds-st-desc">This is a description</p>
                </div>
              </div>
              <div class="ds-st-connector" aria-hidden="true"></div>
            </li>
            <li class="ds-st-item" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--pending" aria-hidden="true"><span class="ds-st-icon-glyph">3</span></span>
                <div class="ds-st-body"><p class="ds-st-title ds-st-title--pending">Pending</p></div>
              </div>
              <div class="ds-st-connector" aria-hidden="true"></div>
            </li>
            <li class="ds-st-item" data-ds-annotate-target="1">
              <div class="ds-st-item-top">
                <span class="ds-st-icon ds-st-icon--disabled" aria-hidden="true"><span class="ds-st-icon-glyph">4</span></span>
                <div class="ds-st-body"><p class="ds-st-title ds-st-title--disabled">Disabled</p></div>
              </div>
              <div class="ds-st-connector" aria-hidden="true"></div>
            </li>
          </ol>
        </nav>
        """
            + end
        )

    if slug == "button":
        return (
            shared
            + """
        <style>
          .b-row { display:flex; gap: calc(var(--semantic-layout-button-group-gap) * 1px); flex-wrap: wrap; align-items:center; }
          .btn {
            height: calc(var(--component-button-layout-static-height-md) * 1px);
            padding: 0 calc(var(--component-button-layout-static-padding-xmedium) * 1px);
            border-radius: calc(var(--component-button-primary-radius) * 1px);
            border: 1px solid transparent;
            font-size: calc(var(--component-button-layout-static-font-md) * 1px);
            line-height: calc(var(--component-button-layout-static-line-md) * 1px);
            font-weight: 500;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap: calc(var(--component-button-layout-static-inner-gap) * 1px);
          }
          .btn.primary { background: var(--component-button-primary-bg-default); color: var(--component-button-primary-text-default); }
          .btn.primary.hover { background: var(--component-button-primary-bg-hover); }
          .btn.primary.active { background: var(--component-button-primary-bg-active); }
          .btn.primary.disabled { background: var(--component-button-primary-bg-disabled); color: var(--component-button-primary-text-disabled); }

          .btn.neutral { background: var(--component-button-neutral-bg-default); color: var(--component-button-neutral-text-default); border-color: var(--component-button-neutral-border-default); }
          .btn.neutral.hover { background: var(--component-button-neutral-bg-hover); }
          .btn.neutral.active { background: var(--component-button-neutral-bg-active); }
          .btn.neutral.disabled { background: var(--component-button-neutral-bg-disabled); color: var(--component-button-neutral-text-disabled); border-color: var(--component-button-neutral-border-disabled); }

          .btn.danger { background: var(--component-button-danger-bg-default); color: var(--component-button-danger-text-default); }
          .btn.link { background: transparent; color: var(--component-button-link-text-default); padding: 0 calc(var(--semantic-layout-button-group-gap) * 1px); height: auto; }
        </style>
        <div class="b-row" aria-label="button preview">
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn primary" data-ds-annotate-target="1">Primary</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn primary hover" data-ds-annotate-target="1">Hover</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn primary active" data-ds-annotate-target="1">Active</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn primary disabled" disabled data-ds-annotate-target="1">Disabled</button></div>
          <span style="width:12px;"></span>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn neutral" data-ds-annotate-target="1">Neutral</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn neutral hover" data-ds-annotate-target="1">Hover</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn neutral active" data-ds-annotate-target="1">Active</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn neutral disabled" disabled data-ds-annotate-target="1">Disabled</button></div>
          <span style="width:12px;"></span>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn danger" data-ds-annotate-target="1">Danger</button></div>
          <div class="b-col" style="display:flex;flex-direction:column;gap:6px;align-items:flex-start;"><button class="btn link" data-ds-annotate-target="1">Link</button></div>
        </div>
        """
            + end
        )

    if slug == "modal":
        return (
            shared
            + """
        <div style="padding:18px;border-radius:10px;max-width:520px;background:var(--component-modal-mask,rgba(0,0,0,0.4));" aria-label="modal preview">
          <div class="ds-modal-panel ds-modal-panel--fig" role="dialog" aria-modal="true" aria-labelledby="mdlPvT" aria-describedby="mdlPvD" data-ds-annotate-target="1">
            <header class="ds-modal-h">
              <h2 class="ds-modal-title" id="mdlPvT">Modal title</h2>
              <button type="button" class="ds-modal-x" tabindex="-1" aria-hidden="true">&#215;</button>
            </header>
            <div class="ds-modal-div" aria-hidden="true"></div>
            <div class="ds-modal-body">
              <p id="mdlPvD" style="margin:0;">Body text for 1:1 visual compare.</p>
            </div>
            <div class="ds-modal-actions">
              <button type="button" class="ds-mini-btn" tabindex="-1">Cancel</button>
              <button type="button" class="ds-mini-btn primary" tabindex="-1">OK</button>
            </div>
          </div>
        </div>
        """
            + end
        )

    if slug == "table":
        return (
            shared
            + """
        <style>
          .tbl {
            width: 100%;
            border: 1px solid var(--component-table-border,#e8e8e8);
            border-radius: 10px;
            overflow:hidden;
            background: var(--component-table-bg,#fff);
          }
          .tbl-row {
            display:grid;
            grid-template-columns: 1.2fr 1fr 0.8fr;
          }
          .tbl-cell {
            padding: calc(var(--component-table-cell-py-default,12) * 1px) calc(var(--component-table-cell-px,16) * 1px);
            font-size: calc(var(--component-table-typography-cell-font-size,14) * 1px);
            line-height: 20px;
            color: var(--component-table-row-text,#222);
            border-bottom: 1px solid var(--component-table-border,#e8e8e8);
          }
          .tbl-head .tbl-cell {
            background: var(--component-table-header-bg,#fafafa);
            color: var(--component-table-header-text,#222);
            font-weight: 600;
            font-size: calc(var(--component-table-typography-header-font-size,14) * 1px);
          }
          .tbl-row.hover .tbl-cell { background: var(--component-table-row-bg-hover,#fafafa); }
          .tbl-row.selected .tbl-cell { background: var(--component-table-row-bg-selected,#fafafa); }
          .mut { color: var(--component-table-row-text-muted,#666); }
        </style>
        <div class="tbl" role="table" aria-label="table preview">
          <div class="tbl-row tbl-head" role="row">
            <div class="tbl-cell" role="columnheader">Name</div>
            <div class="tbl-cell" role="columnheader">Status</div>
            <div class="tbl-cell" role="columnheader">Owner</div>
          </div>
          <div class="tbl-row" role="row">
            <div class="tbl-cell" role="cell" data-ds-annotate-target="1">Row default</div>
            <div class="tbl-cell mut" role="cell">Muted</div>
            <div class="tbl-cell" role="cell">Alice</div>
          </div>
          <div class="tbl-row hover" role="row">
            <div class="tbl-cell" role="cell" data-ds-annotate-target="1">Row hover</div>
            <div class="tbl-cell" role="cell">OK</div>
            <div class="tbl-cell" role="cell">Bob</div>
          </div>
          <div class="tbl-row selected" role="row">
            <div class="tbl-cell" role="cell" data-ds-annotate-target="1">Row selected</div>
            <div class="tbl-cell" role="cell">OK</div>
            <div class="tbl-cell" role="cell">Carol</div>
          </div>
        </div>
        """
            + end
        )

    if slug == "form":
        return (
            shared
            + """
        <style>
          .f {
            display:flex;
            flex-direction: column;
            gap: calc(var(--component-form-row-gap,20) * 1px);
            max-width: 520px;
          }
          .f-row {
            display:grid;
            grid-template-columns: calc(var(--component-form-label-w,120) * 1px) 1fr;
            gap: calc(var(--component-form-label-gap,8) * 1px);
            align-items: start;
          }
          .f-label {
            color: var(--component-form-label-text,#222);
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
            padding-top: 8px;
          }
          .f-label .req { color: var(--component-form-required-mark,#f14846); margin-left: 4px; }
          .f-help { color: var(--component-form-help-text,#666); font-size: 12px; line-height: 18px; margin-top: 6px; }
          .f-error { color: var(--component-form-error-text,#f14846); font-size: 12px; line-height: 18px; margin-top: 6px; }
          .f-field {
            background: var(--semantic-bg-form-default,#f7f7f7);
            border: 1px solid var(--semantic-border-subtle,#e8e8e8);
            border-radius: 8px;
            height: 36px;
            padding: 0 12px;
            display:flex; align-items:center;
            color: var(--semantic-text-primary,#222);
            font-size: 14px;
            line-height: 20px;
          }
          .f-field.disabled {
            background: var(--semantic-bg-form-disabled,#fafafa);
            color: var(--component-form-label-text-disabled,#ccc);
          }
        </style>
        <div class="f" aria-label="form preview">
          <div class="f-row">
            <div class="f-label">Name<span class="req">*</span></div>
            <div>
              <div class="f-field" data-ds-annotate-target="1">Alice</div>
              <div class="f-help">Help text (token: form.helpText)</div>
            </div>
          </div>
          <div class="f-row">
            <div class="f-label">Email<span class="req">*</span></div>
            <div>
              <div class="f-field" data-ds-annotate-target="1" style="border-color: var(--component-form-error-text,#f14846); box-shadow: 0 0 0 2px rgba(241,72,70,0.15);">wrong@example</div>
              <div class="f-error">Error text (token: form.errorText)</div>
            </div>
          </div>
          <div class="f-row">
            <div class="f-label" style="color: var(--component-form-label-text-disabled,#ccc);">Disabled</div>
            <div>
              <div class="f-field disabled" data-ds-annotate-target="1">Disabled value</div>
            </div>
          </div>
        </div>
        """
            + end
        )

    if slug == "pageheader":
        return (
            shared
            + """
        <header class="ds-ph" aria-labelledby="phPvTitle" data-ds-annotate-target="1">
          <div class="ds-ph-row">
            <div class="ds-ph-left">
              <button type="button" class="ds-ph-back" aria-label="Back"><span class="ds-ph-back-ic" aria-hidden="true">\u2190</span></button>
              <div class="ds-ph-vdiv" aria-hidden="true"></div>
              <div class="ds-ph-main">
                <h1 class="ds-ph-title" id="phPvTitle">Page title</h1>
                <p class="ds-ph-desc">Preview index sample description.</p>
              </div>
            </div>
          </div>
        </header>
        """
            + end
        )

    if slug == "card":
        return (
            shared
            + """
        <div class="ds-card-live-wrap">
          <section class="ds-card" data-size="md" data-bordered="true" aria-labelledby="cdPvTitle" data-ds-annotate-target="1">
            <div class="ds-card-stack">
              <h3 class="ds-card-title" id="cdPvTitle">Card title</h3>
              <p class="ds-card-body">Body text. Compare radius, border, shadow, and padding with Figma.</p>
            </div>
            <div class="ds-card-divider" role="separator" aria-hidden="true"></div>
            <p class="ds-card-body ds-card-body--meta">Footer / meta</p>
          </section>
        </div>
        """
            + end
        )

    if slug == "list":
        return (
            shared
            + """
        <style>
          .lst { width: 520px; border: 1px solid var(--component-list-container-border,#e8e8e8); border-radius: calc(var(--component-list-container-radius,12) * 1px); overflow:hidden; background: var(--component-list-container-bg,#fff); }
          .lst-item { padding: calc(var(--component-list-item-py,12) * 1px) calc(var(--component-list-item-px,16) * 1px); display:flex; justify-content: space-between; gap: 12px; border-bottom: 1px solid var(--component-list-item-divider,#e8e8e8); background: var(--component-list-item-bg-default,#fff); }
          .lst-item:last-child { border-bottom: 0; }
          .lst-item.hover { background: var(--component-list-item-bg-hover,#f7f7f7); }
          .lst-title { font-size:14px; line-height:20px; font-weight:500; color: var(--component-list-item-text,#222); }
          .lst-meta { font-size:12px; line-height:18px; color: var(--component-list-item-meta-text,#666); }
        </style>
        <div class="lst" role="list" aria-label="list preview">
          <div class="lst-item" role="listitem" data-ds-annotate-target="1"><div><div class="lst-title">Default</div><div class="lst-meta">meta</div></div><div class="lst-meta">›</div></div>
          <div class="lst-item hover" role="listitem" data-ds-annotate-target="1"><div><div class="lst-title">Hover</div><div class="lst-meta">meta</div></div><div class="lst-meta">›</div></div>
          <div class="lst-item" role="listitem" data-ds-annotate-target="1"><div><div class="lst-title">Default</div><div class="lst-meta">meta</div></div><div class="lst-meta">›</div></div>
        </div>
        """
            + end
        )

    if slug == "tree":
        return (
            shared
            + """
        <div class="ds-tree" data-size="md" data-variant="simple" aria-label="tree preview">
          <ul class="ds-tree-list" role="presentation">
            <li class="ds-tree-node" role="presentation">
              <div class="ds-tree-row" role="presentation" data-ds-annotate-target="1">
                <button type="button" class="ds-tree-toggle" tabindex="-1" aria-hidden="true"><span class="ds-tree-toggle-ic" aria-hidden="true">&#9660;</span></button>
                <span class="ds-tree-label">Default</span>
              </div>
              <ul class="ds-tree-list" role="presentation">
                <li class="ds-tree-node" role="presentation">
                  <div class="ds-tree-row is-hov" role="presentation" data-ds-annotate-target="1">
                    <span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>
                    <span class="ds-tree-label">Hover</span>
                  </div>
                </li>
                <li class="ds-tree-node" role="presentation">
                  <div class="ds-tree-row is-sel" role="presentation" data-ds-annotate-target="1">
                    <span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>
                    <span class="ds-tree-label">Selected</span>
                  </div>
                </li>
                <li class="ds-tree-node" role="presentation">
                  <div class="ds-tree-row is-dis" role="presentation" aria-disabled="true" data-ds-annotate-target="1">
                    <span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>
                    <span class="ds-tree-label">Disabled</span>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        """
            + end
        )

    if slug == "tabs":
        return (
            shared
            + """
        <div class="ds-tabs ds-tabs--underline" data-size="lg" aria-label="tabs preview">
          <div class="ds-tabs-bar">
            <div role="tablist" class="ds-tabs-list" aria-label="Preview tablist">
              <button type="button" role="tab" class="ds-tabs-tab" aria-selected="true" tabindex="0" data-ds-annotate-target="1">Tab A</button>
              <button type="button" role="tab" class="ds-tabs-tab" aria-selected="false" tabindex="-1" data-ds-annotate-target="1">Tab B</button>
            </div>
          </div>
        </div>
        """
            + end
        )

    if slug == "upload":
        return (
            shared
            + """
        <div class="ds-upl" data-size="md" aria-label="upload preview">
          <p class="ds-upl-hint">PDF / PNG / JPG</p>
          <button type="button" class="ds-upl-trg ds-upl-trg--btn" aria-label="Upload files" data-ds-annotate-target="1">
            <span class="ds-upl-trg-plus" aria-hidden="true">+</span>
            <span class="ds-upl-trg-stack">
              <span class="ds-upl-trg-tit">Click to upload</span>
              <span class="ds-upl-trg-desc">or drag here</span>
            </span>
          </button>
        </div>
        """
            + end
        )

    if slug == "notification":
        return (
            shared
            + """
        <div class="ds-ntf ds-ntf--has-close" data-tone="info" role="status" aria-label="notification preview" data-ds-annotate-target="1">
          <button type="button" class="ds-ntf-close" tabindex="-1" aria-hidden="true"><span aria-hidden="true">&#215;</span></button>
          <div class="ds-ntf-head">
            <span class="ds-ntf-ic" aria-hidden="true">i</span>
            <div class="ds-ntf-head-text"><p class="ds-ntf-title">Preview title</p></div>
          </div>
          <p class="ds-ntf-desc">Preview description for token compare.</p>
        </div>
        """
            + end
        )

    if slug == "cascader":
        return (
            shared
            + """
        <div class="ds-casc" data-size="lg" aria-label="cascader preview">
          <button type="button" class="ds-casc-trg" role="presentation" tabindex="-1" data-ds-annotate-target="1">
            <span class="ds-casc-trg-txt">Zhejiang / Hangzhou / West Lake</span>
            <span class="ds-casc-trg-chev" aria-hidden="true"></span>
          </button>
        </div>
        """
            + end
        )

    return """
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Rendered preview</div>
        <div class="muted" style="margin-top:6px;">
          Preview template not defined yet for this component. Use the token table below for 1:1 value checks.
        </div>
      </div>
    </div>
    """


def _write_page_level_templates(repo_root: Path, behavior_source: str) -> None:
    """Dashboard / list / form HTML under .design-spec/demos/pages/ (see page_templates.py)."""
    pt_path = Path(__file__).resolve().parent / "page_templates.py"
    spec = importlib.util.spec_from_file_location("_dspark_page_templates", pt_path)
    if spec is None or spec.loader is None:
        raise RuntimeError(f"Cannot load page templates module: {pt_path}")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    mod.write_page_templates(repo_root=repo_root, behavior_source=behavior_source)


def main() -> int:
    repo_root = Path(__file__).resolve().parents[2]  # .design-spec/generator/ -> repo root
    components_dir = repo_root / ".design-spec" / "docs" / "components"
    tokens_css = repo_root / ".design-spec" / "tokens" / "dist" / "tokens.css"
    out_dir = repo_root / ".design-spec" / "demos"
    out_components_dir = out_dir / "components"

    if not components_dir.exists():
        raise SystemExit(f"Missing components dir: {components_dir}")
    if not tokens_css.exists():
        raise SystemExit(f"Missing tokens.css: {tokens_css}")

    components = _collect_components(components_dir)
    components.sort(key=lambda c: c.slug)
    behavior_source = _read_behavior_source(repo_root)

    out_components_dir.mkdir(parents=True, exist_ok=True)
    tokens_css_text = tokens_css.read_text(encoding="utf-8", errors="replace")
    icons_head = _build_icons_fragment(repo_root)

    # Relative hrefs
    # - from .design-spec/demos/components/*.html -> .design-spec/tokens/dist/tokens.css
    tokens_href_components = "../../tokens/dist/tokens.css"
    # - from .design-spec/demos/index.html -> .design-spec/tokens/dist/tokens.css
    tokens_href_index = "../tokens/dist/tokens.css"

    # Write per-component HTML
    for c in components:
        body = _component_demo_body(
            c,
            index_href="../index.html",
            tokens_css_text=tokens_css_text,
            behavior_source=behavior_source,
        )
        md_name = c.source_path.name
        head_extra = (
            icons_head
            + f'    <meta name="ds:component-slug" content="{html.escape(c.slug)}" />\n'
            + f'    <meta name="ds:source-md" content="{html.escape("../../docs/components/" + md_name)}" />\n'
        )
        html_text = _html_page(title=c.title, body=body, tokens_href=tokens_href_components, head_extra=head_extra)
        (out_components_dir / f"{c.slug}.html").write_text(html_text, encoding="utf-8")

    # Write index
    index_html = _html_page(
        title="Component demos",
        body=_index_body(components, tokens_href=tokens_href_index, behavior_source=behavior_source),
        tokens_href=tokens_href_index,
        head_extra=icons_head + '    <meta name="ds:page" content="component-demos-index" />\n',
    )
    (out_dir / "index.html").write_text(index_html, encoding="utf-8")

    # Write aggregated preview (iframes over per-component pages)
    preview_html_text = _html_page(
        title="Component previews",
        body=_preview_body(components, tokens_href=tokens_href_index, behavior_source=behavior_source),
        tokens_href=tokens_href_index,
        head_extra=icons_head + '    <meta name="ds:page" content="component-previews" />\n',
    )
    (out_dir / "preview.html").write_text(preview_html_text, encoding="utf-8")

    _write_page_level_templates(repo_root, behavior_source)

    print(f"Wrote {len(components)} component demos to {out_components_dir}")
    print(f"Wrote index: {out_dir / 'index.html'}")
    print(f"Wrote preview: {out_dir / 'preview.html'}")
    print(
        "Wrote B-line page templates: pages/dashboard.html, pages/list.html, pages/form.html, pages/archive/dashboard-tdesign-starter-base.html"
    )
    _report_studio_runtime_literals(repo_root)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

