import { Box, Grid, InlineStack, Layout } from "@shopify/polaris";
import { TotalRevenue } from "../chart/totalRevenue";
import { ReturningCustomerRate } from "../chart/returningCustomerRate";
import { TotalSales } from "../chart/totalSales";
import { SalesByChannels } from "../chart/salesByChannels";
import { SessionsByDeviceType } from "../chart/sessionsByDeviceType";
import { UserViews } from "../chart/userViews";
import { TotalOrders } from "../chart/totalOrders";
import { CustomerOverTime } from "../chart/customerOverTime";
import { FulfilledOrdersOverTime } from "../chart/fulfilledOrdersOverTime";
import { TotalVolumeDiscountViews } from "../chart/totalVolumeDiscountViews";

export const Analytics = () => (
  <>
    <Layout.Section>
      <Grid columns={{ xs: 1, sm: 2, md: 4, lg:4, xl:4 }} gap="400">
          <TotalVolumeDiscountViews />
          <TotalRevenue />
          <TotalOrders />
          <CustomerOverTime />
          <FulfilledOrdersOverTime />
      </Grid>
    </Layout.Section>

    <Layout.Section>
      <Grid columns={{ xs: 1, sm: 1, md:2, lg:2, xl:2 }} gap="400">
          <UserViews />
          <ReturningCustomerRate />
      </Grid>
    </Layout.Section>

    <Layout.Section>
      <TotalSales />
    </Layout.Section>

    <Layout.Section>
      <Grid columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }} gap="400">
        <SalesByChannels />
        <SessionsByDeviceType />
      </Grid>
    </Layout.Section>
  </>
);
