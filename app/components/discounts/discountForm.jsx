import { 
  Card,
  TextField,
  BlockStack,
  FormLayout,
  Button,
  Text,
  Layout,
  InlineStack,
  Select,
  Checkbox,
  AppProvider as PolarisAppProvider
} from "@shopify/polaris";
import { useCallback, useState, useEffect } from "react";
import { AppProvider as DiscountsProvider } from '@shopify/discount-app-components';
import PageLayout from "../shared/pageLayout";
import ProductSelectionCard from "../shared/ProductSelectionCard";
import ColorPickerInput from "../shared/ColorPickerInput";
import { DeleteIcon, PlusIcon } from '@shopify/polaris-icons';
import {
  DiscountClass,
  DiscountMethod,
  SummaryCard,
  CombinationCard
} from "@shopify/discount-app-components";
import enPolarisTranslations from '@shopify/polaris/locales/en.json';
import "@shopify/polaris/build/esm/styles.css";
import "@shopify/discount-app-components/build/esm/styles.css";
import PreviewMarkup from "./previewMarkup";
import { Form, useSubmit, useLoaderData } from "@remix-run/react";

export const DiscountForm = ({ isEditing = false }) => {
  // useSubmit is a hook that provides a function to submit the form data to the specified URL.
  const submit = useSubmit();
  const loaderData = useLoaderData();

  const [title, setTitle] = useState('');
  const [products, setProducts] = useState([]);
  const [combinesWith, setCombinesWith] = useState([]);

  // Default discount values
  const [discountValues, setDiscountValues] = useState([
      {
          title: "Buy one",
          quantity: 1,
          discount: 0,
          discount_type: "percentage",
          discount_message: "",
          subtitle: "Standard price",
          label: "",
          badge: "",
          selected: false,
          label_bg: "#f7f7f7",
          label_color: "#000000",
          badge_bg: "#f55276",
          badge_color: "#ffffff",
      },
      {
          title: "Buy two get discount",
          quantity: 2,
          discount: 10,
          discount_type: "percentage",
          discount_message: "You save 10%",
          subtitle: "You save 10%",
          label: "Most popular",
          badge: "Recommended",
          selected: true,
          label_bg: "#48cae4",
          label_color: "#000000",
          badge_bg: "#0096c7",
          badge_color: "#ffffff",
      },
      {
          title: "Buy three get discount",
          quantity: 3,
          discount: 20,
          discount_type: "percentage",
          discount_message: "You save 20%",
          subtitle: "You save 20%",
          label: "Best value",
          badge: "Special offer",
          selected: false,
          label_bg: "#fbc4ab",
          label_color: "#000000",
          badge_bg: "#f08080",
          badge_color: "#ffffff",
      },
  ]);
  
  // Load the discount data if editing an existing discount
  useEffect(() => {
    if (isEditing && loaderData) {
      setTitle(loaderData.title || '');
      setProducts(loaderData.products || []);
      setCombinesWith(loaderData.combinesWith || []);
      setDiscountValues(loaderData.discountValues || []);
    }
  }, [isEditing, loaderData]);

  // Add a new quantity discount to the array of discounts
  const handleAddQuantityDiscount = useCallback(() => {
    setDiscountValues([...discountValues, {
      title: "",
      quantity: 0,
      discount: 0,
      discount_type: "percentage",
      discount_message: "",
      subtitle: "",
      label: "",
      badge: "",
      selected: false,
      label_bg: "#f7f7f7",
      label_color: "#000000",
      badge_bg: "#f55276",
      badge_color: "#ffffff",
    }]);
  }, [discountValues]);

  // Remove a quantity discount from the array of discounts
  const handleRemoveQuantityDiscount = useCallback((index) => {
    setDiscountValues(discountValues.filter((_, i) => i !== index));
  }, [discountValues]);

  // Update the quantity discount values
  const handleSetQuantityDiscount = useCallback((index, value, key) => {
    const newDiscountValues = [...discountValues];
    newDiscountValues[index][key] = value;
    setDiscountValues(newDiscountValues);
  }, [discountValues]);

  // Select a tier to be pre-selected by default
  const handleSelectTier = useCallback((index) => {
    const newDiscountValues = [...discountValues];
    newDiscountValues[index].selected = !newDiscountValues[index].selected;
    setDiscountValues(newDiscountValues);
  }, [discountValues]);

  // Submit the form
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data stucture to send to the server
    const data = {
      title,
      products,
      discountValues,
      isActive: true,
      combinesWith,
      createdAt: isEditing ? loaderData.createdAt : new Date().toISOString(),
      [isEditing ? 'updateDiscount' : 'saveDiscount']: true
    };

    console.log('data before sending:', data);

    if (isEditing) {
      data.id = loaderData.id; // Include the discount ID when updating
    }

    await submit(data, { method: 'POST', encType: "application/json" });
  };

  return (
    <PolarisAppProvider i18n={enPolarisTranslations}>
      <DiscountsProvider locale="en-US" ianaTimezone="America/Los_Angeles">
        <PageLayout showBackButton title={isEditing ? "Edit discount" : "New discount"}>
          {/* data-save-bar and data-discard-confirmation are custom attributes in Form tag from Shopify App Bridge React and are used to show a save bar and discard confirmation in the search bar of shopify. */}
          {/* To post form data to the specified URL, use the action attribute. Otherwise, the information is directed to the page URL. */}
          <Form
            method="POST"
            data-save-bar
            data-discard-confirmation
            onSubmit={handleSubmit}
            onReset={() => {}}
          >
            {/* Layout.Section are dividers to separate the form into sections. */}
            <Layout>
              <Layout.Section>
                {/* // BlockStack is used to stack the cards vertically with a gap between them. */}
                <BlockStack gap="500">
                  <Card sectioned>
                    {/* // FormLayout is used to create a form with labels and inputs. */}
                    <FormLayout>
                      <Text variant="headingSm">Basic settings</Text>
                      <TextField 
                        name="title" 
                        label="Title" 
                        value={title} 
                        onChange={setTitle} 
                        helpText="For your own internal reference. Only you can see it." 
                      />
                    </FormLayout>
                  </Card>

                  <Card>
                    <BlockStack gap="300">
                      {/* // InlineStack is used to align the text horizontally in the card. */}
                      <InlineStack align="space-between">
                        <Text variant="headingSm">Volume Discount Settings</Text>
                      </InlineStack>
                      <BlockStack gap="400">
                        {/* // Loop through the discount values and display the form fields for each tier */}
                        {discountValues?.map((item, i) => (
                          <Card roundedAbove="xs" key={i}>
                            <BlockStack gap="200">
                              {/* // InlineStack is used to align the text horizontally in the card. */}
                              <InlineStack align="space-between">
                                <Text variant="bodyMd" fontWeight="bold">Tier {i + 1}</Text>
                                <Button
                                  icon={DeleteIcon}
                                  tone="critical"
                                  onClick={() => handleRemoveQuantityDiscount(i)}
                                  accessibilityLabel="Remove tier"
                                />
                              </InlineStack>
                              <BlockStack gap="200">
                              {/* // FormLayout.group is used to create a form with labels and inputs in two columns. */}
                              {/* // consider using for very short inputs, the width of the inputs may be reduced in order to fit more fields in the row. */}
                                <FormLayout.Group condensed>
                                  <TextField 
                                    label="Title"
                                    type="text"
                                    value={item.title}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "title")}
                                  />
                                  <TextField
                                    label="Quantity"
                                    type="number"
                                    min={1}
                                    value={item.quantity}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "quantity")}
                                  />
                                </FormLayout.Group>

                                <FormLayout.Group condensed>
                                  <Select
                                    label="Discount type"
                                    options={[
                                      { label: "Percentage", value: "percentage" },
                                      { label: "Fixed amount", value: "fixed" }
                                    ]}
                                    value={item.discount_type}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "discount_type")}
                                  />
                                  <TextField
                                    label="Discount"
                                    type="number"
                                    value={item.discount}
                                    suffix={item.discount_type === "percentage" ? "%" : ""}
                                    prefix={item.discount_type === "fixed" ? "$" : ""}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "discount")}
                                  />
                                </FormLayout.Group>

                                <TextField
                                  label="Discount message"
                                  helpText="Discount message displayed to customers in cart and checkout"
                                  type="text"
                                  value={item.discount_message}
                                  onChange={(value) => handleSetQuantityDiscount(i, value, "discount_message")}
                                />
                                <TextField
                                  label="Subtitle"
                                  helpText="Optional"
                                  type="text"
                                  value={item.subtitle}
                                  onChange={(value) => handleSetQuantityDiscount(i, value, "subtitle")}
                                />

                                <FormLayout.Group condensed>
                                  <TextField
                                    label="Label"
                                    helpText="Optional"
                                    type="text"
                                    value={item.label}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "label")}
                                  />
                                  <TextField
                                    label="Badge"
                                    type="text"
                                    helpText="Optional"
                                    value={item.badge}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "badge")}
                                  />
                                </FormLayout.Group>

                                <Checkbox
                                  label="Pre-selected"
                                  defaultChecked={item.selected}
                                  onChange={() => handleSelectTier(i)}
                                />

                                <Text variant="bodyMd" fontWeight="bold">Styles</Text>

                                <FormLayout.Group condensed>
                                  <ColorPickerInput
                                    label="Label background"
                                    inputColor={item.label_bg}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "label_bg")}
                                  />
                                  <ColorPickerInput
                                    label="Label text"
                                    inputColor={item.label_color}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "label_color")}
                                  />
                                </FormLayout.Group>

                                <FormLayout.Group condensed>
                                  <ColorPickerInput
                                    label="Badge background"
                                    inputColor={item.badge_bg}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "badge_bg")}
                                  />
                                  <ColorPickerInput
                                    label="Badge text"
                                    inputColor={item.badge_color}
                                    onChange={(value) => handleSetQuantityDiscount(i, value, "badge_color")}
                                  />
                                </FormLayout.Group>
                              </BlockStack>
                            </BlockStack>
                          </Card>
                        ))}
                      </BlockStack>
                    </BlockStack>
                    <br />
                    {/* // Button to add more quantity discounts */}
                    <InlineStack align="end">
                      <Button
                        icon={PlusIcon}
                        variant="primary"
                        onClick={handleAddQuantityDiscount}
                        accessibilityLabel="Add more tier">
                          Add more tier
                      </Button>
                    </InlineStack>
                  </Card>

                  <div>
                    <CombinationCard
                      combinableDiscountTypes={{
                        value: combinesWith,
                        onChange: setCombinesWith,
                      }}
                      discountClass={DiscountClass.Product}
                      discountDescriptor={title}
                    />
                    <ProductSelectionCard
                      title="Product"
                      products={products}
                      setProducts={setProducts}
                      multiple={true}
                    />
                  </div>
                </BlockStack>
              </Layout.Section>

              {/* Sidebar */}
              <Layout.Section variant="oneThird">
                <BlockStack gap="500">
                  <SummaryCard
                    header={{
                      discountMethod: DiscountMethod.Automatic,
                      appDiscountType: "Volume discounts",
                      discountDescriptor: title,
                      isEditing: isEditing,
                      discountStatus: null
                    }}
                    additionalDetails={[`Selected products: ${products.length}`]}
                    combinations={{
                      combinesWith
                    }} 
                  />
                  <PreviewMarkup discountValues={discountValues} />
                </BlockStack>
              </Layout.Section>
            </Layout>
          </Form>
        </PageLayout>
      </DiscountsProvider>
    </PolarisAppProvider>
  );
};

export default DiscountForm;