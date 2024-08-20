import { Button, EmptyState, Card} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { PageTitleBar } from "../shared/pageTitleBar";
import PageLayout from "../shared/pageLayout";

export default function Discounts() {
  const { settingsData } = useLoaderData();

  return (
    <PageLayout 
      showBackButton title="Discounts page" 
      primaryAction={
        <Button variant="primary" url="/app/discount/new">New Discount</Button>
      }
    >
      <PageTitleBar title="Discounts" />
        <Card>
          <EmptyState
            heading="Manage your discounts"
            action={{content: 'Add discounts', url: '/app/discounts/new'}}
            secondaryAction={{
              content: 'Learn more',
              url: 'https://help.shopify.com',
            }}
            image="https://cdn.shopify.com/b/shopify-guidance-dashboard-public/m66z0a57ues1gygrane8proz6gqn.svgz"
          >
            <p>Track and receive your incoming inventory from suppliers.</p>
          </EmptyState>
        </Card>
    </PageLayout>
  );
}
