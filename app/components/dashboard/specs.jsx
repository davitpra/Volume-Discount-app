import {
  BlockStack,
  Card,
  InlineStack,
  Layout,
  Link,
  Text,
} from "@shopify/polaris";

export const Specs = () => (
  <Layout.Section variant="oneThird">
    <BlockStack gap="500">
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
            ShipReady App
          </Text>
          <BlockStack gap="200">
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd">
                Documentation
              </Text>
              <Link url="https://docs.shipready.dev" target="_blank" removeUnderline>
                Docs
              </Link>
            </InlineStack>
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd">
                Template
              </Text>
              <Link url="https://shipready.dev" target="_blank" removeUnderline>
                ShipReady
              </Link>
            </InlineStack>
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd">
                Database
              </Text>
              <Link
                url="https://www.prisma.io/"
                target="_blank"
                removeUnderline
              >
                Prisma
              </Link>
            </InlineStack>
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd">
                Interface
              </Text>
              <span>
                <Link
                  url="https://polaris.shopify.com"
                  target="_blank"
                  removeUnderline
                >
                  Polaris
                </Link>
                {", "}
                <Link
                  url="https://polaris-viz.shopify.com"
                  target="_blank"
                  removeUnderline
                >
                  Polaris Viz
                </Link>
                {", "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
              </span>
            </InlineStack>
            <InlineStack align="space-between">
              <Text as="span" variant="bodyMd">
                API
              </Text>
              <Link
                url="https://shopify.dev/docs/api/admin-graphql"
                target="_blank"
                removeUnderline
              >
                GraphQL API
              </Link>
            </InlineStack>
          </BlockStack>
        </BlockStack>
      </Card>
    </BlockStack>
  </Layout.Section>
);
