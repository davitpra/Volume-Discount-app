import {
  Card,
  BlockStack,
  Text,
  List,
  Link,
  Button,
  InlineStack,
} from "@shopify/polaris";
import { DeleteIcon, EyeCheckMarkIcon } from "@shopify/polaris-icons";
import { useState } from "react";

export function ChangeLogs({ selectedTab }) {
  const [changeLogs, setChangeLogs] = useState([
    {
      title: "Change log",
      content: "View the change log for this app",
      link: "#",
    },
    {
      title: "New feature",
      content: "Check out the new feature we just launched",
      link: "#",
    },
    {
      title: "Bug fix",
      content: "We just fixed a bug that was affecting the app",
      link: "#",
    },
    {
      title: "New feature",
      content: "Check out the new feature we just launched",
      link: "#",
    },
    {
      title: "Bug fix",
      content: "We just fixed a bug that was affecting the app",
      link: "#",
    },
    {
      title: "Change log",
      content: "View the change log for this app",
      link: "#",
    },
    {
      title: "New feature",
      content: "Check out the new feature we just launched",
      link: "#",
    },
    {
      title: "Bug fix",
      content: "We just fixed a bug that was affecting the app",
      link: "#",
    },
    {
      title: "Change log",
      content: "View the change log for this app",
      link: "#",
    },
    {
      title: "New feature",
      content: "Check out the new feature we just launched",
      link: "#",
    },
    {
      title: "Bug fix",
      content: "We just fixed a bug that was affecting the app",
      link: "#",
    },
  ]);

  return selectedTab !== "change-log" ? null : (
    <Card>
      <BlockStack gap="200">
        <Text as="h2" variant="headingMd">
          Change logs
        </Text>
        <List>
          {changeLogs.length > 0 ? (
            changeLogs.map((changeLog, index) => (
              <List.Item key={index}>
                <InlineStack
                  gap="200"
                  align="space-between"
                  inlineAlign="center"
                  blockAlign="start"
                >
                  <BlockStack gap="200">
                    <Text as="p" variant="bodyMd" tone="subdued">
                      {changeLog.content}
                    </Text>
                    <Link url={changeLog.link}>{changeLog.title}</Link>
                  </BlockStack>
                  <Button
                    icon={EyeCheckMarkIcon}
                    onClick={() => handleDeleteChangeLog(index)}
                  >
                    View
                  </Button>
                </InlineStack>
              </List.Item>
            ))
          ) : (
            <Card>
              <BlockStack gap="400" inlineAlign="center">
                <Text as="h2" variant="headingMd">
                  No change logs
                </Text>
                <Text as="p" variant="bodyMd" tone="subdued">
                  You have no change logs at the moment!
                </Text>
              </BlockStack>
            </Card>
          )}
        </List>
      </BlockStack>
    </Card>
  );
}
