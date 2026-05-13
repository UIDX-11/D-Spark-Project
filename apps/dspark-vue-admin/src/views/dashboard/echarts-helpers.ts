import type { EChartsOption } from "echarts";

const CHART_COLORS = ["#3F78E4", "#09AA5C", "#FFAD14", "#F14846", "#506DAF"];

export function getChartListColor(): string[] {
  return CHART_COLORS;
}

function fmtMd(d: Date): string {
  const m = d.getMonth() + 1;
  const day = d.getDate();
  return `${m}-${day}`;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/** Top mini line / bar in KPI cards (TDesign `constructInitDashboardDataset`). */
export function constructInitDashboardDataset(
  type: "line" | "bar",
  chartColors?: string[],
): EChartsOption {
  const dateArray = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
  const datasetAxis = {
    xAxis: { type: "category" as const, show: false, data: dateArray },
    yAxis: { show: false, type: "value" as const },
    grid: { top: 0, left: 0, right: 0, bottom: 0 },
  };

  if (type === "line") {
    return {
      ...datasetAxis,
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
    };
  }

  const colors = chartColors ?? getChartListColor();
  return {
    ...datasetAxis,
    color: colors,
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
  };
}

export interface ChartTheme {
  placeholderColor: string;
  borderColor: string;
  textColor: string;
  containerColor: string;
}

export function defaultChartTheme(): ChartTheme {
  return {
    placeholderColor: "#86909c",
    borderColor: "#e5e6eb",
    textColor: "#1d2129",
    containerColor: "#fff",
  };
}

/** Middle / bottom bar: dual series (TDesign `constructInitDataset`). */
export function constructInitDataset(
  dateTime: Date[] | string[],
  theme: ChartTheme,
): EChartsOption {
  const divideNum = 10;
  const timeArray: string[] = [];
  const inArray: string[] = [];
  const outArray: string[] = [];

  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length >= 2) {
      const start = new Date(dateTime[0]);
      const end = new Date(dateTime[1]);
      const step = (end.getTime() - start.getTime()) / divideNum;
      const t = new Date(start.getTime() + step * i);
      timeArray.push(fmtMd(t));
    } else {
      const t = new Date();
      t.setDate(t.getDate() - (divideNum - i));
      timeArray.push(fmtMd(t));
    }
    inArray.push(String(randInt(40, 120)));
    outArray.push(String(randInt(40, 120)));
  }

  return {
    color: getChartListColor(),
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: timeArray,
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
      { name: "本月", data: outArray, type: "bar" },
      { name: "上月", data: inArray, type: "bar" },
    ],
  };
}

/** Middle right: dual line (TDesign `getLineChartDataSet`). */
export function getLineChartDataSet(dateTime: Date[] | string[], theme: ChartTheme): EChartsOption {
  const divideNum = 10;
  const timeArray: string[] = [];
  const inArray: string[] = [];
  const outArray: string[] = [];

  for (let i = 0; i < divideNum; i++) {
    if (dateTime.length >= 2) {
      const start = new Date(dateTime[0]);
      const end = new Date(dateTime[1]);
      const step = (end.getTime() - start.getTime()) / divideNum;
      const t = new Date(start.getTime() + step * i);
      timeArray.push(fmtMd(t));
    } else {
      const t = new Date();
      t.setDate(t.getDate() - (divideNum - i));
      timeArray.push(fmtMd(t));
    }
    inArray.push(String(randInt(50, 200)));
    outArray.push(String(randInt(50, 200)));
  }

  return {
    color: getChartListColor(),
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
      data: timeArray,
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
        data: outArray,
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
        data: inArray,
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

/** Middle left: donut (TDesign `getPieChartDataSet`). */
export function getPieChartDataSet(theme: ChartTheme, radius = 42): EChartsOption {
  return {
    color: getChartListColor(),
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

export function defaultLast7Days(): Date[] {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - 7);
  return [start, end];
}
