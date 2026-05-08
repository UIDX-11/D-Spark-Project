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
    var tab = document.getElementById("inVariantTab");

    function sizeKey() {
      var s = pgSize && pgSize.value;
      if (s === "sm") return "s";
      if (s === "lg") return "xl";
      return "l";
    }

    function wirePasswordToggle() {
      var btn = document.getElementById("inPwBtn");
      var inp = document.getElementById("inLive");
      if (!btn || !inp) return;
      btn.addEventListener("click", function () {
        if (inp.type === "password") {
          inp.type = "text";
          btn.setAttribute("aria-pressed", "true");
          btn.textContent = "\u9690\u85cf";
          btn.setAttribute("aria-label", "\u9690\u85cf\u5bc6\u7801");
        } else {
          inp.type = "password";
          btn.setAttribute("aria-pressed", "false");
          btn.textContent = "\u663e\u793a";
          btn.setAttribute("aria-label", "\u663e\u793a\u5bc6\u7801");
        }
      });
    }

    function renderLive() {
      var v = (tab && tab.value) || "base";
      var sk = sizeKey();
      var rowOpen = '<div class="ds-in-live-host"><div class="ds-in-row" data-size="' + sk + '">';
      var rowClose = "</div></div>";
      var html = "";
      if (v === "password") {
        html =
          rowOpen +
          '<div class="ds-in-pw">' +
          '<input id="inLive" class="ds-input" data-size="' +
          sk +
          '" type="password" placeholder="\u5bc6\u7801" autocomplete="off" aria-label="\u5bc6\u7801\u8f93\u5165" />' +
          '<button type="button" class="ds-in-pw-btn" id="inPwBtn" aria-pressed="false" aria-label="\u663e\u793a\u5bc6\u7801">\u663e\u793a</button></div>' +
          rowClose;
      } else if (v === "search") {
        html =
          rowOpen +
          '<div class="ds-in-search" role="search">' +
          '<span class="ds-in-search-ic" aria-hidden="true">\u2315</span>' +
          '<input id="inLive" class="ds-input ds-in-search-field" data-size="' +
          sk +
          '" type="search" placeholder="\u641c\u7d22" enterkeyhint="search" aria-label="\u641c\u7d22" />' +
          "</div>" +
          rowClose;
      } else if (v === "suffix") {
        html =
          rowOpen +
          '<div class="ds-in-affix">' +
          '<input id="inLive" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="\u8f93\u5165\u624b\u673a\u53f7" inputmode="numeric" aria-label="\u624b\u673a\u53f7" />' +
          '<button type="button" class="ds-in-sfx" aria-label="\u53d1\u9001\u9a8c\u8bc1\u7801">\u53d1\u9001</button></div>' +
          rowClose;
      } else if (v === "group") {
        html =
          rowOpen +
          '<div class="ds-in-group" role="group" aria-label="URL">' +
          '<span class="ds-in-addon">https://</span>' +
          '<input id="inLive" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="example.com" autocomplete="url" aria-label="\u57df\u540d" /></div>' +
          rowClose;
      } else {
        html =
          rowOpen +
          '<input id="inLive" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="\u5360\u4f4d\u6587\u672c" aria-label="\u6f14\u793a\u8f93\u5165" />' +
          rowClose;
      }
      liveRoot.innerHTML = html;
      if (v === "password") wirePasswordToggle();
    }

    function paintMatrix() {
      var sk = sizeKey();
      matrixShell(L5, function (_l, i) {
        var cls = ["mat-inp-def", "mat-inp-hov", "mat-inp-act", "mat-inp-foc", "mat-inp-dis"][i];
        var extra = i === 4 ? " disabled" : "";
        var val = i === 4 ? "" : ' value="Sample"';
        return (
          '<input class="ds-input ' +
          cls +
          '" data-size="' +
          sk +
          '" type="text"' +
          val +
          extra +
          ' tabindex="-1" />'
        );
      });
    }

    function onRefresh() {
      renderLive();
      paintMatrix();
    }

    if (tab) tab.addEventListener("change", onRefresh);
    pgVariant.disabled = true;
    pgSize.disabled = false;
    window.__dsRefresh = onRefresh;
    pgSize.addEventListener("change", onRefresh);
    onRefresh();
  }

  function mountInputNumber() {
    var numHideCtl = document.getElementById("numHideCtl");
    var numErr = document.getElementById("numErr");
    var numRo = document.getElementById("numRo");

    function numSizeKey() {
      var s = pgSize && pgSize.value;
      if (s === "lg") return "xl";
      if (s === "sm" || s === "ms") return "s";
      return "l";
    }

    function mode() {
      var m = pgVariant && pgVariant.value;
      if (m === "button" || m === "plain") return m;
      return "embed";
    }

    function minV() {
      return 0;
    }
    function maxV() {
      return 100;
    }
    function stepV() {
      return 1;
    }

    function parseVal(str) {
      var t = String(str || "").trim().replace(/，/g, ".");
      if (t === "" || t === "-") return null;
      var n = parseFloat(t);
      return isNaN(n) ? null : n;
    }

    function clampVal(n) {
      if (n == null) return null;
      return Math.max(minV(), Math.min(maxV(), n));
    }

    function setLog(msg) {
      var el = document.getElementById("numLog");
      if (el) el.textContent = msg || "";
    }

    function syncAria(inp, n) {
      if (!inp) return;
      inp.setAttribute("aria-valuemin", String(minV()));
      inp.setAttribute("aria-valuemax", String(maxV()));
      if (n == null || isNaN(n)) {
        inp.removeAttribute("aria-valuenow");
      } else {
        inp.setAttribute("aria-valuenow", String(n));
      }
    }

    function renderLive() {
      var sk = numSizeKey();
      var m = mode();
      var hide = numHideCtl && numHideCtl.checked;
      var err = numErr && numErr.checked;
      var ro = numRo && numRo.checked;
      var decVis = !hide && m !== "plain";
      var decBtn =
        '<button type="button" class="ds-num-btn ds-num-btn-dec" aria-label="Decrease value"' +
        (hide || m === "plain" ? ' style="display:none"' : "") +
        ">\u2212</button>";
      var incBtn =
        '<button type="button" class="ds-num-btn ds-num-btn-inc" aria-label="Increase value"' +
        (hide || m === "plain" ? ' style="display:none"' : "") +
        ">\u002b</button>";
      var inpCore =
        '<input id="numInp" class="ds-input in-num ds-num-inp" data-size="' +
        sk +
        '" type="text" inputmode="decimal" role="spinbutton" placeholder="0\u2013100" aria-label="Number value" />';
      var log = '<p id="numLog" class="ds-num-log" aria-live="polite"></p>';
      var wrapCls = "ds-num ds-num--" + m + (err ? " is-error" : "");
      if (m === "button") {
        liveRoot.innerHTML =
          '<div class="' +
          wrapCls +
          '" data-size="' +
          sk +
          '">' +
          decBtn.replace("ds-num-btn", "ds-num-btn ds-num-btn-out") +
          '<div class="ds-num-mid">' +
          inpCore +
          "</div>" +
          incBtn.replace("ds-num-btn", "ds-num-btn ds-num-btn-out") +
          "</div>" +
          log;
      } else if (m === "plain") {
        liveRoot.innerHTML = '<div class="' + wrapCls + '" data-size="' + sk + '">' + inpCore + "</div>" + log;
      } else {
        liveRoot.innerHTML =
          '<div class="' +
          wrapCls +
          '" data-size="' +
          sk +
          '">' +
          decBtn +
          inpCore +
          incBtn +
          "</div>" +
          log;
      }
      var inp = document.getElementById("numInp");
      if (inp) {
        inp.readOnly = !!ro;
        inp.setAttribute("aria-readonly", ro ? "true" : "false");
        inp.value = "42";
        syncAria(inp, 42);
        if (err) inp.setAttribute("aria-invalid", "true");
        else inp.removeAttribute("aria-invalid");
      }
      wireNumber();
    }

    function wireNumber() {
      var inp = document.getElementById("numInp");
      if (!inp) return;
      var decs = liveRoot.querySelectorAll(".ds-num-btn-dec");
      var incs = liveRoot.querySelectorAll(".ds-num-btn-inc");

      function bump(delta) {
        if (inp.readOnly) return;
        var cur = parseVal(inp.value);
        if (cur == null) cur = 0;
        var next = clampVal(cur + delta * stepV());
        if (next == null) return;
        inp.value = String(next);
        syncAria(inp, next);
        setLog("change: step");
      }

      function refreshBtns() {
        var cur = parseVal(inp.value);
        var atMin = cur != null && cur <= minV();
        var atMax = cur != null && cur >= maxV();
        for (var i = 0; i < decs.length; i++) {
          decs[i].disabled = !!inp.readOnly || atMin;
        }
        for (var j = 0; j < incs.length; j++) {
          incs[j].disabled = !!inp.readOnly || atMax;
        }
      }

      inp.addEventListener("keydown", function (e) {
        if (inp.readOnly) return;
        if (e.key === "ArrowUp") {
          e.preventDefault();
          bump(1);
          refreshBtns();
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          bump(-1);
          refreshBtns();
        }
      });

      inp.addEventListener("blur", function () {
        if (inp.readOnly) return;
        var cur = parseVal(inp.value);
        if (cur == null) {
          setLog("blur: empty");
          syncAria(inp, null);
          refreshBtns();
          return;
        }
        var c = clampVal(cur);
        inp.value = String(c);
        syncAria(inp, c);
        setLog("blur: clamp to [" + minV() + ", " + maxV() + "]");
        refreshBtns();
      });

      function pressHold(btn, dir) {
        var t0 = null;
        var t1 = null;
        function clear() {
          if (t0) clearTimeout(t0);
          if (t1) clearInterval(t1);
          t0 = t1 = null;
        }
        btn.addEventListener("mousedown", function () {
          if (btn.disabled) return;
          bump(dir);
          refreshBtns();
          t0 = setTimeout(function () {
            t1 = setInterval(function () {
              bump(dir);
              refreshBtns();
            }, 200);
          }, 1000);
        });
        btn.addEventListener("mouseup", clear);
        btn.addEventListener("mouseleave", clear);
      }

      for (var d = 0; d < decs.length; d++) {
        pressHold(decs[d], -1);
      }
      for (var u = 0; u < incs.length; u++) {
        pressHold(incs[u], 1);
      }

      refreshBtns();
    }

    function paintMatrix() {
      var sk = numSizeKey();
      matrixShell(L5, function (_lbl, i) {
        if (i === 2) {
          return (
            '<input class="ds-input in-num mat-num-err" data-size="' +
            sk +
            '" type="text" value="200" readonly tabindex="-1" />'
          );
        }
        var cls = ["mat-num-def", "mat-num-hov", "mat-num-act", "mat-num-foc", "mat-num-dis"][i];
        var ro = i === 4 ? " disabled" : ' readonly value="42"';
        return (
          '<input class="ds-input in-num ' +
          cls +
          '" data-size="' +
          sk +
          '" type="text"' +
          ro +
          ' tabindex="-1" />'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);
    if (numHideCtl) numHideCtl.addEventListener("change", window.__dsRefresh);
    if (numErr) numErr.addEventListener("change", window.__dsRefresh);
    if (numRo) numRo.addEventListener("change", window.__dsRefresh);
  }

  function mountInputIp() {
    var pgIpErr = document.getElementById("pgIpErr");

    function sizeKey() {
      var s = pgSize && pgSize.value;
      if (s === "sm") return "s";
      if (s === "lg") return "xl";
      return "l";
    }

    function segEls() {
      return [
        document.getElementById("ipSeg0"),
        document.getElementById("ipSeg1"),
        document.getElementById("ipSeg2"),
        document.getElementById("ipSeg3"),
      ];
    }

    function clearErr() {
      var ss = segEls();
      for (var i = 0; i < ss.length; i++) {
        if (ss[i]) ss[i].classList.remove("is-ip-err");
      }
    }

    function validOctet(seg) {
      var v = (seg && seg.value) || "";
      if (v === "") return true;
      if (!/^\d{1,3}$/.test(v)) return false;
      var n = parseInt(v, 10);
      return n >= 0 && n <= 255;
    }

    function wireIp() {
      var ss = segEls();
      for (var idx = 0; idx < ss.length; idx++) {
        (function (seg, i) {
          if (!seg) return;
          seg.addEventListener("keydown", function (e) {
            if (e.key === "ArrowRight" && i < 3) {
              e.preventDefault();
              ss[i + 1].focus();
            } else if (e.key === "ArrowLeft" && i > 0) {
              e.preventDefault();
              ss[i - 1].focus();
            } else if (e.key === "Backspace" && seg.value === "" && i > 0) {
              ss[i - 1].focus();
            }
          });
          seg.addEventListener("input", function () {
            clearErr();
            if (seg.value.length === 3 && i < 3) ss[i + 1].focus();
          });
          seg.addEventListener("blur", function () {
            if (!validOctet(seg)) seg.classList.add("is-ip-err");
          });
        })(ss[idx], idx);
      }
    }

    function renderLive() {
      var sk = sizeKey();
      var shellErr = pgIpErr && pgIpErr.checked;
      liveRoot.innerHTML =
        '<div class="ds-input-ip' +
        (shellErr ? " is-error" : "") +
        '" data-size="' +
        sk +
        '" role="group" aria-label="IP address" id="ipShell">' +
        '<input id="ipSeg0" class="ds-input-ip-seg" maxlength="3" inputmode="numeric" aria-label="First octet" />' +
        '<span class="ds-input-ip-dot" aria-hidden="true">.</span>' +
        '<input id="ipSeg1" class="ds-input-ip-seg" maxlength="3" inputmode="numeric" aria-label="Second octet" />' +
        '<span class="ds-input-ip-dot" aria-hidden="true">.</span>' +
        '<input id="ipSeg2" class="ds-input-ip-seg" maxlength="3" inputmode="numeric" aria-label="Third octet" />' +
        '<span class="ds-input-ip-dot" aria-hidden="true">.</span>' +
        '<input id="ipSeg3" class="ds-input-ip-seg" maxlength="3" inputmode="numeric" aria-label="Fourth octet" />' +
        "</div>";
      wireIp();
    }

    function paintMatrix() {
      var sk = sizeKey();
      matrixShell(L5, function (_lbl, i) {
        var err = i === 2 ? " is-error" : "";
        var badSeg = i === 2 ? " is-ip-err" : "";
        var dis = i === 4 ? ' data-disabled="true"' : "";
        return (
          '<div class="ds-input-ip' +
          err +
          '" data-size="' +
          sk +
          '"' +
          dis +
          ' role="presentation">' +
          '<input class="ds-input-ip-seg" value="192" readonly tabindex="-1" />' +
          '<span class="ds-input-ip-dot" aria-hidden="true">.</span>' +
          '<input class="ds-input-ip-seg" value="168" readonly tabindex="-1" />' +
          '<span class="ds-input-ip-dot" aria-hidden="true">.</span>' +
          '<input class="ds-input-ip-seg" value="0" readonly tabindex="-1" />' +
          '<span class="ds-input-ip-dot" aria-hidden="true">.</span>' +
          '<input class="ds-input-ip-seg' +
          badSeg +
          '" value="999" readonly tabindex="-1" />' +
          "</div>"
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgIpErr) pgIpErr.addEventListener("change", window.__dsRefresh);
  }

  function mountInputRange() {
    var rangeErr = document.getElementById("rangeErr");

    function sizeKey() {
      var s = pgSize && pgSize.value;
      if (s === "sm") return "s";
      if (s === "lg") return "xl";
      return "l";
    }

    function isUnit() {
      return pgVariant && pgVariant.value === "unit";
    }

    function renderLive() {
      var sk = sizeKey();
      var err = rangeErr && rangeErr.checked;
      if (!isUnit()) {
        liveRoot.innerHTML =
          '<div class="ds-ir-plain ds-in-live-host">' +
          '<div class="ds-in-row" data-size="' +
          sk +
          '"><input id="irMin" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="Min" aria-label="Minimum" /></div>' +
          '<span class="ds-ir-div" aria-hidden="true">\u2014</span>' +
          '<div class="ds-in-row" data-size="' +
          sk +
          '"><input id="irMax" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="Max" aria-label="Maximum" /></div>' +
          (err
            ? '<p class="ds-ir-err" role="alert">This is error message</p>'
            : "") +
          "</div>";
      } else {
        liveRoot.innerHTML =
          '<div><div class="ds-ir-unit' +
          (err ? " is-error" : "") +
          '" data-size="' +
          sk +
          '"><div class="ds-ir-unit-inner">' +
          '<input id="irMin" class="ds-input ds-ir-unit-inp" data-size="' +
          sk +
          '" type="text" placeholder="Min" aria-label="Minimum" />' +
          '<span class="ds-ir-unit-mid" aria-hidden="true"></span>' +
          '<input id="irMax" class="ds-input ds-ir-unit-inp" data-size="' +
          sk +
          '" type="text" placeholder="Max" aria-label="Maximum" />' +
          '<span class="ds-ir-unit-vdiv" aria-hidden="true"></span>' +
          '<span class="ds-ir-unit-sfx" aria-hidden="true">%</span></div></div>' +
          (err ? '<p class="ds-ir-err" role="alert">This is error message</p>' : "") +
          "</div></div>";
      }
    }

    function paintMatrix() {
      var sk = sizeKey();
      matrixShell(L5, function (_lbl, i) {
        var ecls = i === 3 ? " is-error" : "";
        return (
          '<div class="ds-ir-unit' +
          ecls +
          '" data-size="' +
          sk +
          '"><div class="ds-ir-unit-inner"><input class="ds-input ds-ir-unit-inp" data-size="' +
          sk +
          '" value="10" readonly tabindex="-1" /><span class="ds-ir-unit-mid" aria-hidden="true"></span><input class="ds-input ds-ir-unit-inp" data-size="' +
          sk +
          '" value="5" readonly tabindex="-1" /><span class="ds-ir-unit-vdiv" aria-hidden="true"></span><span class="ds-ir-unit-sfx">%</span></div></div>'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };
    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);
    if (rangeErr) rangeErr.addEventListener("change", window.__dsRefresh);
  }

  function mountInputAdornment() {
    var tab = document.getElementById("adVariantTab");

    function sizeKey() {
      var s = pgSize && pgSize.value;
      if (s === "sm") return "s";
      if (s === "lg") return "xl";
      return "l";
    }

    function renderLive() {
      var sk = sizeKey();
      var v = (tab && tab.value) || "suffix";
      var host = '<div class="ds-in-live-host">';
      var html = "";
      if (v === "prefix") {
        html =
          host +
          '<div class="ds-in-row" data-size="' +
          sk +
          '"><span class="ds-in-addon">http://</span><input id="adLive" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="example.com" aria-label="Host" /></div></div>';
      } else if (v === "both") {
        html =
          host +
          '<div class="ds-in-row" data-size="' +
          sk +
          '"><span class="ds-in-addon">https://</span><input id="adLive" class="ds-input ds-in-joined" data-size="' +
          sk +
          '" type="text" placeholder="slug" aria-label="Repository" /><span class="ds-in-addon-tail" aria-hidden="true">.github.io</span></div></div>';
      } else {
        html =
          host +
          '<div class="ds-in-row" data-size="' +
          sk +
          '"><div class="ds-in-affix"><input id="adLive" class="ds-input" data-size="' +
          sk +
          '" type="text" placeholder="Phone" aria-label="Phone" /><button type="button" class="ds-in-sfx" aria-label="Send verification code">Send</button></div></div></div>';
      }
      liveRoot.innerHTML = html;
    }

    function paintMatrix() {
      var sk = sizeKey();
      matrixShell(L5, function (_lbl, i) {
        var cls = ["mat-inp-def", "mat-inp-hov", "mat-inp-act", "mat-inp-foc", "mat-inp-dis"][i];
        var ex = i === 4 ? " disabled" : ' value="Text"';
        return (
          '<div class="ds-in-row" data-size="' +
          sk +
          '"><input class="ds-input ' +
          cls +
          '" data-size="' +
          sk +
          '" type="text"' +
          ex +
          ' tabindex="-1" /></div>'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };
    if (tab) tab.addEventListener("change", window.__dsRefresh);
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
  }

  function mountSwitch() {
    var pgSwitchState = document.getElementById("pgSwitchState");

    function variant() {
      var v = pgVariant && pgVariant.value;
      return v === "linear" ? "linear" : "round";
    }

    function sizeVal() {
      var s = pgSize && pgSize.value;
      if (s === "lg") return "lg";
      return "md";
    }

    function isDisabled() {
      return pgSwitchState && pgSwitchState.value === "disabled";
    }

    liveRoot.innerHTML =
      '<button type="button" class="ds-switch" role="switch" aria-checked="false" data-size="md" data-variant="round" id="dsSw" aria-label="\u6f14\u793a\u5f00\u5173">' +
      '<span class="ds-switch-track"></span><span class="ds-switch-knob"></span></button>';
    var sw = document.getElementById("dsSw");
    sw.addEventListener("click", function () {
      if (sw.disabled) return;
      var on = sw.getAttribute("aria-checked") === "true";
      sw.setAttribute("aria-checked", on ? "false" : "true");
    });
    sw.addEventListener("keydown", function (e) {
      if (sw.disabled) return;
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        sw.click();
      }
    });

    function syncLive() {
      var dis = !!isDisabled();
      sw.disabled = dis;
      sw.setAttribute("aria-disabled", dis ? "true" : "false");
      sw.setAttribute("data-size", sizeVal());
      sw.setAttribute("data-variant", variant());
    }

    function matrixRow(_lbl, i) {
      var uid = "mxsw" + i;
      var on = i === 2 || i === 3;
      var dis = i === 4;
      var cls = "ds-switch";
      if (i === 1) cls += " is-demo-hover";
      if (i === 3) cls += " is-demo-focus";
      var ac = on ? "true" : "false";
      var d = dis ? " disabled" : "";
      return (
        '<button type="button" id="' +
        uid +
        '" class="' +
        cls +
        '" role="switch" aria-checked="' +
        ac +
        '" data-size="' +
        sizeVal() +
        '" data-variant="' +
        variant() +
        '" tabindex="-1" aria-hidden="true"' +
        d +
        '><span class="ds-switch-track"></span><span class="ds-switch-knob"></span></button>'
      );
    }

    window.__dsRefresh = function () {
      syncLive();
      matrixShell(L5, matrixRow);
    };

    var o = pgSize.querySelector('option[value="sm"]');
    if (o) o.hidden = true;
    if (pgSize.value === "sm") pgSize.value = "md";
    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgSwitchState) pgSwitchState.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountSlider() {
    var pgSliderState = document.getElementById("pgSliderState");
    var min = 0;
    var max = 100;
    var step = 1;
    var pageStep = 10;
    var state = { v0: 42, v1: 72, dragging: -1 };

    function isRange() {
      return pgVariant && pgVariant.value === "range";
    }
    function marksOn() {
      return pgSize && pgSize.value === "marks-on";
    }
    function isDisabled() {
      return pgSliderState && pgSliderState.value === "disabled";
    }

    function clamp(n, a, b) {
      return Math.max(a, Math.min(b, n));
    }
    function snap(n) {
      return Math.round(n / step) * step;
    }

    function tickActive(idx) {
      var m = idx * 25;
      if (!isRange()) return m <= state.v0;
      var hi = Math.max(state.v0, state.v1);
      return m <= hi;
    }

    function updateTicks() {
      var ticks = liveRoot.querySelectorAll(".ds-sl-tick");
      for (var i = 0; i < ticks.length; i++) {
        ticks[i].classList.toggle("is-active", tickActive(i));
      }
    }

    function layout() {
      var fill = document.getElementById("dsSlFill");
      var t0 = document.getElementById("dsSlTh0");
      var t1 = document.getElementById("dsSlTh1");
      if (!fill || !t0 || !t1) return;
      var dis = !!isDisabled();
      if (isRange()) {
        var lo = Math.min(state.v0, state.v1);
        var hi = Math.max(state.v0, state.v1);
        fill.style.left = lo + "%";
        fill.style.width = hi - lo + "%";
        t0.style.left = state.v0 + "%";
        t1.style.left = state.v1 + "%";
        t1.style.display = "";
        t1.removeAttribute("tabindex");
        t1.removeAttribute("aria-hidden");
        t0.disabled = dis;
        t1.disabled = dis;
        t0.setAttribute("aria-valuemin", String(min));
        t0.setAttribute("aria-valuemax", String(max));
        t0.setAttribute("aria-valuenow", String(state.v0));
        t1.setAttribute("aria-valuemin", String(min));
        t1.setAttribute("aria-valuemax", String(max));
        t1.setAttribute("aria-valuenow", String(state.v1));
        t0.setAttribute("aria-label", "Minimum value");
        t1.setAttribute("aria-label", "Maximum value");
      } else {
        fill.style.left = "0%";
        fill.style.width = state.v0 + "%";
        t0.style.left = state.v0 + "%";
        t1.style.display = "none";
        t1.setAttribute("tabindex", "-1");
        t1.setAttribute("aria-hidden", "true");
        t0.disabled = dis;
        t1.disabled = true;
        t0.setAttribute("aria-valuemin", String(min));
        t0.setAttribute("aria-valuemax", String(max));
        t0.setAttribute("aria-valuenow", String(state.v0));
        t0.setAttribute("aria-label", "Slider value");
      }
      updateTicks();
    }

    function pctFromClient(track, clientX) {
      var r = track.getBoundingClientRect();
      if (r.width <= 0) return min;
      var x = clientX - r.left;
      var p = (x / r.width) * (max - min) + min;
      return snap(clamp(p, min, max));
    }

    function bindLive() {
      var track = document.getElementById("dsSlTrack");
      var t0 = document.getElementById("dsSlTh0");
      var t1 = document.getElementById("dsSlTh1");
      if (!track || !t0 || !t1) return;

      function onTrackDown(ev) {
        if (isDisabled()) return;
        if (ev.target && ev.target.classList && ev.target.classList.contains("ds-sl-thumb")) return;
        if (!(ev.button === 0)) return;
        var val = pctFromClient(track, ev.clientX);
        if (!isRange()) {
          state.v0 = val;
        } else {
          var d0 = Math.abs(val - state.v0);
          var d1 = Math.abs(val - state.v1);
          if (d0 <= d1) state.v0 = val;
          else state.v1 = val;
          if (state.v0 > state.v1) {
            var tmp = state.v0;
            state.v0 = state.v1;
            state.v1 = tmp;
          }
        }
        layout();
      }

      track.addEventListener("mousedown", onTrackDown);

      function bindThumb(th, idx) {
        th.addEventListener("keydown", function (e) {
          if (th.disabled) return;
          var delta = 0;
          if (e.key === "ArrowLeft" || e.key === "ArrowDown") delta = -step;
          else if (e.key === "ArrowRight" || e.key === "ArrowUp") delta = step;
          else if (e.key === "PageDown") delta = -pageStep;
          else if (e.key === "PageUp") delta = pageStep;
          else if (e.key === "Home") {
            e.preventDefault();
            if (!isRange()) state.v0 = min;
            else if (idx === 0) state.v0 = min;
            else state.v1 = min;
            if (isRange() && state.v0 > state.v1) {
              var z = state.v0;
              state.v0 = state.v1;
              state.v1 = z;
            }
            layout();
            return;
          } else if (e.key === "End") {
            e.preventDefault();
            if (!isRange()) state.v0 = max;
            else if (idx === 0) state.v0 = max;
            else state.v1 = max;
            if (isRange() && state.v0 > state.v1) {
              var z2 = state.v0;
              state.v0 = state.v1;
              state.v1 = z2;
            }
            layout();
            return;
          } else return;
          if (delta) e.preventDefault();
          if (!isRange()) {
            state.v0 = clamp(snap(state.v0 + delta), min, max);
          } else {
            if (idx === 0) state.v0 = clamp(snap(state.v0 + delta), min, max);
            else state.v1 = clamp(snap(state.v1 + delta), min, max);
            if (state.v0 > state.v1) {
              var sw = state.v0;
              state.v0 = state.v1;
              state.v1 = sw;
            }
          }
          layout();
        });

        function moveTo(clientX) {
          var val = pctFromClient(track, clientX);
          if (!isRange()) {
            state.v0 = val;
            layout();
            return;
          }
          if (idx === 0) state.v0 = val;
          else state.v1 = val;
          if (state.v0 > state.v1) {
            var tmp2 = state.v0;
            state.v0 = state.v1;
            state.v1 = tmp2;
          }
          layout();
        }

        th.addEventListener("mousedown", function (ev) {
          if (th.disabled || ev.button !== 0) return;
          ev.stopPropagation();
          ev.preventDefault();
          state.dragging = idx;
          function mm(ev2) {
            if (state.dragging !== idx) return;
            moveTo(ev2.clientX);
          }
          function mu() {
            state.dragging = -1;
            document.removeEventListener("mousemove", mm);
            document.removeEventListener("mouseup", mu);
          }
          document.addEventListener("mousemove", mm);
          document.addEventListener("mouseup", mu);
        });
      }

      bindThumb(t0, 0);
      bindThumb(t1, 1);
    }

    function matrixRow(_lbl, i) {
      var uid = "mxsl" + i;
      var pct = 55;
      var cls = "ds-sl-thumb";
      if (i === 1) cls += " is-demo-hover";
      if (i === 2) cls += " is-demo-active";
      if (i === 3) cls += " is-demo-focus";
      if (i === 4) cls += " is-demo-disabled";
      return (
        '<div class="ds-sl" style="width:min(100%,calc(var(--component-slider-track-max-width)*1px))">' +
        '<div class="ds-sl-track">' +
        '<div class="ds-sl-fill" style="width:' +
        pct +
        '%"></div>' +
        '<span id="' +
        uid +
        '" class="' +
        cls +
        '" style="left:' +
        pct +
        '%" aria-hidden="true"></span>' +
        "</div></div>"
      );
    }

    function renderLive() {
      var marksBlock = "";
      if (marksOn()) {
        marksBlock =
          '<div class="ds-sl-ticks" aria-hidden="true">' +
          '<span class="ds-sl-tick"></span><span class="ds-sl-tick"></span><span class="ds-sl-tick"></span><span class="ds-sl-tick"></span><span class="ds-sl-tick"></span>' +
          "</div>" +
          '<div class="ds-sl-marks" aria-hidden="true">' +
          "<span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>" +
          "</div>";
      }
      var disCls = isDisabled() ? "ds-sl is-disabled" : "ds-sl";
      liveRoot.innerHTML =
        '<div class="' +
        disCls +
        '" id="dsSlWrap">' +
        '<div class="ds-sl-track" id="dsSlTrack">' +
        '<div class="ds-sl-fill" id="dsSlFill"></div>' +
        '<button type="button" class="ds-sl-thumb" id="dsSlTh0" role="slider" aria-orientation="horizontal"></button>' +
        '<button type="button" class="ds-sl-thumb" id="dsSlTh1" role="slider" aria-orientation="horizontal"></button>' +
        "</div>" +
        marksBlock +
        "</div>";
      layout();
      bindLive();
    }

    window.__dsRefresh = function () {
      renderLive();
      matrixShell(L5, matrixRow);
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    if (pgSliderState) pgSliderState.disabled = false;
    var o = pgSize && pgSize.querySelector('option[value="sm"]');
    if (o) o.hidden = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgSliderState) pgSliderState.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
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
    function syncLive() {
      var inp = document.getElementById("cbx");
      if (!inp) return;
      var mode = (pgVariant && pgVariant.value) || "unchecked";
      var dis = (pgSize && pgSize.value) === "disabled";
      inp.disabled = !!dis;
      if (mode === "indeterminate") {
        inp.checked = false;
        inp.indeterminate = true;
      } else {
        inp.indeterminate = false;
        inp.checked = mode === "checked";
      }
    }

    liveRoot.innerHTML =
      '<label class="ds-cb" for="cbx">' +
      '<input type="checkbox" id="cbx" />' +
      '<span class="ds-cb-box"></span>' +
      '<span class="ds-cb-label">Remember me</span>' +
      "</label>";

    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh = syncLive;
    syncLive();
    pgVariant.addEventListener("change", syncLive);
    pgSize.addEventListener("change", syncLive);

    var cxRows = ["Unchecked", "Hover", "Checked", "Indeterminate", "Disabled"];
    matrixShell(cxRows, function (_lbl, i) {
      var uid = "mxcb" + i;
      var inner = '<span class="ds-cb-box"></span><span class="ds-cb-label">Option</span>';
      if (i === 0) {
        return (
          '<label class="ds-cb" for="' +
          uid +
          '"><input type="checkbox" id="' +
          uid +
          '" />' +
          inner +
          "</label>"
        );
      }
      if (i === 1) {
        return (
          '<label class="ds-cb is-demo-hover" for="' +
          uid +
          '"><input type="checkbox" id="' +
          uid +
          '" />' +
          inner +
          "</label>"
        );
      }
      if (i === 2) {
        return (
          '<label class="ds-cb" for="' +
          uid +
          '"><input type="checkbox" id="' +
          uid +
          '" checked />' +
          inner +
          "</label>"
        );
      }
      if (i === 3) {
        return (
          '<label class="ds-cb" for="' +
          uid +
          '"><input type="checkbox" id="' +
          uid +
          '" data-ds-ind="1" />' +
          inner +
          "</label>"
        );
      }
      return (
        '<label class="ds-cb" for="' +
        uid +
        '"><input type="checkbox" id="' +
        uid +
        '" checked disabled />' +
        inner +
        "</label>"
      );
    });

    Array.prototype.forEach.call(matrixRoot.querySelectorAll('input[data-ds-ind="1"]'), function (el) {
      el.indeterminate = true;
    });
  }

  function mountRadio() {
    function classicOption(id, name, value, checked, dis, helper) {
      var hCls = helper ? " has-helper" : "";
      var hHtml = helper
        ? '<span class="ds-rb-helper">辅助说明</span>'
        : "";
      var chk = checked ? " checked" : "";
      var d = dis ? " disabled" : "";
      return (
        '<label class="ds-rb' +
        hCls +
        '" for="' +
        id +
        '">' +
        '<input type="radio" name="' +
        name +
        '" id="' +
        id +
        '" value="' +
        value +
        '"' +
        chk +
        d +
        " />" +
        '<span class="ds-rb-outer"><span class="ds-rb-dot"></span></span>' +
        '<span class="ds-rb-col">' +
        '<span class="ds-rb-label">' +
        (value === "a" ? "选项 A" : "选项 B") +
        "</span>" +
        hHtml +
        "</span></label>"
      );
    }

    function capsuleOption(id, name, value, checked, dis, label) {
      var chk = checked ? " checked" : "";
      var d = dis ? " disabled" : "";
      return (
        '<label class="ds-rbc" for="' +
        id +
        '">' +
        '<input type="radio" name="' +
        name +
        '" id="' +
        id +
        '" value="' +
        value +
        '"' +
        chk +
        d +
        " />" +
        '<span class="ds-rbc-pill">' +
        label +
        "</span></label>"
      );
    }

    var pgCapsuleSize = document.getElementById("pgCapsuleSize");
    function capsuleSizeVal() {
      var v = pgCapsuleSize && pgCapsuleSize.value;
      if (v === "lg" || v === "sm") return v;
      return "md";
    }

    function syncCapsuleSizeCtl() {
      if (!pgCapsuleSize) return;
      var style = (pgVariant && pgVariant.value) || "circle";
      pgCapsuleSize.disabled = style !== "capsule";
    }

    function wrapCapsuleGroup(inner) {
      var sz = capsuleSizeVal();
      return (
        '<div class="ds-rg ds-rg-capsule" role="radiogroup" aria-label="演示选项" data-capsule-size="' +
        sz +
        '">' +
        inner +
        "</div>"
      );
    }

    function syncLive() {
      var style = (pgVariant && pgVariant.value) || "circle";
      var content = (pgSize && pgSize.value) || "default";
      var dis = content === "disabled";
      var helper = content === "with-helper" && style === "circle";
      var gName = "dsg";
      syncCapsuleSizeCtl();
      if (style === "capsule") {
        liveRoot.innerHTML = wrapCapsuleGroup(
          capsuleOption("rad-cap-a", gName, "a", true, dis, "选项 A") +
            capsuleOption("rad-cap-b", gName, "b", false, dis, "选项 B")
        );
      } else {
        liveRoot.innerHTML =
          '<div class="ds-rg" role="radiogroup" aria-label="演示选项">' +
          classicOption("rad-a", gName, "a", true, dis, helper) +
          classicOption("rad-b", gName, "b", false, dis, false) +
          "</div>";
      }
    }

    function matrixClassicRow(i) {
      var uid = "mxr" + i;
      var inner =
        '<span class="ds-rb-outer"><span class="ds-rb-dot"></span></span>' +
        '<span class="ds-rb-col"><span class="ds-rb-label">选项</span></span>';
      if (i === 0) {
        return (
          '<label class="ds-rb" for="' +
          uid +
          '"><input type="radio" id="' +
          uid +
          '" name="mxr' +
          i +
          '" />' +
          inner +
          "</label>"
        );
      }
      if (i === 1) {
        return (
          '<label class="ds-rb is-demo-hover" for="' +
          uid +
          '"><input type="radio" id="' +
          uid +
          '" name="mxr' +
          i +
          '" />' +
          inner +
          "</label>"
        );
      }
      if (i === 2) {
        return (
          '<label class="ds-rb" for="' +
          uid +
          '"><input type="radio" id="' +
          uid +
          '" name="mxr' +
          i +
          '" checked />' +
          inner +
          "</label>"
        );
      }
      if (i === 3) {
        return (
          '<label class="ds-rb is-demo-focus" for="' +
          uid +
          '"><input type="radio" id="' +
          uid +
          '" name="mxr' +
          i +
          '" />' +
          inner +
          "</label>"
        );
      }
      return (
        '<label class="ds-rb" for="' +
        uid +
        '"><input type="radio" id="' +
        uid +
        '" name="mxr' +
        i +
        '" checked disabled />' +
        inner +
        "</label>"
      );
    }

    function matrixCapsuleRow(i) {
      var uid = "mxrc" + i;
      var pill = '<span class="ds-rbc-pill">选项</span>';
      var sz = capsuleSizeVal();
      function wrap(cell) {
        return (
          '<div class="ds-rg ds-rg-capsule" data-capsule-size="' + sz + '">' + cell + "</div>"
        );
      }
      if (i === 0) {
        return wrap(
          '<label class="ds-rbc" for="' +
            uid +
            '"><input type="radio" id="' +
            uid +
            '" name="mxrc' +
            i +
            '" />' +
            pill +
            "</label>"
        );
      }
      if (i === 1) {
        return wrap(
          '<label class="ds-rbc is-demo-hover" for="' +
            uid +
            '"><input type="radio" id="' +
            uid +
            '" name="mxrc' +
            i +
            '" />' +
            pill +
            "</label>"
        );
      }
      if (i === 2) {
        return wrap(
          '<label class="ds-rbc" for="' +
            uid +
            '"><input type="radio" id="' +
            uid +
            '" name="mxrc' +
            i +
            '" checked />' +
            pill +
            "</label>"
        );
      }
      if (i === 3) {
        return wrap(
          '<label class="ds-rbc is-demo-focus" for="' +
            uid +
            '"><input type="radio" id="' +
            uid +
            '" name="mxrc' +
            i +
            '" />' +
            pill +
            "</label>"
        );
      }
      return wrap(
        '<label class="ds-rbc" for="' +
          uid +
          '"><input type="radio" id="' +
          uid +
          '" name="mxrc' +
          i +
          '" checked disabled />' +
          pill +
          "</label>"
      );
    }

    var r5 = ["Unchecked", "Hover", "Selected", "Focus", "Disabled"];
    window.__dsRefresh = function () {
      syncLive();
      var style = (pgVariant && pgVariant.value) || "circle";
      matrixShell(r5, function (_lbl, j) {
        return style === "capsule" ? matrixCapsuleRow(j) : matrixClassicRow(j);
      });
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgCapsuleSize) pgCapsuleSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountTag() {
    var pgTagSize = document.getElementById("pgTagSize");

    function kind() {
      return (pgVariant && pgVariant.value) || "status";
    }

    function sub() {
      return (pgSize && pgSize.value) || "offline";
    }

    function dim() {
      var v = pgTagSize && pgTagSize.value;
      if (v === "lg" || v === "sm" || v === "xs") return v;
      return "md";
    }

    function syncTagSizeCtl() {
      if (!pgTagSize) return;
      var k = kind();
      pgTagSize.disabled = k === "selector" || k === "group";
    }

    function fillPgSizeOptions() {
      var k = kind();
      var rows = [];
      if (k === "status") {
        rows = [
          ["offline", "offline"],
          ["danger", "danger"],
          ["success", "success"],
          ["warning", "warning"],
          ["info", "info"],
        ];
      } else if (k === "selector") {
        rows = [
          ["default", "default"],
          ["hover", "hover"],
          ["selected", "selected"],
          ["disabled", "disabled"],
        ];
      } else if (k === "group") {
        rows = [
          ["default", "default"],
          ["hover", "hover"],
          ["disabled", "disabled"],
          ["close-hover", "close-hover"],
        ];
      } else {
        rows = [
          ["default", "default"],
          ["hover", "hover"],
          ["disabled", "disabled"],
        ];
      }
      pgSize.innerHTML = "";
      for (var i = 0; i < rows.length; i++) {
        var o = document.createElement("option");
        o.value = rows[i][0];
        o.textContent = rows[i][1];
        pgSize.appendChild(o);
      }
      pgSize.selectedIndex = 0;
    }

    function coerceSub() {
      var k = kind();
      var s = sub();
      var ok = false;
      for (var i = 0; i < pgSize.options.length; i++) {
        if (pgSize.options[i].value === s) {
          ok = true;
          break;
        }
      }
      if (!ok && pgSize.options.length) pgSize.selectedIndex = 0;
      return (pgSize && pgSize.options[pgSize.selectedIndex] && pgSize.options[pgSize.selectedIndex].value) || s;
    }

    function renderLive() {
      var k = kind();
      var st = coerceSub();
      var d = dim();
      var html = "";
      if (k === "status") {
        html =
          '<span class="ds-tag ds-tag--status" data-tone="' +
          st +
          '" data-size="' +
          d +
          '" role="status"><span class="ds-tag__text">\u72b6\u6001</span></span>';
      } else if (k === "selector") {
        var cls = "ds-tag ds-tag--selector";
        if (st === "hover") cls += " is-demo-hover";
        if (st === "selected") cls += " is-selected";
        if (st === "disabled") cls += " is-disabled";
        var dis = st === "disabled" ? " disabled" : "";
        html =
          '<button type="button" class="' +
          cls +
          '" id="tagSelBtn"' +
          dis +
          '><span class="ds-tag__text">\u7b5b\u9009</span></button>';
      } else if (k === "group") {
        var gcls = "ds-tag ds-tag--group";
        if (st === "hover") gcls += " is-demo-hover";
        if (st === "disabled") gcls += " is-disabled";
        var cdis = st === "disabled" ? " disabled" : "";
        var chcls = st === "close-hover" ? " is-demo-hover" : "";
        html =
          '<span class="' +
          gcls +
          '"><span class="ds-tag__text">\u6807\u7b7e</span><button type="button" class="ds-tag__close' +
          chcls +
          '" aria-label="\u79fb\u9664"' +
          cdis +
          ">\u00d7</button></span>";
      } else {
        var acls = "ds-tag ds-tag--add";
        if (st === "hover") acls += " is-demo-hover";
        var adis = st === "disabled" ? " disabled" : "";
        html =
          '<button type="button" class="' +
          acls +
          '" data-size="' +
          d +
          '" id="tagAddBtn"' +
          adis +
          '><span class="ds-tag__add-icon" aria-hidden="true">+</span><span>\u6dfb\u52a0\u6807\u7b7e</span></button>';
      }
      liveRoot.innerHTML = html;
    }

    window.__dsRefresh = function () {
      syncTagSizeCtl();
      renderLive();
    };

    fillPgSizeOptions();
    syncTagSizeCtl();
    pgVariant.disabled = false;
    pgSize.disabled = false;
    if (pgTagSize) pgTagSize.disabled = false;

    pgVariant.addEventListener("change", function () {
      fillPgSizeOptions();
      syncTagSizeCtl();
      window.__dsRefresh();
    });
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgTagSize) pgTagSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();

    var tgRows = [
      "Status · info · xs",
      "Status · warning · md",
      "Selector · selected",
      "Group · dismissible",
      "Add-button · sm",
    ];
    matrixShell(tgRows, function (_lbl, i) {
      if (i === 0) {
        return (
          '<span class="ds-tag ds-tag--status" data-tone="info" data-size="xs" role="status"><span class="ds-tag__text">Info</span></span>'
        );
      }
      if (i === 1) {
        return (
          '<span class="ds-tag ds-tag--status" data-tone="warning" data-size="md" role="status"><span class="ds-tag__text">Warning</span></span>'
        );
      }
      if (i === 2) {
        return (
          '<button type="button" class="ds-tag ds-tag--selector is-selected"><span class="ds-tag__text">Selected</span></button>'
        );
      }
      if (i === 3) {
        return (
          '<span class="ds-tag ds-tag--group"><span class="ds-tag__text">Label</span><button type="button" class="ds-tag__close" aria-label="Remove">\u00d7</button></span>'
        );
      }
      return (
        '<button type="button" class="ds-tag ds-tag--add" data-size="sm"><span class="ds-tag__add-icon" aria-hidden="true">+</span><span>Add</span></button>'
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

  function bcSepChar(kind) {
    var k = (kind || "slash").toLowerCase();
    if (k === "chevron") return ">";
    if (k === "chevron-right") return "\u203a";
    if (k === "chevron-down") return "\u2304";
    if (k === "chevron-up") return "\u2303";
    return "/";
  }

  function mountBreadcrumb() {
    function sepLi(sep) {
      return (
        '<li class="ds-bc-sep" aria-hidden="true"><span class="ds-bc-sep-inner">' + sep + "</span></li>"
      );
    }
    function linkLi(href, label) {
      return (
        '<li class="ds-bc-item"><a class="ds-bc-link" href="' +
        href +
        '">' +
        label +
        "</a></li>"
      );
    }
    function curLi(label) {
      return (
        '<li class="ds-bc-item"><span class="ds-bc-current" aria-current="page">' + label + "</span></li>"
      );
    }
    function renderBc(sepKind, depthMode) {
      var sep = bcSepChar(sepKind);
      var parts = [];
      if (depthMode === "truncate") {
        parts.push(
          linkLi(
            "#",
            "Very long section name that should truncate with ellipsis in the layout"
          )
        );
        parts.push(sepLi(sep));
        parts.push(curLi("Child page"));
      } else if (depthMode === "collapse") {
        parts.push(linkLi("#", "Dashboard"));
        parts.push(sepLi(sep));
        parts.push(
          '<li class="ds-bc-item"><button type="button" class="ds-bc-ellipsis" aria-label="Show hidden path">…</button></li>'
        );
        parts.push(sepLi(sep));
        parts.push(linkLi("#", "Channel"));
        parts.push(sepLi(sep));
        parts.push(curLi("Current"));
      } else if (depthMode === "2") {
        parts.push(linkLi("#", "Home"));
        parts.push(sepLi(sep));
        parts.push(curLi("News"));
      } else if (depthMode === "4") {
        parts.push(linkLi("#", "Home"));
        parts.push(sepLi(sep));
        parts.push(linkLi("#", "Reports"));
        parts.push(sepLi(sep));
        parts.push(linkLi("#", "Analytics"));
        parts.push(sepLi(sep));
        parts.push(curLi("Detail"));
      } else {
        parts.push(linkLi("#", "Home"));
        parts.push(sepLi(sep));
        parts.push(linkLi("#", "Channel"));
        parts.push(sepLi(sep));
        parts.push(curLi("News article title"));
      }
      return (
        '<nav class="ds-bc-nav" aria-label="Breadcrumb"><ol class="ds-bc-list">' + parts.join("") + "</ol></nav>"
      );
    }

    window.__dsRefresh = function () {
      var sep = (pgVariant && pgVariant.value) || "slash";
      var depth = (pgSize && pgSize.value) || "3";
      liveRoot.innerHTML = renderBc(sep, depth);
      var ell = liveRoot.querySelector(".ds-bc-ellipsis");
      if (ell) {
        ell.addEventListener("click", function () {
          if (typeof console !== "undefined" && console.log) {
            console.log("[breadcrumb demo] ellipsis: open menu with hidden crumbs");
          }
        });
      }
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);

    var bcMatrix = ["Depth 2", "Depth 3", "Truncated label", "4+ ellipsis", "Depth 4"];
    matrixShell(bcMatrix, function (_lbl, i) {
      var seps = ["slash", "chevron", "slash", "slash", "chevron-right"];
      var depths = ["2", "3", "truncate", "collapse", "4"];
      return renderBc(seps[i], depths[i]);
    });
  }

  function mountBadge() {
    function countMarkup(text, opts) {
      opts = opts || {};
      var dis = opts.disabled ? " is-disabled" : "";
      var single = opts.single ? " is-single" : "";
      var lab = "\u672a\u8bfb " + text;
      return (
        '<span class="ds-badge ds-badge--count' +
        dis +
        single +
        '" role="status" aria-label="' +
        lab +
        '"><span class="ds-badge-count">' +
        text +
        "</span></span>"
      );
    }
    function dotMarkup(disabled) {
      var dis = disabled ? " is-disabled" : "";
      return (
        '<span class="ds-badge ds-badge--dot' +
        dis +
        '" role="status" aria-label="\u6709\u66f4\u65b0">' +
        '<span class="ds-badge-dot" aria-hidden="true"></span></span>'
      );
    }
    function statusMarkup(tone, label) {
      return (
        '<span class="ds-badge ds-badge--status is-' +
        tone +
        '" role="status"><span class="ds-badge-dot" aria-hidden="true"></span><span class="ds-badge-status-label">' +
        label +
        "</span></span>"
      );
    }

    function normalizeState(kind, st) {
      st = st || "default";
      if (kind === "dot") {
        return st === "disabled" ? "disabled" : "default";
      }
      if (kind === "status") {
        var tones = ["default", "processing", "success", "warning", "error"];
        if (tones.indexOf(st) === -1) return "default";
        return st;
      }
      var c = ["default", "disabled", "single", "multi"];
      if (c.indexOf(st) === -1) return "default";
      return st;
    }

    window.__dsRefresh = function () {
      var kind = (pgVariant && pgVariant.value) || "count";
      var st = normalizeState(kind, (pgSize && pgSize.value) || "default");
      var html = "";
      if (kind === "count") {
        if (st === "disabled") html = countMarkup("5", { disabled: true });
        else if (st === "single") html = countMarkup("3", { single: true });
        else if (st === "multi") html = countMarkup("99+");
        else html = countMarkup("12");
      } else if (kind === "dot") {
        html = dotMarkup(st === "disabled");
      } else {
        var labels = {
          default: "Default",
          processing: "Processing",
          success: "Success",
          warning: "Warning",
          error: "Error",
        };
        html = statusMarkup(st, labels[st] || "Default");
      }
      liveRoot.innerHTML = html;
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    window.__dsRefresh();
    pgSize.addEventListener("change", window.__dsRefresh);
    pgVariant.addEventListener("change", window.__dsRefresh);

    var bdRows = ["Count · default", "Count · disabled", "Dot · default", "Status · processing", "Count · 99+"];
    matrixShell(bdRows, function (_lbl, i) {
      if (i === 0) return countMarkup("5");
      if (i === 1) return countMarkup("5", { disabled: true });
      if (i === 2) return dotMarkup(false);
      if (i === 3) return statusMarkup("processing", "Processing");
      return countMarkup("99+");
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
      slider: mountSlider,
      modal: mountModal,
      input: mountInput,
      "input-number": mountInputNumber,
      "input-ip": mountInputIp,
      "input-range": mountInputRange,
      "input-adornment": mountInputAdornment,
      checkbox: mountCheckbox,
      radio: mountRadio,
      select: mountSelect,
      alert: mountAlert,
      breadcrumb: mountBreadcrumb,
      badge: mountBadge,
      tag: mountTag,
    };
    (mountMap[SLUG] || mountGeneric)();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
