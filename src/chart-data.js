import { defaultTheme } from "@cloud-materials/charts-common";

const [defaultBlue, defaultCyan, defaultOrange, defaultGreen, defaultPurple] =
  defaultTheme.theme.color;

const pushVolumeTrendData = [
  { month: "2025-12", dailyRatio: 18.6, monthlyRatio: 14.8, dailyCount: 96, monthlyCount: 74 },
  { month: "2026-01", dailyRatio: 20.4, monthlyRatio: 16.2, dailyCount: 108, monthlyCount: 82 },
  { month: "2026-02", dailyRatio: 17.9, monthlyRatio: 15.5, dailyCount: 92, monthlyCount: 78 },
  { month: "2026-03", dailyRatio: 24.3, monthlyRatio: 19.4, dailyCount: 136, monthlyCount: 103 },
  { month: "2026-04", dailyRatio: 21.7, monthlyRatio: 17.8, dailyCount: 121, monthlyCount: 91 },
  { month: "2026-05", dailyRatio: 22.1, monthlyRatio: 18.7, dailyCount: 128, monthlyCount: 96 },
];

export const countData = pushVolumeTrendData.flatMap((item) => [
  { month: item.month, series: "日结计费项不达标个数", value: item.dailyCount },
  { month: item.month, series: "月结计费项不达标个数", value: item.monthlyCount },
]);

export const ratioData = pushVolumeTrendData.flatMap((item) => [
  { month: item.month, series: "日结计费项不达标占比", value: item.dailyRatio },
  { month: item.month, series: "月结计费项不达标占比", value: item.monthlyRatio },
]);

export const adjustDelayData = [
  { month: "2025-12", series: "平均滞后时长", avgDelayDays: 5.4 },
  { month: "2026-01", series: "平均滞后时长", avgDelayDays: 6.8 },
  { month: "2026-02", series: "平均滞后时长", avgDelayDays: 6.1 },
  { month: "2026-03", series: "平均滞后时长", avgDelayDays: 5.3 },
  { month: "2026-04", series: "平均滞后时长", avgDelayDays: 4.1 },
  { month: "2026-05", series: "平均滞后时长", avgDelayDays: 3.2 },
];

export const priceAdjustCountTrendData = [
  { month: "2025-12", series: "调价次数", adjustCount: 2 },
  { month: "2026-01", series: "调价次数", adjustCount: 4 },
  { month: "2026-02", series: "调价次数", adjustCount: 3 },
  { month: "2026-03", series: "调价次数", adjustCount: 6 },
  { month: "2026-04", series: "调价次数", adjustCount: 5 },
  { month: "2026-05", series: "调价次数", adjustCount: 8 },
];

export const unhandledAmountTrendData = [
  { month: "2025-12", series: "异常未处理金额", unhandledAmount: 186.4 },
  { month: "2026-01", series: "异常未处理金额", unhandledAmount: 172.8 },
  { month: "2026-02", series: "异常未处理金额", unhandledAmount: 159.6 },
  { month: "2026-03", series: "异常未处理金额", unhandledAmount: 145.2 },
  { month: "2026-04", series: "异常未处理金额", unhandledAmount: 131.7 },
  { month: "2026-05", series: "异常未处理金额", unhandledAmount: 118.9 },
];

export const costProfitMarginTrendData = [
  { month: "2025-12", region: "中国区", costProfitMargin: 4 },
  { month: "2025-12", region: "非中区", costProfitMargin: -2 },
  { month: "2026-01", region: "中国区", costProfitMargin: 6 },
  { month: "2026-01", region: "非中区", costProfitMargin: -1 },
  { month: "2026-02", region: "中国区", costProfitMargin: 3 },
  { month: "2026-02", region: "非中区", costProfitMargin: -3 },
  { month: "2026-03", region: "中国区", costProfitMargin: 8 },
  { month: "2026-03", region: "非中区", costProfitMargin: 1 },
  { month: "2026-04", region: "中国区", costProfitMargin: 7 },
  { month: "2026-04", region: "非中区", costProfitMargin: 0 },
  { month: "2026-05", region: "中国区", costProfitMargin: 9 },
  { month: "2026-05", region: "非中区", costProfitMargin: 2 },
];

const backtrackAmountRatioTrendData = [
  { month: "2025-12", backtrackCount: 78, backtrackRatio: 5 },
  { month: "2026-01", backtrackCount: 86, backtrackRatio: 6 },
  { month: "2026-02", backtrackCount: 83, backtrackRatio: 6 },
  { month: "2026-03", backtrackCount: 97, backtrackRatio: 8 },
  { month: "2026-04", backtrackCount: 94, backtrackRatio: 9 },
  { month: "2026-05", backtrackCount: 108, backtrackRatio: 10 },
];

export const backtrackCountData = backtrackAmountRatioTrendData.map((item) => ({
  month: item.month,
  series: "回溯次数",
  value: item.backtrackCount,
}));

export const backtrackRatioData = backtrackAmountRatioTrendData.map((item) => ({
  month: item.month,
  series: "回溯占比",
  value: item.backtrackRatio,
}));

const adjustmentIssueTrendData = [
  { month: "2025-12", adjustCount: 12, adjustAmount: 28.6 },
  { month: "2026-01", adjustCount: 15, adjustAmount: 32.4 },
  { month: "2026-02", adjustCount: 11, adjustAmount: 24.8 },
  { month: "2026-03", adjustCount: 18, adjustAmount: 39.5 },
  { month: "2026-04", adjustCount: 14, adjustAmount: 30.7 },
  { month: "2026-05", adjustCount: 16, adjustAmount: 34.2 },
];

