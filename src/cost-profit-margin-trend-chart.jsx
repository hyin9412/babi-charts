import { createRoot } from "react-dom/client";
import { LineChart } from "@byted-babi/babi-design/es/Chart";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import { SingleChartPage } from "./chart-layout";
import { costProfitMarginTrendData } from "./chart-data";
import {
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createChartPadding,
  defaultLineProps,
  fullSizeChartComponentProps,
} from "./chart-presets";
import "./cost-profit-margin-trend-chart.css";
import "./chart-tooltip.css";

function App() {
  return (
    <SingleChartPage checkItem="成本利润率" title="成本利润率趋势图">
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
        lineChartProps={createChartPadding(0)}
        lineProps={defaultLineProps}
        legendProps={bottomLegendLeftAlignedProps}
        chartComponentProps={fullSizeChartComponentProps}
      />
    </SingleChartPage>
  );
}

createRoot(document.getElementById("root")).render(<App />);
