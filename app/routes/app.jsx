import { json } from "@remix-run/node";
import {
  Outlet,
  useLoaderData,
  useActionData,
  useRouteError,
} from "@remix-run/react";
import { boundary } from "@shopify/shopify-app-remix/server";
import { AppProvider } from "@shopify/shopify-app-remix/react";
import polarisStyles from "@shopify/polaris/build/esm/styles.css?url";
import { authenticate } from "../config/shopify.js";
import { useNavigation } from "@remix-run/react";
import Nav from "../components/nav/index.jsx";
import ChartProvider from "../components/shared/chartProvider.jsx";
import polarisVizStyles from "@shopify/polaris-viz/build/esm/styles.css?url";

import "../assets/custom-styles.css";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";

export const links = () => [
  { rel: "stylesheet", href: polarisStyles },
  { rel: "stylesheet", href: polarisVizStyles },
];

export const loader = async ({ request }) => {
  await authenticate.admin(request);

  return json({ apiKey: process.env.SHOPIFY_API_KEY || "" });
};

export default function App() {
  const { apiKey } = useLoaderData();
  const shopify = useAppBridge();
  // Navigation state and loader
  const nav = useNavigation();

  useEffect(() => {
    if (nav.state === "loading" || nav.state === "submitting") {
      shopify.loading(true);
    }
    if (typeof shopify !== "undefined" && nav.state === "idle" && shopify) {
      shopify.loading(false);
    }
  }, [nav]);

  return (
    <AppProvider isEmbeddedApp apiKey={apiKey}>
      <Nav />
      <ChartProvider>
        <Outlet />
      </ChartProvider>
    </AppProvider>
  );
}

// Shopify needs Remix to catch some thrown responses, so that their headers are included in the response.
export function ErrorBoundary() {
  return boundary.error(useRouteError());
}

export const headers = (headersArgs) => {
  return boundary.headers(headersArgs);
};
