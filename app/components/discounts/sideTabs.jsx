import { ActionList, BlockStack, Card, Icon, Layout } from "@shopify/polaris";
import {
  CheckSmallIcon,
  SettingsIcon,
  NotificationIcon,
  CursorOptionIcon,
  NoteIcon,
} from "@shopify/polaris-icons";

export const SideTabs = ({ setSelectedTab, selectedTab }) => {
  const settingSidebar = [
    {
      title: "App Settings",
      items: [
        {
          content: "General",
          icon: SettingsIcon,
        },
        {
          content: "Features",
          icon: CursorOptionIcon,
        },
        {
          content: "Notifications",
          icon: NotificationIcon,
        },
        {
          content: "Change Log",
          icon: NoteIcon,
        },
      ],
    },
  ];
  return (
    <Layout.Section variant="oneThird">
      <BlockStack gap="400">
        <Card padding="200">
          <ActionList
            actionRole="menuitem"
            sections={settingSidebar.map((option) => {
              return {
                title: option.title,
                items: option.items.map((optionItem) => {
                  const slug = optionItem.content
                    ?.replace(" ", "-")
                    ?.toLowerCase();
                  return {
                    content: optionItem.content,
                    icon: optionItem.icon,
                    active: selectedTab === slug,
                    suffix:
                      selectedTab === slug ? (
                        <Icon source={CheckSmallIcon} />
                      ) : null,
                    onAction: () => {
                      setSelectedTab(slug);
                    },
                  };
                }),
              };
            })}
          />
        </Card>
      </BlockStack>
    </Layout.Section>
  );
};
