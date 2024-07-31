import { BlockStack, Card } from "@shopify/polaris";
import { useEffect, useState } from "react";

export const ChartBase = ({ children, theme }) => {
  const [chart, setChart] = useState(null);
  const chartMarkup = (
    <Card background={theme == "Dark" ? "bg-fill-brand" : "bg-fill"}>
      <BlockStack gap="600">{children}</BlockStack>
    </Card>
  );

  useEffect(() => setChart(chartMarkup), []);
  return chart;
};
