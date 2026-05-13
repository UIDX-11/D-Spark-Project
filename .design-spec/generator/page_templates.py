#!/usr/bin/env python3
"""
Generate page-level HTML templates (dashboard / list / form) for B-line design → code 1:1 review.
Output: `.design-spec/demos/pages/*.html` and `demos/pages/archive/*.html` — composed from design tokens only (see page_templates.css).
"""
from __future__ import annotations

import html
from pathlib import Path


_NAV_SVG: dict[str, str] = {
    "dashboard": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 2h5v5H2V2zm7 0h5v5H9V2zM2 9h5v5H2V9zm7 0h5v5H9V9z" stroke="currentColor" stroke-width="1.2"/></svg>',
    "chart": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 12V8M8 12V4M13 12V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "list": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 4h9M5 8h9M5 12h9M2 4h.01M2 8h.01M2 12h.01" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "form": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M4 2h8a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2"/><path d="M5 6h6M5 9h4" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>',
    "menu": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 4h10M3 8h10M3 12h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "table": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2 3h12v10H2V3zm0 3.5h12M6 3v10" stroke="currentColor" stroke-width="1.2"/></svg>',
    "button": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="1.5" fill="currentColor"/></svg>',
    "report": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M3 13V5M8 13V8M13 13V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
    "monitor": '<svg class="pt-nav-svg" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M2.5 3h11a1 1 0 011 1v6a1 1 0 01-1 1H8.5l-1 2h3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
}

_TOGGLE_SVG_COLLAPSE = '<svg class="pt-side-toggle-ic pt-side-toggle-ic--collapse" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
_TOGGLE_SVG_EXPAND = '<svg class="pt-side-toggle-ic pt-side-toggle-ic--expand" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6 4l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>'


def _nav_link(*, href: str, label: str, slug: str, active: str, icon_key: str) -> str:
    ic = _NAV_SVG[icon_key]
    cls = "pt-nav-item pt-nav--active" if slug == active else "pt-nav-item"
    lbl = f'<span class="pt-nav-lbl">{html.escape(label)}</span>'
    return (
        f'<a class="{cls}" href="{html.escape(href)}" aria-label="{html.escape(label)}">{ic}{lbl}</a>'
    )


def _nav_ext(*, href: str, label: str, icon_key: str) -> str:
    ic = _NAV_SVG[icon_key]
    lbl = f'<span class="pt-nav-lbl">{html.escape(label)}</span>'
    return f'<a class="pt-nav-item" href="{html.escape(href)}" aria-label="{html.escape(label)}">{ic}{lbl}</a>'


def _nav_ghost(*, label: str, icon_key: str) -> str:
    ic = _NAV_SVG[icon_key]
    lbl = f'<span class="pt-nav-lbl">{html.escape(label)}</span>'
    return f'<span class="pt-nav-item pt-nav-item--ghost pt-nav--muted" role="presentation">{ic}{lbl}</span>'


_ECHARTS_AND_STARTER_SCRIPTS_ARCHIVE = """<script src="https://cdn.jsdelivr.net/npm/echarts@5.5.0/dist/echarts.min.js" crossorigin="anonymous"></script>
    <script src="../dashboard-starter.js" defer></script>"""


def _full_page(
    *,
    title: str,
    body: str,
    tokens_href: str,
    template_css: str,
    extra_scripts: str = "",
    runtime_js_href: str = "page_templates.js",
) -> str:
    safe_title = html.escape(title)
    scripts = extra_scripts.strip()
    extra_block = f"\n    {scripts}\n" if scripts else "\n"
    return f"""<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{safe_title} — D.Spark Page Template</title>
    <link rel="stylesheet" href="{html.escape(tokens_href)}" />
    <style>
      :root {{ color-scheme: light; }}
      body {{
        margin: 0;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji",
          "Segoe UI Emoji";
        background: var(--semantic-bg-page, #f7f7f7);
        color: var(--semantic-text-primary, #222);
      }}
      a {{ color: var(--semantic-text-link, #506daf); text-decoration: none; }}
      a:hover {{ text-decoration: underline; }}
      {template_css}
    </style>
  </head>
  <body>
    {body}
    <div id="ptToastHost" class="pt-toast-host" aria-live="polite" aria-atomic="true"></div>{extra_block}    <script src="{html.escape(runtime_js_href)}" defer></script>
  </body>
</html>
"""


