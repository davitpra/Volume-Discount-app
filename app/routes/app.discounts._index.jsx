import { authenticateExtra } from "../config/shopify.js";
import { json } from "@remix-run/node";
import Discounts from "../components/discounts/index.jsx";
import { VolumeDiscountWithIDModel } from "../models/volumeDiscountWithID.model.js";
import { Discount } from "../entities/discount.js"

export const loader = async ({ request }) => {
  const { metaobject } = await authenticateExtra(request);

  // Get the cursor from the URL query string for the pagination
  const url= new URL(request.url);
  const cursor = url.searchParams.get("cursor");
  const limit =  4;
  const volumeDiscounts = await metaobject.list(VolumeDiscountWithIDModel, limit, cursor);

  return json({volumeDiscounts});
  
};

export async function action({ request }) {
  
  // obtain the metafield and metaobject objects from the request
  const {admin,  metaobject } = await authenticateExtra(request);

  // Parse the form data
  let formData = await request.json();

  // crear a new discount object
  const discount = new Discount(admin);

  // Check if the form data is for DELETING a feature
  if (formData.deleteObject) {

    // Delete the feature
    try {
      // Delete the metaObject
      await metaobject.delete(formData.objectId);
      // Delete the discount from the shopify store
      await discount.deleteAutomatic(formData.discountId);
    } catch (e) {
      console.error("Error deleting feature:", e);
      return json({
        status: {
          success: false,
          message: `Error deleting feature: ${e.message}`,
        }
      }, { status: 400 });
    }
;
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
