import { authenticateExtra } from "../config/shopify.js";
import { json } from "@remix-run/node";
import Pricing from "../components/pricing/index.jsx";
import appConfig from "../config/app.js";

const METAFIELD_NAMESPACE = "shipready";
const METAFIELD_KEY = "paid";
const METAFIELD_TYPE = "boolean";

const { pricingPlans } = appConfig;

export async function loader({ request }) {
  const { billing } = await authenticateExtra(request);
  const plans = pricingPlans.map(plan => plan.id.toUpperCase());

  const { hasActivePayment, appSubscriptions } = await billing.check({
    plans,
    isTest: isTestMode(),
  });

  return json({ hasActivePayment, appSubscriptions });
}

export async function action({ request }) {
  const { billing, session, metafield } = await authenticateExtra(request);
  const { plan, cancel } = Object.fromEntries(await request.formData());
  const userShop = session.shop.replace(".myshopify.com", "");
  const currentAppOwnerID = await metafield.getCurrentAppOwnerId();

  if (plan) {
    await updateMetafieldAndPlan(metafield, currentAppOwnerID, plan !== "free", billing, plan, userShop);
  } else if (cancel) {
    await updateMetafieldAndCancelPlan(metafield, currentAppOwnerID, billing, cancel);
  }

  return null;
}

async function updateMetafieldAndPlan(metafield, ownerId, isPaid, billing, plan, userShop) {
  await updateMetafield(metafield, ownerId, isPaid);
  await handlePlanSelection(billing, plan, userShop);
}

async function updateMetafieldAndCancelPlan(metafield, ownerId, billing, subscriptionId) {
  await updateMetafield(metafield, ownerId, false);
  await handlePlanCancellation(billing, subscriptionId);
}

async function updateMetafield(metafield, ownerId, isPaid) {
  const metafieldData = {
    namespace: METAFIELD_NAMESPACE,
    key: METAFIELD_KEY,
    value: isPaid.toString(),
    type: METAFIELD_TYPE,
    ownerId,
  };

  await metafield.create(metafieldData);
}

async function handlePlanSelection(billing, plan, userShop) {
  const planUpperCase = plan.toUpperCase();
  await billing.require({
    plans: [planUpperCase],
    isTest: isTestMode(),
    onFailure: async () => requestBilling(billing, planUpperCase, userShop),
  });
}

async function handlePlanCancellation(billing, subscriptionId) {
  await billing.cancel({
    subscriptionId,
    isTest: isTestMode(),
    prorate: true,
  });
}

async function requestBilling(billing, plan, userShop) {
  return billing.request({
    plan,
    isTest: isTestMode(),
    returnUrl: `https://admin.shopify.com/store/${userShop}/apps/${process.env.APP_HANDLE}/app/pricing`
  });
}

function isTestMode() {
  return process.env.TESTMODE === "true";
}

export default function PricingPage() {
  return <Pricing />;
}