export const adjustmentCountData = adjustmentIssueTrendData.map((item) => ({
  month: item.month,
  series: "调账次数",
  value: item.adjustCount,
}));

export const adjustmentAmountData = adjustmentIssueTrendData.map((item) => ({
  month: item.month,
  series: "调账金额",
  value: item.adjustAmount,
}));

const pricingDeviationAdjustTrendData = [
  { month: "2025-12", adjustCount: 9, adjustAmount: 21.8 },
  { month: "2026-01", adjustCount: 12, adjustAmount: 27.4 },
  { month: "2026-02", adjustCount: 11, adjustAmount: 24.9 },
  { month: "2026-03", adjustCount: 16, adjustAmount: 35.6 },
  { month: "2026-04", adjustCount: 14, adjustAmount: 31.2 },
  { month: "2026-05", adjustCount: 18, adjustAmount: 38.5 },
];

export const pricingDeviationAdjustCountData = pricingDeviationAdjustTrendData.map((item) => ({
  month: item.month,
  series: "调账次数",
  value: item.adjustCount,
}));

export const pricingDeviationAdjustAmountData = pricingDeviationAdjustTrendData.map((item) => ({
  month: item.month,
  series: "调账金额",
  value: item.adjustAmount,
}));

export const adjustmentCostRevenueData = [
  {
    month: "2025-12",
    costChina: 18,
    costOverseasOther: 9,
    costUS: 12,
    costEuropeTTP: 8,
    costUSTTP: 7,
    revenueChina: 0,
    revenueOverseasOther: 11,
    revenueUS: 13,
    revenueEuropeTTP: 9,
    revenueUSTTP: 21,
  },
  {
    month: "2026-01",
    costChina: 20,
    costOverseasOther: 0,
    costUS: 14,
    costEuropeTTP: 8,
    costUSTTP: 8,
    revenueChina: 18,
    revenueOverseasOther: 11,
    revenueUS: 15,
    revenueEuropeTTP: 10,
    revenueUSTTP: 9,
  },
  {
    month: "2026-02",
    costChina: 16,
    costOverseasOther: 8,
    costUS: 11,
    costEuropeTTP: 7,
    costUSTTP: 6,
    revenueChina: 14,
    revenueOverseasOther: 9,
    revenueUS: 0,
    revenueEuropeTTP: 8,
    revenueUSTTP: 17,
  },
  {
    month: "2026-03",
    costChina: 23,
    costOverseasOther: 12,
    costUS: 16,
    costEuropeTTP: 0,
    costUSTTP: 9,
    revenueChina: 21,
    revenueOverseasOther: 13,
    revenueUS: 17,
    revenueEuropeTTP: 11,
    revenueUSTTP: 10,
  },
  {
    month: "2026-04",
    costChina: 19,
    costOverseasOther: 10,
    costUS: 13,
    costEuropeTTP: 8,
    costUSTTP: 8,
    revenueChina: 18,
    revenueOverseasOther: 10,
    revenueUS: 14,
    revenueEuropeTTP: 9,
    revenueUSTTP: 7,
  },
  {
    month: "2026-05",
    costChina: 0,
    costOverseasOther: 11,
    costUS: 15,
    costEuropeTTP: 9,
    costUSTTP: 8,
    revenueChina: 20,
    revenueOverseasOther: 12,
    revenueUS: 16,
    revenueEuropeTTP: 10,
    revenueUSTTP: 5,
  },
];

export const regionColors = {
  中国: defaultBlue,
  海外其他: defaultCyan,
  美国: defaultOrange,
  欧洲TTP: defaultGreen,
  美国TTP: defaultPurple,
};

export const regionLegendItems = Object.entries(regionColors).map(([name, color]) => ({
  name,
  color,
}));

export const adjustmentCostRevenueSeries = [
  { series: "costChina", label: "成本-中国", stack: "cost", itemStyle: { color: regionColors.中国 } },
  {
    series: "costOverseasOther",
    label: "成本-海外其他",
    stack: "cost",
    itemStyle: { color: regionColors.海外其他 },
  },
  { series: "costUS", label: "成本-美国", stack: "cost", itemStyle: { color: regionColors.美国 } },
  {
    series: "costEuropeTTP",
    label: "成本-欧洲TTP",
    stack: "cost",
    itemStyle: { color: regionColors.欧洲TTP },
  },
  { series: "costUSTTP", label: "成本-美国TTP", stack: "cost", itemStyle: { color: regionColors.美国TTP } },
  { series: "revenueChina", label: "收入-中国", stack: "revenue", itemStyle: { color: regionColors.中国 } },
  {
    series: "revenueOverseasOther",
    label: "收入-海外其他",
    stack: "revenue",
    itemStyle: { color: regionColors.海外其他 },
  },
  { series: "revenueUS", label: "收入-美国", stack: "revenue", itemStyle: { color: regionColors.美国 } },
  {
    series: "revenueEuropeTTP",
    label: "收入-欧洲TTP",
    stack: "revenue",
    itemStyle: { color: regionColors.欧洲TTP },
  },
  {
    series: "revenueUSTTP",
    label: "收入-美国TTP",
    stack: "revenue",
    itemStyle: { color: regionColors.美国TTP },
  },
];

export const adjustmentCostRevenueLineSeries = adjustmentCostRevenueSeries.map((item) => ({
  series: item.series,
  label: item.label,
  itemStyle: {
    color: item.itemStyle.color,
  },
  lineStyle: {
    color: item.itemStyle.color,
    type: item.label.startsWith("收入-") ? "dashed" : "solid",
  },
}));
