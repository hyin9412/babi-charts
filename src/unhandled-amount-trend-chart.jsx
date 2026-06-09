import { createRoot } from "react-dom/client";
import { LineChart } from "@byted-babi/babi-design/es/Chart";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import { SingleChartPage } from "./chart-layout";
import { unhandledAmountTrendData } from "./chart-data";
import {
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createChartPadding,
  defaultLineProps,
  fullSizeChartComponentProps,
} from "./chart-presets";
import "./unhandled-amount-trend-chart.css";
import "./chart-tooltip.css";

function App() {
  return (
    <SingleChartPage checkItem="月结异常账单修复情况" title="异常未处理金额趋势图">
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
        lineChartProps={createChartPadding(0)}
        lineProps={defaultLineProps}
        legendProps={bottomLegendLeftAlignedProps}
        chartComponentProps={fullSizeChartComponentProps}
      />
    </SingleChartPage>
  );
}

createRoot(document.getElementById("root")).render(<App />);
