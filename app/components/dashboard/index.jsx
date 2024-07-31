import { Layout } from "@shopify/polaris";
import { PageTitleBar } from "../shared/pageTitleBar";
import { GetStarted } from "./getStarted";
import { AppEmbedStatus } from "./appEmbedStatus";
import { Specs } from "./specs";
import { Analytics } from "./analytics";
import PageLayout from "../shared/pageLayout";

export const Dashboard = () => {
  return (
    <PageLayout>
      <PageTitleBar title="ShipReady App" />
      <Layout>
        <AppEmbedStatus />
        <GetStarted />
        <Specs />
        <Analytics />
      </Layout>
    </PageLayout>
  );
};
