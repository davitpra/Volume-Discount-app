const ProductModel = {
  name: "Product",
  type: "$app:product",
  access: {
    admin: "MERCHANT_READ_WRITE",
    storefront: "PUBLIC_READ",
  },
  fieldDefinitions: [
    { name: "Title", key: "title", type: "single_line_text_field" },
    { name: "Created at", key: "createdAt", type: "date_time" },
  ],
};
