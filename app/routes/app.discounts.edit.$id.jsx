import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { DiscountForm } from "../components/discounts/discountForm";
import { authenticateExtra } from "../config/shopify";
import { VolumeDiscountWithIDModel } from "../models/volumeDiscountWithID.model";
import { Discount } from "../entities/discount";

export const loader = async ({ params, request }) => {
  const { metaobject } = await authenticateExtra(request);

  // Get the discount id from the URL in the format of metaobject id
  const discountId = `gid://shopify/Metaobject/${params.id}`;

  //  LAOD THE DISCOUNT DATA
  try {
    // Load the discount data
    const discountData = await metaobject.find(VolumeDiscountWithIDModel, discountId);   

    // Parse JSON strings back into objects
    const parsedData = {
      ...discountData,
      products: JSON.parse(discountData.products),
      discountValues: JSON.parse(discountData.discountValues),
      combinesWith: JSON.parse(discountData.combinesWith),
      isActive: discountData.isActive === 'true',
    };

    // Return the parsed data to the loader
    return json(parsedData);

  } catch (error) {
    console.error("Error loading discount data:", error);
    return json({ error: "Failed to load discount data" }, { status: 500 });
  }
};

export const action = async ({ request }) => {
  const { admin, metaobject } = await authenticateExtra(request);

  // Parse the form data
  let formData = await request.json();

  // Check if the form data is for updating a discount
  if (formData.updateDiscount) {
    try {
      const updatedDiscount = await updateDiscount(admin,formData, metaobject);
      if(updatedDiscount.status && !updatedDiscount.status.success) {
        return json({
          status: {
            success: false,
            message: newDiscount.status.message,
          }
        }, { status : 400 });
      }
      return json(
        {
          status: {
            success: true,
            message: "Discount updated successfully",
          }
        }
      );
    } catch (error) {
      console.error("Error updating discount:", error);
      return json({ error: "Failed to update discount" }, { status: 500 });
    }
  }

  return json({});
};

// RENDERING THE DISCOUNT FORM PAGE FOR EDITING
export default function EditDiscountPage() {
  const loaderData = useLoaderData();

  if (loaderData.error) {
    return <div>Error: {loaderData.error}</div>;
  }

  return <DiscountForm isEditing={true} />;
}

// Helper function
async function updateDiscount(admin, formData, metaobject) {

  const discount = new Discount(admin);

  // new object to store the only discount values necesary to create the discount
  const formattedDiscountValues = formData.discountValues.map(discount => ({
    discount_message: discount.discount_message,
    discount_type: discount.discount_type,
    quantity: discount.quantity,
    discount: discount.discount
  }));

  try {
    // with the discount object, we can now update the discount using shopify functions
    const result = await discount.updateAutomatic({
      id: formData.discountId,
      title: formData.title,
      functionId: process.env.SHOPIFY_VOLUME_DISCOUNT_ID,
      startsAt: new Date(),
      endsAt: new Date(new Date().setMonth(new Date().getMonth() + 1)),
      combinesWith: formData.combinesWith,
      metafields:[
        {
          key: "function-configuration",
          namespace: "$app:volume-discount",
          type: "json",
          value: JSON.stringify({
            title: formData.title,
            discountValue: formattedDiscountValues,
            variants: formData.products.flatMap(g => (g.variants.map(v => v.id))),
          })
        }
      ]
    });

    const newData = {
      title: formData.title,
      discountId: formData.discountId,
      products_reference: JSON.stringify(formData.products.flatMap(g => (g.variants.map(v => v.id)))),
      products: JSON.stringify(formData.products),
      discountValues: JSON.stringify(formData.discountValues), 
      isActive: formData.isActive ? 'true' : 'false',
      combinesWith: JSON.stringify(formData.combinesWith),
      createdAt: new Date().toISOString(),
    };

    const updatedDiscount = await metaobject.update(VolumeDiscountWithIDModel, formData.id, newData);
    return updatedDiscount;

  } catch (error) {
    console.error("Error saving discount:", error);
    return {
      status: {
        success: false,
        message: error.message, // This will now contain the correct error message
      }
    };
  } 
}