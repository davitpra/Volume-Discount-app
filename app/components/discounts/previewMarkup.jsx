import { Card, Text, BlockStack, Box } from "@shopify/polaris";
import { useState } from "react";

export default function PreviewMarkup({ discountValues }) {
  // Demo product price
  const [product, setProduct] = useState({
    price: 25,
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <Card>
      <Text variant="headingSm"> Preview </Text>
      <br />
      <BlockStack gap="200">
        {discountValues.map((block, index) => (
          <Box
            style={{
              border: "1px solid #e5e5e5",
              marginBottom: "10px",
            }}
            key={index}
          >
            <label htmlFor={`volume_discount_${index}`}>
              {block.label && block.badge && (
                <div
                  className="volume-discount__contents-label-wrapper"
                  style={{
                    backgroundColor: block.label_bg,
                    color: block.label_color,
                    padding: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    fontWeight: "bold",
                  }}
                >
                  <span className="volume-discount__contents-label-text">
                    {block.label}
                  </span>
                  <span
                    className="volume-discount__contents-badge-text"
                    style={{
                      backgroundColor: block.badge_bg,
                      padding: "2px 15px",
                      borderRadius: "20px",
                      fontWeight: "500",
                      color: block.badge_color,
                    }}
                  >
                    {block.badge}
                  </span>
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  padding: "10px",
                  alignItems: "center",
                }}
                className="volume-discount__contents-main"
              >
                <input
                  type="radio"
                  id={`${block.id}_${index}`}
                  name="volume-discount"
                  value={block.quantity}
                  checked={block.selected}
                />
                <div className="echo-w-full" style={{ width: "100%" }}>
                  <div
                    className="volume-discount__title"
                    style={{ fontWeight: "bold" }}
                  >
                    {block.title}
                  </div>
                  <div className="volume-discount__subtitle">
                    {block.subtitle}
                  </div>
                </div>
                <div
                  className="volume-discount__prices"
                  style={{
                    justifySelf: "end",
                    textAlign: "right",
                  }}
                >
                  {block.discount == 0 && (
                    <span className="volume-discount__prices-orignal">
                      {" "}
                      {formatPrice(product.price)}{" "}
                    </span>
                  )}
                  {block.discount > 0 && (
                    <span className="volume-discount__prices-discounted">
                      {formatPrice(
                        block.discount_type === "percentage"
                          ? product.price -
                              (product.price * block.discount) / 100
                          : product.price - block.discount,
                      )}
                    </span>
                  )}{" "}
                  {block.discount > 0 && (
                    <s className="volume-discount__prices-orignal">
                      {" "}
                      {formatPrice(product.price)}{" "}
                    </s>
                  )}
                </div>
              </div>
            </label>
          </Box>
        ))}
      </BlockStack>
    </Card>
  );
}