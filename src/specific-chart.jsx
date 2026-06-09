import { LineBarCombo, LineChart } from "@byted-babi/babi-design/es/Chart";
import { CChart } from "@cloud-materials/charts-common";
import { useCallback, useMemo, useRef, useState } from "react";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import {
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createSeriesUnitTooltipProps,
  createChartPadding,
  defaultLineProps,
  emphasizedLineProps,
  fullSizeChartComponentProps,
  hiddenGridProps,
  integerCountLineProps,
  adjustDelayYAxisTicks,
  priceAdjustCountYAxisTicks,
} from "./chart-presets";
import {
  adjustDelayData,
  adjustmentAmountData,
  adjustmentCostRevenueData,
  adjustmentCostRevenueLineSeries,
  adjustmentCostRevenueSeries,
  adjustmentCountData,
  backtrackCountData,
  backtrackRatioData,
  costProfitMarginTrendData,
  countData,
  priceAdjustCountTrendData,
  pricingDeviationAdjustAmountData,
  pricingDeviationAdjustCountData,
  ratioData,
  regionColors,
  regionLegendItems,
  unhandledAmountTrendData,
} from "./chart-data";
import { ChartCard } from "./chart-layout";
import { initializeSpecificChartRuntime, mountSpecificChartApp } from "./specific-chart-runtime";
import "./specific-chart.css";
import "./chart-tooltip.css";

initializeSpecificChartRuntime();

const adjustmentTooltipRegions = [
  { key: "中国", costSeries: "成本-中国", revenueSeries: "收入-中国" },
  { key: "海外其他", costSeries: "成本-海外其他", revenueSeries: "收入-海外其他" },
  { key: "美国", costSeries: "成本-美国", revenueSeries: "收入-美国" },
  { key: "美国TTP", costSeries: "成本-美国TTP", revenueSeries: "收入-美国TTP" },
  { key: "欧洲TTP", costSeries: "成本-欧洲TTP", revenueSeries: "收入-欧洲TTP" },
];

const adjustmentRegionBySeriesName = new Map(
  adjustmentTooltipRegions.flatMap((region) => [
    [region.costSeries, region.key],
    [region.revenueSeries, region.key],
  ])
);

const createAllSelectedRegionMap = () =>
  Object.fromEntries(adjustmentTooltipRegions.map((region) => [region.key, true]));

function isRegionSelected(selectedRegions, regionKey) {
  return selectedRegions?.[regionKey] !== false;
}

function formatTooltipValue(value) {
  return value == null || value === "-" ? "-" : `${value}元`;
}

