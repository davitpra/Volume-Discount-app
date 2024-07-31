import { TitleBar } from "@shopify/app-bridge-react";
import appConfig from "../../config/app";

const { showTitleBar } = appConfig;

/**
 * A reusable PageTitleBar component that conditionally renders a TitleBar based on the app configuration.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to be displayed in the TitleBar.
 * @returns {React.ReactElement|null} - The PageTitleBar component, or null if the TitleBar should not be displayed.
 */
export const PageTitleBar = ({ title }) =>
  showTitleBar && <TitleBar title={title} />;
