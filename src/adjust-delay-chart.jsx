import { createRoot } from "react-dom/client";
import { LineChart } from "@byted-babi/babi-design/es/Chart";
import "@arco-design/theme-ve-o-design/css/arco.css";
import "@tod-m/materials/es/style/index.css";
import { SingleChartPage } from "./chart-layout";
import { adjustDelayData } from "./chart-data";
import {
  adjustDelayYAxisTicks,
  bottomLegendLeftAlignedProps,
  commonXAxisProps,
  createChartPadding,
  defaultLineProps,
  fullSizeChartComponentProps,
} from "./chart-presets";
import "./adjust-delay-chart.css";
import "./chart-tooltip.css";

function App() {
  return (
    <SingleChartPage checkItem="最早账期调账" title="调账平均滞后时长趋势图">
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
        lineChartProps={createChartPadding(0)}
        lineProps={defaultLineProps}
        legendProps={bottomLegendLeftAlignedProps}
        chartComponentProps={fullSizeChartComponentProps}
      />
    </SingleChartPage>
  );
}

createRoot(document.getElementById("root")).render(<App />);
