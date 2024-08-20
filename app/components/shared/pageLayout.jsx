import { Page } from "@shopify/polaris";
import appConfig from "../../config/app";
import { useActionData } from "@remix-run/react";
import { FooterHelp, Link } from "@shopify/polaris";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";
/**
 * A reusable PageLayout component that wraps the Polaris Page component
 * and applies the desired layout based on the provided props.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered inside the Page.
 * @param {boolean} [props.fullWidth=undefined] - Whether the Page should be full-width.
 * @param {boolean} [props.narrowWidth=false] - Whether the Page should have a narrower width.
 * @param {string} [props.title=""] - The title of the Page.
 * @param {boolean} [props.showBackButton=false] - Whether to show a back button.
 * @returns {React.ReactElement} - The PageLayout component.
 */
export default function PageLayout({
  children,
  fullWidth,
  narrowWidth = false,
  title = "",
  showBackButton = false,
  primaryAction,
}) {
  const { fullWidthPageLayout, showTitleBar } = appConfig;
  const currentYear = new Date().getFullYear();
  const shopify = useAppBridge();

  const pageTitle = showTitleBar ? null : title;
  const backAction =
    showBackButton && !showTitleBar
      ? {
          content: "Back",
          onAction: () => window.history.back(),
        }
      : null;

  // Show a toast message if there is a status message
  const actionData = useActionData();
  useEffect(() => {
    if (actionData?.status && actionData?.status?.message) {
      shopify.toast.show(actionData?.status?.message, {
        isError: actionData?.status?.type === "error",
      });
    }
  }, [actionData]);

  return (
    <Page
      title={pageTitle}
      backAction={backAction}
      primaryAction={primaryAction}
      fullWidth={fullWidth ?? fullWidthPageLayout}
      narrowWidth={narrowWidth}
    >
      {children}

      <FooterHelp align="center">
        En Vinculo
      </FooterHelp>
    </Page>
  );
}
