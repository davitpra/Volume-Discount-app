import { Box, Text } from "@shopify/polaris";

/**
 * A reusable CodeSnippet component that renders a code snippet within a styled Box.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The code snippet to be rendered.
 * @returns {React.ReactElement} - The CodeSnippet component.
 */
export function CodeSnippet({ children }) {
  return (
    <>
      {" "}
      <Box
        as="span"
        padding="025"
        paddingInlineStart="100"
        paddingInlineEnd="100"
        background="bg-surface-active"
        borderWidth="025"
        borderColor="border"
        borderRadius="100"
      >
        <Text as="code" fontSize="bodyMd">
          {children}
        </Text>
      </Box>{" "}
    </>
  );
}