def _top_strip(*, template_id: str, behavior_source: str, page_label: str, nav_context: str = "pages") -> str:
    src = html.escape(behavior_source)
    up = "../" if nav_context == "pages" else "../../"
    return f"""<div class="pt-banner" data-pt-template="{html.escape(template_id)}">
      <strong>页面对稿模版 · {html.escape(page_label)}</strong>
      （B 线：整页组合 token，用于对照 Figma 与 <code>docs/components/*.md</code> 做 1:1 还原验收；行为真源 <code>{src}</code>。）
      页面级信息架构可参考
      <a href="https://arco.design/pro" rel="noreferrer noopener" target="_blank">Arco Pro</a>、
      <a href="https://tdesign.tencent.com/starter/vue/dashboard/base" rel="noreferrer noopener" target="_blank">TDesign Starter</a>
      （非运行时拷贝）。
      · <a href="{html.escape(up)}index.html">返回 Demo 索引</a>
      · <a href="{html.escape(up)}components/button.html">示例：单组件 Button demo</a>
    </div>"""


def _shell_nav(*, active: str, nav_context: str = "pages") -> str:
    if nav_context == "archive":
        dash_h = "../dashboard.html"
        tdes_h = "dashboard-tdesign-starter-base.html"
        list_h = "../list.html"
        form_h = "../form.html"
        comp_p = "../../components/"
    else:
        dash_h = "dashboard.html"
        tdes_h = "archive/dashboard-tdesign-starter-base.html"
        list_h = "list.html"
        form_h = "form.html"
        comp_p = "../components/"

    toggle = f"""<button type="button" class="pt-side-toggle" data-pt-side-toggle aria-expanded="true" aria-controls="ptSideNav" aria-label="收起侧栏" title="收起侧栏">
      {_TOGGLE_SVG_COLLAPSE}{_TOGGLE_SVG_EXPAND}
    </button>"""
    brand = """<div class="pt-brand">
      <span class="pt-brand-abbr" aria-hidden="true">D</span>
      <span class="pt-brand-txt">D.Spark</span>
    </div>"""
    head = f"""<div class="pt-side-head">
      {brand}
      {toggle}
    </div>"""

    return f"""<aside id="ptSideNav" class="pt-side" aria-label="应用侧栏">
      {head}
      <div class="pt-nav-group" role="group" aria-label="工作台">
        <div class="pt-nav-title">工作台</div>
        <nav class="pt-nav" aria-label="页级模版">
          {_nav_link(href=dash_h, label="仪表盘", slug="dashboard", active=active, icon_key="dashboard")}
          {_nav_link(href=tdes_h, label="TDesign 仪表盘对稿", slug="tdesign-dashboard", active=active, icon_key="chart")}
          {_nav_link(href=list_h, label="数据列表", slug="list", active=active, icon_key="list")}
          {_nav_link(href=form_h, label="表单页", slug="form", active=active, icon_key="form")}
        </nav>
      </div>
      <div class="pt-nav-group" role="group" aria-label="分析（占位）">
        <div class="pt-nav-title">分析</div>
        <nav class="pt-nav" aria-label="分析占位">
          {_nav_ghost(label="报表中心", icon_key="report")}
          {_nav_ghost(label="实时监控", icon_key="monitor")}
        </nav>
      </div>
      <div class="pt-nav-group" role="group" aria-label="单组件 demo">
        <div class="pt-nav-title">组件 Demo</div>
        <nav class="pt-nav" aria-label="组件链接">
          {_nav_ext(href=comp_p + "menu.html", label="Menu", icon_key="menu")}
          {_nav_ext(href=comp_p + "table.html", label="Table", icon_key="table")}
          {_nav_ext(href=comp_p + "button.html", label="Button", icon_key="button")}
        </nav>
      </div>
    </aside>"""


def _header(title: str) -> str:
    return f"""<header class="pt-header" role="banner">
      <h1>{html.escape(title)}</h1>
      <div class="pt-toolbar" style="margin:0;">
        <input class="pt-input" type="search" placeholder="搜索…" aria-label="全局搜索" style="min-width:200px;" />
        <button type="button" class="pt-btn pt-btn--secondary" data-pt-notify aria-label="通知">通知</button>
        <button type="button" class="pt-btn pt-btn--primary" data-pt-primary aria-label="主操作">主操作</button>
      </div>
    </header>"""


