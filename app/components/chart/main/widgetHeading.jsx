import { BlockStack, Box, Icon, InlineStack, Text } from "@shopify/polaris";
import { ArrowUpRight } from "../../../assets/arrowUpRight";
import { ArrowDownRight } from "../../../assets/arrowDownRight";

export const WidgetHeading = ({
  title,
  subTitle,
  fluctuation,
  isDark = false,
}) =>
  title && (
    <Box paddingInline="400">
      <BlockStack gap="200">
        <Text
          variant="headingSm"
          as="h3"
          tone={isDark ? "text-inverse" : "base"}
        >
          {title}
        </Text>
        {subTitle && (
          <BlockStack gap="200">
            <Text variant="headingLg" tone={isDark ? "text-inverse" : "base"}>
              {subTitle}
            </Text>

            {fluctuation && (
              <Box style={{ 
                display: "flex", 
                justifyContent: "start",
                alignItems: "start",
                width: "62px",
                gap: "4px"
                }}>
                <InlineStack blockAlign="center" gap="100">
                  <Icon
                    tone={
                      fluctuation > 0
                        ? isDark
                          ? "text-inverse"
                          : "success"
                        : "critical"
                    }
                    source={fluctuation > 0 ? ArrowUpRight : ArrowDownRight}
                  />

                  <Text
                    tone={
                      fluctuation > 0
                        ? isDark
                          ? "text-inverse"
                          : "success"
                        : "critical"
                    }
                    variant="bodySm"
                    fontWeight="semibold"
                  >
                    {parseFloat(fluctuation)}% 
                  </Text>
                </InlineStack>
              </Box>
            )}
          </BlockStack>
        )}
      </BlockStack>
    </Box>
  );
