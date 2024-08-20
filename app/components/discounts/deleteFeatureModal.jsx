import { Form } from "@remix-run/react";
import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { Box, Text } from "@shopify/polaris";

export const DeleteFeatureModal = ({ selected, setSelected }) => {
  const handleSubmit = () => {
    shopify.modal.hide("delete-feature-modal");
    setSelected(undefined);
  };

  return (
    <Form method="post" navigate={false}>
      <Modal id="delete-feature-modal">
        <Box padding="400">
          <input type="hidden" name="deleteFeatures" value={true} />
          <input type="hidden" name="id" value={selected?.id} />
          <Text>Do you want to remove the feature?</Text>
        </Box>

        <TitleBar title="Are you sure">
          <button
            onClick={() => handleSubmit()}
            variant="primary"
            type="submit"
            tone="critical"
          >
            Yes
          </button>
          <button
            onClick={() => {
              shopify.modal.hide("delete-feature-modal");
              setSelected(undefined);
            }}
          >
            No
          </button>
        </TitleBar>
      </Modal>
    </Form>
  );
};