def build_dashboard_body(behavior_source: str) -> str:
    strip = _top_strip(template_id="dashboard", behavior_source=behavior_source, page_label="仪表盘")
    nav = _shell_nav(active="dashboard")
    head = _header("仪表盘")
    return f"""<div class="pt-shell">
  <div class="pt-app">
  {nav}
  <div class="pt-main">
    {head}
    <main class="pt-body" role="main">
      {strip}
      <div class="pt-grid">
        <section class="pt-card pt-span-3" aria-labelledby="k1" data-pt-kpi tabindex="0">
          <h2 id="k1">今日访问</h2>
          <p class="pt-muted">KPI 卡片 · 与 Card token 对齐（点击切换选中）</p>
          <div class="pt-kpi-val">12,480</div>
        </section>
        <section class="pt-card pt-span-3" aria-labelledby="k2" data-pt-kpi tabindex="0">
          <h2 id="k2">转化率</h2>
          <p class="pt-muted">占位指标</p>
          <div class="pt-kpi-val">3.2%</div>
        </section>
        <section class="pt-card pt-span-3" aria-labelledby="k3" data-pt-kpi tabindex="0">
          <h2 id="k3">待处理</h2>
          <p class="pt-muted">队列深度</p>
          <div class="pt-kpi-val">28</div>
        </section>
        <section class="pt-card pt-span-3" aria-labelledby="k4" data-pt-kpi tabindex="0">
          <h2 id="k4">错误率</h2>
          <p class="pt-muted">监控</p>
          <div class="pt-kpi-val">0.04%</div>
        </section>
        <section class="pt-card pt-span-8" aria-labelledby="ch">
          <h2 id="ch">趋势 / 分布</h2>
          <p class="pt-muted">图表占位：对稿时替换为真实图表区，外框与留白应对齐 Figma 画板。</p>
          <div class="pt-chart" role="img" aria-label="图表占位">Chart placeholder</div>
        </section>
        <section class="pt-card pt-span-4" aria-labelledby="tbl">
          <h2 id="tbl">最近动态</h2>
          <p class="pt-muted">迷你表格 · Table token</p>
          <table class="pt-table" role="table" aria-label="最近动态">
            <thead><tr><th>事件</th><th>时间</th></tr></thead>
            <tbody>
              <tr><td>发布</td><td class="pt-muted">10:02</td></tr>
              <tr><td>告警</td><td class="pt-muted">09:41</td></tr>
              <tr><td>登录</td><td class="pt-muted">09:12</td></tr>
            </tbody>
          </table>
        </section>
      </div>
    </main>
  </div>
  </div>
</div>"""


_TD_STARTER_PANE: tuple[dict[str, str | bool], ...] = (
    {"title": "总收入", "num": "¥ 28,425.00", "up": True, "trend": "20.5%", "left": "money"},
    {"title": "总退款", "num": "¥ 768.00", "up": False, "trend": "20.5%", "left": "refund"},
    {"title": "活跃用户（个）", "num": "1126", "up": False, "trend": "20.5%", "left": "user"},
    {"title": "订单（个）", "num": "527", "up": False, "trend": "20.5%", "left": "file"},
)

_TD_STARTER_SALE: tuple[tuple[str, int, int, str], ...] = (
    ("国家电网有限公司", 1, 7059, "2021-09-01"),
    ("深圳燃气集团股份有限公司", -1, 6437, "2021-09-01"),
    ("国家烟草专卖局", 4, 4221, "2021-09-01"),
    ("中国电信集团有限公司", 3, 3317, "2021-09-01"),
    ("中国移动通信集团有限公司", -3, 3015, "2021-09-01"),
    ("新余市办公用户采购项目", -3, 2015, "2021-09-12"),
)

_TD_STARTER_BUY: tuple[tuple[str, int, int, str], ...] = (
    ("腾讯科技（深圳）有限公司", 1, 3015, "2021-09-01"),
    ("大润发有限公司", -1, 2015, "2021-09-01"),
    ("四川海底捞股份有限公司", 6, 1815, "2021-09-11"),
    ("索尼（中国）有限公司", -3, 1015, "2021-09-21"),
    ("松下电器（中国）有限公司", -4, 445, "2021-09-19"),
    ("新余市办公用户采购项目", -3, 2015, "2021-09-12"),
)

