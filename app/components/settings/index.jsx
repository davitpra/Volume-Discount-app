import { Layout } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { PageTitleBar } from "../shared/pageTitleBar";
import { SideTabs } from "./sideTabs";
import { GeneralSettings } from "./generalSettings";
import { FeaturesSettings } from "./featuresSettings";
import { NotificationsSettings } from "./notificationsSettings";
import { ChangeLogs } from "./changeLogs";
import PageLayout from "../shared/pageLayout";

export default function Settings() {
  const { settingsData } = useLoaderData();
  const [settings, setSettings] = useState(settingsData);
  const [selected, setSelected] = useState("general");

  return (
    <PageLayout showBackButton title="Settings page">
      <PageTitleBar title="Settings page" />
      <Layout>
        <SideTabs setSelectedTab={setSelected} selectedTab={selected} />

        <Layout.Section>
          <GeneralSettings
            settings={settings}
            setSettings={setSettings}
            selectedTab={selected}
          />
          <FeaturesSettings selectedTab={selected} />
          <NotificationsSettings selectedTab={selected} />
          <ChangeLogs selectedTab={selected} />
        </Layout.Section>
      </Layout>
    </PageLayout>
  );
}
