import { authenticateExtra } from "../config/shopify.js";
import { json } from "@remix-run/node";
import Discounts from "../components/discounts/index.jsx";
import { FeatureModel } from "../models/feature.model.js";

const METAFIELD_NAMESPACE = "shipready";
const METAFIELD_KEY = "appSettings";
const METAFIELD_TYPE = "json";

export const loader = async ({ request }) => {
  const { metaobject, metafield } =
    await authenticateExtra(request);
  const features = await metaobject.list(FeatureModel);
  const currentAppMetafield = await metafield.getCurrentAppMetafield(
    METAFIELD_NAMESPACE,
    METAFIELD_KEY,
  );
  
  return json({
    settingsData: currentAppMetafield?.value
      ? JSON.parse(currentAppMetafield?.value)
      : {},
    features
  });
  
};

export async function action({ request }) {
  const { metafield, metaobject } =
    await authenticateExtra(request);
  let formData = Object.fromEntries(await request.formData());

  if (formData.saveSettings) {
    const currentAppOwnerID = await metafield.getCurrentAppOwnerId();
    const metafieldData = {
      namespace: METAFIELD_NAMESPACE,
      key: METAFIELD_KEY,
      value: JSON.stringify(formData),
      type: METAFIELD_TYPE,
      ownerId: currentAppOwnerID,
    };

    const created = await metafield.create(metafieldData);
  }

  if (formData.saveFeatures) {
    try {
      // Check if the MetaObject definition already exists
      let definition;
      try {
        definition = await metaobject.getDefinition({ type: FeatureModel.type });
      } catch (error) {
        // If the definition doesn't exist, create it
        if (error.message.includes("No definition found")) {
          await metaobject.define(FeatureModel);
        } else {
          throw error; // Re-throw if it's a different error
        }
      }

      // Now proceed with create or update
      if (formData.id) {
        await metaobject.update(FeatureModel, formData.id, formData);
      } else {
        await metaobject.create(FeatureModel, formData);
      }
    } catch (e) {
      console.error("Error saving features:", e);
      return json({
        status: {
          success: false,
          message: `Error saving features: ${e.message}`,
        }
      }, { status: 400 });
    }
  }

  if (formData.deleteFeatures) {
    try {
      await metaobject.delete(formData.id);
    } catch (e) {
      console.error("Error deleting feature:", e);
      return json({
        status: {
          success: false,
          message: `Error deleting feature: ${e.message}`,
        }
      }, { status: 400 });
    }
  }

  return json({
    settingsData: formData,
    status: {
      success: true,
      message: "Operation completed successfully",
    }
  });
}

export default function DiscountsPage () {
  return <Discounts />;
}
