#!/usr/bin/env python3
from __future__ import annotations

import html
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


def _html_page(title: str, body: str, tokens_href: str) -> str:
    safe_title = html.escape(title)
    return f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{safe_title} — D.Spark Design System Demo</title>
    <link rel="stylesheet" href="{html.escape(tokens_href)}" />
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


def _component_size_guide_block(slug: str, md_path: Path) -> str:
    """
    Static Figma dimension hints, bound by slug. Emitted only by the generator — no hand-edited HTML.
    """
    chip = "border:1px dashed var(--semantic-text-muted,#999); background:var(--semantic-border-subtle,#e8e8e8);"
    if slug == "button":
        return f"""
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（自动生成）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">
          标准高度（Large / Medium / Small）：<strong>56px</strong> / <strong>40px</strong> / <strong>32px</strong>
        </div>
      </div>
      <div style="padding:12px; display:flex; gap:24px; align-items:flex-end; flex-wrap:wrap;">
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">56px</div>
          <div style="height:56px; width:36px; border-radius:8px; {chip}" title="高度 56px" aria-hidden="true"></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">40px</div>
          <div style="height:40px; width:36px; border-radius:8px; {chip}" title="高度 40px" aria-hidden="true"></div>
        </div>
        <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666);">32px</div>
          <div style="height:32px; width:36px; border-radius:6px; {chip}" title="高度 32px" aria-hidden="true"></div>
        </div>
      </div>
    </div>
    """

    if slug in ("modal", "dialog"):
        return """
    <div class="card" style="border-radius:10px;">
      <div style="padding:12px 12px 0 12px;">
        <div class="muted" style="font-size:12px; font-weight:600;">Figma 尺寸示意（自动生成）</div>
        <div class="muted" style="margin-top:6px; font-size:12px;">
          紧凑对话框参考宽度：<strong>280px</strong>
        </div>
      </div>
      <div style="padding:12px;">
        <div style="position:relative; display:inline-block; margin-top:18px;">
          <div style="font-size:11px; font-weight:600; color:var(--semantic-text-secondary,#666); position:absolute; left:0; bottom:100%; margin-bottom:6px;">280px</div>
          <div style="width:280px; height:28px; border-radius:8px; border:1px dashed var(--semantic-text-muted,#999); background:var(--semantic-border-subtle,#e8e8e8);" title="宽度 280px" aria-hidden="true"></div>
        </div>
      </div>
    </div>
    """

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
    return f"""
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


def _component_demo_body(spec: ComponentSpec, index_href: str, *, tokens_css_text: str) -> str:
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
            Aligns with <code>docs/components/alert.md</code> and Arco Alert props:
            <code>type</code>, <code>show-icon</code>, <code>closable</code>, <code>title</code>,
            <code>banner</code>, <code>center</code>, plus action slot behavior.
          </p>
          <label class="pg-field">
            <span>Type</span>
            <select id="pgVariant" aria-label="Alert type">
              <option value="info" selected>info</option>
              <option value="success">success</option>
              <option value="warning">warning</option>
              <option value="error">error</option>
              <option value="normal">normal</option>
            </select>
          </label>
          <label class="pg-field">
            <span>Size</span>
            <select id="pgSize" aria-label="Alert size">
              <option value="lg" selected>LG (36)</option>
              <option value="md">MD (32)</option>
              <option value="auto">AUTO (multiline/title)</option>
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
    elif spec.slug == "input":
        aside_block = """
        <aside class="studio-aside card">
          <h3>Preview controls</h3>
          <label class="ds-in-tab-row">
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
          <div class="ds-sr-only" aria-hidden="true">
            <label><span>Size</span>
            <select id="pgSize" aria-label="Preview size">
              <option value="sm">Small</option>
              <option value="md" selected>Medium</option>
              <option value="lg">Large</option>
            </select></label>
            <label><span>Variant</span>
            <select id="pgVariant" aria-label="Preview variant">
              <option value="primary" selected>Primary</option>
              <option value="neutral">Neutral</option>
              <option value="danger">Danger</option>
              <option value="ghost">Ghost</option>
            </select></label>
          </div>
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
            "Behavior matches Arco Alert API and Figma variants: "
            "<code>type=info|success|warning|error|normal</code>, "
            "<code>show-icon</code>, <code>closable</code>, <code>title</code>, "
            "<code>banner</code>, <code>center</code>, and action slot."
        )
        matrix_rows_help = (
            "Rows represent variant set from docs/Figma: Default · Multiline · With title · "
            "Closable + action · Banner + center."
        )
    elif spec.slug == "input-number":
        live_intro_sub = (
            "Visuals follow <code>tokens.css</code>. Live preview follows "
            "<code>docs/components/input-number.md</code> Executable rules (Arco React): "
            '<code>type="text"</code> + <code>inputmode="decimal"</code>, ArrowUp/Down step, '
            "blur clamp to [0, 100], long-press 1000ms then 200ms, fullwidth period to ASCII, "
            "and an <code>onChange</code> reason log."
        )
        matrix_rows_help = (
            "Five rows (label left · preview right): Default · Hover · Focus · Error · Disabled "
            "(static previews at L·32px)."
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
          <div class="muted" style="margin-top:6px;">Slug <code>{slug_esc}</code> · tokens <code>--component-{token_prefix_esc}-*</code></div>
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

def _index_body(components: list[ComponentSpec], tokens_href: str) -> str:
    items = "\n".join(
        f'<li style="margin:6px 0;"><a href="components/{html.escape(c.slug)}.html">{html.escape(c.title)}</a>'
        f' <span class="muted">(<code>{html.escape(c.slug)}</code>)</span></li>'
        for c in components
    )
    return f"""
    <div class="wrap">
      <div class="top">
        <div>
          <h1 style="margin:0; font-size:20px; line-height:1.2;">Component demos</h1>
          <div class="muted" style="margin-top:6px;">Live token studio per component · <code>{html.escape(tokens_href)}</code></div>
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

    if slug == "dropdown":
        return (
            shared
            + """
        <style>
          .dd-panel {
            width: 240px;
            padding: 4px;
            border-radius: var(--component-dropdown-panel-radius, 8px);
            background: var(--component-dropdown-panel-bg, #fff);
            box-shadow: var(--component-dropdown-panel-shadow, 0px 4px 10px 0px rgba(0,0,0,0.1));
            display: flex;
            flex-direction: column;
            gap: 4px;
          }
          .dd-item {
            height: calc(var(--component-dropdown-item-h-md, 32) * 1px);
            padding: 6px 8px;
            border-radius: calc(var(--component-dropdown-item-radius-md, 6) * 1px);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 12px;
            background: var(--component-dropdown-item-bg-default, #fff);
            color: var(--component-dropdown-item-text, #222);
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
          }
          .dd-item.hover { background: var(--component-dropdown-item-bg-hover, #f7f7f7); }
          .dd-item.disabled { color: var(--component-dropdown-item-text-disabled, #ccc); }
          .dd-item.danger { color: var(--component-dropdown-item-text-danger, #f14846); }
          .dd-divider { height: 1px; background: var(--component-dropdown-divider, #e8e8e8); margin: 2px 4px; }
          .dd-check {
            width: 16px; height: 16px; border-radius: 4px;
            background: var(--component-dropdown-check-icon, #222);
            opacity: 0.0;
          }
          .dd-item.selected .dd-check { opacity: 1; }
        </style>
        <div class="dd-panel" role="menu" aria-label="dropdown preview">
          <div class="dd-item" data-ds-annotate-target="1"><span>Default</span></div>
          <div class="dd-item hover" data-ds-annotate-target="1"><span>Hover</span></div>
          <div class="dd-item selected" data-ds-annotate-target="1"><span>Selected</span><span class="dd-check" aria-hidden="true"></span></div>
          <div class="dd-item disabled" data-ds-annotate-target="1"><span>Disabled</span></div>
          <div class="dd-divider" aria-hidden="true"></div>
          <div class="dd-item danger" data-ds-annotate-target="1"><span>Danger</span></div>
        </div>
        """
            + end
        )

    if slug == "menu":
        return (
            shared
            + """
        <style>
          .m-wrap { display:flex; gap: 16px; align-items:flex-start; flex-wrap: wrap; }
          .m-container {
            width: calc(var(--component-menu-container-w-expanded, 220) * 1px);
            background: var(--component-menu-container-bg, #fff);
            border-radius: 10px;
            border: 1px solid var(--semantic-border-subtle,#e8e8e8);
            padding: 8px 0;
          }
          .m-item {
            height: calc(var(--component-menu-item-h-1, 38) * 1px);
            padding: 0 calc(var(--component-menu-item-px, 12) * 1px);
            display:flex;
            align-items:center;
            justify-content: space-between;
            gap: calc(var(--component-menu-item-gap, 12) * 1px);
            color: var(--component-menu-item-text, #666);
            background: var(--component-menu-item-bg-default, #fff);
            font-size: 14px;
            line-height: 20px;
            border-radius: 2px;
            margin: 4px 8px;
          }
          .m-item .label { flex: 1; color: inherit; }
          .m-item.hover { background: var(--component-menu-item-bg-hover, #f7f7f7); color: var(--component-menu-item-text-hover, #222); }
          .m-item.selected { background: var(--component-menu-item-bg-selected, #f7f7f7); color: var(--component-menu-item-text-selected, #222); font-weight: 500; }
          .m-item.disabled { color: var(--component-menu-item-text-disabled, #ccc); }
          .m-group {
            padding: 8px 16px 4px 16px;
            color: var(--component-menu-group-title, #999);
            font-size: 14px;
            line-height: 20px;
          }
          .m-icon { width: 16px; height: 16px; border-radius: 4px; background: var(--component-menu-icon, #666); opacity: 0.85; }
          .m-chevron {
            width: 10px; height: 10px;
            border-right: 2px solid var(--component-menu-chevron, #666);
            border-bottom: 2px solid var(--component-menu-chevron, #666);
            transform: rotate(-45deg);
          }
          .m-pop {
            min-width: calc(var(--component-menu-pop-min-w, 182) * 1px);
            background: var(--component-menu-pop-bg, #fff);
            border-radius: calc(var(--component-menu-pop-radius, 8) * 1px);
            box-shadow: var(--component-menu-pop-shadow, 0px 4px 10px 0px rgba(0,0,0,0.1));
            padding: 4px;
            border: 1px solid var(--semantic-border-subtle,#e8e8e8);
          }
          .m-pop-item {
            padding: calc(var(--component-menu-pop-item-py, 9) * 1px) calc(var(--component-menu-pop-item-px, 12) * 1px);
            border-radius: 2px;
            font-size: 14px;
            line-height: 20px;
            color: var(--semantic-text-primary,#222);
          }
          .m-pop-item.hover { background: var(--semantic-bg-page,#f7f7f7); }
          .m-pop-item.disabled { color: var(--semantic-text-muted,#ccc); }
          .m-pop-item.selected { font-weight: 500; }
        </style>
        <div class="m-wrap">
          <nav class="m-container" aria-label="menu preview">
            <div class="m-item" data-ds-annotate-target="1"><span class="m-icon" aria-hidden="true"></span><span class="label">Default</span><span class="m-chevron" aria-hidden="true"></span></div>
            <div class="m-item hover" data-ds-annotate-target="1"><span class="m-icon" aria-hidden="true"></span><span class="label">Hover</span><span class="m-chevron" aria-hidden="true"></span></div>
            <div class="m-item selected" data-ds-annotate-target="1"><span class="m-icon" aria-hidden="true"></span><span class="label">Selected</span><span class="m-chevron" aria-hidden="true"></span></div>
            <div class="m-item disabled" data-ds-annotate-target="1"><span class="m-icon" aria-hidden="true"></span><span class="label">Disabled</span><span class="m-chevron" aria-hidden="true"></span></div>
            <div class="m-group">菜单组 1</div>
            <div class="m-item"><span class="m-icon" aria-hidden="true"></span><span class="label">Item 1</span></div>
          </nav>
          <div class="m-pop" aria-label="pop menu preview">
            <div class="m-pop-item" data-ds-annotate-target="1">Default</div>
            <div class="m-pop-item hover" data-ds-annotate-target="1">Hover</div>
            <div class="m-pop-item selected" data-ds-annotate-target="1">Selected</div>
            <div class="m-pop-item disabled" data-ds-annotate-target="1">Disabled</div>
          </div>
        </div>
        """
            + end
        )

    if slug == "steps":
        return (
            shared
            + """
        <style>
          .st { display:flex; align-items:center; gap: 16px; flex-wrap: wrap; }
          .st-item { display:flex; align-items:center; gap: 4px; }
          .st-icon {
            width: calc(var(--component-steps-icon-size-lg, 28) * 1px);
            height: calc(var(--component-steps-icon-size-lg, 28) * 1px);
            border-radius: 999px;
            display:flex;
            align-items:center;
            justify-content:center;
            font-size: 16px;
            line-height: 22px;
            font-weight: 500;
            box-sizing: border-box;
          }
          .st-icon.current { background: var(--component-steps-icon-bg-current,#222); color: var(--component-steps-icon-text-on-current,#fff); }
          .st-icon.pending { border: 1px solid var(--component-steps-icon-border-pending,#666); color: var(--component-steps-icon-text-pending,#666); background: transparent; }
          .st-icon.disabled { border: 1px solid var(--component-steps-icon-border-disabled,#ccc); color: var(--component-steps-icon-text-disabled,#ccc); background: transparent; }
          .st-icon.completed { border: 1px solid var(--component-steps-icon-border-completed,#222); background: var(--component-steps-icon-bg-completed,#fff); }
          .st-title { color: var(--component-steps-title-text,#222); font-size:16px; line-height:22px; font-weight:600; }
          .st-title.pending { color: var(--component-steps-title-text-pending,#666); font-weight:500; }
          .st-desc { color: var(--component-steps-desc-text,#999); font-size:14px; line-height:20px; font-weight:500; }
          .st-connector { width: calc(var(--component-steps-connector-length,28) * 1px); height: 1px; background: var(--component-steps-connector-track,#e8e8e8); }
          .st-connector.completed { background: var(--component-steps-connector-track-completed,#222); }
        </style>
        <div class="st" aria-label="steps preview">
          <div class="st-item" data-ds-annotate-target="1">
            <div class="st-icon completed" aria-hidden="true"></div>
            <div class="st-title">Succeeded</div>
          </div>
          <div class="st-connector completed" aria-hidden="true"></div>
          <div class="st-item" data-ds-annotate-target="1">
            <div class="st-icon current">2</div>
            <div>
              <div class="st-title">Processing</div>
              <div class="st-desc">This is a description</div>
            </div>
          </div>
          <div class="st-connector" aria-hidden="true"></div>
          <div class="st-item" data-ds-annotate-target="1">
            <div class="st-icon pending">3</div>
            <div class="st-title pending">Pending</div>
          </div>
          <div class="st-connector" aria-hidden="true"></div>
          <div class="st-item" data-ds-annotate-target="1">
            <div class="st-icon disabled">4</div>
            <div class="st-title pending" style="color: var(--component-steps-title-text-disabled,#ccc);">Disabled</div>
          </div>
        </div>
        """
            + end
        )

    if slug == "button":
        return (
            shared
            + """
        <style>
          .b-row { display:flex; gap: 12px; flex-wrap: wrap; align-items:center; }
          .btn {
            height: 36px;
            padding: 0 14px;
            border-radius: calc(var(--component-button-primary-radius, 6) * 1px);
            border: 1px solid transparent;
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
            display:inline-flex;
            align-items:center;
            justify-content:center;
            gap: 8px;
          }
          .btn.primary { background: var(--component-button-primary-bg-default,#222); color: var(--component-button-primary-text-default,#fff); }
          .btn.primary.hover { background: var(--component-button-primary-bg-hover,#4e4e4e); }
          .btn.primary.active { background: var(--component-button-primary-bg-active,#1b1b1b); }
          .btn.primary.disabled { background: var(--component-button-primary-bg-disabled,#a7a7a7); color: var(--component-button-primary-text-disabled,#ccc); }

          .btn.neutral { background: var(--component-button-neutral-bg-default,#fff); color: var(--component-button-neutral-text-default,#222); border-color: var(--component-button-neutral-border-default,#ccc); }
          .btn.neutral.hover { background: var(--component-button-neutral-bg-hover,#f7f7f7); }
          .btn.neutral.active { background: var(--component-button-neutral-bg-active,#f7f7f7); }
          .btn.neutral.disabled { background: var(--component-button-neutral-bg-disabled,#f7f7f7); color: var(--component-button-neutral-text-disabled,#a7a7a7); border-color: var(--component-button-neutral-border-disabled,#ccc); }

          .btn.danger { background: var(--component-button-danger-bg-default,#f14846); color: var(--component-button-danger-text-default,#fff); }
          .btn.link { background: transparent; color: var(--component-button-link-text-default,#506daf); padding: 0 6px; height: auto; }
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
        <style>
          .mdl-mask {
            width: 520px;
            padding: 18px;
            border-radius: 10px;
            background: var(--component-modal-mask, rgba(0,0,0,0.4));
          }
          .mdl-panel {
            width: calc(var(--component-modal-w, 440) * 1px);
            background: var(--component-modal-panel-bg, #fff);
            border-radius: calc(var(--component-modal-panel-radius, 16) * 1px);
            box-shadow: var(--component-modal-panel-shadow, 0px 4px 10px 0px rgba(0,0,0,0.1));
            overflow:hidden;
          }
          .mdl-h {
            display:flex; align-items:center; justify-content: space-between;
            padding: calc(var(--component-modal-p, 24) * 1px);
            padding-bottom: 14px;
          }
          .mdl-title {
            color: var(--component-modal-title-text,#222);
            font-size: 16px; line-height: 22px; font-weight: 600;
          }
          .mdl-x {
            width: 16px; height: 16px; border-radius: 4px;
            background: var(--component-modal-close-icon,#999);
            opacity: 0.9;
          }
          .mdl-div { height:1px; background: var(--component-modal-divider,#e8e8e8); }
          .mdl-b { padding: calc(var(--component-modal-p, 24) * 1px); }
          .mdl-text { color: var(--component-modal-body-text,#222); font-size: 14px; line-height: 20px; }
          .mdl-actions { display:flex; justify-content:flex-end; gap: 12px; margin-top: 16px; }
          .mini-btn {
            height: 32px; padding: 0 12px; border-radius: 6px; border: 1px solid #ccc;
            background: #fff; font-size: 14px; line-height: 20px; font-weight: 500;
          }
          .mini-btn.primary { background: #222; color:#fff; border-color: #222; }
        </style>
        <div class="mdl-mask" aria-label="modal preview">
          <section class="mdl-panel" role="dialog" aria-modal="true" aria-label="modal" data-ds-annotate-target="1">
            <header class="mdl-h">
              <div class="mdl-title">Modal title</div>
              <div class="mdl-x" aria-hidden="true"></div>
            </header>
            <div class="mdl-div" aria-hidden="true"></div>
            <div class="mdl-b">
              <div class="mdl-text">Body text for 1:1 visual compare.</div>
              <div class="mdl-actions">
                <button class="mini-btn">Cancel</button>
                <button class="mini-btn primary">OK</button>
              </div>
            </div>
          </section>
        </div>
        """
            + end
        )

    if slug == "select":
        return (
            shared
            + """
        <style>
          .sel-wrap { display:flex; gap: 16px; align-items:flex-start; flex-wrap:wrap; }
          .sel-trigger {
            width: 260px;
            height: 36px;
            border-radius: 8px;
            padding: 0 12px;
            display:flex;
            align-items:center;
            justify-content: space-between;
            gap: 12px;
            background: var(--component-select-trigger-bg-default,#f7f7f7);
            border: 1px solid var(--component-select-trigger-border-default,#f7f7f7);
          }
          .sel-trigger.hover { background: var(--component-select-trigger-bg-hover,#e8e8e8); border-color: var(--component-select-trigger-border-hover,#e8e8e8); }
          .sel-trigger.focus { border-color: var(--component-select-trigger-border-focus,#222); box-shadow: 0 0 0 2px var(--component-select-trigger-ring-focus,#6985bf); }
          .sel-trigger.error { border-color: var(--component-select-trigger-border-error,#f14846); box-shadow: 0 0 0 2px var(--component-select-trigger-ring-error,#f14846); }
          .sel-trigger.disabled { background: var(--component-select-trigger-bg-disabled,#fafafa); border-color: var(--component-select-trigger-border-disabled,#fafafa); }
          .sel-text { color: var(--component-select-trigger-text-default,#999); font-size: 14px; line-height: 20px; font-weight: 500; }
          .sel-trigger.disabled .sel-text { color: var(--component-select-trigger-text-disabled,#ccc); }
          .sel-icon { width: 12px; height: 12px; border-right:2px solid var(--component-select-trigger-icon-default,#999); border-bottom:2px solid var(--component-select-trigger-icon-default,#999); transform: rotate(45deg); }
          .sel-trigger.disabled .sel-icon { border-color: var(--component-select-trigger-icon-disabled,#ccc); }

          .sel-dd {
            width: 260px;
            padding: 4px;
            border-radius: calc(var(--component-select-dropdown-radius,6) * 1px);
            background: var(--component-select-dropdown-bg,#fff);
            box-shadow: var(--component-select-dropdown-shadow,0px 4px 10px 0px rgba(0,0,0,0.1));
          }
          .sel-item {
            height: 32px;
            border-radius: 6px;
            padding: 0 12px;
            display:flex;
            align-items:center;
            background: var(--component-select-item-bg-default,#fff);
            color: var(--component-select-item-text,#222);
            font-size: 14px;
            line-height: 20px;
            font-weight: 500;
          }
          .sel-item.hover { background: var(--component-select-item-bg-hover,#f7f7f7); }
          .sel-item.selected { background: var(--component-select-item-bg-selected,#f7f7f7); }
        </style>
        <div class="sel-wrap" aria-label="select preview">
          <div>
            <div class="sel-trigger" data-ds-annotate-target="1"><span class="sel-text" style="color: var(--component-select-trigger-placeholder,#999);">Default</span><span class="sel-icon" aria-hidden="true"></span></div>
            <div style="height:10px;"></div>
            <div class="sel-trigger hover" data-ds-annotate-target="1"><span class="sel-text">Hover</span><span class="sel-icon" aria-hidden="true"></span></div>
            <div style="height:10px;"></div>
            <div class="sel-trigger focus" data-ds-annotate-target="1"><span class="sel-text">Focus</span><span class="sel-icon" aria-hidden="true"></span></div>
            <div style="height:10px;"></div>
            <div class="sel-trigger error" data-ds-annotate-target="1"><span class="sel-text">Error</span><span class="sel-icon" aria-hidden="true"></span></div>
            <div style="height:10px;"></div>
            <div class="sel-trigger disabled" data-ds-annotate-target="1"><span class="sel-text">Disabled</span><span class="sel-icon" aria-hidden="true"></span></div>
          </div>
          <div class="sel-dd" role="listbox" aria-label="dropdown">
            <div class="sel-item" data-ds-annotate-target="1">Default</div>
            <div class="sel-item hover" data-ds-annotate-target="1">Hover</div>
            <div class="sel-item selected" data-ds-annotate-target="1">Selected</div>
          </div>
        </div>
        """
            + end
        )

    if slug == "slider":
        return (
            shared
            + """
        <style>
          .sl-wrap { width: 360px; }
          .sl-track {
            height: calc(var(--component-slider-track-h, 4) * 1px);
            border-radius: calc(var(--component-slider-track-radius, 10) * 1px);
            background: var(--component-slider-track-bg,#e8e8e8);
            position: relative;
          }
          .sl-active {
            position:absolute; left:0; top:0; bottom:0;
            width: 55%;
            border-radius: inherit;
            background: var(--component-slider-track-bg-active,#222);
          }
          .sl-thumb {
            position:absolute;
            top: 50%;
            left: 55%;
            transform: translate(-50%,-50%);
            width: calc(var(--component-slider-thumb-size, 16) * 1px);
            height: calc(var(--component-slider-thumb-size, 16) * 1px);
            border-radius: 999px;
            background: var(--component-slider-thumb-bg-default,#fff);
            border: 2px solid var(--component-slider-thumb-border-default,#222);
            box-shadow: 0 0 0 0 transparent;
          }
          .sl-thumb.hover { border-color: var(--component-slider-thumb-border-hover,#222); background: var(--component-slider-thumb-bg-hover,#fff); }
          .sl-thumb.active { border-color: var(--component-slider-thumb-border-active,#222); background: var(--component-slider-thumb-bg-active,#fff); box-shadow: 0 0 0 2px var(--component-slider-thumb-ring-active,#6985bf); }
          .sl-thumb.disabled { border-color: var(--component-slider-thumb-border-disabled,#ccc); background: var(--component-slider-thumb-bg-disabled,#fff); }
          .sl-marks { display:flex; justify-content: space-between; margin-top: 10px; color: var(--component-slider-mark-text,#999); font-size: 12px; }
          .sl-ticks { display:flex; justify-content: space-between; margin-top: 6px; }
          .sl-tick { width: 6px; height: 6px; border-radius: 99px; background: var(--component-slider-tick-inactive,#e8e8e8); }
          .sl-tick.active { background: var(--component-slider-tick-active,#222); }
        </style>
        <div class="sl-wrap" aria-label="slider preview">
          <div class="sl-track" data-ds-annotate-target="1">
            <div class="sl-active"></div>
            <div class="sl-thumb" title="default"></div>
          </div>
          <div class="sl-ticks" aria-hidden="true">
            <span class="sl-tick active"></span><span class="sl-tick active"></span><span class="sl-tick active"></span><span class="sl-tick"></span><span class="sl-tick"></span>
          </div>
          <div class="sl-marks"><span>0</span><span>50</span><span>100</span></div>
          <div style="height:12px;"></div>
          <div class="sl-track" data-ds-annotate-target="1">
            <div class="sl-active"></div>
            <div class="sl-thumb hover" title="hover"></div>
          </div>
          <div style="height:12px;"></div>
          <div class="sl-track" data-ds-annotate-target="1">
            <div class="sl-active"></div>
            <div class="sl-thumb active" title="active"></div>
          </div>
          <div style="height:12px;"></div>
          <div class="sl-track" data-ds-annotate-target="1">
            <div class="sl-active" style="background: var(--component-slider-track-bg,#e8e8e8);"></div>
            <div class="sl-thumb disabled" title="disabled"></div>
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

    if slug == "card":
        return (
            shared
            + """
        <style>
          .c {
            width: 320px;
            border-radius: calc(var(--component-card-panel-radius, 12) * 1px);
            background: var(--component-card-panel-bg, #fff);
            border: 1px solid var(--component-card-panel-border, #e8e8e8);
            box-shadow: var(--component-card-panel-shadow, 0px 1px 2px 0px rgba(0,0,0,0.06));
            padding: calc(var(--component-card-p, 16) * 1px);
          }
          .c-title {
            font-weight: 600;
            font-size: 14px;
            line-height: 20px;
            color: var(--component-card-title-text, #222);
          }
          .c-body {
            margin-top: 8px;
            font-size: 12px;
            line-height: 18px;
            color: var(--component-card-body-text, #666);
          }
          .c-div { height: 1px; background: var(--component-card-divider,#e8e8e8); margin: 12px 0; }
        </style>
        <div style="display:flex; gap: 12px; flex-wrap:wrap; align-items:flex-start;">
          <section class="c" aria-label="card preview" data-ds-annotate-target="1">
            <div class="c-title">Card title</div>
            <div class="c-body">Body text. Compare radius/border/shadow/padding with Figma.</div>
            <div class="c-div" aria-hidden="true"></div>
            <div class="c-body">Footer/meta</div>
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
        <style>
          .tr { width: 520px; border: 1px solid var(--semantic-border-subtle,#e8e8e8); border-radius: 12px; background: var(--semantic-bg-surface,#fff); padding: 12px; }
          .tr-row { display:flex; align-items:center; gap: 8px; padding: 8px 10px; border-radius: calc(var(--component-tree-row-radius,8) * 1px); color: var(--component-tree-row-text,#222); font-size: 14px; line-height: 20px; background: var(--component-tree-row-bg-default, transparent); }
          .tr-row.hover { background: var(--component-tree-row-bg-hover,#f7f7f7); }
          .tr-row.selected { background: var(--component-tree-row-bg-selected,#f7f7f7); font-weight: 500; }
          .tri { width: 10px; height: 10px; border-right: 2px solid var(--component-tree-toggle-color,#666); border-bottom: 2px solid var(--component-tree-toggle-color,#666); transform: rotate(-45deg); }
          .tr-indent { width: calc(var(--component-tree-indent,16) * 1px); }
          .tr-disabled { color: var(--component-tree-row-text-disabled,#ccc); }
          .tr-disabled .tri { border-color: var(--component-tree-toggle-color-disabled,#ccc); }
        </style>
        <div class="tr" aria-label="tree preview">
          <div class="tr-row" data-ds-annotate-target="1"><span class="tri" aria-hidden="true"></span><span>Default</span></div>
          <div class="tr-row hover" data-ds-annotate-target="1"><span class="tr-indent"></span><span class="tri" aria-hidden="true" style="transform: rotate(45deg);"></span><span>Hover</span></div>
          <div class="tr-row" data-ds-annotate-target="1"><span class="tr-indent"></span><span style="width:10px;"></span><span>Default</span></div>
          <div class="tr-row selected" data-ds-annotate-target="1"><span class="tri" aria-hidden="true" style="transform: rotate(45deg);"></span><span>Selected</span></div>
          <div class="tr-row tr-disabled" data-ds-annotate-target="1"><span class="tri" aria-hidden="true"></span><span>Disabled</span></div>
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

    out_components_dir.mkdir(parents=True, exist_ok=True)
    tokens_css_text = tokens_css.read_text(encoding="utf-8", errors="replace")

    # Relative hrefs
    # - from .design-spec/demos/components/*.html -> .design-spec/tokens/dist/tokens.css
    tokens_href_components = "../../tokens/dist/tokens.css"
    # - from .design-spec/demos/index.html -> .design-spec/tokens/dist/tokens.css
    tokens_href_index = "../tokens/dist/tokens.css"

    # Write per-component HTML
    for c in components:
        body = _component_demo_body(c, index_href="../index.html", tokens_css_text=tokens_css_text)
        html_text = _html_page(title=c.title, body=body, tokens_href=tokens_href_components)
        (out_components_dir / f"{c.slug}.html").write_text(html_text, encoding="utf-8")

    # Write index
    index_html = _html_page(
        title="Component demos",
        body=_index_body(components, tokens_href=tokens_href_index),
        tokens_href=tokens_href_index,
    )
    (out_dir / "index.html").write_text(index_html, encoding="utf-8")

    print(f"Wrote {len(components)} component demos to {out_components_dir}")
    print(f"Wrote index: {out_dir / 'index.html'}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

