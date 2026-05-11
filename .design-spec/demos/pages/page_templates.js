/**
 * Minimal interactivity for B-line page templates (dashboard / list / form).
 * No Arco runtime — vanilla DOM + token-driven classes only.
 */
(function () {
  "use strict";

  function showToast(message, tone) {
    var host = document.getElementById("ptToastHost");
    if (!host) return;
    tone = tone || "info";
    var el = document.createElement("div");
    el.className = "pt-toast pt-toast--" + tone;
    el.setAttribute("role", tone === "error" ? "alert" : "status");
    el.textContent = message;
    host.appendChild(el);
    window.setTimeout(function () {
      el.classList.add("pt-toast--out");
      window.setTimeout(function () {
        el.remove();
      }, 220);
    }, 2800);
  }

  function bindHeaderActions() {
    document.querySelectorAll("[data-pt-notify]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showToast("通知：这是一条示例消息（Message token 区占位）。", "info");
      });
    });
    document.querySelectorAll("[data-pt-primary]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        showToast("主操作已触发（页级模版示例）。", "success");
      });
    });
  }

  function bindPagination() {
    var bar = document.querySelector("[data-pt-pagination]");
    if (!bar) return;
    var buttons = bar.querySelectorAll("button.pt-page-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var label = btn.getAttribute("aria-label") || "";
        var cur = bar.querySelector(".pt-page-btn--current");
        var nums = Array.prototype.slice
          .call(bar.querySelectorAll("button.pt-page-btn"))
          .filter(function (b) {
            return !b.getAttribute("aria-label");
          });
        var curNum = cur ? parseInt(cur.textContent.trim(), 10) : 1;
        if (label === "上一页") {
          if (curNum > 1) setCurrent(bar, curNum - 1);
          return;
        }
        if (label === "下一页") {
          if (curNum < 3) setCurrent(bar, curNum + 1);
          return;
        }
        var n = parseInt(btn.textContent.trim(), 10);
        if (!isNaN(n)) setCurrent(bar, n);
      });
    });
  }

  function setCurrent(bar, n) {
    bar.querySelectorAll("button.pt-page-btn").forEach(function (b) {
      b.classList.remove("pt-page-btn--current");
      b.removeAttribute("aria-current");
    });
    bar.querySelectorAll("button.pt-page-btn").forEach(function (b) {
      if (!b.getAttribute("aria-label") && parseInt(b.textContent.trim(), 10) === n) {
        b.classList.add("pt-page-btn--current");
        b.setAttribute("aria-current", "page");
      }
    });
  }

  function bindListFilters() {
    var kw = document.getElementById("ptListKw");
    var st = document.getElementById("ptListSt");
    var tbody = document.getElementById("ptListTbody");
    var btnQuery = document.querySelector("[data-pt-query]");
    var btnReset = document.querySelector("[data-pt-reset]");
    if (!tbody) return;

    function apply() {
      var k = kw ? kw.value.trim().toLowerCase() : "";
      var s = st ? st.value.trim().toLowerCase() : "";
      tbody.querySelectorAll("tr").forEach(function (tr) {
        var name = (tr.getAttribute("data-name") || "").toLowerCase();
        var status = (tr.getAttribute("data-status") || "").toLowerCase();
        var ok =
          (!k || name.indexOf(k) !== -1) &&
          (!s || status.indexOf(s) !== -1 || name.indexOf(s) !== -1);
        tr.hidden = !ok;
      });
    }

    if (btnQuery) btnQuery.addEventListener("click", apply);
    if (btnReset) {
      btnReset.addEventListener("click", function () {
        if (kw) kw.value = "";
        if (st) st.value = "";
        tbody.querySelectorAll("tr").forEach(function (tr) {
          tr.hidden = false;
        });
      });
    }
  }

  function bindTableRowSelect() {
    var tbody = document.getElementById("ptListTbody");
    if (!tbody) return;
    tbody.addEventListener("click", function (e) {
      var tr = e.target.closest("tr");
      if (!tr || tr.closest("thead")) return;
      var was = tr.classList.contains("pt-row-selected");
      tbody.querySelectorAll("tr").forEach(function (r) {
        r.classList.remove("pt-row-selected");
      });
      if (!was) tr.classList.add("pt-row-selected");
    });
  }

  function bindForm() {
    var nameInput = document.getElementById("ptFormName");
    var err = document.getElementById("ptFormErrLine");
    var save = document.querySelector("[data-pt-save]");
    var cancel = document.querySelector("[data-pt-cancel]");
    if (!save || !nameInput) return;

    save.addEventListener("click", function () {
      var v = nameInput.value.trim();
      if (!v) {
        nameInput.setAttribute("aria-invalid", "true");
        if (err) err.classList.remove("pt-hidden");
        showToast("请填写名称后再保存。", "error");
        return;
      }
      nameInput.removeAttribute("aria-invalid");
      if (err) err.classList.add("pt-hidden");
      showToast("已保存（示例）。", "success");
    });

    if (cancel) {
      cancel.addEventListener("click", function () {
        nameInput.value = "";
        var desc = document.getElementById("ptFormDesc");
        if (desc) desc.value = "";
        nameInput.removeAttribute("aria-invalid");
        if (err) err.classList.add("pt-hidden");
      });
    }
  }

  function bindKpiCards() {
    document.querySelectorAll("[data-pt-kpi]").forEach(function (card) {
      card.addEventListener("click", function () {
        document.querySelectorAll("[data-pt-kpi]").forEach(function (c) {
          c.classList.remove("pt-card--active");
        });
        card.classList.add("pt-card--active");
      });
    });
  }

  function bindSideToggle() {
    var app = document.querySelector(".pt-app");
    var btn = document.querySelector("[data-pt-side-toggle]");
    if (!app || !btn) return;
    var key = "dspark_pt_side_collapsed";
    function applyCollapsed(collapsed) {
      if (collapsed) app.classList.add("pt-side-collapsed");
      else app.classList.remove("pt-side-collapsed");
      btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
      btn.setAttribute("aria-label", collapsed ? "展开侧栏" : "收起侧栏");
      btn.setAttribute("title", collapsed ? "展开侧栏" : "收起侧栏");
      try {
        localStorage.setItem(key, collapsed ? "1" : "0");
      } catch (e) {}
    }
    var stored = null;
    try {
      stored = localStorage.getItem(key);
    } catch (e) {}
    if (stored === "1") applyCollapsed(true);
    btn.addEventListener("click", function () {
      applyCollapsed(!app.classList.contains("pt-side-collapsed"));
    });
  }

  function init() {
    bindHeaderActions();
    bindSideToggle();
    bindPagination();
    bindListFilters();
    bindTableRowSelect();
    bindForm();
    bindKpiCards();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
