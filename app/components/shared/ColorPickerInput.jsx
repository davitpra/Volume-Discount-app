import {
    Box,
    ColorPicker,
    InlineStack,
    Popover,
    Text,
    TextField,
    BlockStack,
    hexToRgb,
    hsbToRgb,
    rgbToHex,
    rgbToHsb,
    Icon,
  } from "@shopify/polaris";
  import { useCallback, useState } from "react";
  import { ColorIcon } from "@shopify/polaris-icons";
  
  export default function ColorPickerInput({
    inputColor = null,
    label,
    onChange,
    helpText = null,
  }) {
    const [popoverActive, setPopoverActive] = useState(false);
    const [color, setColor] = useState({
      hue: rgbToHsb(hexToRgb("inputColor")).hue,
      brightness: rgbToHsb(hexToRgb("inputColor")).brightness,
      saturation: rgbToHsb(hexToRgb("inputColor")).saturation,
    });
  
    const togglePopoverActive = useCallback(
      () => setPopoverActive((popoverActive) => !popoverActive),
      [],
    );
  
    const [buttonColor, setButtonColor] = useState(
      inputColor ? inputColor : "#fff",
    );
  
    const activator = (
      <>
        <InlineStack align="start" gap="200" wrap={false}>
          <div
            onClick={togglePopoverActive}
            style={{
              width: "40px",
              height: "40px",
              minWidth: "40px",
              borderRadius: "20%",
              background: inputColor ? buttonColor : "#eee",
              cursor: "pointer",
              border: "1px solid #bbb",
              display: "flex",
            }}
          >
            {inputColor ? null : <Icon source={ColorIcon} tone="subdued" />}
          </div>
          <Box>
            <Text as="p" variant="bodyMd">
              {inputColor ? label : `Override ${label} Color`}
            </Text>
            <Text Variant="bodySm" tone="subdued" fontWeight="regular">
              <span style={{ fontSize: "12px" }}>
                {inputColor ? buttonColor : helpText}
              </span>
            </Text>
          </Box>
        </InlineStack>
      </>
    );
  
    return (
      <BlockStack align="end">
        <Popover
          active={popoverActive}
          activator={activator}
          autofocusTarget="first-node"
          onClose={togglePopoverActive}
        >
          <BlockStack>
            <Box padding="200">
              <ColorPicker
                onChange={(value) => {
                  let color = {
                    alpha: value.alpha,
                    hue: value.hue,
                    saturation: value.saturation || null,
                    brightness: value.brightness || null,
                  };
  
                  setColor(color);
                  const hexColor = rgbToHex(hsbToRgb(color));
                  setButtonColor(hexColor);
                  onChange(hexColor);
                }}
                allowAlpha
                color={color}
              />
            </Box>
            <Box padding="200" paddingBlockStart="0">
              <TextField
                value={buttonColor}
                focused={false}
                onChange={(value) => {
                  setButtonColor(value);
                  onChange(value === "" ? null : value);
                }}
              />
            </Box>
          </BlockStack>
        </Popover>
      </BlockStack>
    );
  }
  