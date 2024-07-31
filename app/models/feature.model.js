export const FeatureModel = {
  name: "Feature",
  type: "$app:feature",
  access: {
    admin: "MERCHANT_READ_WRITE",
    storefront: "PUBLIC_READ",
  },
  fieldDefinitions: [
    {
      name: "Feature name",
      key: "featureName",
      type: "single_line_text_field",
    },
    {
      name: "Feature details",
      key: "featureDetails",
      type: "multi_line_text_field",
    },
  ],
};
