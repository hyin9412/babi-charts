import { createRoot } from "react-dom/client";
import { LineBarCombo } from "@byted-babi/babi-design/es/Chart";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import { SingleChartPage } from "./chart-layout";
import { backtrackCountData, backtrackRatioData } from "./chart-data";
import {
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createSeriesUnitTooltipProps,
  createChartPadding,
  emphasizedLineProps,
  fullSizeChartComponentProps,
  hiddenGridProps,
} from "./chart-presets";
import "./backtrack-amount-ratio-chart.css";
import "./chart-tooltip.css";

function App() {
  return (
    <SingleChartPage checkItem="回溯金额占比" title="回溯金额占比趋势图">
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
        rightYFormatMethod={(value) => `${Math.round(Number(value))}%`}
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
        chartProps={createChartPadding(0)}
        legendProps={bottomLegendLeftAlignedProps}
        chartComponentProps={fullSizeChartComponentProps}
      />
    </SingleChartPage>
  );
}

createRoot(document.getElementById("root")).render(<App />);
