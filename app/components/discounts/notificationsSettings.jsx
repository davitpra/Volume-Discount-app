import { BlockStack, Text, Button, Card, ButtonGroup } from "@shopify/polaris";
import { FeedbackCard } from "./feedbackCard";
import { OrderIcon, ProductIcon, RewardIcon } from "@shopify/polaris-icons";
import { useState } from "react";

export function NotificationsSettings({ selectedTab }) {
  const [notifications, setNotifications] = useState([
    {
      title: "New order",
      content: "You have a new order from John Doe",
      icon: OrderIcon,
      actions: (
        <ButtonGroup>
          <Button>View order</Button>
        </ButtonGroup>
      ),
    },
    {
      title: "Low inventory",
      content: "You have 2 items with low inventory",
      icon: ProductIcon,
      actions: (
        <ButtonGroup>
          <Button>View products</Button>
        </ButtonGroup>
      ),
    },
    {
      title: "New review",
      content: "You have a new review from Jane Doe",
      icon: RewardIcon,

      actions: (
        <ButtonGroup>
          <Button>View review</Button>
        </ButtonGroup>
      ),
    },
  ]);

  const handleDeleteNotification = (indexToDelete) => {
    setNotifications((currentNotifications) =>
      currentNotifications.filter((_, index) => index !== indexToDelete),
    );
  };

  return selectedTab !== "notifications" ? null : (
    <BlockStack gap="400">
      <Text as="h2" variant="headingMd">
        Notifications
      </Text>

      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <FeedbackCard
            key={index}
            {...notification}
            onDelete={() => handleDeleteNotification(index)}
          />
        ))
      ) : (
        <Card>
          <BlockStack gap="400" inlineAlign="center">
            <Text as="h2" variant="headingMd">
              No notifications
            </Text>
            <Text as="p" variant="bodyMd" tone="subdued">
              You have no notifications at the moment!
            </Text>
            <Button variant="primary">Refresh</Button>
          </BlockStack>
        </Card>
      )}
    </BlockStack>
  );
}
