// app/app-config.js

import {
  HomeIcon,
  ReceiptDollarFilledIcon,
  QuestionCircleIcon,
  SettingsIcon,
} from "@shopify/polaris-icons";
import { BillingInterval } from "@shopify/shopify-app-remix/server";

const appConfig = {
  // Constants
  IDENTIFIER_PREFIX: "shipready_",
  showSideNavigation: true,
  showTabNavigation: true,
  showTitleBar: false,
  fullWidthPageLayout: true,
  requireAppEmbed: true,
  showLegacyPriceBanner: false,
  // Menu data - Add more menu items as needed
  menuData: [
    {
      label: "Dashboard",
      destination: "/app",
      icon: HomeIcon,
      rel: "home",
    },
    {
      label: "Settings",
      destination: "/app/settings",
      icon: SettingsIcon,
    },
    {
      label: "Pricing",
      destination: "/app/pricing",
      icon: ReceiptDollarFilledIcon,
    },
    {
      label: "FAQ",
      destination: "/app/faq",
      icon: QuestionCircleIcon,
    },
    // Add more menu items as needed
  ],

  // Pricing data
  pricingPlans: [
    {
      name: "Free",
      id: "free",
      amount: 0,
      currencyCode: "USD",
      interval: BillingInterval.Every30Days,
      description: "For small business",
      cta_label: "Upgrade to unlock all features",
      features: [
        "1k pages views & visitors",
        "10 basic features",
        "Basic customisation",
        "Basic support",
      ],
    },

    {
      name: "Pro",
      id: "pro",
      amount: 19,
      currencyCode: "USD",
      trialDays: 7,
      interval: BillingInterval.Every30Days,
      description: "For growing business",
      cta_label: "Start 7-days trial",
      features: [
        "Unlimted pages views & visitors",
        "All features",
        "Customisation",
        "Fast email support",
        "Custom domain",
      ],
    },

    {
      name: "Premium",
      id: "premium",
      subheader: "Most popular",
      amount: 49,
      currencyCode: "USD",
      trialDays: 7,
      interval: BillingInterval.Every30Days,
      description: "For large business",
      cta_label: "Start 7-days trial",
      features: [
        "Unlimted pages views & visitors",
        "All features",
        "Customisation",
        "Dedicated developer support",
        "Priority email support",
        "Custom domain",
        "Custom analytics",
      ],
    },
    {
      name: "Ultimate",
      id: "ultimate",
      subheader: "Most popular",
      amount: 99,
      currencyCode: "USD",
      trialDays: 7,
      interval: BillingInterval.Every30Days,
      description: "For large business",
      cta_label: "Start 7-days trial",
      features: [
        "Unlimted pages views & visitors",
        "All features",
        "Customisation",
        "Dedicated developer support",
        "Priority email support",
        "Custom domain",
        "Custom analytics",
      ],
    },
  ],
};

export default appConfig;