function buildAdjustmentCostRevenueTooltip(params, activeRegionKey, selectedRegions) {
  const tooltipParams = Array.isArray(params) ? params : [params];
  const month = tooltipParams[0]?.axisValueLabel || tooltipParams[0]?.name || "-";
  const valueBySeries = new Map(
    tooltipParams.map((item) => [item.seriesName, item.value?.[item.seriesName] ?? item.value])
  );

  const rowsHtml = adjustmentTooltipRegions
    .map((region) => {
      if (!isRegionSelected(selectedRegions, region.key)) {
        return "";
      }

      const color = regionColors[region.key];
      const costValue = formatTooltipValue(valueBySeries.get(region.costSeries));
      const revenueValue = formatTooltipValue(valueBySeries.get(region.revenueSeries));
      const isActive = region.key === activeRegionKey;
      const rowClassName = isActive
        ? "adjustment-tooltip__row adjustment-tooltip__row--active"
        : "adjustment-tooltip__row";
      const regionClassName = isActive
        ? "adjustment-tooltip__region adjustment-tooltip__region--active"
        : "adjustment-tooltip__region";
      const valueClassName = isActive
        ? "adjustment-tooltip__value adjustment-tooltip__value--active"
        : "adjustment-tooltip__value";

      return `
        <div class="${rowClassName}">
          <div class="${regionClassName}">
            <span class="adjustment-tooltip__dot" style="background:${color};"></span>
            <span>${region.key}</span>
          </div>
          <div class="${valueClassName}">${costValue}</div>
          <div class="${valueClassName}">${revenueValue}</div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="adjustment-tooltip">
      <div class="adjustment-tooltip__title">${month}</div>
      <div class="adjustment-tooltip__head">
        <div>大区</div>
        <div>成本</div>
        <div>收入</div>
      </div>
      ${rowsHtml}
    </div>
  `;
}

function App() {
  const adjustmentHoverResetFrameRef = useRef(null);
  const activeAdjustmentRegionRef = useRef(null);
  const [activeAdjustmentRegion, setActiveAdjustmentRegion] = useState(null);
  const [adjustmentLegendSelected, setAdjustmentLegendSelected] = useState(
    createAllSelectedRegionMap
  );
  const adjustmentLineHoverResetFrameRef = useRef(null);
  const activeAdjustmentLineRegionRef = useRef(null);
  const [activeAdjustmentLineRegion, setActiveAdjustmentLineRegion] = useState(null);
  const [adjustmentLineLegendSelected, setAdjustmentLineLegendSelected] = useState(
    createAllSelectedRegionMap
  );

  const clearPendingAdjustmentReset = useCallback(() => {
    if (adjustmentHoverResetFrameRef.current != null) {
      cancelAnimationFrame(adjustmentHoverResetFrameRef.current);
      adjustmentHoverResetFrameRef.current = null;
    }
  }, []);

  const highlightAdjustmentRegion = useCallback(
    (regionKey) => {
      clearPendingAdjustmentReset();

      if (activeAdjustmentRegionRef.current === regionKey) {
        return;
      }

      activeAdjustmentRegionRef.current = regionKey;
      setActiveAdjustmentRegion(regionKey);
    },
    [clearPendingAdjustmentReset]
  );

  const resetAdjustmentHighlight = useCallback(() => {
    clearPendingAdjustmentReset();
    activeAdjustmentRegionRef.current = null;
    setActiveAdjustmentRegion(null);
  }, [clearPendingAdjustmentReset]);

  const scheduleAdjustmentHighlightReset = useCallback(() => {
    clearPendingAdjustmentReset();
    adjustmentHoverResetFrameRef.current = requestAnimationFrame(() => {
      adjustmentHoverResetFrameRef.current = null;
      resetAdjustmentHighlight();
    });
  }, [clearPendingAdjustmentReset, resetAdjustmentHighlight]);

  const handleAdjustmentChartMouseOver = useCallback(
    (params) => {
      if (params?.componentType !== "series") {
        return;
      }

      const regionKey = adjustmentRegionBySeriesName.get(params.seriesName);

      if (!regionKey) {
        return;
      }

      highlightAdjustmentRegion(regionKey);
    },
    [highlightAdjustmentRegion]
  );

  const adjustmentChartEvents = useMemo(
    () => ({
      mouseover: handleAdjustmentChartMouseOver,
      mouseout: scheduleAdjustmentHighlightReset,
      globalout: resetAdjustmentHighlight,
    }),
    [handleAdjustmentChartMouseOver, resetAdjustmentHighlight, scheduleAdjustmentHighlightReset]
  );

  const clearPendingAdjustmentLineReset = useCallback(() => {
    if (adjustmentLineHoverResetFrameRef.current != null) {
      cancelAnimationFrame(adjustmentLineHoverResetFrameRef.current);
      adjustmentLineHoverResetFrameRef.current = null;
    }
  }, []);

  const highlightAdjustmentLineRegion = useCallback(
    (regionKey) => {
      clearPendingAdjustmentLineReset();

      if (activeAdjustmentLineRegionRef.current === regionKey) {
        return;
      }

      activeAdjustmentLineRegionRef.current = regionKey;
      setActiveAdjustmentLineRegion(regionKey);
    },
    [clearPendingAdjustmentLineReset]
  );

  const resetAdjustmentLineHighlight = useCallback(() => {
    clearPendingAdjustmentLineReset();
    activeAdjustmentLineRegionRef.current = null;
    setActiveAdjustmentLineRegion(null);
  }, [clearPendingAdjustmentLineReset]);

  const scheduleAdjustmentLineHighlightReset = useCallback(() => {
    clearPendingAdjustmentLineReset();
    adjustmentLineHoverResetFrameRef.current = requestAnimationFrame(() => {
      adjustmentLineHoverResetFrameRef.current = null;
      resetAdjustmentLineHighlight();
    });
  }, [clearPendingAdjustmentLineReset, resetAdjustmentLineHighlight]);

  const handleAdjustmentLineChartMouseOver = useCallback(
    (params) => {
      if (params?.componentType !== "series") {
        return;
      }

      const regionKey = adjustmentRegionBySeriesName.get(params.seriesName);

      if (!regionKey) {
        return;
      }

      highlightAdjustmentLineRegion(regionKey);
    },
    [highlightAdjustmentLineRegion]
  );

  const adjustmentLineChartEvents = useMemo(
    () => ({
      mouseover: handleAdjustmentLineChartMouseOver,
      mouseout: scheduleAdjustmentLineHighlightReset,
      globalout: resetAdjustmentLineHighlight,
    }),
    [
      handleAdjustmentLineChartMouseOver,
      resetAdjustmentLineHighlight,
      scheduleAdjustmentLineHighlightReset,
    ]
  );

  return (
    <>
      <header className="page-header">
        <h1>业务检测图表聚合页</h1>
      </header>

      <main className="page-main">
        <ChartCard checkItem="T+1 推量能力" title="推量不达标计费项的占比趋势图" status="babi-design · 组合图">
          <LineBarCombo
            data={[
              { id: "countData", values: countData },
              { id: "ratioData", values: ratioData },
            ]}
            xField="month"
            lineFields={{
              dataId: "countData",
              yField: "value",
              seriesField: "series",
            }}
            dualAxis={{
              bar: {
                dataId: "ratioData",
                yField: "value",
                seriesField: "series",
              },
            }}
            leftYFormatMethod={(value) => `${value}`}
            rightYFormatMethod={(value) => `${Math.round(Number(value))}%`}
            xAxisProps={commonXAxisProps}
            leftYAxisProps={{
              min: 0,
              max: 160,
              tick: {
                tickCount: 5,
              },
            }}
            rightYAxisProps={{
              min: 0,
              max: 30,
              tick: {
                tickCount: 7,
              },
              ...hiddenGridProps,
            }}
            tooltipProps={createSeriesUnitTooltipProps({
              日结计费项不达标个数: "个",
              月结计费项不达标个数: "个",
              日结计费项占比: "%",
              月结计费项占比: "%",
            })}
            chartProps={createChartPadding(0)}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard checkItem="最早账期调账" title="调账平均滞后时长趋势图">
          <LineChart
            data={adjustDelayData}
            xField="month"
            yField="avgDelayDays"
            seriesField="series"
            yFormatMethod={(value) => `${value}天`}
            tooltipValueFn={(_, __, datum) => `${datum?.avgDelayDays ?? "-"}天`}
            xAxisProps={commonXAxisProps}
            yAxisProps={{
              min: 0,
              max: 8,
              tick: {
                tickMode: () => adjustDelayYAxisTicks,
              },
            }}
            lineChartProps={createChartPadding()}
            lineProps={integerCountLineProps}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard
          checkItem="有成本无收入或有收入无成本"
          checkItemTags={["堆叠图"]}
          checkItemRemark="（用源力图表实现）"
          title="成本和收入趋势图"
          titleTags={["日正式+月正式", "纯资源金额"]}
          workspaceClassName="workspace workspace--tooltip-visible"
          panelClassName="chart-panel chart-panel--stacked"
        >
          <div className="stacked-chart">
            <CChart
              type="histogram"
              canvasHeight={214}
              data={adjustmentCostRevenueData}
              onEvents={adjustmentChartEvents}
              xField="month"
              yField={adjustmentCostRevenueSeries}
              yAxisLabelFormatter={(value) => `${value}万`}
              behavior={{
                barWidth: 14,
                barGap: "20%",
                barCategoryGap: "42%",
                showXMinLabel: true,
                showXMaxLabel: true,
                xLabelMargin: 10,
              }}
              advancedOptions={{
                CLegend: {
                  className: "adjustment-clegend-left",
                  data: regionLegendItems.map((item) => ({
                    name: item.name,
                    color: item.color,
                  })),
                  icon: "roundRect",
                  initSelected: adjustmentLegendSelected,
                  onSelect: (selected) => {
                    setAdjustmentLegendSelected(selected || createAllSelectedRegionMap());
                  },
                  operation: {
                    hasClickOnlySelected: true,
                  },
                  position: "bottom",
                  show: true,
                },
              }}
              raw={(config) => ({
                ...config,
                series: (config.series || []).map((series) => ({
                  ...series,
                  itemStyle: {
                    ...(series.itemStyle || {}),
                    opacity: (() => {
                      const regionKey = adjustmentRegionBySeriesName.get(series.name);

                      if (!isRegionSelected(adjustmentLegendSelected, regionKey)) {
                        return 0;
                      }

                      return !activeAdjustmentRegion || regionKey === activeAdjustmentRegion
                        ? 1
                        : 0.1;
                    })(),
                  },
                })),
                yAxis: {
                  ...(config.yAxis || {}),
                  min: 0,
                  max: 80,
                  splitNumber: 5,
                },
                tooltip: {
                  trigger: "axis",
                  confine: false,
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderWidth: 0,
                  padding: 0,
                  className: "adjustment-tooltip-layer",
                  formatter: (params) =>
                    buildAdjustmentCostRevenueTooltip(
                      params,
                      activeAdjustmentRegionRef.current,
                      adjustmentLegendSelected
                    ),
                },
                grid: {
                  ...(config.grid || {}),
                  top: 16,
                  left: 0,
                  right: 8,
                  bottom: 0,
                  containLabel: true,
                },
              })}
              style={fullSizeChartComponentProps.style}
            />
          </div>
        </ChartCard>

        <ChartCard
          checkItem="有成本无收入或有收入无成本"
          checkItemTags={["折线图"]}
          checkItemRemark="（用源力图表实现）"
          title="成本和收入趋势图"
          titleTags={["日正式+月正式", "纯资源金额"]}
          workspaceClassName="workspace workspace--tooltip-visible"
          panelClassName="chart-panel chart-panel--stacked"
        >
          <div className="stacked-chart">
            <CChart
              type="line"
              canvasHeight={214}
              data={adjustmentCostRevenueData}
              onEvents={adjustmentLineChartEvents}
              xField="month"
              yField={adjustmentCostRevenueLineSeries}
              yAxisLabelFormatter={(value) => `${value}万`}
              behavior={{
                useStandardStyle: true,
                smooth: true,
                showXMinLabel: true,
                showXMaxLabel: true,
                xAxisOffset: true,
                xLabelMargin: 10,
              }}
              advancedOptions={{
                CLegend: {
                  className: "adjustment-clegend-left",
                  data: regionLegendItems.map((item) => ({
                    name: item.name,
                    color: item.color,
                  })),
                  icon: "roundRect",
                  initSelected: adjustmentLineLegendSelected,
                  onSelect: (selected) => {
                    setAdjustmentLineLegendSelected(selected || createAllSelectedRegionMap());
                  },
                  operation: {
                    hasClickOnlySelected: true,
                  },
                  position: "bottom",
                  show: true,
                },
              }}
              raw={(config) => ({
                ...config,
                series: (config.series || []).map((series) => ({
                  ...series,
                  lineStyle: {
                    ...(series.lineStyle || {}),
                    opacity: (() => {
                      const regionKey = adjustmentRegionBySeriesName.get(series.name);

                      if (!isRegionSelected(adjustmentLineLegendSelected, regionKey)) {
                        return 0;
                      }

                      return !activeAdjustmentLineRegion ||
                        regionKey === activeAdjustmentLineRegion
                        ? 1
                        : 0.1;
                    })(),
                  },
                  itemStyle: {
                    ...(series.itemStyle || {}),
                    opacity: (() => {
                      const regionKey = adjustmentRegionBySeriesName.get(series.name);

                      if (!isRegionSelected(adjustmentLineLegendSelected, regionKey)) {
                        return 0;
                      }

                      return !activeAdjustmentLineRegion ||
                        regionKey === activeAdjustmentLineRegion
                        ? 1
                        : 0.1;
                    })(),
                  },
                })),
                yAxis: {
                  ...(config.yAxis || {}),
                  min: 0,
                  max: 25,
                  splitNumber: 5,
                },
                tooltip: {
                  trigger: "axis",
                  confine: false,
                  backgroundColor: "rgba(255,255,255,0.96)",
                  borderWidth: 0,
                  padding: 0,
                  className: "adjustment-tooltip-layer",
                  formatter: (params) =>
                    buildAdjustmentCostRevenueTooltip(
                      params,
                      activeAdjustmentLineRegionRef.current,
                      adjustmentLineLegendSelected
                    ),
                },
                grid: {
                  ...(config.grid || {}),
                  top: 16,
                  left: 0,
                  right: 8,
                  bottom: 0,
                  containLabel: true,
                },
              })}
              style={fullSizeChartComponentProps.style}
            />
          </div>
        </ChartCard>

        <ChartCard
          checkItem="计量问题导致的调账"
          title="计量问题导致调账的趋势图"
          titleTags={["总金额"]}
        >
          <LineBarCombo
            data={[
              { id: "adjustmentCountData", values: adjustmentCountData },
              { id: "adjustmentAmountData", values: adjustmentAmountData },
            ]}
            xField="month"
            lineFields={{
              dataId: "adjustmentCountData",
              yField: "value",
              seriesField: "series",
            }}
            dualAxis={{
              line: {
                dataId: "adjustmentAmountData",
                yField: "value",
                seriesField: "series",
              },
            }}
            leftYFormatMethod={(value) => `${value}次`}
            rightYFormatMethod={(value) => `${Math.round(Number(value))}万`}
            xAxisProps={commonXAxisProps}
            leftYAxisProps={{
              min: 0,
              max: 20,
              tick: {
                tickCount: 5,
              },
            }}
            rightYAxisProps={{
              min: 0,
              max: 40,
              tick: {
                tickCount: 6,
              },
              ...hiddenGridProps,
            }}
            tooltipProps={createSeriesUnitTooltipProps({
              调账次数: "次",
              调账金额: "万",
            })}
            chartProps={createChartPadding()}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard
          checkItem="回溯金额占比"
          title="回溯金额占比趋势图"
          status="babi-design · 双轴折线"
        >
          <LineBarCombo
            data={[
              { id: "backtrackCountData", values: backtrackCountData },
              { id: "backtrackRatioData", values: backtrackRatioData },
            ]}
            xField="month"
            lineFields={{
              dataId: "backtrackCountData",
              yField: "value",
              seriesField: "series",
            }}
            dualAxis={{
              line: {
                dataId: "backtrackRatioData",
                yField: "value",
                seriesField: "series",
              },
            }}
            leftYFormatMethod={(value) => `${value}次`}
            rightYFormatMethod={(value) => `${value}%`}
            xAxisProps={commonXAxisProps}
            leftYAxisProps={{
              min: 0,
              max: 120,
              tick: {
                forceTickCount: 5,
              },
            }}
            rightYAxisProps={{
              min: 0,
              max: 12,
              tick: {
                forceTickCount: 5,
              },
              ...hiddenGridProps,
            }}
            tooltipProps={createSeriesUnitTooltipProps({
              回溯次数: "次",
              回溯占比: "%",
            })}
            lineChartProps={emphasizedLineProps}
            chartProps={createChartPadding()}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard
          checkItem="月结异常账单修复情况"
          title="异常未处理金额趋势图"
          titleTags={["总金额"]}
        >
          <LineChart
            data={unhandledAmountTrendData}
            xField="month"
            yField="unhandledAmount"
            seriesField="series"
            yFormatMethod={(value) => `${value}万`}
            tooltipValueFn={(_, __, datum) => `${datum?.unhandledAmount ?? "-"}万`}
            xAxisProps={commonXAxisProps}
            yAxisProps={{
              min: 0,
              tick: {
                tickCount: 5,
              },
            }}
            lineChartProps={createChartPadding()}
            lineProps={defaultLineProps}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard checkItem="半年周期调价次数" title="调价次数趋势图">
          <LineChart
            data={priceAdjustCountTrendData}
            xField="month"
            yField="adjustCount"
            seriesField="series"
            yFormatMethod={(value) => `${value}次`}
            tooltipValueFn={(_, __, datum) => `${datum?.adjustCount ?? "-"}次`}
            xAxisProps={commonXAxisProps}
            yAxisProps={{
              min: 0,
              max: 8,
              tick: {
                tickMode: () => priceAdjustCountYAxisTicks,
              },
            }}
            lineChartProps={createChartPadding()}
            lineProps={defaultLineProps}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard checkItem="成本利润率" title="成本利润率趋势图" status="babi-design · 折线图">
          <LineChart
            data={costProfitMarginTrendData}
            xField="month"
            yField="costProfitMargin"
            seriesField="region"
            yFormatMethod={(value) => `${Math.round(Number(value))}%`}
            tooltipValueFn={(_, __, datum) => `${Math.round(Number(datum?.costProfitMargin ?? 0))}%`}
            xAxisProps={commonXAxisProps}
            yAxisProps={{
              min: -10,
              max: 10,
              tick: {
                tickCount: 5,
              },
            }}
            lineChartProps={createChartPadding()}
            lineProps={defaultLineProps}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>

        <ChartCard checkItem="定价偏差导致的调账" title="调账次数和金额趋势图">
          <LineBarCombo
            data={[
              { id: "pricingDeviationAdjustCountData", values: pricingDeviationAdjustCountData },
              { id: "pricingDeviationAdjustAmountData", values: pricingDeviationAdjustAmountData },
            ]}
            xField="month"
            lineFields={{
              dataId: "pricingDeviationAdjustCountData",
              yField: "value",
              seriesField: "series",
            }}
            dualAxis={{
              line: {
                dataId: "pricingDeviationAdjustAmountData",
                yField: "value",
                seriesField: "series",
              },
            }}
            leftYFormatMethod={(value) => `${value}次`}
            rightYFormatMethod={(value) => `${value}万`}
            xAxisProps={commonXAxisProps}
            leftYAxisProps={{
              min: 0,
              max: 20,
              tick: {
                tickCount: 5,
              },
            }}
            rightYAxisProps={{
              min: 0,
              max: 45,
              tick: {
                tickCount: 5,
              },
              ...hiddenGridProps,
            }}
            tooltipProps={createSeriesUnitTooltipProps({
              调账次数: "次",
              调账金额: "万",
            })}
            lineChartProps={emphasizedLineProps}
            chartProps={createChartPadding()}
            legendProps={bottomLegendLeftAlignedProps}
            chartComponentProps={fullSizeChartComponentProps}
          />
        </ChartCard>
      </main>
    </>
  );
}

mountSpecificChartApp(<App />);
