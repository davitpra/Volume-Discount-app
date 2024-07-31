import { BlockStack, Box, Icon, InlineStack, Text } from "@shopify/polaris";
import { ArrowUpRight } from "../../../assets/arrowUpRight";
import { ArrowDownRight } from "../../../assets/arrowDownRight";

export const Heading = ({ title, subTitle, fluctuation, isDark = false }) =>
  title && (
    <BlockStack gap="400">
      <InlineStack>
        <Box
          borderStyle="dotted"
          borderBlockEndWidth="050"
          borderColor="border-inverse-hover"
        >
          <Text
            variant="headingSm"
            as="h3"
            tone={isDark ? "text-inverse" : "base"}
          >
            {title}
          </Text>
        </Box>
      </InlineStack>
      {subTitle && (
        <InlineStack blockAlign="center" gap="300">
          <Text variant="headingLg" tone={isDark ? "text-inverse" : "base"}>
            {subTitle}
          </Text>
          {fluctuation && (
            <InlineStack>
              <Icon
                tone={
                  fluctuation > 0
                    ? isDark
                      ? "text-inverse"
                      : "success"
                    : "critical"}
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
          )}
        </InlineStack>
      )}
    </BlockStack>
  );
