import { useLoaderData } from "@remix-run/react";
import {
  Card,
  BlockStack,
  Text,
  List,
  Link,
  EmptyState,
  IndexTable,
  Badge,
  InlineStack,
  Button,
  Box,
} from "@shopify/polaris";
import { EditIcon, DeleteIcon, PlusIcon } from "@shopify/polaris-icons";
import { useState } from "react";
import { AddFeatureModal } from "./addFeatureModal";
import { DeleteFeatureModal } from "./deleteFeatureModal";

export function FeaturesSettings({ selectedTab }) {
  const { features } = useLoaderData();
  const [selected, setSelected] = useState();
  
  const emptyStateMarkup = (
    <EmptyState
      heading="Add New Features"
      action={{
        content: "New Feature",
        onClick: () => shopify.modal.show("add-feature-modal"),
      }}
      image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
    >
      <Text>No features available yet!</Text>
    </EmptyState>
  );

  const listMarkup = features && (
    <IndexTable
      resourceName={{
        singular: "feature",
        plural: "features",
      }}
      itemCount={features?.nodes?.length}
      selectable={false}
      headings={[
        { title: "#" },
        { title: "Name" },
        { title: "Details" },
        { title: "" },
      ]}
    >
      { features?.nodes?.map(({ id, featureName, featureDetails }, i) => (
        <IndexTable.Row id={id} key={i} position={i}>
          <IndexTable.Cell>
            <Text variant="bodyMd" fontWeight="bold" as="span">
              <Badge tone="info">{i + 1}</Badge>
            </Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Text variant="headingSm">{featureName}</Text>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <Box width="200px"><Text variant="bodyMd" truncate={true}>{featureDetails}</Text></Box>
          </IndexTable.Cell>
          <IndexTable.Cell>
            <InlineStack gap="200">
              <Button
                variant="tertiary"
                icon={EditIcon}
                tone="success"
                onClick={() => {
                  setSelected({ id, featureName, featureDetails });
                  shopify.modal.show("add-feature-modal");
                }}
              ></Button>
              <Button
                variant="tertiary"
                icon={DeleteIcon}
                tone="critical"
                // loading={isDeleting == id.split("/").pop()} // shouold handle loading here
                onClick={() => {
                  setSelected({ id, featureName, featureDetails });
                  shopify.modal.show("delete-feature-modal");
                }}
              ></Button>
            </InlineStack>
          </IndexTable.Cell>
        </IndexTable.Row>
      ))}
    </IndexTable>
  );

  return selectedTab !== "features" ? null : (
    <BlockStack gap="400">
      <Card>
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
            Features Settings
          </Text>
          <List>
            <List.Item>
              <Link
                url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                target="_blank"
                removeUnderline
              >
                App nav best practices
              </Link>
            </List.Item>
          </List>
        </BlockStack>
      </Card>
      <BlockStack gap="200">
        {features?.length > 0 && (
          <Box>
            <Button
              icon={PlusIcon}
              variant="primary"
              onClick={() => shopify.modal.show("add-feature-modal")}
            >
              Add
            </Button>
          </Box>
        )}
        <Card padding={0}>
          {features?.nodes?.length > 0 ? listMarkup : emptyStateMarkup}
        </Card>
      </BlockStack>
      <AddFeatureModal selected={selected} setSelected={setSelected} />
      <DeleteFeatureModal selected={selected} setSelected={setSelected} />
    </BlockStack>
  );
}
