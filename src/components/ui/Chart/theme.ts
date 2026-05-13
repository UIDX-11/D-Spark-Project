/**
 * 统一图表配色与排版基线：尽量从 DS token 取色，但 ECharts 需要静态 hex/rgb 字符串，
 * 此处复制 theme.css 中 chart-1..5 的解析值（与 `--chart-*` 保持同源）。
 * 若后续 token 变更，同步更新此映射即可，业务层无需感知。
 */
export const CHART_PALETTE = [
  'rgba(0, 82, 217, 1)',
  'rgba(2, 156, 212, 1)',
  'rgba(43, 164, 113, 1)',
  'rgba(245, 186, 24, 1)',
  'rgba(227, 115, 24, 1)',
];

export const CHART_AXIS_COLOR = 'rgba(204, 204, 204, 1)';
export const CHART_LABEL_COLOR = 'rgba(102, 102, 102, 1)';
export const CHART_SPLIT_LINE = 'rgba(232, 232, 232, 1)';
export const CHART_TOOLTIP_BG = 'rgba(255, 255, 255, 1)';
export const CHART_TOOLTIP_BORDER = 'rgba(232, 232, 232, 1)';
export const CHART_TEXT_PRIMARY = 'rgba(34, 34, 34, 1)';

export const CHART_FONT = "'PingFang SC', sans-serif";
