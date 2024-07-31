import {
  Card,
  BlockStack,
  Text,
  FormLayout,
  TextField,
} from "@shopify/polaris";
import React, { useEffect, useState } from "react";
import { Form } from "@remix-run/react";

export function GeneralSettings({ selectedTab, settings, setSettings }) {
    
  useEffect(() => {
    if (settings) {
      const parsedSettings = typeof settings === 'string' ? JSON.parse(settings) : settings;
      setSettings(parsedSettings);
    }
  }, [settings]);

  return selectedTab !== "general" ? null : (
    <Card>
      <Form
        method="POST"
        data-save-bar
        data-discard-confirmation
        onReset={() => {}}
      >
        <input type="hidden" name="saveSettings" value={true} />
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
            General Settings
          </Text>

          <FormLayout>
            <FormLayout.Group>
              <TextField
                label="App Name"
                name="appName"
                value={settings.appName}
                onChange={(value) => {
                  setSettings({ ...settings, appName: value });
                }}
              />

              <TextField
                label="App version"
                name="appVersion"
                value={settings.appVersion}
                onChange={(value) => {
                  setSettings({ ...settings, appVersion: value });
                }}
              />
            </FormLayout.Group>
          </FormLayout>
        </BlockStack>
      </Form>
    </Card>
  );
}
