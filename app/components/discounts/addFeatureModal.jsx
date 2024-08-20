import { Form } from "@remix-run/react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { BlockStack, Box, FormLayout, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";

export const AddFeatureModal = ({ selected, setSelected }) => {
  const [featureName, setFeatureName] = useState();
  const [featureDetails, setFeatureDetails] = useState();


  useEffect(() => {
    if (selected) {
      setFeatureName(selected?.featureName);
      setFeatureDetails(selected?.featureDetails);
    }
  }, [selected]);

  const handleSubmit = () => {
    shopify.modal.hide("add-feature-modal");
    setSelected(undefined);
  };

  return (
    <Form method="post" navigate={false}>
      <Modal id="add-feature-modal">
        <Box padding="400">
          <input type="hidden" name="saveFeatures" value={true} />
          {selected && <input type="hidden" name="id" value={selected?.id} />}
          <FormLayout>
            <FormLayout.Group>
              <BlockStack gap="200">
                <TextField
                  label="Feature name"
                  name="featureName"
                  value={featureName}
                  onChange={setFeatureName}
                />

                <TextField
                  label="Feature details"
                  name="featureDetails"
                  multiline={2}
                  value={featureDetails}
                  onChange={setFeatureDetails}
                />
              </BlockStack>
            </FormLayout.Group>
          </FormLayout>
        </Box>

        <TitleBar title="Add Feature">

          <button
            onClick={() => handleSubmit() }
            variant="primary"
            type="submit">
            Save
          </button>

          <button type="button"
            onClick={() => {
              shopify.modal.hide("add-feature-modal");
            }}>
            Cancel
          </button>
        </TitleBar>
      </Modal>
    </Form>
  );
};
