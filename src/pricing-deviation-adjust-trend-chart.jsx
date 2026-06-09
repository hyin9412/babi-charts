import { createRoot } from "react-dom/client";
import { LineBarCombo } from "@byted-babi/babi-design/es/Chart";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import { SingleChartPage } from "./chart-layout";
import {
  pricingDeviationAdjustAmountData,
  pricingDeviationAdjustCountData,
} from "./chart-data";
import {
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createSeriesUnitTooltipProps,
  createChartPadding,
  emphasizedLineProps,
  fullSizeChartComponentProps,
  hiddenGridProps,
} from "./chart-presets";
import "./pricing-deviation-adjust-trend-chart.css";
import "./chart-tooltip.css";

function App() {
  return (
    <SingleChartPage checkItem="定价偏差导致的调账" title="调账次数和金额趋势图">
      <LineBarCombo
        data={[
          { id: "adjustCountData", values: pricingDeviationAdjustCountData },
          { id: "adjustAmountData", values: pricingDeviationAdjustAmountData },
        ]}
        xField="month"
        lineFields={{
          dataId: "adjustCountData",
          yField: "value",
          seriesField: "series",
        }}
        dualAxis={{
          line: {
            dataId: "adjustAmountData",
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
        chartProps={createChartPadding(0)}
        legendProps={bottomLegendLeftAlignedProps}
        chartComponentProps={fullSizeChartComponentProps}
      />
    </SingleChartPage>
  );
}

createRoot(document.getElementById("root")).render(<App />);
