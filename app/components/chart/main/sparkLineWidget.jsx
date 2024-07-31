// Returning customer rate
import { SparkLineChart as Chart } from "@shopify/polaris-viz";
import { WidgetBase } from "./widgetBase";
import { WidgetHeading } from "./widgetHeading";
import EmptyState from "./emptyState";

export const SparkLineWidget = ({ title, subTitle, fluctuation, data }) => {
  const theme = "Light";
  return (
    <WidgetBase theme={theme}>
      <WidgetHeading
        title={title}
        subTitle={subTitle}
        fluctuation={fluctuation}
        isDark={theme == "Dark"}
      />
     {data.length > 0 ? <Chart
        showLegend={true}
        theme={theme}
        data={data}
        isAnimated={true}
        yAxisOptions={{
          labelFormatter: formatValueToCurrancy,
        }}
      /> : <EmptyState text="No data found." minHeight="20"/>}
    </WidgetBase>
  );
};

const formatValueToCurrancy = (value) => {
  if (typeof value !== "number" || isNaN(value)) {
    throw new Error("Input value must be a valid number.");
  }
  if (value >= 1000) {
    const formattedValue = (value / 1000).toFixed(0);
    return `${formattedValue}K`;
  } else if (value < 1) {
    return `${value}`;
  } else {
    return `${value}`;
  }
};
