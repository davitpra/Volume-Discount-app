import { json, redirect} from "@remix-run/react";
import { DiscountForm } from "../components/discounts/discountForm";
import { authenticateExtra } from "../config/shopify";
import { VolumeDiscountModel } from "../models/volumeDiscount.model";
import { VolumeDiscountWithIDModel } from "../models/volumeDiscountWithID.model";
import { Discount } from "../entities/discount";

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
      const newDiscount = await saveDiscount(admin,formData, metaobject);

      //check if status is false
      if(newDiscount.status && !newDiscount.status.success) {
        return json({
          status: {
            success: false,
            message: newDiscount.status.message,
          }
        }, { status : 400 });
      }

      // Redirect to the edit page of the new discount
      const newDiscountId = newDiscount.id.split("/").pop();
      return redirect(`/app/discounts/edit/${newDiscountId}`);

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
async function saveDiscount(admin, formData, metaobject) {

  //create a new discount 
  const discount = new Discount(admin);

  // new object to store the only discount values necesary to create the discount
  const formattedDiscountValues = formData.discountValues.map(discount => ({
    discount_message: discount.discount_message,
    discount_type: discount.discount_type,
    quantity: discount.quantity,
    value: discount.value,
  }))

  try {

    // Create the discount in Shopify
    const result = await discount.createAutomatic({
      title: formData.title,
      functionId: process.env.SHOPIFY_VOLUME_DISCOUNT_ID,
      startsAt: new Date(),
      endsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      combinesWith: formData.combinesWith,
      metafields:[
        {
          namespace: "$app:volume-discount",
          key: "function-configuration",
          type: "json",
          value: JSON.stringify({
            title: formData.title,
            discountValue: formattedDiscountValues,
            variants: formData.products.flatMap(g => (g.variants.map(v => v.id))),
          })
        }
      ]
    });

    // Prepare the data to be saved in the format that the MetaObject expects, not null values are allowed
    const newDataWithID = {
      title: formData.title,
      discountId: result.discountId, // id of the discount in the shopify store
      products_reference: JSON.stringify(formData.products.flatMap(g => (g.variants.map(v => v.id)))),
      products: JSON.stringify(formData.products),
      discountValues: JSON.stringify(formData.discountValues), 
      isActive: formData.isActive ? 'true' : 'false',
      combinesWith: JSON.stringify(formData.combinesWith),
      createdAt: new Date().toISOString(),
    };
      
    // Check if the MetaObject definition already exists
    try {
       await metaobject.getDefinition({ type: VolumeDiscountWithIDModel.type });
    } catch (error) {
      // If the definition doesn't exist, create it
      if (error.message.includes("No definition found")) {
        await metaobject.define(VolumeDiscountWithIDModel);
      } else {
        throw error; // Re-throw if it's a different error
      }
    }


    // Create the new discount
    const createdDiscount = await metaobject.create(VolumeDiscountWithIDModel, newDataWithID);
    return createdDiscount;

  } catch (e) {
    console.error("Error saving discount:", e);
    return json({
      status: {
        success: false,
        message: `Error saving features: ${e.message}`,
      }
    }, { status: 400 });
  }

}