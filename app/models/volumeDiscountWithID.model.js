//$app ---> with $app shopify behind the scenes create a id of the app for the model
//access ---> define the access level for the model, the admin can read and write, the storefront can only read
//fieldDefinitions ---> define the fields for the model, the key is the name of the field, the type is the type of the field
export const VolumeDiscountWithIDModel = {
  name: "VolumeDiscountWithID",
  type: "$app:volume-discount-with-id",
  access: {
    admin: "MERCHANT_READ_WRITE",
    storefront: "PUBLIC_READ",
  },
  fieldDefinitions: [
    { 
      name: "Title", 
      key: "title", 
      type: "single_line_text_field" 
    },
    { 
      name: "Discount ID", 
      key: "discountId", 
      type: "single_line_text_field" 
    },
    {
      name: "Products reference",
      key: "products_reference",
      type: "list.variant_reference",
    },
    { 
      name: "Products", 
      key: "products", 
      type: "json" 
    },
    { 
      name: "Discount Values",
      key: "discountValues",
       type: "json" 
    },
    { 
      name: "Is active", 
      key: "isActive", 
      type: "boolean" 
    },
    { 
      name: "Combines with", 
      key: "combinesWith", 
      type: "json" 
    },
    { 
      name: "Created at", 
      key: "createdAt", 
      type: "date_time" 
    },
  ],
};
