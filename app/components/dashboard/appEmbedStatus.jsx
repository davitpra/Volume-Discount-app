import { useEffect, useCallback } from 'react';
import {
  BlockStack,
  Box,
  Text,
  Button,
  ButtonGroup,
  Grid,
  Card,
  List,
  Layout,
  Banner,
} from "@shopify/polaris";
import { useNavigation, useLoaderData, Form, useActionData, useSubmit } from "@remix-run/react";
import { ToggleOnIcon, StatusActiveIcon } from "@shopify/polaris-icons";
import appConfig from "../../config/app";

const { requireAppEmbed } = appConfig;

export function AppEmbedStatus() {
  const navigation = useNavigation();
  const { shop, uuid, verifyAppEmbed: initialVerifyAppEmbed } = useLoaderData();
  const actionData = useActionData();

  const verifyAppEmbed = actionData?.verifyAppEmbed || initialVerifyAppEmbed;
  const isEmbedEnabled = verifyAppEmbed.length > 0 && !verifyAppEmbed[0].disabled;

  if (!requireAppEmbed) return null;

  if (isEmbedEnabled) {
    return (
      <Layout.Section>
        <Banner status="success" icon={StatusActiveIcon}>
          <p>Great job! Your app embed is now enabled and ready to use.</p>
        </Banner>
      </Layout.Section>
    );
  }

  return (
    <Layout.Section>
      <Card>
        <Grid columns={{ xs: 1, sm: 1, md: 3, lg: 3 }}>
          <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 2, lg: 2 }}>
            <InstructionsAndActions shop={shop} uuid={uuid} navigation={navigation} />
          </Grid.Cell>
          <Grid.Cell columnSpan={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
            <EmbedInstructionImage />
          </Grid.Cell>

        </Grid>
      </Card>
    </Layout.Section>
  );
}

function InstructionsAndActions({ shop, uuid, navigation }) {
  return (
    <Box>
      <BlockStack gap="300">
        <Text as="h2" variant="headingMd">
          One more step: Enable your app embed
        </Text>
        <Text as="p" tone="subdued">
          To start using the app, you need to enable the app embed in your
          store theme and save. Then, verify that it is enabled.
        </Text>
        <EmbedInstructions />
        <ActionButtons shop={shop} uuid={uuid} navigation={navigation} />
      </BlockStack>
    </Box>
  );
}

function EmbedInstructions() {
  return (
    <List type="bullet">
      <List.Item>Click on <strong>Online Store</strong> &gt; <strong>Themes</strong></List.Item>
      <List.Item>Click on the current theme <strong>Customize</strong></List.Item>
      <List.Item>App embeds &gt; <strong>ShipReady Assets</strong></List.Item>
      <List.Item>Enable the app embed and click <strong>Save</strong></List.Item>
    </List>
  );
}

function ActionButtons({ shop, uuid, navigation }) {
  const submit = useSubmit();

  const handleVerify = useCallback((event) => {
    event.preventDefault();
    submit(event.currentTarget, { replace: true });
  }, [submit]);

  return (
    <ButtonGroup>
      <Button
        url={`https://${shop}/admin/themes/current/editor?context=apps&activateAppId=${uuid}/app-embed`}
        variant="primary"
        target="_blank"
        icon={ToggleOnIcon}
      >
        Enable app embed
      </Button>
      <Form method="POST" onSubmit={handleVerify}>
        <input type="hidden" name="checkAppEmbed" value="true" />
        <Button 
          submit 
          icon={StatusActiveIcon} 
          loading={navigation.state === "submitting"}
        >
          Verify app embed is enabled
        </Button>
      </Form>
    </ButtonGroup>
  );
}

function EmbedInstructionImage() {
  return (
    <div style={{
      border: '1px solid #dfe3e8',
      borderRadius: '4px',
      overflow: 'hidden',
    }}>
      <img
        src="https://cdn.shopify.com/s/files/1/0579/8749/8059/files/shipready-app-embed.gif?v=1710618877&width=300"
        alt="Enable app embed"
      />
    </div>
  );
}