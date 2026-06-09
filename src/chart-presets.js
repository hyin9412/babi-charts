export const bottomLegendLeftAlignedProps = {
  orient: "bottom",
  position: "start",
  offsetX: 0,
  padding: {
    top: 8,
    bottom: 0,
  },
};

export const hiddenLegendProps = {
  visible: false,
};

export const commonXAxisProps = {
  label: {
    autoHide: false,
    space: 2,
  },
};

export const defaultLineProps = {
  point: {
    visible: true,
  },
};

export const emphasizedLineProps = {
  point: {
    visible: true,
  },
  line: {
    style: {
      lineWidth: 2,
    },
  },
};

export const hiddenGridProps = {
  grid: {
    visible: false,
  },
};

export const fullSizeChartComponentProps = {
  style: {
    height: "100%",
    width: "100%",
  },
};

export const adjustDelayYAxisTicks = [0, 2, 4, 6, 8];
export const priceAdjustCountYAxisTicks = [0, 2, 4, 6, 8];

export const integerCountLineProps = {
  point: {
    visible: true,
  },
  line: {
    style: {
      curveType: "linear",
    },
  },
};

export function createChartPadding(bottom = 0) {
  return {
    padding: {
      top: 16,
      left: 0,
      right: 0,
      bottom,
    },
  };
}

export function formatTooltipValueWithUnit(value, unit = "", formatValue = String) {
  if (value == null || value === "-") {
    return "-";
  }

  return `${formatValue(value)}${unit}`;
}

function getTooltipSeriesName(datum) {
  return (
    datum?.series ??
    datum?.key ??
    datum?.name ??
    datum?.label ??
    datum?.title ??
    datum?.datum?.series ??
    datum?.datum?.key ??
    datum?.datum?.name
  );
}

export function createSeriesUnitTooltipProps(seriesUnitMap, formatValueBySeries = {}) {
  const seriesNames = Object.keys(seriesUnitMap ?? {});
  const fallbackSeriesName = seriesNames.length === 1 ? seriesNames[0] : undefined;
  const tooltipContent = {
    key: (datum) => getTooltipSeriesName(datum) ?? "-",
    value: (datum) => {
      const seriesName = getTooltipSeriesName(datum) ?? fallbackSeriesName;
      const value = datum?.value ?? datum?.datum?.value;
      const unit = seriesUnitMap?.[seriesName] ?? "";
      const formatValue = formatValueBySeries?.[seriesName] ?? String;

      return formatTooltipValueWithUnit(value, unit, formatValue);
    },
  };

  return {
    mark: {
      content: tooltipContent,
    },
    dimension: {
      content: tooltipContent,
    },
  };
}
