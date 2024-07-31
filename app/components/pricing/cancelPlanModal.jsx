import { Modal, TitleBar } from "@shopify/app-bridge-react";
import { Box, Text } from "@shopify/polaris";

export const CancelPlanModal = ({ currentPlan }) => {
  const handleCancelPlan = () =>
    document.getElementById("cancel-plan-form").submit();

  return (
    <>
      <form method="POST" id="cancel-plan-form">
        <input type="hidden" name="cancel" value={currentPlan?.id} />
      </form>
      <Modal id="cancel-plan-modal">
        <Box padding="400">
          <Text>
            You will lose access to the features of the current plan. Please
            confirm if you really want to change the plan.
          </Text>
        </Box>

        <TitleBar title="Are you sure">
          <button
            onClick={() => handleCancelPlan()}
            variant="primary"
            tone="critical"
          >
            Yes, cancel
          </button>
          <button onClick={() => shopify.modal.hide("cancel-plan-modal")}>
            Close
          </button>
        </TitleBar>
      </Modal>
    </>
  );
};
