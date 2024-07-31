import {
  BlockStack,
  Card,
  Image,
  InlineStack,
  Layout,
  Text,
} from "@shopify/polaris";

export const Heading = ({ currentPlan }) => (
  <Layout.Section>
    <Card>
      <InlineStack align="space-between">
        <BlockStack gap="200">
          <Text variant="headingMd" fontWeight="semibold">
            Please select a plan that suits your business
          </Text>

          <Text tone="subdued">
            You are currently on the <strong>{currentPlan?.name}</strong> plan
            and have
            {currentPlan?.name.toLowerCase() == "free"
              ? "limited"
              : "unlimited"}
            access to all the features.
            <br />
            Please read the FAQ section below for more information.
          </Text>
        </BlockStack>
        <Image
          source="https://cdn.shopify.com/s/files/1/0725/8836/2008/files/bill.png?v=1685711340"
          alt="Billing guide"
          style={{ width: "90px", height: "90px" }}
        />
      </InlineStack>
    </Card>
  </Layout.Section>
);