_TD_SVG_USER = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" '
    'fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
    '<path d="M12 12a4 4 0 100-8 4 4 0 000 8z"/><path d="M4 21a8 8 0 0116 0"/></svg>'
)
_TD_SVG_FILE = (
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" '
    'fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
    '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>'
    '<path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/></svg>'
)


def _starter_trend_html(*, up: bool, text: str) -> str:
    ac = "pt-starter-trend--up" if up else "pt-starter-trend--down"
    arrow = "▲" if up else "▼"
    return f'<span class="pt-starter-trend {ac}">{arrow} {html.escape(text)}</span>'


def _starter_kpi_left_html(left: str) -> str:
    if left == "money":
        return '<div id="moneyContainer" class="pt-starter-mini-chart" aria-hidden="true"></div>'
    if left == "refund":
        return '<div id="refundContainer" class="pt-starter-mini-chart" aria-hidden="true"></div>'
    if left == "user":
        return f'<span class="pt-starter-kpi-icon" aria-hidden="true">{_TD_SVG_USER}</span>'
    return f'<span class="pt-starter-kpi-icon" aria-hidden="true">{_TD_SVG_FILE}</span>'


def _starter_kpi_grid_html() -> str:
    blocks: list[str] = []
    for i, p in enumerate(_TD_STARTER_PANE):
        primary = " pt-starter-kpi-card--primary" if i == 0 else ""
        title = str(p["title"])
        num = str(p["num"])
        up = bool(p["up"])
        trend = str(p["trend"])
        left = str(p["left"])
        tr = _starter_trend_html(up=up, text=trend)
        left_html = _starter_kpi_left_html(left)
        blocks.append(
            f"""<section class="pt-card pt-starter-kpi-card{primary}" aria-labelledby="pt-sk-{i}">
  <h3 class="pt-starter-kpi-title" id="pt-sk-{i}">{html.escape(title)}</h3>
  <div class="pt-starter-kpi-num">{html.escape(num)}</div>
  <div class="pt-starter-kpi-left">{left_html}</div>
  <hr class="pt-starter-divider" />
  <div class="pt-starter-kpi-foot">
    <div class="pt-starter-kpi-foot-meta">
      <span>自从上周以来</span>
      {tr}
    </div>
    <span class="pt-starter-chev" aria-hidden="true">›</span>
  </div>
</section>"""
        )
    return "\n".join(blocks)


def _starter_rank_rows(rows: tuple[tuple[str, int, int, str], ...]) -> str:
    out: list[str] = []
    for idx, (name, grow, count, date) in enumerate(rows):
        top = " pt-starter-rank-cell--top" if idx < 3 else ""
        up = grow > 0
        tr = _starter_trend_html(up=up, text=str(abs(grow)))
        out.append(
            f"""<tr>
  <td><span class="pt-starter-rank-cell{top}">{idx + 1}</span></td>
  <td>{html.escape(name)}</td>
  <td>{tr}</td>
  <td>{count}</td>
  <td class="pt-muted">{html.escape(date)}</td>
  <td><button type="button" class="pt-starter-link">详情</button></td>
</tr>"""
        )
    return "\n".join(out)


