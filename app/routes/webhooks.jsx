import { authenticate } from "../config/shopify.js";
import db from "../config/db.js";
import { WebhookModel } from "../models/webhook.model.js";

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } =
    await authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }
  /**
   * Webhooks are stored to webhook table.
   * use as reference https://shopify.dev/docs/api/webhooks?reference=toml
   */
  await WebhookModel.create({ shop, topic, payload });

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }
      break;
    case "CUSTOMERS_DATA_REQUEST":
      /**
       * Customers can request their data from a store owner. When this happens, Shpify we call this endpoint so
       * Here write your business logic for handling this event!
       */
      break;
    case "CUSTOMERS_REDACT":
      /**
       * Store owners can request that data is deleted on behalf of a customer.
       * When this happens, Shopify sends a payload on the customers/redact topic to the apps installed on that store.
       * Here write your business logic for handling this event!
       */
      break;
    case "SHOP_REDACT":
      /**
       * 48 hours after a store owner uninstalls your app, Shopify sends a payload on the shop/redact topic.
       * This webhook provides the store's shop_id and shop_domain so that you can erase data for that store from your database.
       * Here write your business logic for handling this event!
       */
      break;
    default:
      /** If the webhook is not added to this switch-case the will be responded ith 404 */
      throw new Response("Unhandled webhook topic", { status: 404 });
  }
  throw new Response({}, { status: 200 });
};
