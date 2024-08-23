import { json } from "@remix-run/react";
import { DiscountForm } from "../components/discounts/discountForm";
import { authenticateExtra } from "../config/shopify";
import { VolumeDiscountModel } from "../models/volumeDiscount.model";

export const loader = async ({ request }) => {
  // authenticate extra is a custome hook that we created tio get some extra information from the request
  const { admin } = await authenticateExtra(request);
  return json({});
};

export const action = async ({ request }) => {
  // authenticate extra is a custome hook that we created tio get some extra information from the request
  const { admin, metaobject } = await authenticateExtra(request);

  let formData = await request.json();

  // Check if the form was saved as new discount
  if (formData.saveDiscount) {
    try {
      const newDiscount = await saveDiscount(formData, metaobject);
      return redirect(`/app/discounts/edit/${newDiscount.id.split("/").pop()}`);
    } catch (error) {
      return json({
        status: {
          success: false,
          message: `Error saving discount: ${error.message}`,
        }
      }, { status: 400 });
    }
  }

  return json({});
};

export default function NewDiscountPage() {
  return <DiscountForm />;
}

// Helper fuctions
async function saveDiscount(formData, metaobject) {

  // Prepare the data to be saved in the format that the MetaObject expects, not null values are allowed
  const newData = {
    title: formData.title,
    products_reference: JSON.stringify(formData.products.flatMap(g => (g.variants.map(v => v.id)))),
    products: JSON.stringify(formData.products),
    discountValues: JSON.stringify(formData.discountValues), 
    isActive: formData.isActive ? 'true' : 'false',
    combinesWith: JSON.stringify(formData.combinesWith),
    createdAt: new Date().toISOString(),
  };
  
  try {
    // Check if the MetaObject definition already exists
    let definition;
    try {
      //check if the definition already exists
      definition = await metaobject.getDefinition({ type: VolumeDiscountModel.type });
    } catch (error) {
      // If the definition doesn't exist, create it
      if (error.message.includes("No definition found")) {
        await metaobject.define(VolumeDiscountModel);
      } else {
        throw error; // Re-throw if it's a different error
      }
    }

    // Create the new discount
    const createdDiscount = await metaobject.create(VolumeDiscountModel, newData);
    return createdDiscount;

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