def build_dashboard_tdesign_starter_body(behavior_source: str) -> str:
    strip = _top_strip(
        template_id="tdesign-starter-dashboard",
        behavior_source=behavior_source,
        page_label="TDesign Starter 仪表盘（静态对稿）",
        nav_context="archive",
    )
    nav = _shell_nav(active="tdesign-dashboard", nav_context="archive")
    head = _header("数据总览")
    kpi = _starter_kpi_grid_html()
    sale_rows = _starter_rank_rows(_TD_STARTER_SALE)
    buy_rows = _starter_rank_rows(_TD_STARTER_BUY)
    return f"""<div class="pt-shell">
  <div class="pt-app">
  {nav}
  <div class="pt-main">
    {head}
    <main class="pt-body" role="main">
      <div class="pt-starter-dashboard">
        <button type="button" class="pt-starter-back-top" id="ptStarterBackTop" aria-label="回到顶部">↑</button>
        {strip}
        <div class="pt-starter-stack">
          <div class="pt-starter-kpi-grid pt-starter-row--tight">
            {kpi}
          </div>
          <div class="pt-starter-mid-grid">
            <section class="pt-card" aria-labelledby="pt-mid-pie">
              <div class="pt-starter-card-title-row">
                <h2 class="pt-starter-card-title-lg" id="pt-mid-pie">统计数据</h2>
                <span class="pt-starter-card-sub">（万元）</span>
              </div>
              <div id="countContainer" class="pt-starter-chart-tall" role="img" aria-label="销售合同占比"></div>
            </section>
            <section class="pt-card" aria-labelledby="pt-mid-line">
              <div class="pt-starter-card-title-row">
                <h2 class="pt-starter-card-title-lg" id="pt-mid-line">销售渠道</h2>
                <span class="pt-starter-card-sub" id="ptStarterLineMonthLabel"></span>
                <div class="pt-starter-card-extra">
                  <input class="pt-input" type="date" id="ptStarterLineStart" aria-label="折线图开始日期" />
                  <input class="pt-input" type="date" id="ptStarterLineEnd" aria-label="折线图结束日期" />
                </div>
              </div>
              <div id="monitorContainer" class="pt-starter-chart-tall" role="img" aria-label="销售趋势"></div>
            </section>
          </div>
          <div class="pt-starter-rank-grid">
            <section class="pt-card pt-starter-row--tight" aria-labelledby="pt-rank-sale">
              <div class="pt-starter-rank-head">
                <h2 id="pt-rank-sale">销售订单排名</h2>
                <div class="pt-starter-seg" role="radiogroup" aria-label="销售排名时间范围">
                  <label><input type="radio" name="ptRankSale" value="week" checked /><span>本周</span></label>
                  <label><input type="radio" name="ptRankSale" value="quarter" /><span>近三个月</span></label>
                </div>
              </div>
              <table class="pt-table" role="table" aria-label="销售订单排名">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>客户名称</th>
                    <th>较上周</th>
                    <th>订单量</th>
                    <th>合同签订日期</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {sale_rows}
                </tbody>
              </table>
            </section>
            <section class="pt-card pt-starter-row--tight" aria-labelledby="pt-rank-buy">
              <div class="pt-starter-rank-head">
                <h2 id="pt-rank-buy">采购订单排名</h2>
                <div class="pt-starter-seg" role="radiogroup" aria-label="采购排名时间范围">
                  <label><input type="radio" name="ptRankBuy" value="week" checked /><span>本周</span></label>
                  <label><input type="radio" name="ptRankBuy" value="quarter" /><span>近三个月</span></label>
                </div>
              </div>
              <table class="pt-table" role="table" aria-label="采购订单排名">
                <thead>
                  <tr>
                    <th>排名</th>
                    <th>供应商名称</th>
                    <th>较上周</th>
                    <th>订单量</th>
                    <th>合同签订日期</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {buy_rows}
                </tbody>
              </table>
            </section>
          </div>
          <section class="pt-card pt-starter-row--tight" aria-labelledby="pt-out-title">
            <div class="pt-starter-out-grid">
              <div class="pt-starter-out-left">
                <div class="pt-starter-card-title-row">
                  <h2 class="pt-starter-card-title-lg" id="pt-out-title">出入库概览</h2>
                  <span class="pt-starter-card-sub">（件）</span>
                  <div class="pt-starter-card-extra">
                    <input class="pt-input" type="date" id="ptStokeStart" aria-label="出入库开始日期" />
                    <input class="pt-input" type="date" id="ptStokeEnd" aria-label="出入库结束日期" />
                  </div>
                </div>
                <div id="stokeContainer" class="pt-starter-chart-stoke" role="img" aria-label="出入库柱状图"></div>
              </div>
              <div class="pt-starter-out-right">
                <section class="pt-card pt-starter-metric-nest" aria-label="导出与指标">
                  <div class="pt-starter-card-extra">
                    <button type="button" class="pt-btn pt-btn--secondary">导出数据</button>
                  </div>
                  <div class="pt-starter-metric-grid">
                    <div class="pt-card pt-starter-metric-card">
                      <div class="pt-muted pt-starter-metric-label">本月出库总计（件）</div>
                      <div class="pt-starter-metric-val">1726</div>
                      <div class="pt-starter-metric-foot">
                        自从上周以来
                        {_starter_trend_html(up=False, text="20.3%")}
                      </div>
                    </div>
                    <div class="pt-card pt-starter-metric-card">
                      <div class="pt-muted pt-starter-metric-label">本月入库总计（件）</div>
                      <div class="pt-starter-metric-val">226</div>
                      <div class="pt-starter-metric-foot">
                        自从上周以来
                        {_starter_trend_html(up=False, text="20.3%")}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
  </div>
</div>"""


