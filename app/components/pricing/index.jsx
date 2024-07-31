import { Layout } from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { CancelPlanModal } from "./cancelPlanModal";
import { Heading } from "./heading";
import { LegacyPlan } from "./legacyPlan";
import { Plans } from "./plans";
import { PageTitleBar } from "../shared/pageTitleBar";
import PageLayout from "../shared/pageLayout";

export default function Pricing() {
  const { appSubscriptions } = useLoaderData();
  const [currentPlan = { name: "Free", lineItems: [] }] = appSubscriptions;

  return (
    <PageLayout showBackButton title="Pricing page">
      <PageTitleBar title="Pricing page" />
      <Layout>
        <Heading currentPlan={currentPlan} />
        <LegacyPlan currentPlan={currentPlan} />
        <Plans currentPlan={currentPlan} />
        <CancelPlanModal currentPlan={currentPlan} />
      </Layout>
    </PageLayout>
  );
}
