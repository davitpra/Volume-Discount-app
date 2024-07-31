import {
  Badge,
  BlockStack,
  Box,
  Button,
  Card,
  Divider,
  Grid,
  Icon,
  InlineStack,
  Layout,
  Text,
} from "@shopify/polaris";
import { Form } from "@remix-run/react";
import { useState } from "react";
import { CheckCircleIcon } from "@shopify/polaris-icons";
import appConfig from "../../config/app";

const { pricingPlans } = appConfig;

export const Plans = ({ currentPlan }) => {
  const [loading, setLoading] = useState(pricingPlans.map((p) => false));

  return (
    <Layout.Section>
      <Grid columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 3 }}>
        {pricingPlans?.map((plan, index) => (
          <Grid.Cell key={index}>
            <Card
              background={
                currentPlan?.name.toLowerCase() == plan.name.toLowerCase()
                  ? "bg-surface-success"
                  : "bg-surface"
              }
            >
              <BlockStack gap="100">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text variant="headingLg" as="h2">
                    {plan.name}
                  </Text>
                  {currentPlan?.name.toLowerCase() ==
                    plan.name.toLowerCase() && (
                    <Badge tone="info">Current plan</Badge>
                  )}
                </div>

                <Text tone="success" fontWeight="bold" variant="bodyLg">
                  {plan.amount == "0" ? "Free" : "$" + plan.amount}
                  <Text
                    tone="subdued"
                    as="span"
                    fontWeight="medium"
                    variant="bodyMd"
                  >
                    / month
                  </Text>
                </Text>
                <Text> {plan.description} </Text>
              </BlockStack>

              <div style={{ margin: "0.5rem" }}></div>

              <BlockStack gap="150">
                <Divider />

                {plan.features.map((feature, index) => (
                  <InlineStack
                    key={index}
                    blockAlign="center"
                    gap="100"
                    wrap={false}
                  >
                    <Box as="span" width="20px">
                      <Icon source={CheckCircleIcon} tone="success" />
                    </Box>
                    <Box as="span" width="100%">
                      <Text>{feature}</Text>
                    </Box>
                  </InlineStack>
                ))}
              </BlockStack>

              <div style={{ margin: "1rem" }}></div>

              {currentPlan?.name.toLowerCase() != plan?.name.toLowerCase() &&
                plan?.name.toLowerCase() != "free" && (
                  <Form method="POST">
                    <input type="hidden" value={plan.id} name="plan" />
                    <Button
                      variant="primary"
                      loading={loading[index]}
                      submit
                      fullWidth
                      onClick={() => {
                        let newLoading = [...loading];
                        newLoading[index] = true;
                        setLoading(newLoading);
                      }}
                    >
                      {plan.cta_label}
                    </Button>
                  </Form>
                )}

              {currentPlan?.name.toLowerCase() === plan?.name.toLowerCase() &&
                plan?.name.toLowerCase() != "free" && (
                  <Button
                    variant="primary"
                    tone="critical"
                    loading={loading[index]}
                    submit
                    fullWidth
                    onClick={(e) => {
                      e.preventDefault();
                      shopify.modal.show("cancel-plan-modal");
                    }}
                  >
                    Cancel plan
                  </Button>
                )}

              {/* If user is on free plan, show upgrade button with correct plan selector based on order count */}
              {currentPlan?.name.toLowerCase() == "free" &&
                plan?.name.toLowerCase() == "free" && (
                  <Form method="POST">
                    <input type="hidden" value="pro" name="plan" />
                    <Button
                      variant="primary"
                      loading={loading[index]}
                      submit
                      onClick={() => {
                        let newLoading = [...loading];
                        newLoading[index] = true;
                        setLoading(newLoading);
                      }}
                      fullWidth
                    >
                      {plan.cta_label}
                    </Button>
                  </Form>
                )}
            </Card>
          </Grid.Cell>
        ))}
      </Grid>
    </Layout.Section>
  );
};
