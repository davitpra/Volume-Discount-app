import { Banner, Layout, Text } from "@shopify/polaris";
import appConfig from "../../config/app";

const { pricingPlans, showLegacyPriceBanner } = appConfig;

export const LegacyPlan = ({ currentPlan }) => {
  // A user is on a legacy plan if their current plan price doesn't match any of the new plans
  const isLegacyPlan = !pricingPlans.some(
    (plan) =>
      plan.amount ==
      currentPlan?.lineItems[0]?.plan.pricingDetails.price.amount,
  );

  return (
    isLegacyPlan &&
    showLegacyPriceBanner && (
      <Layout.Section>
        <Banner title="Legacy plan">
          <Text>
            You are currently on a legacy plan. Please consider upgrading to a
            new plan to unlock all the features.
          </Text>
          <Text>
            You're currently paying
            <strong>
              $
              {parseFloat(
                currentPlan.lineItems[0].plan.pricingDetails.price.amount,
              ).toFixed(0)}
            </strong>
            per month.
          </Text>
        </Banner>
      </Layout.Section>
    )
  );
};
