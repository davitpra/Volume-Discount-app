import { json } from "@remix-run/react";
import { DiscountForm } from "../components/discounts/discountForm";
import { authenticate } from "../config/shopify";

export const loader = async ({ request }) => {
  const { admin } = await authenticate.admin(request);
  return json({});
};

export const action = async ({ request }) => {
  // todo handle the action only if needed!
};

export default function NewDiscountPage() {
  return <DiscountForm />;
}
