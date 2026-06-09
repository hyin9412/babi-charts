import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? "/",
  plugins: [react()],
  resolve: {
    alias: {
      roughjs: fileURLToPath(
        new URL("./node_modules/roughjs/bundled/rough.esm.js", import.meta.url),
      ),
      "@arco-design/iconbox-react-ve-o-design":
        fileURLToPath(
          new URL(
            "./node_modules/@arco-design/iconbox-react-ve-o-design/esm/index.js",
            import.meta.url,
          ),
        ),
    },
  },
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        costProfitMarginTrendChart: "pages/cost-profit-margin-trend-chart.html",
        adjustDelayChart: "pages/adjust-delay-chart.html",
        backtrackAmountRatioChart: "pages/backtrack-amount-ratio-chart.html",
        pricingDeviationAdjustTrendChart: "pages/pricing-deviation-adjust-trend-chart.html",
        priceAdjustCountTrendChart: "pages/price-adjust-count-trend-chart.html",
        unhandledAmountTrendChart: "pages/unhandled-amount-trend-chart.html",
      },
    },
  },
});
