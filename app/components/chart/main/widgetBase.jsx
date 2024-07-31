import { BlockStack, Box, Card } from "@shopify/polaris";
import { useEffect, useState } from "react";

export const WidgetBase = ({ children, theme }) => {
  const [chart, setChart] = useState(null);
  const chartMarkup = (
    <Box>
      <Card padding="0" background={theme == "Dark" ? "bg-fill-brand" : "bg-fill"}>
        <Box paddingBlock="400">
          <BlockStack gap="600">{children}</BlockStack>
        </Box>
      </Card>
    </Box>
  );

  useEffect(() => setChart(chartMarkup), []);
  return chart;
};
