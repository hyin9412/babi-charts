import { createRoot } from "react-dom/client";
import { LineChart } from "@byted-babi/babi-design/es/Chart";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import { SingleChartPage } from "./chart-layout";
import { priceAdjustCountTrendData } from "./chart-data";
import {
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createChartPadding,
  fullSizeChartComponentProps,
  integerCountLineProps,
  priceAdjustCountYAxisTicks,
} from "./chart-presets";
import "./price-adjust-count-trend-chart.css";
import "./chart-tooltip.css";

function App() {
  return (
    <SingleChartPage checkItem="半年周期调价次数" title="调价次数趋势图">
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
        lineChartProps={createChartPadding(0)}
        lineProps={integerCountLineProps}
        legendProps={bottomLegendLeftAlignedProps}
        chartComponentProps={fullSizeChartComponentProps}
      />
    </SingleChartPage>
  );
}

createRoot(document.getElementById("root")).render(<App />);
