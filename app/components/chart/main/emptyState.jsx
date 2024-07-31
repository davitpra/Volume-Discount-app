import { Box, Text } from "@shopify/polaris";

export default function EmptyState({
  text = "There was no data found.",
  minHeight = 300,
}) {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: minHeight + "px",
        width: "100%",
      }}
    >
      <Text variant="bodyMd" tone="subdued" as="p" alignment="center">
        {text}
      </Text>
    </Box>
  );
}
