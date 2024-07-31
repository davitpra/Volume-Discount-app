import { BlockStack, Card, Layout, Link, Text } from "@shopify/polaris";

export const GetStarted = () => (
  <Layout.Section>
    <Card>
      <BlockStack gap="600">
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
          Welcome Aboard! 🎉
          </Text>
          <Text variant="bodyMd" as="p">
            Congratulations on kickstarting your Shopify app journey with ShipReady! You're now equipped with a powerful toolkit designed for success.
          </Text>
        </BlockStack>
        <BlockStack gap="200">
          <Text as="h3" variant="headingMd">
            Your Next Steps
          </Text>
          <Text as="p" variant="bodyMd">
            Ready to bring your app to life? Explore our comprehensive documentation and dive into our step-by-step video tutorials. Your path to launching a standout Shopify app starts {" "}
            <Link url="https://docs.shipready.dev" target="_blank" removeUnderline>
              here!
            </Link>

          </Text>
        </BlockStack>
      </BlockStack>
    </Card>
  </Layout.Section>
);
