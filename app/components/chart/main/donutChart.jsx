import { DonutChart as Chart } from "@shopify/polaris-viz";
import { ChartBase } from "./chartBase";
import { Heading } from "./heading";
import EmptyState from "./emptyState";

export const DonutChart = ({
  title,
  subTitle,
  fluctuation,
  data,
  trendMetric,
}) => {
  return (
    <ChartBase>
      <Heading title={title} subTitle={subTitle} fluctuation={fluctuation} />
      {data?.length > 0 ? (
        <Chart
          showLegend={true}
          legendPosition="bottom"
          data={data}
          isAnimated={true}
          labelFormatter={formatValueToCurrancy}
          comparisonMetric={
            trendMetric
              ? parseFloat(trendMetric) > 0
                ? {
                    metric: `${parseFloat(trendMetric)}%`,
                    trend: "positive",
                  }
                : {
                    metric: `${parseFloat(trendMetric)}%`,
                    trend: "negative",
                  }
              : {}
          }
        />
      ) : (
        <EmptyState />
      )}
    </ChartBase>
  );
};
const formatValueToCurrancy = (value) => {
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(1);
    return `${formattedValue}K`;
  } else if (value < 1) {
    return `${value}`;
  } else {
    return `${value}`;
  }
};
