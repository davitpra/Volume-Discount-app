import { useNavigation } from "@remix-run/react";
import { useAppBridge } from "@shopify/app-bridge-react";
import { useEffect } from "react";

export default function Loading({ url = null, method = null }) {
  const nav = useNavigation();
  const shopify = useAppBridge();

  useEffect(() => {
    const isLoading =
      (((method &&
        url &&
        nav.formMethod == method &&
        nav.formAction.includes(url)) ||
        (method && nav.formMethod == method) ||
        (url && nav.formAction.includes(url)) ||
        (!url && !method)) &&
        nav.state === "loading") ||
      nav.state === "submitting";
    console.log("loading from the loader .....");

    shopify.loading(isLoading);
  }, [nav]);

  return null;
}