def build_list_body(behavior_source: str) -> str:
    strip = _top_strip(template_id="list", behavior_source=behavior_source, page_label="列表页")
    nav = _shell_nav(active="list")
    head = _header("列表页")
    return f"""<div class="pt-shell">
  <div class="pt-app">
  {nav}
  <div class="pt-main">
    {head}
    <main class="pt-body" role="main">
      {strip}
      <div class="pt-toolbar">
        <input class="pt-input" id="ptListKw" type="text" placeholder="关键词（筛选名称）" aria-label="筛选关键词" />
        <input class="pt-input" id="ptListSt" type="text" placeholder="状态（运行/暂停）" aria-label="状态筛选" style="min-width:100px;" />
        <span style="flex:1;"></span>
        <button type="button" class="pt-btn pt-btn--secondary" data-pt-reset>重置</button>
        <button type="button" class="pt-btn pt-btn--primary" data-pt-query>查询</button>
        <button type="button" class="pt-btn pt-btn--primary">新建</button>
      </div>
      <section class="pt-card" style="padding:0;" aria-labelledby="list-title">
        <h2 id="list-title" style="margin:0; padding:calc(var(--component-card-layout-padding-md)*1px); border-bottom:1px solid var(--semantic-border-subtle,#e8e8e8); font-size:calc(var(--semantic-font-size-md)*1px);">数据列表</h2>
        <p class="pt-muted" style="margin:0; padding:8px 16px; font-size:12px;">提示：点击表格行可选中/取消（Table 选中底）；筛选支持名称与状态关键字。</p>
        <table class="pt-table" role="table" aria-label="数据表" style="border:0; border-radius:0;">
          <thead>
            <tr>
              <th>名称</th>
              <th>状态</th>
              <th>负责人</th>
              <th>更新时间</th>
            </tr>
          </thead>
          <tbody id="ptListTbody">
            <tr data-name="项目 Alpha" data-status="运行中"><td>项目 Alpha</td><td><span class="pt-muted">运行中</span></td><td>Alice</td><td class="pt-muted">2026-05-08</td></tr>
            <tr data-name="项目 Beta" data-status="暂停"><td>项目 Beta</td><td><span class="pt-muted">暂停</span></td><td>Bob</td><td class="pt-muted">2026-05-07</td></tr>
            <tr data-name="项目 Gamma" data-status="完成"><td>项目 Gamma</td><td><span class="pt-muted">完成</span></td><td>Carol</td><td class="pt-muted">2026-05-06</td></tr>
            <tr data-name="项目 Delta" data-status="运行中"><td>项目 Delta</td><td><span class="pt-muted">运行中</span></td><td>Dan</td><td class="pt-muted">2026-05-05</td></tr>
          </tbody>
        </table>
        <div class="pt-pagination" style="padding:calc(var(--component-card-layout-padding-md)*1px);" data-pt-pagination>
          <button type="button" class="pt-page-btn" aria-label="上一页">‹</button>
          <button type="button" class="pt-page-btn pt-page-btn--current" aria-current="page">1</button>
          <button type="button" class="pt-page-btn">2</button>
          <button type="button" class="pt-page-btn">3</button>
          <button type="button" class="pt-page-btn" aria-label="下一页">›</button>
        </div>
      </section>
    </main>
  </div>
  </div>
</div>"""


