import { PolarisVizProvider } from "@shopify/polaris-viz";

export default function ChartProvider({ children }) {
  const themes = {
    Light: {
      chartContainer: {
        borderRadius: "0",
        padding: "0",
        minHeight: 300,
      },
      grid: {
        horizontalOverflow: false,
        horizontalMargin: 0,
        verticalOverflow: false,
      },
      yAxis: {},
    },
    Dark: {
      chartContainer: {
        borderRadius: "0",
        padding: "0",
        minHeight: 300,
        backgroundColor: " #303030",
      },
      grid: {
        horizontalOverflow: false,
        horizontalMargin: 0,
        verticalOverflow: false,
      },
      yAxis: {},
    },
  };
  return <PolarisVizProvider themes={themes}>{children}</PolarisVizProvider>;
}
