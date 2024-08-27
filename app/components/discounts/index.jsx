import { Button, EmptyState, Card} from "@shopify/polaris";
import { useLoaderData } from "@remix-run/react";
import { PageTitleBar } from "../shared/pageTitleBar";
import PageLayout from "../shared/pageLayout";
import ShipReadyTable from "../shared/shipReadyTable";

export default function Discounts() {
  // useLoaderData() returns the data that the loader function returned from the route file
  const { volumeDiscounts } = useLoaderData();

  // Define the headings for the table
  const headings = [
    { title: 'Title' },
    { title: 'Status' },
    { title: 'Created At' },
    { title: 'Actions' },
  ];

  return (
    <PageLayout 
      showBackButton title="Discounts page" 
      primaryAction={
        <Button variant="primary" url="/app/discounts/new">New Discount</Button>
      }
    >
      <PageTitleBar title="Discounts" />
      {volumeDiscounts.nodes.length < 1 ? (
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
       ) : (
        <ShipReadyTable
          data={volumeDiscounts}
          resourceName={{ singular: 'Volume discount', plural: 'Volume discounts', handle: 'discounts' }}
          selectable={false}
          headings={headings}
          pagination={true}
          actions={true}
        />
      )}
    </PageLayout>
  );

}