def build_form_body(behavior_source: str) -> str:
    strip = _top_strip(template_id="form", behavior_source=behavior_source, page_label="表单页")
    nav = _shell_nav(active="form")
    head = _header("表单页")
    return f"""<div class="pt-shell">
  <div class="pt-app">
  {nav}
  <div class="pt-main">
    {head}
    <main class="pt-body" role="main">
      {strip}
      <div class="pt-bc" aria-label="面包屑">首页<span>/</span>设置<span>/</span>基础信息</div>
      <section class="pt-card pt-form" aria-labelledby="form-title">
        <h2 id="form-title">基础信息</h2>
        <p class="pt-muted" style="margin:0 0 calc(var(--component-form-row-gap)*1px) 0;">两列表单行：对齐 Form / Input token；保存会做必填校验；通知/主操作在顶栏可点。</p>
        <div class="pt-form-row">
          <div class="pt-form-label">名称<span class="req" aria-hidden="true">*</span></div>
          <div>
            <input class="pt-input" id="ptFormName" type="text" style="width:100%; max-width:calc(var(--component-input-max-width)*1px);" placeholder="请输入名称" aria-required="true" aria-label="名称" />
            <p class="pt-help">辅助说明文案，对应 form.helpText token。</p>
          </div>
        </div>
        <div class="pt-form-row">
          <div class="pt-form-label">描述</div>
          <div>
            <input class="pt-input" id="ptFormDesc" type="text" style="width:100%; max-width:calc(var(--component-input-max-width)*1px);" placeholder="可选" aria-label="描述" />
          </div>
        </div>
        <div class="pt-form-row">
          <div class="pt-form-label">类型<span class="req" aria-hidden="true">*</span></div>
          <div>
            <select class="pt-input" style="width:100%; max-width:280px;" aria-label="类型" aria-required="true">
              <option>类型 A</option>
              <option>类型 B</option>
            </select>
          </div>
        </div>
        <div class="pt-form-row">
          <div class="pt-form-label"></div>
          <div>
            <p id="ptFormErrLine" class="pt-help pt-hidden pt-form-err" role="alert">请填写名称。</p>
            <p class="pt-help">校验错误使用 form.errorText token（保存时空名称会显示上一行）。</p>
          </div>
        </div>
        <div class="pt-actions">
          <button type="button" class="pt-btn pt-btn--primary" data-pt-save>保存</button>
          <button type="button" class="pt-btn pt-btn--secondary" data-pt-cancel>取消</button>
        </div>
      </section>
    </main>
  </div>
  </div>
</div>"""


def write_page_templates(*, repo_root: Path, behavior_source: str) -> None:
    gen_dir = repo_root / ".design-spec" / "generator"
    css_path = gen_dir / "page_templates.css"
    if not css_path.exists():
        raise FileNotFoundError(f"Missing {css_path}")
    template_css = css_path.read_text(encoding="utf-8")
    pages_dir = repo_root / ".design-spec" / "demos" / "pages"
    pages_dir.mkdir(parents=True, exist_ok=True)
    archive_dir = pages_dir / "archive"
    archive_dir.mkdir(parents=True, exist_ok=True)
    tokens_pages = "../../tokens/dist/tokens.css"
    tokens_archive = "../../../tokens/dist/tokens.css"

    pages: tuple[tuple[str, str, str, str, Path, str, str], ...] = (
        ("dashboard.html", "仪表盘模版", build_dashboard_body(behavior_source), "", pages_dir, tokens_pages, "page_templates.js"),
        ("list.html", "列表页模版", build_list_body(behavior_source), "", pages_dir, tokens_pages, "page_templates.js"),
        ("form.html", "表单页模版", build_form_body(behavior_source), "", pages_dir, tokens_pages, "page_templates.js"),
        (
            "dashboard-tdesign-starter-base.html",
            "TDesign Starter 仪表盘（静态对稿）",
            build_dashboard_tdesign_starter_body(behavior_source),
            _ECHARTS_AND_STARTER_SCRIPTS_ARCHIVE,
            archive_dir,
            tokens_archive,
            "../page_templates.js",
        ),
    )
    for filename, title, body, extra_scripts, out_dir, tokens_href, runtime_js in pages:
        html_out = _full_page(
            title=title,
            body=body,
            tokens_href=tokens_href,
            template_css=template_css,
            extra_scripts=extra_scripts,
            runtime_js_href=runtime_js,
        )
        (out_dir / filename).write_text(html_out, encoding="utf-8")

    js_path = gen_dir / "page_templates.js"
    if js_path.exists():
        (pages_dir / "page_templates.js").write_text(js_path.read_text(encoding="utf-8"), encoding="utf-8")

    dash_js = gen_dir / "dashboard-starter.js"
    if dash_js.exists():
        (pages_dir / "dashboard-starter.js").write_text(dash_js.read_text(encoding="utf-8"), encoding="utf-8")
