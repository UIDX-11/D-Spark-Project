(function () {
  "use strict";
  const SLUG = __DS_SLUG__;
  const PREFIX = __DS_TOKEN_PREFIX__;
  const root = document.documentElement;
  const liveRoot = document.getElementById("liveRoot");
  const matrixRoot = document.getElementById("matrixRoot");
  const pgSize = document.getElementById("pgSize");
  const pgVariant = document.getElementById("pgVariant");
  let SNAPSHOT_TOKENS = null;

  function readSnapshotTokens() {
    if (SNAPSHOT_TOKENS) return SNAPSHOT_TOKENS;
    const el = document.getElementById("ds-component-tokens");
    if (!el) {
      SNAPSHOT_TOKENS = {};
      return SNAPSHOT_TOKENS;
    }
    try {
      SNAPSHOT_TOKENS = JSON.parse(el.textContent || "{}") || {};
    } catch (_e) {
      SNAPSHOT_TOKENS = {};
    }
    return SNAPSHOT_TOKENS;
  }

  function applySnapshotTokensToRoot(pref) {
    const pre = "--component-" + pref + "-";
    const snap = readSnapshotTokens();
    Object.keys(snap).forEach(function (k) {
      if (!k || !k.startsWith(pre)) return;
      const existing = getComputedStyle(root).getPropertyValue(k).trim();
      if (existing) return;
      root.style.setProperty(k, String(snap[k]));
    });
  }

  function bindRipple(el) {
    if (!el || el.dataset.rippleBound) return;
    el.dataset.rippleBound = "1";
    el.addEventListener("click", function (e) {
      if (el.disabled) return;
      const span = document.createElement("span");
      span.className = "ds-ripple";
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const d = Math.max(rect.width, rect.height) * 0.35;
      span.style.left = x - d / 2 + "px";
      span.style.top = y - d / 2 + "px";
      span.style.width = d + "px";
      span.style.height = d + "px";
      el.appendChild(span);
      setTimeout(function () {
        span.remove();
      }, 600);
    });
  }

  function readVars(pref) {
    const pre = "--component-" + pref + "-";
    const names = [];
    const seen = new Set();
    for (const sheet of Array.from(document.styleSheets)) {
      let rules;
      try {
        rules = sheet.cssRules;
      } catch (e) {
        continue;
      }
      if (!rules) continue;
      for (const rule of Array.from(rules)) {
        if (!rule || rule.type !== CSSRule.STYLE_RULE) continue;
        if (rule.selectorText !== ":root") continue;
        const style = rule.style;
        for (let i = 0; i < style.length; i++) {
          const p = style[i];
          if (p && p.startsWith(pre) && !seen.has(p)) {
            seen.add(p);
            names.push(p);
          }
        }
      }
    }
    // file:// often blocks cssRules for linked stylesheets; fall back to embedded snapshot.
    if (!names.length) {
      const snap = readSnapshotTokens();
      Object.keys(snap).forEach(function (k) {
        if (k && k.startsWith(pre) && !seen.has(k)) {
          seen.add(k);
          names.push(k);
        }
      });
    }
    return names.sort();
  }

  function pickExact(names, tail) {
    const k = "-" + tail.toLowerCase();
    for (let i = 0; i < names.length; i++) {
      if (names[i].toLowerCase().endsWith(k)) return names[i];
    }
    return null;
  }

  function matrixShell(labels, innerHtmlFn) {
    var html = "";
    for (var i = 0; i < labels.length; i++) {
      html +=
        '<div class="matrix-card"><div class="matrix-label">' +
        labels[i] +
        '</div><div class="matrix-preview">' +
        innerHtmlFn(labels[i], i) +
        "</div></div>";
    }
    matrixRoot.innerHTML = html;
  }

  const L5 = ["Default", "Hover", "Active", "Focus", "Disabled"];

  function mountButton() {
    liveRoot.innerHTML =
      '<div class="ds-play" data-size="md" data-variant="primary">' +
      '<button type="button" class="ds-btn ds-ripple-host">Submit</button></div>';
    var wrap = liveRoot.querySelector(".ds-play");
    var btn = liveRoot.querySelector(".ds-btn");
    bindRipple(btn);

    function paintMatrix() {
      var v = pgVariant.value;
      var s = pgSize.value;
      var sz = s === "sm" ? "mat-sm" : s === "lg" ? "mat-lg" : "mat-md";
      var rows = {
        primary: ["mat-pri-def", "mat-pri-hov", "mat-pri-act", "mat-pri-foc", "mat-pri-dis"],
        neutral: ["mat-neu-def", "mat-neu-hov", "mat-neu-act", "mat-neu-foc", "mat-neu-dis"],
        danger: ["mat-dan-def", "mat-dan-hov", "mat-dan-act", "mat-dan-foc", "mat-dan-dis"],
        ghost: ["mat-gho-def", "mat-gho-hov", "mat-gho-act", "mat-gho-foc", "mat-gho-dis"],
      };
      var cls = rows[v] || rows.primary;
      matrixShell(L5, function (_lbl, i) {
        var dis = i === 4 ? " disabled" : "";
        return '<button type="button" class="mat-btn ' + sz + " " + cls[i] + '"' + dis + ">State</button>";
      });
    }

    window.__dsRefresh = function () {
      wrap.setAttribute("data-size", pgSize.value);
      wrap.setAttribute("data-variant", pgVariant.value);
      paintMatrix();
    };
    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);
  }

  function mountInput() {
    liveRoot.innerHTML =
      '<input class="ds-input" type="text" placeholder="Placeholder text" aria-label="Demo input" />';
    var inp = liveRoot.querySelector(".ds-input");
    window.__dsRefresh = function () {
      var s = pgSize.value;
      inp.classList.remove("in-num");
      if (s === "sm") {
        inp.style.height = "32px";
        inp.style.fontSize = "13px";
      } else if (s === "lg") {
        inp.style.height = "48px";
        inp.style.fontSize = "16px";
      } else {
        inp.style.height = "40px";
        inp.style.fontSize = "14px";
      }
      matrixShell(L5, function (_l, i) {
        var cls = ["mat-inp-def", "mat-inp-hov", "mat-inp-act", "mat-inp-foc", "mat-inp-dis"][i];
        var ro = i === 4 ? " disabled" : ' readonly value="Sample"';
        return '<input class="ds-input ' + cls + '" type="text"' + ro + " />";
      });
    };
    pgVariant.disabled = true;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
  }

  function mountInputNumber() {
    liveRoot.innerHTML =
      '<input class="ds-input in-num" type="number" placeholder="0" aria-label="Demo number" />';
    var inp = liveRoot.querySelector(".ds-input");
    window.__dsRefresh = function () {
      var s = pgSize.value;
      if (s === "sm") {
        inp.style.height = "32px";
        inp.style.fontSize = "13px";
      } else if (s === "lg") {
        inp.style.height = "48px";
        inp.style.fontSize = "16px";
      } else {
        inp.style.height = "40px";
        inp.style.fontSize = "14px";
      }
      matrixShell(L5, function (_l, i) {
        var cls = ["mat-num-def", "mat-num-hov", "mat-num-act", "mat-num-foc", "mat-num-dis"][i];
        var ro = i === 4 ? " disabled" : ' readonly value="42"';
        return '<input class="ds-input in-num ' + cls + '" type="number"' + ro + " />";
      });
    };
    pgVariant.disabled = true;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
  }

  function mountSwitch() {
    liveRoot.innerHTML =
      '<button type="button" class="ds-switch" role="switch" aria-checked="false" data-size="md" id="dsSw">' +
      '<span class="ds-switch-track"></span><span class="ds-switch-knob"></span></button>';
    var sw = document.getElementById("dsSw");
    sw.addEventListener("click", function () {
      if (sw.disabled) return;
      var on = sw.getAttribute("aria-checked") === "true";
      sw.setAttribute("aria-checked", on ? "false" : "true");
    });
    window.__dsRefresh = function () {
      var s = pgSize.value === "sm" ? "md" : pgSize.value;
      sw.setAttribute("data-size", s === "lg" ? "lg" : "md");
    };
    var o = pgSize.querySelector('option[value="sm"]');
    if (o) o.hidden = true;
    if (pgSize.value === "sm") pgSize.value = "md";
    pgVariant.disabled = true;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);

    matrixShell(L5, function (_l, i) {
      var on = i === 2 || i === 3;
      var dis = i === 4;
      var foc = i === 3;
      var hov = i === 1;
      var extra = on ? " on" : "";
      var cls = "mini-sw" + extra + (foc ? " mat-sw-foc" : "") + (hov ? " mat-sw-hov" : "") + (dis ? " mat-sw-dis" : "");
      if (i === 0) cls = "mini-sw";
      if (i === 1) cls = "mini-sw mat-sw-hov";
      if (i === 2) cls = "mini-sw on mat-sw-act";
      if (i === 3) cls = "mini-sw on mat-sw-foc";
      if (i === 4) cls = "mini-sw mat-sw-dis";
      return (
        '<div class="' +
        cls +
        '" aria-hidden="true"><span class="mini-track"></span><span class="mini-knob"></span></div>'
      );
    });
  }

  function mountModal() {
    liveRoot.innerHTML =
      '<button type="button" class="ds-open-modal ds-ripple-host" id="dsmOpen">Open modal</button>' +
      '<div class="ds-modal-layer" id="dsmLayer" hidden>' +
      '<div class="ds-modal-backdrop" id="dsmBd" tabindex="-1"></div>' +
      '<div class="ds-modal-panel" role="dialog" aria-modal="true" aria-labelledby="dsmT">' +
      '<header class="ds-modal-h"><h2 class="ds-modal-title" id="dsmT">Dialog</h2>' +
      '<button type="button" class="ds-modal-x" id="dsmX" aria-label="Close">×</button></header>' +
      '<div class="ds-modal-div"></div>' +
      '<div class="ds-modal-body">Click backdrop, ×, Cancel, OK, or press Escape to close.</div>' +
      '<div class="ds-modal-actions">' +
      '<button type="button" class="ds-mini-btn" id="dsmCancel">Cancel</button>' +
      '<button type="button" class="ds-mini-btn primary" id="dsmOk">OK</button></div></div></div>';

    var layer = document.getElementById("dsmLayer");
    var bd = document.getElementById("dsmBd");
    var openB = document.getElementById("dsmOpen");
    function close() {
      layer.hidden = true;
    }
    function openM() {
      layer.hidden = false;
      document.getElementById("dsmX").focus();
    }
    openB.addEventListener("click", openM);
    bd.addEventListener("click", close);
    document.getElementById("dsmX").addEventListener("click", close);
    document.getElementById("dsmCancel").addEventListener("click", close);
    document.getElementById("dsmOk").addEventListener("click", close);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !layer.hidden) close();
    });
    bindRipple(openB);

    window.__dsRefresh = function () {
      var panel = layer.querySelector(".ds-modal-panel");
      if (!panel) return;
      var s = pgSize.value;
      if (s === "sm") panel.style.width = "min(280px, calc(100vw - 48px))";
      else if (s === "lg") panel.style.width = "min(520px, calc(100vw - 48px))";
      else panel.style.width = "min(calc(var(--component-modal-w, 440) * 1px), calc(100vw - 48px))";
    };
    pgVariant.disabled = true;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);

    matrixShell(L5, function (lbl) {
      return (
        '<div style="width:100%;max-width:200px;margin:0 auto;border-radius:calc(var(--component-modal-panel-radius,16)*1px);' +
        'background:var(--component-modal-panel-bg);box-shadow:var(--component-modal-panel-shadow);' +
        'padding:10px;font-size:12px;color:var(--component-modal-body-text);text-align:left;' +
        (lbl === "Disabled" ? "opacity:0.45;" : "") +
        '">' +
        lbl +
        "</div>"
      );
    });
  }

  function mountCheckbox() {
    liveRoot.innerHTML =
      '<label class="ds-cb"><input type="checkbox" id="cbx" />' +
      '<span class="ds-cb-box"></span><span class="ds-cb-label">Remember me</span></label>';
    pgVariant.disabled = true;
    pgSize.disabled = true;
    window.__dsRefresh = function () {};
    matrixShell(L5, function (_l, i) {
      var states = [
        ['unchecked', ""],
        ['hover', " style=\"border-color:var(--component-checkbox-unchecked-border-hover)\""],
        ['active', " style=\"transform:scale(0.96)\""],
        ['focus', " style=\"box-shadow:0 0 0 2px var(--component-input-ring-focus)\""],
        ['disabled', " disabled"],
      ][i];
      var dis = states[1];
      return (
        '<label class="ds-cb"><input type="checkbox"' +
        dis +
        (i === 4 ? " disabled" : "") +
        (i === 2 ? " checked" : "") +
        ' /><span class="ds-cb-box"></span><span class="ds-cb-label">Option</span></label>'
      );
    });
  }

  function mountRadio() {
    liveRoot.innerHTML =
      '<div class="ds-rg" role="radiogroup" aria-label="Demo">' +
      '<label class="ds-rb"><input type="radio" name="dsg" value="a" checked /><span>Option A</span></label>' +
      '<label class="ds-rb"><input type="radio" name="dsg" value="b" /><span>Option B</span></label>' +
      "</div>";
    pgVariant.disabled = true;
    pgSize.disabled = true;
    window.__dsRefresh = function () {};
    matrixShell(L5, function (_l, i) {
      var chk = i === 2 ? " checked" : "";
      var dis = i === 4 ? " disabled" : "";
      return (
        '<label class="ds-rb"><input type="radio" name="mx' +
        i +
        '"' +
        chk +
        dis +
        ' /><span>Choice</span></label>'
      );
    });
  }

  function mountSelect() {
    liveRoot.innerHTML =
      '<div class="ds-sel">' +
      '<button type="button" class="ds-sel-trg" id="stg" aria-haspopup="listbox" aria-expanded="false">' +
      '<span id="stgL">Select city</span><span class="chev" aria-hidden="true"></span></button>' +
      '<div class="ds-sel-list" id="stl" role="listbox" hidden>' +
      '<div class="ds-sel-item" role="option" tabindex="0" data-v="Beijing">Beijing</div>' +
      '<div class="ds-sel-item" role="option" tabindex="0" data-v="Shanghai">Shanghai</div>' +
      '<div class="ds-sel-item" role="option" tabindex="0" data-v="Shenzhen">Shenzhen</div></div></div>';

    var stg = document.getElementById("stg");
    var stl = document.getElementById("stl");
    var stgL = document.getElementById("stgL");
    function close() {
      stl.hidden = true;
      stg.setAttribute("aria-expanded", "false");
    }
    function toggle() {
      stl.hidden = !stl.hidden;
      stg.setAttribute("aria-expanded", stl.hidden ? "false" : "true");
    }
    stg.addEventListener("click", function (e) {
      e.stopPropagation();
      toggle();
    });
    document.addEventListener("click", function () {
      close();
    });
    liveRoot.addEventListener("click", function (e) {
      e.stopPropagation();
    });
    stl.querySelectorAll(".ds-sel-item").forEach(function (it) {
      it.addEventListener("click", function () {
        stgL.textContent = it.getAttribute("data-v");
        close();
      });
    });
    pgVariant.disabled = true;
    pgSize.disabled = true;
    window.__dsRefresh = function () {};
    matrixShell(L5, function (_l, i) {
      var cls = ["", "is-hover", "is-active", "is-foc", "is-dis"][i];
      return (
        '<div class="ds-sel-item ' +
        cls +
        '" style="width:100%">' +
        ["Default", "Hover", "Active", "Focus", "Disabled"][i] +
        "</div>"
      );
    });
  }

  function mountAlert() {
    var alShowIcon = document.getElementById("alShowIcon");
    var alTitle = document.getElementById("alTitle");
    var alClosable = document.getElementById("alClosable");
    var alCustomClose = document.getElementById("alCustomClose");
    var alAction = document.getElementById("alAction");
    var alBanner = document.getElementById("alBanner");
    var alCenter = document.getElementById("alCenter");
    var toneLabel = {
      info: "Info",
      success: "Success",
      warning: "Warning",
      error: "Error",
      normal: "Normal",
    };

    function renderAlert(opts) {
      var sizeClass = opts.size === "md" ? "is-md" : opts.size === "auto" ? "is-auto" : "";
      var cls =
        "ds-alert t-" +
        opts.type +
        (sizeClass ? " " + sizeClass : "") +
        (opts.banner ? " is-banner" : "") +
        (opts.center ? " is-center" : "") +
        (opts.withTitle ? " with-title" : "");
      /* Arco DOM: icon? → body(title? + content) → action? → close-btn? */
      /* Arco: show icon unless type===normal and no #icon slot (iconSlot=true simulates slot) */
      var iconVisible = opts.showIcon && !(opts.type === "normal" && !opts.iconSlot);
      var iconHtml = iconVisible
        ? '<div class="ds-alert-icon" aria-hidden="true">' + (opts.type === "normal" ? "!" : "●") + "</div>"
        : "";
      var titleHtml = opts.withTitle ? '<div class="ds-alert-title">' + toneLabel[opts.type] + "</div>" : "";
      var msg =
        opts.multiline || opts.withTitle
          ? "Here is an example text Here is an example text Here is an example text."
          : "Here is an example text";
      var bodyHtml =
        '<div class="ds-alert-body">' +
        titleHtml +
        '<div class="ds-alert-content">' +
        msg +
        "</div></div>";
      var actionHtml = opts.action
        ? '<div class="ds-alert-action"><button type="button" class="ds-alert-action-btn">Detail</button></div>'
        : "";
      var closeHtml = opts.closable
        ? '<div class="ds-alert-close-btn' +
          (opts.customClose ? " is-slot" : "") +
          '" tabindex="-1" role="button" aria-label="Close">' +
          (opts.customClose ? "Close" : "×") +
          "</div>"
        : "";
      return (
        '<div class="' +
        cls +
        '" role="alert">' +
        iconHtml +
        bodyHtml +
        actionHtml +
        closeHtml +
        "</div>"
      );
    }

    function matrixVariant(idx) {
      return [
        { withTitle: false, multiline: false, closable: false, action: false, label: "Default" },
        { withTitle: false, multiline: true, closable: false, action: false, label: "Multiline" },
        { withTitle: true, multiline: false, closable: false, action: false, label: "With title" },
        { withTitle: false, multiline: false, closable: true, action: true, label: "Closable + action" },
        { withTitle: false, multiline: false, closable: false, action: false, banner: true, center: true, label: "Banner + center" },
      ][idx];
    }

    window.__dsRefresh = function () {
      var opts = {
        type: pgVariant.value || "info",
        size: pgSize.value || "lg",
        showIcon: !!(alShowIcon && alShowIcon.checked),
        withTitle: !!(alTitle && alTitle.checked),
        closable: !!(alClosable && alClosable.checked),
        customClose: !!(alCustomClose && alCustomClose.checked),
        action: !!(alAction && alAction.checked),
        banner: !!(alBanner && alBanner.checked),
        center: !!(alCenter && alCenter.checked),
        multiline: pgSize.value === "auto",
      };
      if (opts.type === "normal" && !opts.showIcon) {
        // Arco: normal type does not show icon by default.
      }
      liveRoot.innerHTML = renderAlert(opts);
      var closeBtn = liveRoot.querySelector(".ds-alert-close-btn");
      if (closeBtn) {
        closeBtn.addEventListener("click", function (ev) {
          var host = ev.currentTarget.closest(".ds-alert");
          if (host) host.remove();
        });
      }
      matrixShell(L5, function (_l, i) {
        var v = matrixVariant(i);
        return renderAlert({
          type: opts.type,
          size: i === 1 || i === 2 ? "auto" : opts.size,
          showIcon: opts.type === "normal" ? false : true,
          withTitle: v.withTitle,
          multiline: v.multiline,
          closable: v.closable,
          customClose: false,
          action: v.action,
          banner: !!v.banner,
          center: !!v.center,
        });
      });
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);
    [alShowIcon, alTitle, alClosable, alCustomClose, alAction, alBanner, alCenter].forEach(function (el) {
      if (el) el.addEventListener("change", window.__dsRefresh);
    });
  }

  function mountGeneric() {
    var names = readVars(PREFIX);
    pgVariant.disabled = false;
    pgSize.disabled = false;
    if (!names.length) {
      liveRoot.innerHTML =
        '<p class="muted" style="text-align:center;margin:0">No <code>--component-' +
        PREFIX +
        '-*</code> tokens found. Extend <code>studio_runtime.js</code> for this component.</p>';
      matrixRoot.innerHTML = "";
      window.__dsRefresh = function () {};
      return;
    }
    var bgD =
      pickExact(names, "bg-default") ||
      pickExact(names, "bgdefault") ||
      names.find(function (n) {
        return n.toLowerCase().indexOf("bg") !== -1;
      });
    var fgD =
      pickExact(names, "text-default") ||
      pickExact(names, "textdefault") ||
      pickExact(names, "text") ||
      null;
    liveRoot.innerHTML =
      '<button type="button" class="ds-gen-chip ds-ripple-host" id="gchip" tabindex="0">Sample</button>';
    var chip = document.getElementById("gchip");
    if (bgD) chip.style.background = "var(" + bgD + ")";
    if (fgD) chip.style.color = "var(" + fgD + ")";
    bindRipple(chip);

    var bgH = pickExact(names, "bg-hover") || pickExact(names, "bghover") || bgD;
    var bgA = pickExact(names, "bg-active") || pickExact(names, "bgactive") || bgH;
    var bgDis = pickExact(names, "bg-disabled") || pickExact(names, "bgdisabled") || bgD;

    window.__dsRefresh = function () {
      var s = pgSize.value;
      chip.style.padding = s === "sm" ? "6px 10px" : s === "lg" ? "14px 18px" : "10px 14px";
      chip.style.fontSize = s === "sm" ? "12px" : s === "lg" ? "16px" : "14px";
      var v = pgVariant.value;
      if (v === "ghost") {
        chip.style.background = "transparent";
        chip.style.border = "1px solid var(--component-button-outline-border-default, #999)";
        chip.style.color = "var(--semantic-text-primary, #222)";
      } else if (v === "neutral") {
        chip.style.background = "var(--component-button-neutral-bg-default)";
        chip.style.color = "var(--component-button-neutral-text-default)";
        chip.style.border = "1px solid var(--component-button-neutral-border-default)";
      } else if (v === "danger") {
        chip.style.background = "var(--component-button-danger-bg-default)";
        chip.style.color = "var(--component-button-danger-text-default)";
        chip.style.border = "1px solid transparent";
      } else {
        chip.style.background = bgD ? "var(" + bgD + ")" : "var(--semantic-bg-surface)";
        chip.style.color = fgD ? "var(" + fgD + ")" : "var(--semantic-text-primary)";
        chip.style.border = "1px solid var(--semantic-border-subtle)";
      }
      matrixShell(L5, function (_l, i) {
        var st = [
          { bg: bgD, ex: "" },
          { bg: bgH, ex: "" },
          { bg: bgA, ex: "transform:scale(0.97);" },
          { bg: bgD, ex: "box-shadow:0 0 0 2px var(--component-input-ring-focus);" },
          { bg: bgDis, ex: "opacity:0.5;" },
        ][i];
        var bg = st.bg ? "var(" + st.bg + ")" : "var(--semantic-bg-page)";
        var col = fgD ? "var(" + fgD + ")" : "var(--semantic-text-primary)";
        return (
          '<div class="ds-gen-chip" style="background:' +
          bg +
          ";color:" +
          col +
          ";" +
          st.ex +
          '">State</div>'
        );
      });
    };
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);
  }

  function init() {
    if (!liveRoot || !matrixRoot || !pgSize || !pgVariant) return;
    applySnapshotTokensToRoot(PREFIX);

    var mountMap = {
      button: mountButton,
      switch: mountSwitch,
      modal: mountModal,
      input: mountInput,
      "input-number": mountInputNumber,
      checkbox: mountCheckbox,
      radio: mountRadio,
      select: mountSelect,
      alert: mountAlert,
    };
    (mountMap[SLUG] || mountGeneric)();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
