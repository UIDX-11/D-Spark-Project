/**
 * TDesign Starter dashboard/base — static parity (ECharts + token layout).
 * Options aligned with apps/dspark-vue-admin/src/views/dashboard/echarts-helpers.ts
 */
(function () {
  "use strict";

  if (!document.querySelector(".pt-starter-dashboard")) {
    return;
  }

  function chartColors() {
    return ["#3F78E4", "#09AA5C", "#FFAD14", "#F14846", "#506DAF"];
  }

  function fmtMd(d) {
    return (d.getMonth() + 1).toString() + "-" + d.getDate();
  }

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function defaultTheme() {
    return {
      placeholderColor: "#86909c",
      borderColor: "#e5e6eb",
      textColor: "#1d2129",
      containerColor: "#fff",
    };
  }

  function constructInitDashboardDataset(type, colors) {
    var dateArray = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
    var axis = {
      xAxis: { type: "category", show: false, data: dateArray },
      yAxis: { show: false, type: "value" },
      grid: { top: 0, left: 0, right: 0, bottom: 0 },
    };
    if (type === "line") {
      return Object.assign({}, axis, {
        color: ["#fff"],
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: "line",
            showSymbol: true,
            symbol: "circle",
            symbolSize: 0,
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" },
              ],
            },
            lineStyle: { width: 2 },
          },
        ],
      });
    }
    var pal = colors || chartColors();
    return Object.assign({}, axis, {
      color: pal,
      series: [
        {
          data: [
            100,
            130,
            184,
            218,
            { value: 135, itemStyle: { opacity: 0.2 } },
            { value: 118, itemStyle: { opacity: 0.2 } },
            { value: 60, itemStyle: { opacity: 0.2 } },
          ],
          type: "bar",
          barWidth: 9,
        },
      ],
    });
  }

  function buildTimeBuckets(dateTime, divideNum) {
    var timeArray = [];
    var inArray = [];
    var outArray = [];
    var i;
    for (i = 0; i < divideNum; i++) {
      if (dateTime && dateTime.length >= 2 && dateTime[0] && dateTime[1]) {
        var start = new Date(dateTime[0]);
        var end = new Date(dateTime[1]);
        var step = (end.getTime() - start.getTime()) / divideNum;
        var t = new Date(start.getTime() + step * i);
        timeArray.push(fmtMd(t));
      } else {
        var d = new Date();
        d.setDate(d.getDate() - (divideNum - i));
        timeArray.push(fmtMd(d));
      }
      inArray.push(String(randInt(40, 120)));
      outArray.push(String(randInt(40, 120)));
    }
    return { timeArray: timeArray, inArray: inArray, outArray: outArray };
  }

  function constructInitDataset(dateTime, theme) {
    var divideNum = 10;
    var b = buildTimeBuckets(dateTime, divideNum);
    return {
      color: chartColors(),
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: b.timeArray,
        axisLabel: { color: theme.placeholderColor },
        axisLine: { lineStyle: { color: theme.borderColor, width: 1 } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: theme.placeholderColor },
        splitLine: { lineStyle: { color: theme.borderColor } },
      },
      grid: { top: "5%", left: "25px", right: 0, bottom: "60px" },
      legend: {
        icon: "rect",
        itemWidth: 12,
        itemHeight: 4,
        itemGap: 48,
        textStyle: { fontSize: 12, color: theme.placeholderColor },
        left: "center",
        bottom: "0",
        orient: "horizontal",
        data: ["本月", "上月"],
      },
      series: [
        { name: "本月", data: b.outArray, type: "bar" },
        { name: "上月", data: b.inArray, type: "bar" },
      ],
    };
  }

  function buildLineBuckets(dateTime, divideNum) {
    var timeArray = [];
    var inArray = [];
    var outArray = [];
    var i;
    for (i = 0; i < divideNum; i++) {
      if (dateTime && dateTime.length >= 2 && dateTime[0] && dateTime[1]) {
        var start = new Date(dateTime[0]);
        var end = new Date(dateTime[1]);
        var step = (end.getTime() - start.getTime()) / divideNum;
        var t = new Date(start.getTime() + step * i);
        timeArray.push(fmtMd(t));
      } else {
        var d = new Date();
        d.setDate(d.getDate() - (divideNum - i));
        timeArray.push(fmtMd(d));
      }
      inArray.push(String(randInt(50, 200)));
      outArray.push(String(randInt(50, 200)));
    }
    return { timeArray: timeArray, inArray: inArray, outArray: outArray };
  }

  function getLineChartDataSet(dateTime, theme) {
    var divideNum = 10;
    var b = buildLineBuckets(dateTime, divideNum);
    return {
      color: chartColors(),
      tooltip: { trigger: "axis" },
      grid: { left: "0", right: "20px", top: "5px", bottom: "36px", containLabel: true },
      legend: {
        left: "center",
        bottom: "0",
        orient: "horizontal",
        data: ["本月", "上月"],
        textStyle: { fontSize: 12, color: theme.placeholderColor },
      },
      xAxis: {
        type: "category",
        data: b.timeArray,
        boundaryGap: false,
        axisLabel: { color: theme.placeholderColor },
        axisLine: { lineStyle: { width: 1, color: theme.borderColor } },
      },
      yAxis: {
        type: "value",
        axisLabel: { color: theme.placeholderColor },
        splitLine: { lineStyle: { color: theme.borderColor } },
      },
      series: [
        {
          name: "本月",
          data: b.outArray,
          type: "line",
          smooth: false,
          showSymbol: true,
          symbol: "circle",
          symbolSize: 8,
          itemStyle: { borderColor: theme.borderColor, borderWidth: 1 },
          areaStyle: { opacity: 0.1 },
        },
        {
          name: "上月",
          data: b.inArray,
          type: "line",
          smooth: false,
          showSymbol: true,
          symbol: "circle",
          symbolSize: 8,
          itemStyle: { borderColor: theme.borderColor, borderWidth: 1 },
        },
      ],
    };
  }

  function getPieChartDataSet(theme, radius) {
    radius = radius || 42;
    return {
      color: chartColors(),
      tooltip: { show: false, trigger: "axis" },
      grid: { top: "0", right: "0" },
      legend: {
        selectedMode: false,
        itemWidth: 12,
        itemHeight: 4,
        textStyle: { fontSize: 12, color: theme.placeholderColor },
        left: "center",
        bottom: "0",
        orient: "horizontal",
      },
      series: [
        {
          name: "销售渠道",
          type: "pie",
          radius: ["48%", "60%"],
          avoidLabelOverlap: true,
          selectedMode: true,
          hoverAnimation: true,
          silent: true,
          itemStyle: { borderColor: theme.containerColor, borderWidth: 1 },
          label: {
            show: true,
            position: "center",
            formatter: ["{value|{d}%}", "{name|{b}渠道占比}"].join("\n"),
            rich: {
              value: { color: theme.textColor, fontSize: 28, fontWeight: "normal", lineHeight: 46 },
              name: { color: "#909399", fontSize: 12, lineHeight: 14 },
            },
          },
          emphasis: {
            label: {
              show: true,
              formatter: ["{value|{d}%}", "{name|{b}渠道占比}"].join("\n"),
              rich: {
                value: { color: theme.textColor, fontSize: 28, fontWeight: "normal", lineHeight: 46 },
                name: { color: "#909399", fontSize: 14, lineHeight: 14 },
              },
            },
          },
          labelLine: { show: false },
          data: [
            { value: 1048, name: "线上" },
            { value: radius * 7, name: "门店" },
          ],
        },
      ],
    };
  }

  function formatMonthLabel(val) {
    if (!val || val.length < 2) {
      var d = new Date();
      return d.getFullYear() + "-" + (d.getMonth() + 1);
    }
    var a = new Date(val[0]);
    var b = new Date(val[1]);
    var m1 = String(a.getMonth() + 1).padStart(2, "0");
    var m2 = String(b.getMonth() + 1).padStart(2, "0");
    return a.getFullYear() + "-" + m1 + " 至 " + b.getFullYear() + "-" + m2;
  }

  function defaultLast7Days() {
    var end = new Date();
    var start = new Date();
    start.setDate(start.getDate() - 7);
    return [start, end];
  }

  function toYMD(d) {
    return d.toISOString().slice(0, 10);
  }

  var moneyChart;
  var refundChart;
  var pieChart;
  var lineChart;
  var stokeChart;
  var resizeTime = 1;
  var theme = defaultTheme();

  function updateTopResize() {
    var w = document.documentElement.clientWidth;
    if (w >= 1400 && w < 1920) {
      resizeTime = Number((w / 2080).toFixed(2));
    } else if (w < 1080) {
      resizeTime = Number((w / 1080).toFixed(2));
    } else {
      resizeTime = 1;
    }
    if (moneyChart) {
      moneyChart.resize({
        width: resizeTime * 120,
        height: resizeTime * 66,
      });
    }
    if (refundChart) {
      refundChart.resize({
        width: resizeTime * 120,
        height: resizeTime * 42,
      });
    }
  }

  function updateMidResize() {
    var w = document.documentElement.clientWidth;
    var rt = 1;
    if (w >= 1400 && w < 1920) {
      rt = Number((w / 2080).toFixed(2));
    } else if (w < 1080) {
      rt = Number((w / 1080).toFixed(2));
    }
    var countEl = document.getElementById("countContainer");
    var monitorEl = document.getElementById("monitorContainer");
    if (pieChart && countEl) {
      pieChart.resize({ width: rt * 326, height: rt * 326 });
    }
    if (lineChart && monitorEl) {
      lineChart.resize({ width: monitorEl.clientWidth, height: rt * 326 });
    }
  }

  function updateStokeResize() {
    var el = document.getElementById("stokeContainer");
    if (stokeChart && el) {
      stokeChart.resize({ width: el.clientWidth, height: el.clientHeight });
    }
  }

  function initTopCharts() {
    var moneyEl = document.getElementById("moneyContainer");
    var refundEl = document.getElementById("refundContainer");
    if (typeof window.echarts === "undefined") {
      return;
    }
    if (moneyEl) {
      if (moneyChart) {
        moneyChart.dispose();
      }
      moneyChart = window.echarts.init(moneyEl);
      moneyChart.setOption(constructInitDashboardDataset("line"));
    }
    if (refundEl) {
      if (refundChart) {
        refundChart.dispose();
      }
      refundChart = window.echarts.init(refundEl);
      refundChart.setOption(constructInitDashboardDataset("bar", chartColors()));
    }
    updateTopResize();
  }

  function readLineRange() {
    var a = document.getElementById("ptStarterLineStart");
    var b = document.getElementById("ptStarterLineEnd");
    if (a && b && a.value && b.value) {
      return [a.value, b.value];
    }
    return defaultLast7Days().map(toYMD);
  }

  function initMidCharts() {
    if (typeof window.echarts === "undefined") {
      return;
    }
    var countEl = document.getElementById("countContainer");
    var monitorEl = document.getElementById("monitorContainer");
    if (countEl) {
      if (pieChart) {
        pieChart.dispose();
      }
      pieChart = window.echarts.init(countEl);
      pieChart.setOption(getPieChartDataSet(theme));
    }
    if (monitorEl) {
      if (lineChart) {
        lineChart.dispose();
      }
      lineChart = window.echarts.init(monitorEl);
      lineChart.setOption(getLineChartDataSet(readLineRange(), theme));
    }
    var lbl = document.getElementById("ptStarterLineMonthLabel");
    if (lbl) {
      lbl.textContent = formatMonthLabel(readLineRange());
    }
    updateMidResize();
  }

  function readStokeRange() {
    var a = document.getElementById("ptStokeStart");
    var b = document.getElementById("ptStokeEnd");
    if (a && b && a.value && b.value) {
      return [a.value, b.value];
    }
    return defaultLast7Days().map(toYMD);
  }

  function initStokeChart() {
    if (typeof window.echarts === "undefined") {
      return;
    }
    var el = document.getElementById("stokeContainer");
    if (!el) {
      return;
    }
    if (stokeChart) {
      stokeChart.dispose();
    }
    stokeChart = window.echarts.init(el);
    stokeChart.setOption(constructInitDataset(readStokeRange(), theme));
    updateStokeResize();
  }

  function bindDates() {
    var ls = document.getElementById("ptStarterLineStart");
    var le = document.getElementById("ptStarterLineEnd");
    function onLineChange() {
      if (!lineChart) {
        return;
      }
      lineChart.setOption(getLineChartDataSet(readLineRange(), theme));
      var lbl = document.getElementById("ptStarterLineMonthLabel");
      if (lbl) {
        lbl.textContent = formatMonthLabel(readLineRange());
      }
      updateMidResize();
    }
    if (ls) {
      ls.addEventListener("change", onLineChange);
    }
    if (le) {
      le.addEventListener("change", onLineChange);
    }
    var ss = document.getElementById("ptStokeStart");
    var se = document.getElementById("ptStokeEnd");
    function onStokeChange() {
      if (!stokeChart) {
        return;
      }
      stokeChart.setOption(constructInitDataset(readStokeRange(), theme));
    }
    if (ss) {
      ss.addEventListener("change", onStokeChange);
    }
    if (se) {
      se.addEventListener("change", onStokeChange);
    }
  }

  function bindBackTop() {
    var btn = document.getElementById("ptStarterBackTop");
    if (!btn) {
      return;
    }
    btn.addEventListener("click", function () {
      var body = document.querySelector(".pt-body");
      if (body) {
        body.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  }

  function bindRankSeg() {
    document.querySelectorAll(".pt-starter-seg").forEach(function (seg) {
      seg.querySelectorAll('input[type="radio"]').forEach(function (r) {
        r.addEventListener("change", function () {});
      });
    });
  }

  var resizeTid;
  function onResize() {
    window.clearTimeout(resizeTid);
    resizeTid = window.setTimeout(function () {
      updateTopResize();
      updateMidResize();
      updateStokeResize();
    }, 120);
  }

  var bootTries = 0;
  function boot() {
    bootTries += 1;
    if (typeof window.echarts === "undefined") {
      if (bootTries < 120) {
        window.setTimeout(boot, 50);
      }
      return;
    }
    var range = defaultLast7Days();
    var y0 = toYMD(range[0]);
    var y1 = toYMD(range[1]);
    var ls = document.getElementById("ptStarterLineStart");
    var le = document.getElementById("ptStarterLineEnd");
    if (ls) {
      ls.value = y0;
    }
    if (le) {
      le.value = y1;
    }
    var ss = document.getElementById("ptStokeStart");
    var se = document.getElementById("ptStokeEnd");
    if (ss) {
      ss.value = y0;
    }
    if (se) {
      se.value = y1;
    }
    initTopCharts();
    initMidCharts();
    initStokeChart();
    bindDates();
    bindBackTop();
    bindRankSeg();
    window.addEventListener("resize", onResize);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
