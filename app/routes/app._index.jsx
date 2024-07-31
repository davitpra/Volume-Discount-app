import { json } from "@remix-run/node";
import { authenticateExtra } from "../config/shopify";
import { Dashboard } from "../components/dashboard";
import { EventModel } from "../models/event.model";

export const loader = async ({ request }) => {
  const { session, shipReady } = await authenticateExtra(request);

  // shop here is passed empty string since the seed data is store with shop as ''
  const sales = await EventModel.list("", { name: "sales" });
  const orders = await EventModel.list("", { name: "orders" });
  const customers = await EventModel.list("", { name: "customers" });
  const revenues = await EventModel.list("", { name: "revenues" });
  const views = await EventModel.list("", { name: "views" });
  const sessions = await EventModel.list("", { name: "sessions" });
  const channelSales = await EventModel.list("", { name: "channelSales" });
  const fulfilledOrders = await EventModel.list("", {
    name: "fulfilledOrders",
  });
  const returningCustomerRates = await EventModel.list("", {
    name: "returningCustomerRates",
  });

  const verifyAppEmbed = await shipReady.verifyAppEmbed();

  return json({
    sales,
    orders,
    customers,
    revenues,
    views,
    sessions,
    channelSales,
    fulfilledOrders,
    returningCustomerRates,
    shop: session.shop,
    verifyAppEmbed,
    uuid: process.env.SHOPIFY_THEME_APP_EXTENSION_ID,
  });
};

export const action = async ({ request }) => {
  const { shipReady } = await authenticateExtra(request);
  const verifyAppEmbed = await shipReady.verifyAppEmbed();

  const isEmbedEnabled = verifyAppEmbed.length > 0 && !verifyAppEmbed[0].disabled;
  const status = {
    message: isEmbedEnabled
      ? "App embed is enabled successfully!"
      : "App embed is still disabled. Please enable it in your theme settings.",
    type: isEmbedEnabled ? "success" : "error",
  };

  return json({
    verifyAppEmbed,
    status,
  });
};

export default function Index() {
  return <Dashboard />;
}
