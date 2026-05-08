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
    var escHandler = null;

    function kind() {
      return (pgVariant && pgVariant.value) || "standard";
    }

    function sizeKey() {
      return (pgSize && pgSize.value) || "md";
    }

    function liveHtml() {
      var tip = kind() === "with-tip";
      var tipHtml = tip
        ? '<div class="ds-modal-tip" role="note"><p class="ds-modal-tip-txt">Tip: verify inputs before submitting.</p></div>'
        : "";
      return (
        '<button type="button" class="ds-open-modal ds-ripple-host" id="dsmOpen">Open modal</button>' +
        '<div class="ds-modal-layer" id="dsmLayer" hidden>' +
        '<div class="ds-modal-backdrop" id="dsmBd" tabindex="-1"></div>' +
        '<div class="ds-modal-panel" role="dialog" aria-modal="true" aria-labelledby="dsmT" aria-describedby="dsmD">' +
        '<header class="ds-modal-h"><h2 class="ds-modal-title" id="dsmT">Dialog</h2>' +
        '<button type="button" class="ds-modal-x" id="dsmX" aria-label="Close">×</button></header>' +
        '<div class="ds-modal-div"></div>' +
        '<div class="ds-modal-body">' +
        tipHtml +
        '<p id="dsmD">Click backdrop, ×, Cancel, OK, or press Escape to close.</p></div>' +
        '<div class="ds-modal-actions">' +
        '<button type="button" class="ds-mini-btn" id="dsmCancel">Cancel</button>' +
        '<button type="button" class="ds-mini-btn primary" id="dsmOk">OK</button></div></div></div>'
      );
    }

    function wire() {
      var layer = document.getElementById("dsmLayer");
      if (!layer) return;
      var bd = document.getElementById("dsmBd");
      var openB = document.getElementById("dsmOpen");
      function close() {
        layer.hidden = true;
      }
      function openM() {
        layer.hidden = false;
        var x = document.getElementById("dsmX");
        if (x) x.focus();
      }
      if (openB) openB.onclick = openM;
      if (bd) bd.onclick = close;
      var xb = document.getElementById("dsmX");
      if (xb) xb.onclick = close;
      var c = document.getElementById("dsmCancel");
      var o = document.getElementById("dsmOk");
      if (c) c.onclick = close;
      if (o) o.onclick = close;
      if (escHandler) document.removeEventListener("keydown", escHandler);
      escHandler = function (e) {
        if (e.key === "Escape" && layer && !layer.hidden) close();
      };
      document.addEventListener("keydown", escHandler);
      if (openB) bindRipple(openB);
    }

    function applyPanelWidth() {
      var layer = document.getElementById("dsmLayer");
      if (!layer) return;
      var panel = layer.querySelector(".ds-modal-panel");
      if (!panel) return;
      panel.style.width = "";
      var s = sizeKey();
      if (s === "sm") panel.style.width = "min(280px, calc(100vw - 48px))";
      else if (s === "md-tip")
        panel.style.width = "min(calc(var(--component-modal-w-with-tip) * 1px), calc(100vw - 48px))";
      else if (s === "lg") panel.style.width = "min(520px, calc(100vw - 48px))";
      else panel.style.width = "min(calc(var(--component-modal-w) * 1px), calc(100vw - 48px))";
    }

    function renderLive() {
      liveRoot.innerHTML = liveHtml();
      wire();
      applyPanelWidth();
    }

    function paintMatrix() {
      matrixShell(L5, function (lbl, i) {
        var cls = "ds-modal-panel ds-modal-panel--matrix";
        if (i === 1) cls += " is-hov";
        if (i === 2) cls += " is-act";
        if (i === 3) cls += " is-foc";
        if (i === 4) cls += " is-dis";
        return (
          '<div class="' +
          cls +
          '" role="presentation">' +
          '<header class="ds-modal-h"><h2 class="ds-modal-title">Title</h2></header>' +
          '<div class="ds-modal-div"></div>' +
          '<div class="ds-modal-body">' +
          lbl +
          "</div>" +
          '<div class="ds-modal-actions">' +
          '<button type="button" class="ds-mini-btn" tabindex="-1">Cancel</button>' +
          '<button type="button" class="ds-mini-btn primary" tabindex="-1">OK</button></div></div>'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
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
    var pgSelState = document.getElementById("pgSelState");
    if (typeof window.__dsSelSingleVal !== "string") window.__dsSelSingleVal = "";

    function kind() {
      return (pgVariant && pgVariant.value) || "single";
    }
    function sizeVal() {
      return (pgSize && pgSize.value) || "lg";
    }
    function trig() {
      return (pgSelState && pgSelState.value) || "default";
    }

    function escHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
    }

    function renderValueInner() {
      var k = kind();
      if (k === "multiple-tags") {
        return (
          '<span class="ds-sel-val ds-sel-val--multi" id="stgL">' +
          '<span class="ds-sel-chip"><span class="ds-sel-chip-lb">Beijing</span>' +
          '<button type="button" class="ds-sel-chip-x" aria-label="Remove Beijing">\u00d7</button></span>' +
          '<span class="ds-sel-chip"><span class="ds-sel-chip-lb">Shanghai</span>' +
          '<button type="button" class="ds-sel-chip-x" aria-label="Remove Shanghai">\u00d7</button></span>' +
          "</span>"
        );
      }
      if (k === "multiple-count") {
        return (
          '<span class="ds-sel-val ds-sel-val--multi" id="stgL">' +
          '<span class="ds-sel-chip ds-sel-chip--count"><span class="ds-sel-chip-lb">2 selected</span></span>' +
          "</span>"
        );
      }
      var sv = window.__dsSelSingleVal;
      if (sv) return '<span class="ds-sel-val" id="stgL">' + escHtml(sv) + "</span>";
      return '<span class="ds-sel-ph" id="stgL">Select city</span>';
    }

    function trigClass() {
      var t = trig();
      if (t === "error") return " ds-sel-trg--err";
      if (t === "disabled") return " ds-sel-trg--dis";
      return "";
    }

    function trigDisabledAttr() {
      return trig() === "disabled" ? " disabled" : "";
    }

    function trigAriaInvalid() {
      return trig() === "error" ? ' aria-invalid="true"' : "";
    }

    function buildListHtml() {
      var k = kind();
      var search =
        k === "searchable"
          ? '<div class="ds-sel-search-row"><input type="search" class="ds-sel-search" id="selFilter" autocomplete="off" aria-label="Filter options" placeholder="Search" /></div>'
          : "";
      var rows = [
        { v: "Beijing", l: "Beijing" },
        { v: "Shanghai", l: "Shanghai" },
        { v: "Shenzhen", l: "Shenzhen" },
        { v: "Guangzhou", l: "Guangzhou" },
      ];
      var items = rows
        .map(function (o) {
          return (
            '<div class="ds-sel-item" role="option" tabindex="-1" data-v="' +
            escHtml(o.v) +
            '">' +
            escHtml(o.l) +
            "</div>"
          );
        })
        .join("");
      return search + items;
    }

    function buildLiveHtml() {
      var k = kind();
      var sz = sizeVal();
      return (
        '<span id="selDemoLbl" class="ds-sr-only">City</span>' +
        '<div class="ds-sel" data-size="' +
        sz +
        '" data-kind="' +
        escHtml(k) +
        '">' +
        '<button type="button" class="ds-sel-trg' +
        trigClass() +
        '" id="stg" role="combobox" aria-labelledby="selDemoLbl" aria-controls="stl" aria-haspopup="listbox" aria-expanded="false"' +
        trigAriaInvalid() +
        trigDisabledAttr() +
        ">" +
        renderValueInner() +
        '<span class="chev" aria-hidden="true"></span></button>' +
        '<div class="ds-sel-list" id="stl" role="listbox" aria-labelledby="selDemoLbl" hidden>' +
        buildListHtml() +
        "</div></div>"
      );
    }

    function wireLive() {
      var stg = document.getElementById("stg");
      var stl = document.getElementById("stl");
      if (!stg || !stl) return;

      function close() {
        stl.hidden = true;
        stg.setAttribute("aria-expanded", "false");
      }
      function toggle() {
        if (stg.disabled) return;
        var opening = stl.hidden;
        stl.hidden = !opening;
        stg.setAttribute("aria-expanded", opening ? "true" : "false");
      }

      stg.addEventListener("click", function (e) {
        e.stopPropagation();
        toggle();
      });
      stg.addEventListener("keydown", function (e) {
        if (stg.disabled) return;
        if (e.key === "Escape" || e.key === "Esc") {
          if (!stl.hidden) {
            e.preventDefault();
            close();
          }
          return;
        }
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      });

      stl.querySelectorAll(".ds-sel-item").forEach(function (it) {
        it.addEventListener("click", function () {
          var kk = kind();
          if (kk === "multiple-tags" || kk === "multiple-count") return;
          window.__dsSelSingleVal = it.getAttribute("data-v") || "";
          close();
          window.__dsRefresh();
        });
      });

      stl.querySelectorAll(".ds-sel-chip-x").forEach(function (bx) {
        bx.addEventListener("click", function (e) {
          e.stopPropagation();
        });
      });

      var flt = document.getElementById("selFilter");
      if (flt) {
        flt.addEventListener("click", function (e) {
          e.stopPropagation();
        });
        flt.addEventListener("input", function () {
          var q = (flt.value || "").toLowerCase();
          stl.querySelectorAll(".ds-sel-item").forEach(function (row) {
            var t = (row.getAttribute("data-v") || "").toLowerCase();
            row.style.display = t.indexOf(q) !== -1 ? "" : "none";
          });
        });
      }
    }

    function paintMatrix() {
      var sz = sizeVal();
      matrixShell(L5, function (_l, i) {
        var cls = ["", "is-hover", "is-active", "is-foc", "is-dis"][i];
        return (
          '<div class="ds-sel ds-sel--matrix" data-size="' +
          sz +
          '"><div class="ds-sel-item ' +
          cls +
          '">' +
          ["Default", "Hover", "Active", "Focus", "Disabled"][i] +
          "</div></div>"
        );
      });
    }

    window.__dsRefresh = function () {
      liveRoot.innerHTML = buildLiveHtml();
      wireLive();
      paintMatrix();
    };

    if (!window.__dsSelectDocOnce) {
      window.__dsSelectDocOnce = true;
      document.addEventListener("click", function () {
        var wrap = liveRoot.querySelector(".ds-sel");
        if (!wrap) return;
        var stl = wrap.querySelector(".ds-sel-list");
        var stg = wrap.querySelector("#stg");
        if (stl && stg && !stl.hidden) {
          stl.hidden = true;
          stg.setAttribute("aria-expanded", "false");
        }
      });
      liveRoot.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    pgVariant.disabled = false;
    pgSize.disabled = false;
    if (pgSelState) pgSelState.disabled = false;

    pgVariant.addEventListener("change", function () {
      var kk = kind();
      if (kk !== "single" && kk !== "searchable") window.__dsSelSingleVal = "";
      window.__dsRefresh();
    });
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgSelState) pgSelState.addEventListener("change", window.__dsRefresh);

    window.__dsRefresh();
  }

  function mountDropdown() {
    var pgDdItem = document.getElementById("pgDdItem");

    function variant() {
      return (pgVariant && pgVariant.value) || "basic";
    }
    function triggerSz() {
      return (pgSize && pgSize.value) === "l" ? "l" : "m";
    }
    function itemSz() {
      return (pgDdItem && pgDdItem.value) === "sm" ? "sm" : "md";
    }

    function escHtml(s) {
      return String(s)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/"/g, "&quot;");
    }

    function buildMenuInner() {
      var v = variant();
      var search =
        v === "search"
          ? '<input type="search" class="ds-dd-search" id="ddFilter" autocomplete="off" aria-label="Filter menu" placeholder="Search" />'
          : "";
      var rows = [
        { id: "edit", lab: "Edit", check: false },
        { id: "copy", lab: "Copy", check: true },
        { id: "share", lab: "Share", check: false },
      ];
      var btns = rows
        .map(function (r) {
          var chk = r.check ? '<span class="ds-dd-check" aria-hidden="true"></span>' : "<span></span>";
          var c = "ds-dd-item" + (r.check ? " ds-dd-item--checked" : "");
          return (
            '<button type="button" class="' +
            c +
            '" role="menuitem" data-k="' +
            r.id +
            '"><span>' +
            escHtml(r.lab) +
            "</span>" +
            chk +
            "</button>"
          );
        })
        .join("");
      var dangerBlock = "";
      if (v !== "basic") {
        dangerBlock =
          '<hr class="ds-dd-divider" aria-hidden="true" />' +
          '<button type="button" class="ds-dd-item ds-dd-item--danger" role="menuitem" data-k="del">Delete</button>';
      }
      return search + btns + dangerBlock;
    }

    function buildLive() {
      var tr = triggerSz();
      var is = itemSz();
      var v = variant();
      var searchClass = v === "search" ? " ds-dd-panel--search" : "";
      return (
        '<span id="ddDemoLbl" class="ds-sr-only">Actions</span>' +
        '<div class="ds-dd" id="ddRoot" data-trigger="' +
        tr +
        '" data-item="' +
        is +
        '">' +
        '<button type="button" class="ds-dd-trg" id="ddTrig" aria-labelledby="ddDemoLbl" aria-haspopup="menu" aria-expanded="false" aria-controls="ddMenu">' +
        "Open menu" +
        "</button>" +
        '<div class="ds-dd-panel' +
        searchClass +
        '" id="ddMenu" role="menu" aria-labelledby="ddDemoLbl" hidden>' +
        buildMenuInner() +
        "</div></div>"
      );
    }

    function closePanel() {
      var p = document.getElementById("ddMenu");
      var t = document.getElementById("ddTrig");
      if (p && t) {
        p.hidden = true;
        t.setAttribute("aria-expanded", "false");
      }
    }

    function wireLive() {
      var trig = document.getElementById("ddTrig");
      var panel = document.getElementById("ddMenu");
      if (!trig || !panel) return;

      trig.addEventListener("click", function (e) {
        e.stopPropagation();
        var wasHidden = panel.hidden;
        panel.hidden = !wasHidden;
        trig.setAttribute("aria-expanded", wasHidden ? "true" : "false");
      });
      trig.addEventListener("keydown", function (e) {
        if (e.key === "Escape" || e.key === "Esc") {
          if (!panel.hidden) {
            e.preventDefault();
            closePanel();
          }
        }
      });

      panel.querySelectorAll('[role="menuitem"]').forEach(function (mi) {
        mi.addEventListener("click", function (e) {
          e.stopPropagation();
          if (mi.disabled || mi.getAttribute("aria-disabled") === "true") return;
          closePanel();
        });
      });

      var flt = document.getElementById("ddFilter");
      if (flt) {
        flt.addEventListener("click", function (e) {
          e.stopPropagation();
        });
        flt.addEventListener("input", function () {
          var q = (flt.value || "").toLowerCase();
          panel.querySelectorAll('[role="menuitem"]').forEach(function (mi) {
            var t = (mi.textContent || "").trim().toLowerCase();
            mi.style.display = t.indexOf(q) !== -1 ? "" : "none";
          });
        });
      }
    }

    function paintMatrix() {
      var tr = triggerSz();
      var is = itemSz();
      matrixShell(L5, function (_l, i) {
        var mod = ["", "is-dd-hover", "ds-dd-item--checked", "is-dd-foc", ""][i];
        var dis = i === 4 ? " disabled" : "";
        var chk = i === 2 ? '<span class="ds-dd-check" aria-hidden="true"></span>' : "<span></span>";
        return (
          '<div class="ds-dd ds-dd--matrix" data-trigger="' +
          tr +
          '" data-item="' +
          is +
          '"><button type="button" class="ds-dd-item' +
          (mod ? " " + mod : "") +
          '"' +
          dis +
          ' role="menuitem"><span>' +
          ["Default", "Hover", "Selected", "Focus", "Disabled"][i] +
          "</span>" +
          chk +
          "</button></div>"
        );
      });
    }

    window.__dsRefresh = function () {
      liveRoot.innerHTML = buildLive();
      wireLive();
      paintMatrix();
    };

    if (!window.__dsDdDocOnce) {
      window.__dsDdDocOnce = true;
      document.addEventListener("click", function () {
        var wrap = liveRoot.querySelector(".ds-dd");
        if (!wrap) return;
        var panel = wrap.querySelector("#ddMenu");
        var trig = wrap.querySelector("#ddTrig");
        if (panel && trig && !panel.hidden) {
          panel.hidden = true;
          trig.setAttribute("aria-expanded", "false");
        }
      });
      liveRoot.addEventListener("click", function (e) {
        e.stopPropagation();
      });
    }

    pgVariant.disabled = false;
    pgSize.disabled = false;
    if (pgDdItem) pgDdItem.disabled = false;

    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgDdItem) pgDdItem.addEventListener("change", window.__dsRefresh);

    window.__dsRefresh();
  }

  function mountCascader() {
    var csLabels = ["Default", "Hover", "Selected", "Disabled", "Checked"];

    function mode() {
      return (pgVariant && pgVariant.value) || "single";
    }

    function sizeKey() {
      return (pgSize && pgSize.value) === "sm" ? "sm" : "lg";
    }

    function colsHtml() {
      var multi = mode() === "multiple";
      var c1 =
        '<div class="ds-casc-col"><ul class="ds-casc-ul" role="listbox" aria-label="Level 1">' +
        '<li role="presentation"><button type="button" class="ds-casc-item is-act" role="option" aria-selected="true" aria-expanded="true">' +
        (multi ? '<span class="ds-casc-cb is-ind" aria-hidden="true"></span>' : "") +
        '<span class="ds-casc-item-lbl">Zhejiang</span><span class="ds-casc-item-chev" aria-hidden="true">\u203a</span></button></li>' +
        '<li role="presentation"><button type="button" class="ds-casc-item is-dis" role="option" aria-selected="false" disabled>' +
        (multi ? '<span class="ds-casc-cb" aria-hidden="true"></span>' : "") +
        '<span class="ds-casc-item-lbl">Jiangsu</span></button></li>' +
        '<li role="presentation"><button type="button" class="ds-casc-item" role="option" aria-selected="false">' +
        (multi ? '<span class="ds-casc-cb" aria-hidden="true"></span>' : "") +
        '<span class="ds-casc-item-lbl">Guangdong</span><span class="ds-casc-item-chev" aria-hidden="true">\u203a</span></button></li>' +
        "</ul></div>";
      var c2 =
        '<div class="ds-casc-col"><ul class="ds-casc-ul" role="listbox" aria-label="Level 2">' +
        '<li role="presentation"><button type="button" class="ds-casc-item is-act" role="option" aria-selected="true" aria-expanded="true">' +
        (multi ? '<span class="ds-casc-cb is-ind" aria-hidden="true"></span>' : "") +
        '<span class="ds-casc-item-lbl">Hangzhou</span><span class="ds-casc-item-chev" aria-hidden="true">\u203a</span></button></li>' +
        '<li role="presentation"><button type="button" class="ds-casc-item" role="option" aria-selected="false">' +
        (multi ? '<span class="ds-casc-cb" aria-hidden="true"></span>' : "") +
        '<span class="ds-casc-item-lbl">Ningbo</span></button></li>' +
        "</ul></div>";
      var c3 =
        '<div class="ds-casc-col"><ul class="ds-casc-ul" role="listbox" aria-label="Level 3">' +
        '<li role="presentation"><button type="button" class="ds-casc-item is-act" role="option" aria-selected="true">' +
        (multi ? '<span class="ds-casc-cb is-on" aria-hidden="true"></span>' : "") +
        '<span class="ds-casc-item-lbl">West Lake</span></button></li>' +
        "</ul></div>";
      return '<div class="ds-casc-cols">' + c1 + c2 + c3 + "</div>";
    }

    function paintMatrix() {
      matrixShell(csLabels, function (_lbl, i) {
        var sk = sizeKey();
        var cls = "ds-casc-item";
        if (i === 1) cls += " is-hov";
        if (i === 2) cls += " is-act";
        if (i === 3) cls += " is-dis";
        var dis = i === 3 ? " disabled" : "";
        var cb = i === 4 ? '<span class="ds-casc-cb is-on" aria-hidden="true"></span>' : "";
        return (
          '<div class="ds-casc ds-casc--matrix" data-size="' +
          sk +
          '"><div class="ds-casc-col ds-casc-col--flat"><ul class="ds-casc-ul" role="listbox"><li role="presentation"><button type="button" class="' +
          cls +
          '"' +
          dis +
          ' role="option">' +
          cb +
          '<span class="ds-casc-item-lbl">' +
          csLabels[i] +
          "</span></button></li></ul></div></div>"
        );
      });
    }

    function renderLive() {
      var m = mode();
      var sk = sizeKey();
      var err = m === "error";
      liveRoot.innerHTML =
        '<div class="ds-casc" id="csRoot" data-size="' +
        sk +
        '" data-mode="' +
        m +
        '">' +
        '<button type="button" id="csTrig" class="ds-casc-trg' +
        (err ? " ds-casc-trg--err" : "") +
        '" role="combobox" aria-expanded="false" aria-controls="csPanel" aria-haspopup="listbox"' +
        (err ? ' aria-invalid="true"' : "") +
        '>' +
        '<span class="ds-casc-trg-txt">Zhejiang / Hangzhou / West Lake</span>' +
        '<span class="ds-casc-trg-chev" aria-hidden="true"></span></button>' +
        '<div id="csPanel" class="ds-casc-panel" role="region" aria-label="Cascader menu" hidden>' +
        colsHtml() +
        "</div></div>";

      var trig = document.getElementById("csTrig");
      var panel = document.getElementById("csPanel");
      function setOpen(open) {
        if (!trig || !panel) return;
        trig.setAttribute("aria-expanded", open ? "true" : "false");
        if (open) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "hidden");
        }
      }
      if (trig && panel) {
        trig.addEventListener("click", function (e) {
          e.preventDefault();
          var open = trig.getAttribute("aria-expanded") !== "true";
          setOpen(open);
        });
      }
      if (window.__dsCsEsc) {
        document.removeEventListener("keydown", window.__dsCsEsc);
        window.__dsCsEsc = null;
      }
      window.__dsCsEsc = function (ev) {
        if (ev.key !== "Escape") return;
        var p = document.getElementById("csPanel");
        var t = document.getElementById("csTrig");
        if (!p || !t || !liveRoot.contains(p)) return;
        if (p.hasAttribute("hidden")) return;
        t.setAttribute("aria-expanded", "false");
        p.setAttribute("hidden", "hidden");
      };
      document.addEventListener("keydown", window.__dsCsEsc);
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountUpload() {
    var uplM = ["Default", "Hover", "Disabled", "Drag hover", "Focus"];

    function variant() {
      return (pgVariant && pgVariant.value) || "file-btn";
    }

    function sizeKey() {
      return (pgSize && pgSize.value) === "sm" ? "sm" : "md";
    }

    function hintHtml() {
      return '<p id="uplHint" class="ds-upl-hint">Accepted: PDF, PNG, JPG. Max 100MB per file.</p>';
    }

    function trigStack(tit, desc) {
      return (
        '<span class="ds-upl-trg-plus" aria-hidden="true">+</span>' +
        '<span class="ds-upl-trg-stack">' +
        '<span class="ds-upl-trg-tit">' +
        tit +
        "</span>" +
        '<span class="ds-upl-trg-desc">' +
        desc +
        "</span></span>"
      );
    }

    function buildTrigger(v) {
      var tit = "Upload";
      var desc = "Click or drag files here";
      if (v === "picture-list" || v === "picture-card") {
        tit = "Upload image";
        desc = "PNG / JPG only";
      }
      var inner = trigStack(tit, desc);
      var isDrag = v === "file-drag";
      var dragCls = isDrag ? " ds-upl-trg--drag" : " ds-upl-trg--btn";
      if (isDrag) {
        return (
          '<div id="uplTrig" role="button" tabindex="0" class="ds-upl-trg' +
          dragCls +
          '" aria-describedby="uplHint">' +
          inner +
          "</div>"
        );
      }
      return (
        '<button type="button" id="uplTrig" class="ds-upl-trg' +
        dragCls +
        '" aria-describedby="uplHint">' +
        inner +
        "</button>"
      );
    }

    function fileListHtml(pic) {
      var icCls = pic ? "ds-upl-thumb" : "ds-upl-item-ic";
      var row1 =
        '<li class="ds-upl-item" role="listitem">' +
        '<span class="' +
        icCls +
        '" aria-hidden="true"></span>' +
        '<span class="ds-upl-item-name">document.pdf</span>' +
        '<span class="ds-upl-item-act">' +
        '<button type="button" class="ds-upl-act" aria-label="Download document.pdf">Download</button>' +
        '<button type="button" class="ds-upl-act" aria-label="Remove document.pdf from list">Remove</button>' +
        "</span></li>";
      var row2 =
        '<li class="ds-upl-item" role="listitem">' +
        '<span class="' +
        icCls +
        '" aria-hidden="true"></span>' +
        '<span class="ds-upl-item-name">chart.png</span>' +
        '<div class="ds-upl-prog" role="progressbar" aria-valuenow="44" aria-valuemin="0" aria-valuemax="100" aria-label="Upload progress for chart.png">' +
        '<span class="ds-upl-prog-fill"></span></div>' +
        '<button type="button" class="ds-upl-act" aria-label="Cancel upload for chart.png">Cancel</button>' +
        "</li>";
      var row3 =
        '<li class="ds-upl-item ds-upl-item--err" role="listitem">' +
        '<span class="' +
        icCls +
        '" aria-hidden="true"></span>' +
        '<span class="ds-upl-item-name">bad.exe</span>' +
        '<span class="ds-upl-item-act">' +
        '<button type="button" class="ds-upl-act" aria-label="Retry upload for bad.exe">Retry</button>' +
        '<button type="button" class="ds-upl-act" aria-label="Remove bad.exe from list">Remove</button>' +
        "</span></li>";
      return '<ul class="ds-upl-list" role="list" aria-label="Upload list">' + row1 + row2 + row3 + "</ul>";
    }

    function cardsHtml() {
      return (
        '<div class="ds-upl-cards" role="list" aria-label="Picture wall">' +
        '<div class="ds-upl-card is-hov" role="listitem" tabindex="0" aria-label="photo-a.jpg">' +
        '<div class="ds-upl-card-ph" aria-hidden="true"></div>' +
        '<div class="ds-upl-card-mask">' +
        '<button type="button" class="ds-upl-act" aria-label="Delete photo-a.jpg">Delete</button>' +
        "</div></div>" +
        '<div class="ds-upl-card ds-upl-card--busy" role="listitem" tabindex="0" aria-label="photo-b.jpg uploading">' +
        '<div class="ds-upl-card-ph" aria-hidden="true"></div>' +
        '<div class="ds-upl-card-busy" aria-hidden="true"><span class="ds-upl-card-busy-fill"></span></div>' +
        "</div>" +
        '<div class="ds-upl-card ds-upl-card--err" role="listitem" tabindex="0" aria-label="photo-c.jpg failed">' +
        '<div class="ds-upl-card-ph" aria-hidden="true"></div>' +
        '<span class="ds-upl-card-ic" aria-hidden="true">!</span>' +
        "</div></div>"
      );
    }

    function renderLive() {
      var v = variant();
      var sk = sizeKey();
      var body = hintHtml() + buildTrigger(v);
      if (v === "picture-card") {
        body += cardsHtml();
      } else {
        body += fileListHtml(v === "picture-list");
      }
      liveRoot.innerHTML =
        '<div id="uplRoot" class="ds-upl" data-variant="' + v + '" data-size="' + sk + '">' + body + "</div>";
    }

    function paintMatrix() {
      matrixShell(uplM, function (_lbl, i) {
        var sk = sizeKey();
        var cls = "ds-upl-trg ds-upl-trg--btn";
        if (i === 1) cls += " is-hov";
        if (i === 2) cls += " is-dis";
        if (i === 3) cls += " is-drag";
        if (i === 4) cls += " is-foc";
        var dis = i === 2 ? " disabled" : "";
        return (
          '<div class="ds-upl ds-upl--matrix" data-size="' +
          sk +
          '"><button type="button" class="' +
          cls +
          '"' +
          dis +
          ' aria-label="Upload sample">' +
          '<span class="ds-upl-trg-plus" aria-hidden="true">+</span>' +
          '<span class="ds-upl-trg-stack"><span class="ds-upl-trg-tit">Upload</span>' +
          '<span class="ds-upl-trg-desc">Matrix row</span></span></button></div>'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountTree() {
    var trMx = ["Default", "Hover", "Selected", "Disabled", "Focus"];

    function variant() {
      return (pgVariant && pgVariant.value) === "checkbox" ? "checkbox" : "simple";
    }

    function sizeKey() {
      return (pgSize && pgSize.value) === "sm" ? "sm" : "md";
    }

    function cbBlock() {
      if (variant() !== "checkbox") return "";
      return '<span class="ds-tree-cb" aria-hidden="true"><span class="ds-tree-cb-box"></span></span>';
    }

    function rowInner(toggleHtml, label) {
      return toggleHtml + cbBlock() + '<span class="ds-tree-label">' + label + "</span>";
    }

    function toggleBtn(expanded, label, leaf) {
      if (leaf) {
        return '<span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>';
      }
      var ex = expanded ? "true" : "false";
      var chev = expanded ? "\u25bc" : "\u25b6";
      return (
        '<button type="button" class="ds-tree-toggle" aria-expanded="' +
        ex +
        '" aria-label="' +
        (expanded ? "Collapse " : "Expand ") +
        label +
        '"><span class="ds-tree-toggle-ic" aria-hidden="true">' +
        chev +
        "</span></button>"
      );
    }

    function liveHtml() {
      var sk = sizeKey();
      var v = variant();
      return (
        '<div id="trRoot" class="ds-tree" data-size="' +
        sk +
        '" data-variant="' +
        v +
        '" role="tree" aria-label="Demo tree">' +
        '<ul class="ds-tree-list" role="group">' +
        '<li class="ds-tree-node" id="trN0" role="treeitem" aria-expanded="true" aria-selected="true" aria-level="1" tabindex="0">' +
        '<div class="ds-tree-row">' +
        rowInner(toggleBtn(true, "Project", false), "Project") +
        "</div>" +
        '<ul class="ds-tree-list" role="group" id="trG0">' +
        '<li class="ds-tree-node" id="trN1" role="treeitem" aria-selected="false" aria-level="2" tabindex="-1">' +
        '<div class="ds-tree-row">' +
        rowInner(toggleBtn(false, "src", true), "src") +
        "</div></li>" +
        '<li class="ds-tree-node" id="trN2" role="treeitem" aria-expanded="true" aria-selected="false" aria-level="2" tabindex="-1">' +
        '<div class="ds-tree-row">' +
        rowInner(toggleBtn(true, "packages", false), "packages") +
        "</div>" +
        '<ul class="ds-tree-list" role="group" id="trG2">' +
        '<li class="ds-tree-node" id="trN3" role="treeitem" aria-selected="false" aria-level="3" tabindex="-1">' +
        '<div class="ds-tree-row">' +
        rowInner(toggleBtn(false, "core", true), "core") +
        "</div></li>" +
        '<li class="ds-tree-node" id="trN4" role="treeitem" aria-disabled="true" aria-selected="false" aria-level="3" tabindex="-1">' +
        '<div class="ds-tree-row ds-tree-row--dis">' +
        rowInner(toggleBtn(false, "legacy", true), "legacy (disabled)") +
        "</div></li>" +
        "</ul></li></ul></li></ul></div>"
      );
    }

    function visibleOrder(root) {
      var out = [];
      function walk(ul) {
        if (!ul || ul.hasAttribute("hidden")) return;
        var lis = [].slice.call(ul.children).filter(function (n) {
          return n.tagName === "LI" && n.getAttribute("role") === "treeitem";
        });
        lis.forEach(function (li) {
          out.push(li);
          var exp = li.getAttribute("aria-expanded");
          var nested = li.querySelector(":scope > ul.ds-tree-list");
          if (nested && exp !== "false") walk(nested);
        });
      }
      var top = root.querySelector(":scope > ul.ds-tree-list");
      walk(top);
      return out.filter(function (li) {
        return !li.closest("[hidden]");
      });
    }

    function enabledItems(order) {
      return order.filter(function (li) {
        return li.getAttribute("aria-disabled") !== "true";
      });
    }

    function wireTree() {
      var root = document.getElementById("trRoot");
      if (!root) return;

      function setExpanded(li, on) {
        var nested = li.querySelector(":scope > ul.ds-tree-list");
        var btn = li.querySelector(":scope > .ds-tree-row > button.ds-tree-toggle");
        if (!nested || !btn) return;
        li.setAttribute("aria-expanded", on ? "true" : "false");
        btn.setAttribute("aria-expanded", on ? "true" : "false");
        var ic = btn.querySelector(".ds-tree-toggle-ic");
        if (ic) ic.textContent = on ? "\u25bc" : "\u25b6";
        if (on) nested.removeAttribute("hidden");
        else nested.setAttribute("hidden", "hidden");
      }

      root.addEventListener("click", function (e) {
        var tgl = e.target.closest(".ds-tree-toggle");
        if (tgl && root.contains(tgl) && tgl.getAttribute("aria-hidden") !== "true") {
          e.preventDefault();
          var li = tgl.closest('[role="treeitem"]');
          if (!li || !root.contains(li)) return;
          var nested = li.querySelector(":scope > ul.ds-tree-list");
          if (!nested) return;
          var cur = li.getAttribute("aria-expanded") === "true";
          setExpanded(li, !cur);
          return;
        }
        var row = e.target.closest(".ds-tree-row");
        if (!row || !root.contains(row)) return;
        var li = row.closest('[role="treeitem"]');
        if (!li || li.getAttribute("aria-disabled") === "true") return;
        var all = visibleOrder(root);
        all.forEach(function (n) {
          n.setAttribute("aria-selected", n === li ? "true" : "false");
          n.setAttribute("tabindex", n === li ? "0" : "-1");
        });
      });

      root.addEventListener("keydown", function (e) {
        var key = e.key;
        if (
          key !== "ArrowDown" &&
          key !== "ArrowUp" &&
          key !== "ArrowRight" &&
          key !== "ArrowLeft" &&
          key !== "Home" &&
          key !== "End"
        )
          return;
        var order = visibleOrder(root);
        var en = enabledItems(order);
        var active = document.activeElement;
        var cur = active && active.getAttribute && active.getAttribute("role") === "treeitem" ? active : order[0];
        if (!cur || !root.contains(cur)) cur = en[0];
        var i = en.indexOf(cur);
        if (i < 0) i = 0;

        if (key === "ArrowDown") {
          e.preventDefault();
          var ni = Math.min(en.length - 1, i + 1);
          if (en[ni]) {
            en[ni].focus();
            en.forEach(function (n) {
              n.setAttribute("tabindex", n === en[ni] ? "0" : "-1");
            });
          }
          return;
        }
        if (key === "ArrowUp") {
          e.preventDefault();
          var pi = Math.max(0, i - 1);
          if (en[pi]) {
            en[pi].focus();
            en.forEach(function (n) {
              n.setAttribute("tabindex", n === en[pi] ? "0" : "-1");
            });
          }
          return;
        }
        if (key === "Home") {
          e.preventDefault();
          if (en[0]) {
            en[0].focus();
            en.forEach(function (n) {
              n.setAttribute("tabindex", n === en[0] ? "0" : "-1");
            });
          }
          return;
        }
        if (key === "End") {
          e.preventDefault();
          var last = en[en.length - 1];
          if (last) {
            last.focus();
            en.forEach(function (n) {
              n.setAttribute("tabindex", n === last ? "0" : "-1");
            });
          }
          return;
        }
        if (key === "ArrowRight") {
          e.preventDefault();
          var nested = cur.querySelector(":scope > ul.ds-tree-list");
          if (nested && cur.getAttribute("aria-expanded") === "false") {
            setExpanded(cur, true);
            var kids = nested.querySelectorAll(':scope > li[role="treeitem"]');
            var first = null;
            for (var j = 0; j < kids.length; j++) {
              if (kids[j].getAttribute("aria-disabled") !== "true") {
                first = kids[j];
                break;
              }
            }
            if (first && root.contains(first)) {
              first.focus();
              visibleOrder(root).forEach(function (n) {
                n.setAttribute("tabindex", n === first ? "0" : "-1");
              });
            }
          }
          return;
        }
        if (key === "ArrowLeft") {
          e.preventDefault();
          if (cur.getAttribute("aria-expanded") === "true") {
            var nest2 = cur.querySelector(":scope > ul.ds-tree-list");
            if (nest2) {
              setExpanded(cur, false);
              return;
            }
          }
          var par = cur.parentElement && cur.parentElement.closest('[role="treeitem"]');
          if (par && root.contains(par)) {
            par.focus();
            en.forEach(function (n) {
              n.setAttribute("tabindex", n === par ? "0" : "-1");
            });
          }
        }
      });
    }

    function paintMatrix() {
      var sk = sizeKey();
      matrixShell(trMx, function (_lbl, i) {
        var cls = "ds-tree-row";
        if (i === 1) cls += " is-hov";
        if (i === 2) cls += " is-sel";
        if (i === 3) cls += " is-dis";
        if (i === 4) cls += " is-foc";
        var dis = i === 3 ? ' aria-disabled="true"' : "";
        return (
          '<div class="ds-tree ds-tree--matrix" data-size="' +
          sk +
          '" data-variant="simple" role="presentation">' +
          '<div class="' +
          cls +
          '"' +
          dis +
          ' role="row">' +
          '<span class="ds-tree-toggle ds-tree-toggle--leaf" aria-hidden="true"><span class="ds-tree-toggle-ic"></span></span>' +
          '<span class="ds-tree-label">' +
          trMx[i] +
          "</span></div></div>"
        );
      });
    }

    function renderLive() {
      liveRoot.innerHTML = liveHtml();
      wireTree();
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountTabs() {
    var tbMx = ["Default", "Hover", "Selected", "Disabled", "Focus"];

    function kind() {
      return (pgVariant && pgVariant.value) || "underline";
    }

    function sizeAttr() {
      return (pgSize && pgSize.value) || "lg";
    }

    function uSize(sz) {
      return sz === "md" || sz === "sm" ? "md" : "lg";
    }

    function bSize(sz) {
      if (sz === "xl") return "xl";
      if (sz === "sm") return "sm";
      if (sz === "md") return "md";
      return "lg";
    }

    function panel(id, labelledby, hidden, inner) {
      var h = hidden ? " hidden" : "";
      return (
        '<section id="' +
        id +
        '" class="ds-tabs-panel" role="tabpanel"' +
        h +
        ' aria-labelledby="' +
        labelledby +
        '">' +
        inner +
        "</section>"
      );
    }

    function tabBtn(id, panelId, selected, label, disabled) {
      var dis = disabled ? " disabled" : "";
      var sel = selected ? "true" : "false";
      var tabi = selected ? "0" : "-1";
      return (
        '<button type="button" role="tab" id="' +
        id +
        '" class="ds-tabs-tab" aria-selected="' +
        sel +
        '" aria-controls="' +
        panelId +
        '" tabindex="' +
        tabi +
        '"' +
        dis +
        ">" +
        label +
        "</button>"
      );
    }

    function tabSlot(id, panelId, selected, label, disabled) {
      var sel = selected ? "true" : "false";
      var tabi = selected ? "0" : "-1";
      var ad = disabled ? ' aria-disabled="true"' : "";
      return (
        '<div role="tab" id="' +
        id +
        '" class="ds-tabs-tab" tabindex="' +
        tabi +
        '" aria-selected="' +
        sel +
        '" aria-controls="' +
        panelId +
        '"' +
        ad +
        ">" +
        '<span class="ds-tabs-tab-lbl">' +
        label +
        "</span>" +
        '<button type="button" class="ds-tabs-close" tabindex="-1" aria-label="Close ' +
        label +
        '">\u00d7</button></div>'
      );
    }

    function panelsHtml(t0, t1, t2) {
      return (
        '<div class="ds-tabs-panels">' +
        panel("tbP0", t0, false, "<p>First tab panel.</p>") +
        panel("tbP1", t1, true, "<p>Second tab panel.</p>") +
        panel("tbP2", t2, true, "<p>Third tab panel.</p>") +
        "</div>"
      );
    }

    function liveHtml() {
      var k = kind();
      var sz = sizeAttr();
      var udat = uSize(sz);
      var bdd = bSize(sz);
      var orient = k === "vertical" ? ' data-orientation="vertical"' : "";
      var cls = "ds-tabs ds-tabs--" + k;
      var extra = "";
      if (k === "underline") extra = ' data-size="' + udat + '"';
      else if (k === "border") extra = ' data-border-size="' + bdd + '"';
      else if (k === "vertical") extra = ' data-size="' + udat + '"';

      var t0 = "tbT0";
      var t1 = "tbT1";
      var t2 = "tbT2";
      var listInner =
        k === "scrollable"
          ? tabSlot(t0, "tbP0", true, "Draft", false) +
            tabSlot(t1, "tbP1", false, "Published", false) +
            tabSlot(t2, "tbP2", false, "Archive", true)
          : tabBtn(t0, "tbP0", true, "Overview", false) +
            tabBtn(t1, "tbP1", false, "Details", false) +
            tabBtn(t2, "tbP2", false, "Disabled", true);

      return (
        '<div id="tbRoot" class="' +
        cls +
        '"' +
        orient +
        extra +
        ">" +
        '<div class="ds-tabs-bar">' +
        '<div role="tablist" class="ds-tabs-list" aria-label="Demo tabs">' +
        listInner +
        "</div></div>" +
        panelsHtml(t0, t1, t2) +
        "</div>"
      );
    }

    function wireTabs() {
      var root = document.getElementById("tbRoot");
      if (!root) return;
      var list = root.querySelector('[role="tablist"]');
      if (!list) return;
      var orient = root.getAttribute("data-orientation") === "vertical";

      function tabs() {
        return [].slice.call(list.querySelectorAll('[role="tab"]'));
      }

      function enabled(tbs) {
        return tbs.filter(function (t) {
          return !t.disabled && t.getAttribute("aria-disabled") !== "true";
        });
      }

      function panelFor(tab) {
        var id = tab.getAttribute("aria-controls");
        return id ? document.getElementById(id) : null;
      }

      function activate(selTab) {
        var all = tabs();
        if (enabled(all).indexOf(selTab) === -1) return;
        all.forEach(function (t) {
          var on = t === selTab;
          t.setAttribute("aria-selected", on ? "true" : "false");
          t.setAttribute("tabindex", on ? "0" : "-1");
          var p = panelFor(t);
          if (p) {
            if (on) p.removeAttribute("hidden");
            else p.setAttribute("hidden", "hidden");
          }
        });
      }

      list.addEventListener("keydown", function (e) {
        var key = e.key;
        var cur = document.activeElement;
        var all = tabs();
        if (all.indexOf(cur) === -1) return;
        var en = enabled(all);
        var ix = en.indexOf(cur);
        if (ix === -1) return;
        var next = null;
        if (!orient && (key === "ArrowRight" || key === "ArrowLeft")) {
          var delta = key === "ArrowRight" ? 1 : -1;
          next = en[(ix + delta + en.length) % en.length];
          e.preventDefault();
        } else if (orient && (key === "ArrowDown" || key === "ArrowUp")) {
          var d2 = key === "ArrowDown" ? 1 : -1;
          next = en[(ix + d2 + en.length) % en.length];
          e.preventDefault();
        } else if (key === "Home") {
          next = en[0];
          e.preventDefault();
        } else if (key === "End") {
          next = en[en.length - 1];
          e.preventDefault();
        }
        if (next && next !== cur) {
          next.focus();
          activate(next);
        }
      });

      tabs().forEach(function (t) {
        t.addEventListener("click", function () {
          activate(t);
        });
      });

      root.addEventListener("click", function (e) {
        var c = e.target.closest(".ds-tabs-close");
        if (!c || !root.contains(c)) return;
        e.preventDefault();
        e.stopPropagation();
      });
    }

    function paintMatrix() {
      var k = kind();
      var sz = sizeAttr();
      var udat = uSize(sz);
      var bdd = bSize(sz);
      var orient = k === "vertical" ? ' data-orientation="vertical"' : "";
      var extra = "";
      if (k === "underline") extra = ' data-size="' + udat + '"';
      else if (k === "border") extra = ' data-border-size="' + bdd + '"';

      matrixShell(tbMx, function (_lbl, i) {
        var cls = "ds-tabs-tab";
        if (i === 1) cls += " is-hov";
        if (i === 2) cls += " is-sel";
        if (i === 3) cls += " is-dis";
        if (i === 4) cls += " is-foc";
        var dis = i === 3 ? " disabled" : "";
        var sel = i === 2 ? "true" : "false";
        var tabi = i === 2 ? "0" : "-1";
        return (
          '<div class="ds-tabs ds-tabs--' +
          k +
          " ds-tabs--matrix" +
          '"' +
          orient +
          extra +
          '><div role="tablist" class="ds-tabs-list" aria-label="Tabs matrix">' +
          '<button type="button" role="tab" class="' +
          cls +
          '" aria-selected="' +
          sel +
          '" aria-controls="tbMxP' +
          i +
          '" tabindex="' +
          tabi +
          '"' +
          dis +
          ">Sample</button></div></div>"
        );
      });
    }

    function renderLive() {
      liveRoot.innerHTML = liveHtml();
      wireTabs();
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountPageHeader() {
    var phLabels = ["Default", "Breadcrumb", "Actions", "Controls", "No description"];

    function kind() {
      return (pgVariant && pgVariant.value) || "default";
    }

    function bcHtml() {
      return (
        '<nav class="ds-ph-bc" aria-label="Breadcrumb"><ol class="ds-ph-bc-list" role="list">' +
        '<li class="ds-ph-bc-item"><a class="ds-ph-bc-link" href="#">Home</a></li>' +
        '<li class="ds-ph-bc-sep" aria-hidden="true">/</li>' +
        '<li class="ds-ph-bc-item"><span class="ds-ph-bc-current" aria-current="page">Current page</span></li>' +
        "</ol></nav>"
      );
    }

    function backVdiv() {
      return (
        '<button type="button" class="ds-ph-back" aria-label="Back"><span class="ds-ph-back-ic" aria-hidden="true">\u2190</span></button>' +
        '<div class="ds-ph-vdiv" aria-hidden="true"></div>'
      );
    }

    function mainBlock(withDesc, layoutMode) {
      var tid = layoutMode === "live" ? ' id="phTitle"' : "";
      var desc =
        withDesc ? '<p class="ds-ph-desc">Short description for this view.</p>' : "";
      return (
        '<div class="ds-ph-main">' +
        '<h1 class="ds-ph-title"' +
        tid +
        ">Page title</h1>" +
        desc +
        "</div>"
      );
    }

    function rightBlock(mode) {
      if (mode === "actions") {
        return (
          '<div class="ds-ph-right"><div class="ds-ph-actions">' +
          '<button type="button" class="ds-ph-btn">Secondary</button>' +
          '<button type="button" class="ds-ph-btn ds-ph-btn--pri">Primary</button>' +
          "</div></div>"
        );
      }
      if (mode === "controls") {
        return (
          '<div class="ds-ph-right"><div class="ds-ph-controls" role="radiogroup" aria-label="Preview size" id="phSeg">' +
          '<button type="button" class="ds-ph-seg" role="radio" aria-checked="true">Large</button>' +
          '<button type="button" class="ds-ph-seg" role="radio" aria-checked="false">Medium</button>' +
          '<button type="button" class="ds-ph-seg" role="radio" aria-checked="false">Small</button>' +
          "</div></div>"
        );
      }
      return "";
    }

    function buildStrip(layoutMode, showBc, rightMode, withDesc) {
      var top = showBc ? bcHtml() : "";
      var left = withDesc ? backVdiv() + mainBlock(true, layoutMode) : backVdiv() + mainBlock(false, layoutMode);
      var right = rightBlock(rightMode);
      var idAttr = layoutMode === "live" ? ' id="phRoot"' : "";
      var cls = "ds-ph" + (layoutMode === "matrix" ? " ds-ph--matrix" : "");
      return (
        "<header class=\"" +
        cls +
        "\"" +
        idAttr +
        ">" +
        top +
        '<div class="ds-ph-row"><div class="ds-ph-left">' +
        left +
        "</div>" +
        right +
        "</div></header>"
      );
    }

    function wireSeg() {
      var g = document.getElementById("phSeg");
      if (!g) return;
      g.addEventListener("click", function (e) {
        var t = e.target;
        if (!t || t.getAttribute("role") !== "radio") return;
        var rs = g.querySelectorAll('[role="radio"]');
        for (var i = 0; i < rs.length; i++) {
          rs[i].setAttribute("aria-checked", rs[i] === t ? "true" : "false");
        }
      });
    }

    function paintMatrix() {
      matrixShell(phLabels, function (_lbl, i) {
        var showBc = i === 1;
        var right = i === 2 ? "actions" : i === 3 ? "controls" : "";
        var withDesc = i !== 4;
        return buildStrip("matrix", showBc, right, withDesc);
      });
    }

    function renderLive() {
      var k = kind();
      var showBc = k === "breadcrumb";
      var right = k === "actions" ? "actions" : k === "controls" ? "controls" : "";
      var withDesc = k !== "minimal";
      liveRoot.innerHTML = buildStrip("live", showBc, right, withDesc);
      wireSeg();
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = true;
    pgVariant.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountCard() {
    var cdLabels = ["Default", "Bordered", "Hover", "Clickable", "Small"];

    function variant() {
      return (pgVariant && pgVariant.value) || "default";
    }

    function size() {
      return (pgSize && pgSize.value) === "sm" ? "sm" : "md";
    }

    function innerBlock(titleId) {
      return (
        '<div class="ds-card-stack">' +
        '<h3 class="ds-card-title" id="' +
        titleId +
        '">Card title</h3>' +
        '<p class="ds-card-body">Body text. Compare radius, border, shadow, and padding with Figma.</p>' +
        "</div>" +
        '<div class="ds-card-divider" role="separator" aria-hidden="true"></div>' +
        '<p class="ds-card-body ds-card-body--meta">Footer / secondary line</p>'
      );
    }

    function renderLive() {
      var v = variant();
      var s = size();
      var bordered =
        v === "bordered" || v === "hoverable" || v === "clickable" || v === "disabled";
      var hoverable = v === "hoverable";
      var clickable = v === "clickable";
      var disabled = v === "disabled";
      var tab = clickable ? ' tabindex="0"' : "";
      var reg = clickable ? ' role="region"' : "";
      var hov = hoverable ? ' data-hoverable="true"' : "";
      var clk = clickable ? ' data-clickable="true"' : "";
      var dis = disabled ? ' data-disabled="true"' : "";
      liveRoot.innerHTML =
        '<div class="ds-card-live-wrap">' +
        '<section id="cdRoot" class="ds-card"' +
        reg +
        tab +
        ' aria-labelledby="cdTitle"' +
        ' data-size="' +
        s +
        '" data-bordered="' +
        (bordered ? "true" : "false") +
        '"' +
        hov +
        clk +
        dis +
        ">" +
        innerBlock("cdTitle") +
        "</section></div>";
    }

    function paintMatrix() {
      matrixShell(cdLabels, function (_lbl, i) {
        var bordered = i >= 1 ? "true" : "false";
        var sz = i === 4 ? "sm" : "md";
        var hov = i === 2 ? ' data-hoverable="true"' : "";
        var cls = "";
        if (i === 2) cls = " is-cd-hover";
        if (i === 3) cls += " is-cd-foc";
        var clk = i === 3 ? ' data-clickable="true" tabindex="0" role="region"' : "";
        var tid = "cdMx" + i;
        return (
          '<section class="ds-card ds-card--matrix' +
          cls +
          '" data-size="' +
          sz +
          '" data-bordered="' +
          bordered +
          '"' +
          hov +
          clk +
          ' aria-labelledby="' +
          tid +
          '" data-ds-annotate-target="1">' +
          '<div class="ds-card-stack">' +
          '<h3 class="ds-card-title" id="' +
          tid +
          '">' +
          cdLabels[i] +
          "</h3>" +
          '<p class="ds-card-body">Matrix static row</p></div></section>'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountSteps() {
    var stepLabels = ["Completed", "Current", "Pending", "Error", "Disabled"];

    function parseVariant() {
      var v = (pgVariant && pgVariant.value) || "h-desc";
      return {
        orientation: v === "v" ? "vertical" : "horizontal",
        showDesc: v !== "h",
        errorFlow: v === "h-err",
      };
    }

    function sizeAttr() {
      return (pgSize && pgSize.value) === "md" ? "md" : "lg";
    }

    function iconInner(state, ch) {
      var g = "";
      if (state === "completed") g = "\u2713";
      else if (state === "error") g = "\u2715";
      else if (ch) g = String(ch);
      return (
        '<span class="ds-st-icon ds-st-icon--' +
        state +
        '" aria-hidden="true">' +
        (g ? '<span class="ds-st-icon-glyph">' + g + "</span>" : "") +
        "</span>"
      );
    }

    function liStep(iconState, digit, titleCls, titleText, descText, showDesc, ariaCurrent, connCompleted) {
      var descHtml =
        showDesc && descText ? '<p class="ds-st-desc">' + descText + "</p>" : "";
      var ac = ariaCurrent ? ' aria-current="step"' : "";
      var ccls = connCompleted ? " ds-st-connector--completed" : "";
      return (
        '<li class="ds-st-item"' +
        ac +
        ">" +
        '<div class="ds-st-item-top">' +
        iconInner(iconState, digit) +
        '<div class="ds-st-body">' +
        '<p class="' +
        titleCls +
        '">' +
        titleText +
        "</p>" +
        descHtml +
        "</div></div>" +
        '<div class="ds-st-connector' +
        ccls +
        '" aria-hidden="true"></div></li>'
      );
    }

    function renderNav() {
      var p = parseVariant();
      var sz = sizeAttr();
      var o = p.orientation;
      var d = p.showDesc;
      var err = p.errorFlow;
      var descProcessing = "This is a description for the current step.";
      var descErr = "Fix errors below, then try again.";
      var html = "";
      html +=
        '<nav class="ds-st" id="stNav" aria-label="Order progress" data-size="' +
        sz +
        '" data-orientation="' +
        o +
        '">';
      html += '<ol class="ds-st-list" role="list">';
      if (err) {
        html += liStep("completed", "", "ds-st-title", "Succeeded", "", false, false, true);
        html += liStep(
          "error",
          "",
          "ds-st-title ds-st-title--error",
          "Verification failed",
          descErr,
          d,
          true,
          false
        );
        html += liStep("pending", "3", "ds-st-title ds-st-title--pending", "Pending", "", false, false, false);
      } else {
        html += liStep("completed", "", "ds-st-title", "Succeeded", "", false, false, true);
        html += liStep(
          "current",
          "2",
          "ds-st-title ds-st-title--current",
          "Processing",
          d ? descProcessing : "",
          d,
          true,
          false
        );
        html += liStep("pending", "3", "ds-st-title ds-st-title--pending", "Pending", "", false, false, false);
        html += liStep(
          "disabled",
          "4",
          "ds-st-title ds-st-title--disabled",
          "Disabled",
          "",
          false,
          false,
          false
        );
      }
      html += "</ol></nav>";
      return html;
    }

    function paintMatrix() {
      var sz = sizeAttr();
      var rows = ["completed", "current", "pending", "error", "disabled"];
      matrixShell(stepLabels, function (_lbl, i) {
        var st = rows[i];
        var ch = st === "completed" || st === "error" ? "" : st === "current" ? "2" : "5";
        var ttl =
          st === "completed"
            ? "Completed"
            : st === "current"
              ? "Current"
              : st === "pending"
                ? "Pending"
                : st === "error"
                  ? "Error"
                  : "Disabled";
        var tcls =
          st === "pending"
            ? "ds-st-title ds-st-title--pending"
            : st === "error"
              ? "ds-st-title ds-st-title--error"
              : st === "disabled"
                ? "ds-st-title ds-st-title--disabled"
                : st === "current"
                  ? "ds-st-title ds-st-title--current"
                  : "ds-st-title";
        return (
          '<nav class="ds-st ds-st--matrix" data-size="' +
          sz +
          '" data-orientation="horizontal" aria-hidden="true">' +
          '<ol class="ds-st-list" role="presentation"><li class="ds-st-item"><div class="ds-st-item-top">' +
          iconInner(st, ch) +
          '<div class="ds-st-body"><p class="' +
          tcls +
          '">' +
          ttl +
          "</p></div></div></li></ol></nav>"
        );
      });
    }

    window.__dsRefresh = function () {
      liveRoot.innerHTML = renderNav();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = false;
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    window.__dsRefresh();
  }

  function mountPincode() {
    var pgPinState = document.getElementById("pgPinState");

    function len() {
      var v = (pgVariant && pgVariant.value) || "6";
      var n = parseInt(v, 10);
      if (n === 4 || n === 6 || n === 8) return n;
      return 6;
    }

    function state() {
      return (pgPinState && pgPinState.value) || "default";
    }

    function renderLive() {
      var n = len();
      var st = state();
      var dis = st === "disabled";
      var err = st === "error";
      var errHtml = err
        ? '<p id="pcErr" class="ds-pc-err" role="alert">\u9a8c\u8bc1\u7801\u9519\u8bef\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165</p>'
        : '<p id="pcHelp" class="ds-pc-help">Resend available in 44s</p>';
      var aDesc = err ? ' aria-describedby="pcErr"' : ' aria-describedby="pcHelp"';
      var inputs = "";
      for (var i = 0; i < n; i++) {
        inputs +=
          '<input id="pcSeg' +
          i +
          '" class="ds-pc-cell" type="text" maxlength="1" inputmode="numeric" pattern="[0-9]*" autocomplete="one-time-code" aria-label="Digit ' +
          (i + 1) +
          " of " +
          n +
          '"' +
          (dis ? " disabled" : "") +
          " />";
      }
      liveRoot.innerHTML =
        '<span id="pcLbl" class="ds-sr-only">Verification code</span>' +
        '<div id="pcGroup" class="ds-pc' +
        (err ? " ds-pc--error" : "") +
        '" role="group" aria-labelledby="pcLbl"' +
        (err ? ' aria-invalid="true"' : "") +
        aDesc +
        ">" +
        '<div class="ds-pc-row">' +
        inputs +
        "</div>" +
        errHtml +
        "</div>";

      var group = document.getElementById("pcGroup");
      var ss = [];
      for (var j = 0; j < n; j++) {
        var el = document.getElementById("pcSeg" + j);
        if (el) ss.push(el);
      }

      function applyFromString(str, startIdx) {
        var digits = String(str || "").replace(/\D/g, "");
        for (var a = 0; a < ss.length; a++) {
          ss[a].value = "";
        }
        var si = Math.max(0, Math.min(startIdx || 0, ss.length - 1));
        for (var b = 0; b < digits.length && si + b < ss.length; b++) {
          ss[si + b].value = digits.charAt(b);
        }
      }

      if (group) {
        group.addEventListener(
          "paste",
          function (e) {
            if (dis) return;
            var t = (e.clipboardData && e.clipboardData.getData("text")) || "";
            e.preventDefault();
            var tg = e.target;
            var idx = 0;
            if (tg && tg.id && String(tg.id).indexOf("pcSeg") === 0) {
              idx = parseInt(String(tg.id).replace("pcSeg", ""), 10) || 0;
            }
            applyFromString(t, idx);
            var dlen = t.replace(/\D/g, "").length;
            var ni = Math.min(idx + Math.max(0, dlen - 1), ss.length - 1);
            if (ss[ni]) ss[ni].focus();
          },
          true
        );
      }

      for (var idx = 0; idx < ss.length; idx++) {
        (function (seg, i) {
          if (!seg) return;
          seg.addEventListener("keydown", function (e) {
            if (dis) return;
            if (e.key === "ArrowRight" && i < ss.length - 1) {
              e.preventDefault();
              ss[i + 1].focus();
            } else if (e.key === "ArrowLeft" && i > 0) {
              e.preventDefault();
              ss[i - 1].focus();
            } else if (e.key === "Backspace") {
              if (seg.value) {
                seg.value = "";
              } else if (i > 0) {
                e.preventDefault();
                ss[i - 1].focus();
                ss[i - 1].value = "";
              }
            }
          });
          seg.addEventListener("input", function () {
            if (dis) return;
            var v2 = seg.value.replace(/\D/g, "");
            if (v2.length > 1) v2 = v2.charAt(v2.length - 1);
            seg.value = v2;
            if (v2 && i < ss.length - 1) ss[i + 1].focus();
          });
        })(ss[idx], idx);
      }
    }

    function paintMatrix() {
      matrixShell(L5, function (_l, i) {
        var cls = ["", "is-act", "is-filled", "is-err", "is-dis"][i];
        var dis = i === 4 ? " disabled" : "";
        var val = i === 2 || i === 3 ? ' value="3"' : "";
        var c = "ds-pc-cell" + (cls ? " " + cls : "");
        return (
          '<div class="ds-pc ds-pc--matrix"><div class="ds-pc-row">' +
          '<input class="' +
          c +
          '" type="text" maxlength="1" inputmode="numeric"' +
          val +
          dis +
          ' readonly tabindex="-1" aria-hidden="true" /></div></div>'
        );
      });
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = true;
    if (pgPinState) pgPinState.disabled = false;

    pgVariant.addEventListener("change", window.__dsRefresh);
    if (pgPinState) pgPinState.addEventListener("change", window.__dsRefresh);

    window.__dsRefresh();
  }

  function mountMessage() {
    var msgClosable = document.getElementById("msgClosable");

    function tone() {
      return (pgVariant && pgVariant.value) || "info";
    }
    function closable() {
      return !!(msgClosable && msgClosable.checked);
    }

    function roleFor(t) {
      return t === "error" ? "alert" : "status";
    }

    function iconChar(t) {
      if (t === "success") return "\u2713";
      if (t === "warning") return "!";
      if (t === "error") return "\u2715";
      return "i";
    }

    function renderMsg(t, withClose) {
      var closeHtml = withClose
        ? '<button type="button" class="ds-msg-close" aria-label="Close message"><span aria-hidden="true">\u00d7</span></button>'
        : "";
      return (
        '<div class="ds-msg" data-tone="' +
        t +
        '" role="' +
        roleFor(t) +
        '">' +
        '<span class="ds-msg-ic" aria-hidden="true">' +
        iconChar(t) +
        "</span>" +
        '<span class="ds-msg-txt">This is a short message for demo.</span>' +
        closeHtml +
        "</div>"
      );
    }

    function wireClose(root) {
      var closeBtn = root.querySelector(".ds-msg-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          var host = closeBtn.closest(".ds-msg");
          if (host) host.remove();
        });
      }
    }

    function paintMatrix() {
      var labels = [
        "Info · role=status",
        "Success · status",
        "Warning · status",
        "Error · role=alert",
        "Info · closable",
      ];
      var tones = ["info", "success", "warning", "error", "info"];
      var cls = [false, false, false, false, true];
      matrixShell(labels, function (_l, i) {
        return renderMsg(tones[i], cls[i]);
      });
    }

    window.__dsRefresh = function () {
      liveRoot.innerHTML = renderMsg(tone(), closable());
      wireClose(liveRoot);
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = true;
    if (msgClosable) msgClosable.disabled = false;

    pgVariant.addEventListener("change", window.__dsRefresh);
    if (msgClosable) msgClosable.addEventListener("change", window.__dsRefresh);

    window.__dsRefresh();
  }

  function mountNotification() {
    var ntfClosable = document.getElementById("ntfClosable");
    var ntfActions = document.getElementById("ntfActions");

    function tone() {
      return (pgVariant && pgVariant.value) || "info";
    }

    function closable() {
      return !!(ntfClosable && ntfClosable.checked);
    }

    function withActions() {
      return !!(ntfActions && ntfActions.checked);
    }

    function roleFor(t) {
      return t === "error" ? "alert" : "status";
    }

    function iconChar(t) {
      if (t === "success") return "\u2713";
      if (t === "warning") return "!";
      if (t === "error") return "\u2715";
      if (t === "default") return "";
      return "i";
    }

    function renderNtf(t, opts) {
      opts = opts || {};
      var clos = opts.closable != null ? opts.closable : closable();
      var act = opts.actions != null ? opts.actions : withActions();
      var ic = iconChar(t);
      var iconHtml =
        t === "default" || !ic
          ? ""
          : '<span class="ds-ntf-ic" aria-hidden="true">' + ic + "</span>";
      var closeHtml = clos
        ? '<button type="button" class="ds-ntf-close" aria-label="Close notification"><span aria-hidden="true">\u00d7</span></button>'
        : "";
      var actionsHtml = act
        ? '<div class="ds-ntf-actions">' +
          '<button type="button" class="ds-ntf-btn">Cancel</button>' +
          '<button type="button" class="ds-ntf-btn ds-ntf-btn--pri">OK</button>' +
          "</div>"
        : "";
      var hasClose = clos ? " ds-ntf--has-close" : "";
      return (
        '<div id="ntfRoot" class="ds-ntf' +
        hasClose +
        '" data-tone="' +
        t +
        '" role="' +
        roleFor(t) +
        '">' +
        closeHtml +
        '<div class="ds-ntf-head">' +
        iconHtml +
        '<div class="ds-ntf-head-text">' +
        '<p class="ds-ntf-title">Notification title</p>' +
        "</div></div>" +
        '<p class="ds-ntf-desc">Short description for the notification card (demo).</p>' +
        actionsHtml +
        "</div>"
      );
    }

    function wireClose(root) {
      var closeBtn = root.querySelector(".ds-ntf-close");
      if (closeBtn) {
        closeBtn.addEventListener("click", function () {
          var host = closeBtn.closest(".ds-ntf");
          if (host) host.remove();
        });
      }
    }

    function paintMatrix() {
      var labels = [
        "Info · status",
        "Success · status",
        "Warning · status",
        "Error · alert · closable",
        "Default · actions",
      ];
      var tones = ["info", "success", "warning", "error", "default"];
      var clos = [false, false, false, true, true];
      var act = [false, false, false, false, true];
      matrixShell(labels, function (_l, i) {
        var hov = i === 1 ? " is-hov" : "";
        var hCls = clos[i] ? " ds-ntf--has-close" : "";
        return (
          '<div class="ds-ntf ds-ntf--matrix' +
          hov +
          hCls +
          '" data-tone="' +
          tones[i] +
          '" role="' +
          roleFor(tones[i]) +
          '">' +
          (clos[i]
            ? '<button type="button" class="ds-ntf-close" tabindex="-1" aria-hidden="true"><span aria-hidden="true">\u00d7</span></button>'
            : "") +
          '<div class="ds-ntf-head">' +
          (tones[i] === "default"
            ? ""
            : '<span class="ds-ntf-ic" aria-hidden="true">' + iconChar(tones[i]) + "</span>") +
          '<div class="ds-ntf-head-text"><p class="ds-ntf-title">' +
          labels[i].split(" \u00b7 ")[0] +
          "</p></div></div>" +
          '<p class="ds-ntf-desc">Matrix static row.</p>' +
          (act[i]
            ? '<div class="ds-ntf-actions"><button type="button" class="ds-ntf-btn" tabindex="-1">Cancel</button><button type="button" class="ds-ntf-btn ds-ntf-btn--pri" tabindex="-1">OK</button></div>'
            : "") +
          "</div>"
        );
      });
    }

    function renderLive() {
      liveRoot.innerHTML = renderNtf(tone(), {});
      wireClose(liveRoot);
    }

    window.__dsRefresh = function () {
      renderLive();
      paintMatrix();
    };

    pgVariant.disabled = false;
    pgSize.disabled = true;
    if (ntfClosable) ntfClosable.disabled = false;
    if (ntfActions) ntfActions.disabled = false;

    pgVariant.addEventListener("change", window.__dsRefresh);
    if (ntfClosable) ntfClosable.addEventListener("change", window.__dsRefresh);
    if (ntfActions) ntfActions.addEventListener("change", window.__dsRefresh);

    window.__dsRefresh();
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

  function mountProgress() {
    var pgProgState = document.getElementById("pgProgState");

    function kind() {
      var v = pgVariant && pgVariant.value;
      if (v === "circle" || v === "mini" || v === "step") return v;
      return "line";
    }

    function lineKind() {
      var s = pgSize && pgSize.value;
      return s === "lg" ? "lg" : "sm";
    }

    function circleDataSize() {
      var s = pgSize && pgSize.value;
      if (s === "sm") return "sm";
      if (s === "lg") return "lg";
      return "md";
    }

    function state() {
      return (pgProgState && pgProgState.value) || "running";
    }

    function pct() {
      var st = state();
      if (st === "zero") return 0;
      if (st === "busy") return null;
      if (st === "success" || st === "error") return 100;
      return 66;
    }

    function lineFillMod() {
      var st = state();
      if (st === "error") return "error";
      if (st === "success") return "success";
      return "active";
    }

    function renderLine() {
      var lk = lineKind();
      var p = pct();
      var st = state();
      var mod = lineFillMod();
      var busy = st === "busy" ? " ds-pr-line--busy" : "";
      var aria =
        st === "busy"
          ? ' role="progressbar" aria-label="Task loading" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Loading"'
          : ' role="progressbar" aria-label="Task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
            String(p == null ? 0 : p) +
            '"';
      return (
        '<div class="ds-pr-line-wrap">' +
        '<div class="ds-pr-line ds-pr-line--' +
        lk +
        busy +
        '"' +
        aria +
        ">" +
        '<div class="ds-pr-line-track"></div>' +
        '<div class="ds-pr-line-fill ds-pr-line-fill--' +
        mod +
        '" style="width:' +
        (p == null ? "36%" : String(p) + "%") +
        '"></div></div>' +
        (st !== "busy"
          ? '<span class="ds-pr-line-lbl">' + (st === "zero" ? "0%" : String(p) + "%") + "</span>"
          : '<span class="ds-pr-line-lbl" aria-hidden="true">\u2026</span>') +
        "</div>"
      );
    }

    function renderCircle() {
      var sz = circleDataSize();
      var p = pct();
      var st = state();
      var mod = lineFillMod();
      var busy = st === "busy";
      var r = 42;
      var c = 2 * Math.PI * r;
      var f = busy ? c * 0.3 : p == null ? c * 0.36 : (p / 100) * c;
      var g = Math.max(0.001, c - f);
      var dash = f + " " + g;
      var aria =
        busy
          ? ' role="progressbar" aria-label="Task loading" aria-valuemin="0" aria-valuemax="100" aria-valuetext="Loading"'
          : ' role="progressbar" aria-label="Task progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' +
            String(p == null ? 0 : p) +
            '"';
      var txt = busy ? "\u2026" : p == null ? "" : String(p) + "%";
      return (
        '<div class="ds-pr-circ-wrap"' +
        aria +
        ">" +
        '<div class="ds-pr-circ' +
        (busy ? " ds-pr-circ--busy" : "") +
        '" data-size="' +
        sz +
        '">' +
        '<svg viewBox="0 0 100 100" aria-hidden="true">' +
        '<circle class="ds-pr-circ-tr" cx="50" cy="50" r="' +
        r +
        '" />' +
        '<circle class="ds-pr-circ-fi ds-pr-circ-fi--' +
        mod +
        '" cx="50" cy="50" r="' +
        r +
        '" stroke-dasharray="' +
        dash +
        '" />' +
        "</svg></div>" +
        '<span class="ds-pr-circ-txt">' +
        txt +
        "</span></div>"
      );
    }

    function renderMini() {
      var st = state();
      var ic =
        st === "error" ? "\u2715" : st === "success" ? "\u2713" : st === "busy" ? "\u2026" : "\u00B7";
      var icl =
        st === "error"
          ? "ds-pr-mini-ic ds-pr-mini-ic--err"
          : st === "success"
            ? "ds-pr-mini-ic"
            : st === "busy"
              ? "ds-pr-mini-ic ds-pr-mini-ic--muted"
              : "ds-pr-mini-ic ds-pr-mini-ic--muted";
      var lab =
        st === "success" ? "Success" : st === "error" ? "Failed" : st === "busy" ? "Loading" : "In progress";
      return (
        '<div class="ds-pr-mini" role="img" aria-label="' +
        lab +
        '"><span class="' +
        icl +
        '" aria-hidden="true">' +
        ic +
        "</span></div>"
      );
    }

    function renderStep() {
      return (
        '<div class="ds-pr-step-row" role="group" aria-label="Steps">' +
        '<div class="ds-pr-step ds-pr-step--done">1</div>' +
        '<div class="ds-pr-step ds-pr-step--active">2</div>' +
        '<div class="ds-pr-step ds-pr-step--todo">3</div>' +
        "</div>"
      );
    }

    function paintMatrix() {
      matrixShell(L5, function (_lbl, i) {
        var pcts = [20, 40, 66, 100, 0];
        var mods = ["active", "active", "success", "success", "active"];
        var pc = pcts[i];
        var md = mods[i];
        return (
          '<div class="ds-pr-line-wrap"><div class="ds-pr-line ds-pr-line--sm" role="presentation"><div class="ds-pr-line-track"></div><div class="ds-pr-line-fill ds-pr-line-fill--' +
          md +
          '" style="width:' +
          pc +
          '%"></div></div><span class="ds-pr-line-lbl">' +
          (pc === 0 ? "0%" : pc + "%") +
          "</span></div>"
        );
      });
    }

    window.__dsRefresh = function () {
      var k = kind();
      if (pgSize) pgSize.disabled = k === "mini" || k === "step";
      var html = "";
      if (k === "circle") html = renderCircle();
      else if (k === "mini") html = renderMini();
      else if (k === "step") html = renderStep();
      else html = renderLine();
      liveRoot.innerHTML = html;
      paintMatrix();
    };

    pgVariant.disabled = false;
    if (pgProgState) pgProgState.disabled = false;
    window.__dsRefresh();
    pgVariant.addEventListener("change", window.__dsRefresh);
    pgSize.addEventListener("change", window.__dsRefresh);
    if (pgProgState) pgProgState.addEventListener("change", window.__dsRefresh);
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
      cascader: mountCascader,
      badge: mountBadge,
      tag: mountTag,
      progress: mountProgress,
      dropdown: mountDropdown,
      message: mountMessage,
      notification: mountNotification,
      pincode: mountPincode,
      card: mountCard,
      pageheader: mountPageHeader,
      steps: mountSteps,
      upload: mountUpload,
      tabs: mountTabs,
      tree: mountTree,
    };
    (mountMap[SLUG] || mountGeneric)();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
