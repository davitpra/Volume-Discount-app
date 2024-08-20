import { Card, BlockStack, Text, Button, InlineStack, Icon } from '@shopify/polaris';
import { DeleteIcon } from "@shopify/polaris-icons";
import { useState } from 'react';

export const FeedbackCard = ({ title, content, actions, icon, onDelete }) => {

  return (
    <Card>
      <BlockStack gap='400' align='start'>
        <BlockStack gap='200'>
          <InlineStack align='space-between'>
              <InlineStack gap="200">
                { icon && <Icon source={icon} color='inkLighter' /> }
                { title && <Text as='h2' variant='headingMd'>{ title }</Text> }
              </InlineStack>

              <Button
                variant="plain"
                tone="critical"
                onClick={onDelete}
                icon={DeleteIcon} accessibilityLabel='Close' />
          </InlineStack>
          { content && <Text as='p' variant='bodyMd' tone='subdued'>{ content }</Text> }
        </BlockStack>

        { actions && <BlockStack>{ actions }</BlockStack> }

      </BlockStack>
    </Card>
  );
};