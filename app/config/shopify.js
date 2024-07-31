import "@shopify/shopify-app-remix/adapters/node";
import {
  AppDistribution,
  DeliveryMethod,
  shopifyApp,
  LATEST_API_VERSION,
  ApiVersion
} from "@shopify/shopify-app-remix/server";
import { PrismaSessionStorage } from "@shopify/shopify-app-session-storage-prisma";
import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";
import prisma from "./db.js";
import appConfig from "./app.js";
import { MetaObject } from "../entities/metaobject.js";
import { Metafield } from "../entities/metafield.js";
import { ShipReady } from "../entities/shipready.js";
import { Webhook } from "../entities/webhook.js";

console.log("---------- LATEST_API_VERSION: ", LATEST_API_VERSION, "----------");
console.log("---------- Available ApiVersions: ", ApiVersion, "----------");

/*
 * Transform appConfig.pricingPlans into an object (pricingPlans) where each key is the plan ID in uppercase,
 * and each value is an object containing the plan's amount, currencyCode, and interval.
 *
 */

const pricingPlans = appConfig.pricingPlans.reduce(
  (accumulatedPlans, currentPlan) => {
    const planId = currentPlan.id.toUpperCase();
    const planDetails = {
      amount: currentPlan.amount,
      currencyCode: currentPlan.currencyCode,
      interval: currentPlan.interval,
    };

    accumulatedPlans[planId] = planDetails;
    return accumulatedPlans;
  },
  {},
);

const shopify = shopifyApp({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET || "",
  apiVersion: ApiVersion.July24,
  scopes: process.env.SCOPES?.split(","),
  appUrl: process.env.SHOPIFY_APP_URL || "",
  authPathPrefix: "/auth",
  sessionStorage: new PrismaSessionStorage(prisma),
  distribution: AppDistribution.AppStore,
  restResources,
  billing: pricingPlans,
  webhooks: {
    APP_UNINSTALLED: {
      deliveryMethod: DeliveryMethod.Http,
      callbackUrl: "/webhooks",
    },
  },
  hooks: {
    afterAuth: async ({ session }) => {
      shopify.registerWebhooks({ session });
    },
  },
  future: {
    unstable_newEmbeddedAuthStrategy: true,
  },
  ...(process.env.SHOP_CUSTOM_DOMAIN
    ? { customShopDomains: [process.env.SHOP_CUSTOM_DOMAIN] }
    : {}),
});

export default shopify;
export const apiVersion = LATEST_API_VERSION;
export const addDocumentResponseHeaders = shopify.addDocumentResponseHeaders;
export const authenticate = shopify.authenticate;
export const unauthenticated = shopify.unauthenticated;
export const login = shopify.login;
export const registerWebhooks = shopify.registerWebhooks;
export const sessionStorage = shopify.sessionStorage;

export const authenticateExtra = async (request) => {
  const { admin, billing, cors, redirect, session, sessionToken } =
    await authenticate.admin(request);
  const metaobject = new MetaObject(admin);
  const metafield = new Metafield(admin);
  const shipReady = new ShipReady(admin, session);
  const webhook = new Webhook(admin, session);

  return {
    metaobject,
    metafield,
    shipReady,
    webhook,
    admin,
    billing,
    cors,
    redirect,
    session,
    sessionToken,
  };
};

export const authenticateProxy = async (request) => {
  const { admin, session, storefront } =
    await authenticate.public.appProxy(request);
  const metaobject = new MetaObject(admin);
  const metafield = new Metafield(admin);
  return {
    metaobject,
    metafield,
    admin,
    session,
    storefront,
  };
};
